// storage-helper.js - Håndterer både localStorage og GitHub sync
// Brukes av alle praksisplan-filene

class StorageHelper {
  constructor(storageKey) {
    this.storageKey = storageKey;
    this.githubDataKey = this.mapToGithubKey(storageKey);
    this.currentSha = null;
    this.githubData = null;
  }

  // Map localStorage keys til GitHub data.json keys
  mapToGithubKey(localKey) {
    const mapping = {
      'egenomsorgsActivities': 'del1_egenomsorg',
      'resepturActivities': 'del2_reseptur',
      'arbeidskravCompleted': 'del3_arbeidskrav',
      'continuousActivities': 'del4_kontinuerlige',
      'apokusCourses': 'del5_apokus',
      'ganttCompletedTasks': 'gantt_completed'
    };
    return mapping[localKey] || localKey;
  }

  // Last initial data (fra GitHub eller localStorage)
  async loadInitialData() {
    try {
      // Prøv å laste fra GitHub først
      const githubResult = await githubSync.fetchData();
      
      if (githubResult && githubResult.data) {
        this.currentSha = githubResult.sha;
        this.githubData = githubResult.data;
        
        // Hent data for denne spesifikke delen
        const data = githubResult.data[this.githubDataKey];
        
        if (data && data.length > 0) {
          // GitHub har data - bruk den
          localStorage.setItem(this.storageKey, JSON.stringify(data));
          console.log(`✅ Lastet ${data.length} elementer fra GitHub for ${this.storageKey}`);
          return data;
        }
      }
      
      // Hvis GitHub ikke har data, bruk localStorage
      const localData = localStorage.getItem(this.storageKey);
      if (localData) {
        const parsed = JSON.parse(localData);
        console.log(`📱 Bruker lokal data for ${this.storageKey}`);
        return parsed;
      }
      
      // Ingen data funnet
      return null;
      
    } catch (error) {
      console.error('Feil ved lasting av initial data:', error);
      // Fallback til localStorage
      const localData = localStorage.getItem(this.storageKey);
      return localData ? JSON.parse(localData) : null;
    }
  }

  // Lagre data (både lokalt og til GitHub)
  async saveData(data) {
    try {
      // Lagre til localStorage først (instant feedback)
      localStorage.setItem(this.storageKey, JSON.stringify(data));
      
      // Hvis GitHub sync er tilgjengelig, synkroniser
      if (githubSync.hasConfig()) {
        // Hent current data fra GitHub eller bruk cached
        let fullData = this.githubData || (await this.loadFullGithubData());
        
        if (!fullData) {
          // Opprett ny data-struktur
          fullData = githubSync.getEmptyData().data;
        }
        
        // Oppdater kun denne delens data
        fullData[this.githubDataKey] = data;
        
        // Lagre til GitHub
        const newSha = await githubSync.saveData(fullData, this.currentSha);
        
        if (newSha) {
          this.currentSha = newSha;
          this.githubData = fullData;
          githubSync.showSyncStatus('✅ Synkronisert til GitHub', 'success');
          return true;
        } else {
          console.warn('GitHub sync feilet - data er lagret lokalt');
          return false;
        }
      } else {
        console.log('GitHub config mangler - lagrer kun lokalt');
        return false;
      }
      
    } catch (error) {
      console.error('Feil ved lagring:', error);
      githubSync.showSyncStatus('⚠️ Kunne ikke synkronisere - lagret lokalt', 'error');
      return false;
    }
  }

  // Hent full GitHub data
  async loadFullGithubData() {
    try {
      const result = await githubSync.fetchData();
      if (result) {
        this.currentSha = result.sha;
        return result.data;
      }
      return null;
    } catch (error) {
      console.error('Feil ved henting av GitHub data:', error);
      return null;
    }
  }

  // Få localStorage data (synkron)
  getLocalData() {
    const data = localStorage.getItem(this.storageKey);
    return data ? JSON.parse(data) : null;
  }

  // Slett data
  async clearData() {
    try {
      // Slett lokalt
      localStorage.removeItem(this.storageKey);
      
      // Oppdater GitHub med tom data
      if (githubSync.hasConfig() && this.githubData) {
        this.githubData[this.githubDataKey] = [];
        await githubSync.saveData(this.githubData, this.currentSha);
        githubSync.showSyncStatus('✅ Data slettet og synkronisert', 'success');
      }
      
      return true;
    } catch (error) {
      console.error('Feil ved sletting:', error);
      return false;
    }
  }
}

console.log('✅ Storage Helper lastet');
