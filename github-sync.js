// github-sync.js - GitHub Synkroniseringsbibliotek
// Håndterer lesing og skriving av data til GitHub

class GitHubSync {
  constructor() {
    this.isOnline = true;
    this.syncInProgress = false;
    this.lastSyncTime = null;
    this.pendingChanges = [];
  }

  // Sjekk om vi har config
  hasConfig() {
    return typeof GITHUB_CONFIG !== 'undefined' && 
           GITHUB_CONFIG.token && 
           GITHUB_CONFIG.username && 
           GITHUB_CONFIG.repo;
  }

  // Hent data fra GitHub
  async fetchData() {
    if (!this.hasConfig()) {
      console.warn('GitHub config mangler - bruker kun localStorage');
      return null;
    }

    try {
      const response = await fetch(GITHUB_API.getFile, {
        method: 'GET',
        headers: {
          'Authorization': `token ${GITHUB_CONFIG.token}`,
          'Accept': 'application/vnd.github.v3+json'
        }
      });

      if (response.status === 404) {
        // Filen eksisterer ikke ennå - opprett den
        console.log('data.json finnes ikke - oppretter ny fil');
        await this.createInitialData();
        return this.getEmptyData();
      }

      if (!response.ok) {
        throw new Error(`GitHub API error: ${response.status}`);
      }

      const data = await response.json();
      
      // GitHub returnerer base64-kodet innhold
      const content = atob(data.content);
      const parsedData = JSON.parse(content);
      
      this.lastSyncTime = new Date();
      return {
        data: parsedData,
        sha: data.sha // Trenger denne for å oppdatere filen senere
      };

    } catch (error) {
      console.error('Feil ved henting av data fra GitHub:', error);
      return null;
    }
  }

  // Opprett tom data-struktur
  getEmptyData() {
    return {
      data: {
        lastUpdated: new Date().toISOString(),
        del1_egenomsorg: [],
        del2_reseptur: [],
        del3_arbeidskrav: [],
        del4_kontinuerlige: [],
        del5_apokus: [],
        gantt_completed: []
      },
      sha: null
    };
  }

  // Opprett initial data.json fil på GitHub
  async createInitialData() {
    const emptyData = this.getEmptyData();
    const content = JSON.stringify(emptyData.data, null, 2);
    const encodedContent = btoa(unescape(encodeURIComponent(content)));

    try {
      const response = await fetch(GITHUB_API.updateFile, {
        method: 'PUT',
        headers: {
          'Authorization': `token ${GITHUB_CONFIG.token}`,
          'Accept': 'application/vnd.github.v3+json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          message: 'Opprett initial praksisplan data',
          content: encodedContent,
          branch: GITHUB_CONFIG.branch
        })
      });

      if (!response.ok) {
        throw new Error(`Kunne ikke opprette data.json: ${response.status}`);
      }

      console.log('✅ data.json opprettet på GitHub');
      return true;

    } catch (error) {
      console.error('Feil ved opprettelse av data.json:', error);
      return false;
    }
  }

  // Lagre data til GitHub
  async saveData(newData, currentSha) {
    if (!this.hasConfig()) {
      console.warn('GitHub config mangler - lagrer kun lokalt');
      return false;
    }

    if (this.syncInProgress) {
      console.log('Synkronisering pågår allerede - venter...');
      this.pendingChanges.push({ data: newData, sha: currentSha });
      return false;
    }

    this.syncInProgress = true;

    try {
      // Oppdater lastUpdated timestamp
      newData.lastUpdated = new Date().toISOString();

      const content = JSON.stringify(newData, null, 2);
      const encodedContent = btoa(unescape(encodeURIComponent(content)));

      const body = {
        message: `Oppdater praksisplan fremgang - ${new Date().toLocaleString('no-NO')}`,
        content: encodedContent,
        branch: GITHUB_CONFIG.branch
      };

      // Hvis vi har en SHA (filen eksisterer), inkluder den
      if (currentSha) {
        body.sha = currentSha;
      }

      const response = await fetch(GITHUB_API.updateFile, {
        method: 'PUT',
        headers: {
          'Authorization': `token ${GITHUB_CONFIG.token}`,
          'Accept': 'application/vnd.github.v3+json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`GitHub API error: ${response.status} - ${errorData.message}`);
      }

      const result = await response.json();
      this.lastSyncTime = new Date();
      
      console.log('✅ Data synkronisert til GitHub');
      
      this.syncInProgress = false;

      // Hvis det er pending changes, prosesser dem
      if (this.pendingChanges.length > 0) {
        const pending = this.pendingChanges.shift();
        setTimeout(() => this.saveData(pending.data, result.content.sha), 1000);
      }

      return result.content.sha;

    } catch (error) {
      console.error('Feil ved lagring til GitHub:', error);
      this.syncInProgress = false;
      return false;
    }
  }

  // Vis synkroniseringsstatus til bruker
  showSyncStatus(message, type = 'info') {
    const existingStatus = document.querySelector('.sync-status');
    if (existingStatus) {
      existingStatus.remove();
    }

    const statusDiv = document.createElement('div');
    statusDiv.className = `sync-status sync-${type}`;
    statusDiv.textContent = message;
    statusDiv.style.cssText = `
      position: fixed;
      top: 80px;
      right: 20px;
      padding: 12px 20px;
      background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
      color: white;
      border-radius: 8px;
      font-weight: 600;
      font-size: 0.9rem;
      z-index: 10000;
      box-shadow: 0 4px 12px rgba(0,0,0,0.2);
      animation: slideIn 0.3s ease;
    `;

    document.body.appendChild(statusDiv);

    setTimeout(() => {
      statusDiv.style.animation = 'slideOut 0.3s ease';
      setTimeout(() => statusDiv.remove(), 300);
    }, 3000);
  }
}

// Opprett global instans
const githubSync = new GitHubSync();

// Legg til CSS animations
const style = document.createElement('style');
style.textContent = `
  @keyframes slideIn {
    from {
      transform: translateX(400px);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }

  @keyframes slideOut {
    from {
      transform: translateX(0);
      opacity: 1;
    }
    to {
      transform: translateX(400px);
      opacity: 0;
    }
  }

  .sync-status {
    font-family: 'Manrope', system-ui, sans-serif;
  }
`;
document.head.appendChild(style);

console.log('✅ GitHub Sync bibliotek lastet');
