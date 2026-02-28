// firebase-sync.js - Firebase Realtime Database Synkronisering
// Erstatter GitHub sync med Firebase for sanntidsoppdateringer

class FirebaseSync {
  constructor() {
    this.db = null;
    this.isInitialized = false;
    this.listeners = {};
  }

  // Initialiser Firebase
  async initialize(config) {
    try {
      // Initialiser Firebase
      if (!firebase.apps.length) {
        firebase.initializeApp(config);
      }
      
      this.db = firebase.database();
      this.isInitialized = true;
      
      console.log('✅ Firebase initialisert');
      this.showStatus('🔥 Tilkoblet Firebase', 'success');
      
      return true;
    } catch (error) {
      console.error('❌ Firebase init feil:', error);
      this.showStatus('❌ Firebase tilkobling feilet', 'error');
      return false;
    }
  }

  // Hent data fra Firebase
  async getData(path) {
    if (!this.isInitialized) {
      console.warn('Firebase ikke initialisert');
      return null;
    }

    try {
      const snapshot = await this.db.ref(path).once('value');
      return snapshot.val();
    } catch (error) {
      console.error('Feil ved henting av data:', error);
      return null;
    }
  }

  // Lagre data til Firebase
  async setData(path, data) {
    if (!this.isInitialized) {
      console.warn('Firebase ikke initialisert');
      return false;
    }

    try {
      await this.db.ref(path).set(data);
      console.log(`✅ Data lagret til ${path}`);
      this.showStatus('✅ Synkronisert!', 'success');
      return true;
    } catch (error) {
      console.error('Feil ved lagring:', error);
      this.showStatus('❌ Synkronisering feilet', 'error');
      return false;
    }
  }

  // Oppdater spesifikke felter
  async updateData(path, updates) {
    if (!this.isInitialized) {
      console.warn('Firebase ikke initialisert');
      return false;
    }

    try {
      await this.db.ref(path).update(updates);
      console.log(`✅ Data oppdatert i ${path}`);
      this.showStatus('✅ Synkronisert!', 'success');
      return true;
    } catch (error) {
      console.error('Feil ved oppdatering:', error);
      this.showStatus('❌ Synkronisering feilet', 'error');
      return false;
    }
  }

  // Lytt til endringer (sanntidsoppdateringer)
  onDataChange(path, callback) {
    if (!this.isInitialized) {
      console.warn('Firebase ikke initialisert');
      return null;
    }

    const ref = this.db.ref(path);
    const listener = ref.on('value', (snapshot) => {
      callback(snapshot.val());
    });

    // Lagre listener for senere cleanup
    this.listeners[path] = { ref, listener };

    return listener;
  }

  // Fjern listener
  offDataChange(path) {
    if (this.listeners[path]) {
      const { ref, listener } = this.listeners[path];
      ref.off('value', listener);
      delete this.listeners[path];
    }
  }

  // Slett data
  async deleteData(path) {
    if (!this.isInitialized) {
      console.warn('Firebase ikke initialisert');
      return false;
    }

    try {
      await this.db.ref(path).remove();
      console.log(`✅ Data slettet fra ${path}`);
      return true;
    } catch (error) {
      console.error('Feil ved sletting:', error);
      return false;
    }
  }

  // Vis status til bruker
  showStatus(message, type = 'info') {
    const existingStatus = document.querySelector('.firebase-status');
    if (existingStatus) {
      existingStatus.remove();
    }

    const statusDiv = document.createElement('div');
    statusDiv.className = `firebase-status firebase-${type}`;
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
      font-family: 'Manrope', system-ui, sans-serif;
    `;

    document.body.appendChild(statusDiv);

    setTimeout(() => {
      statusDiv.style.animation = 'slideOut 0.3s ease';
      setTimeout(() => statusDiv.remove(), 300);
    }, 3000);
  }
}

// Opprett global instans
const firebaseSync = new FirebaseSync();

// CSS animations
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
`;
document.head.appendChild(style);

console.log('✅ Firebase Sync bibliotek lastet');
