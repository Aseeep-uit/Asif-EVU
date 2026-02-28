// firebase-storage-helper.js - Håndterer data-lagring med Firebase
// Fungerer sammen med firebase-sync.js

class FirebaseStorageHelper {
  constructor(storageKey) {
    this.storageKey = storageKey;
    this.firebasePath = this.mapToFirebasePath(storageKey);
    this.localCache = null;
    this.isListening = false;
  }

  // Map localStorage keys til Firebase paths
  mapToFirebasePath(localKey) {
    const mapping = {
      'egenomsorgsActivities': 'del1_egenomsorg',
      'resepturActivities': 'del2_reseptur',
      'arbeidskravCompleted': 'del3_arbeidskrav',
      'continuousActivities': 'del4_kontinuerlige',
      'apokusCourses': 'del5_apokus',
      'ganttCompletedTasks': 'gantt_completed'
    };
    return `praksisplan/${mapping[localKey] || localKey}`;
  }

  // Last initial data fra Firebase
  async loadInitialData() {
    try {
      // Prøv å laste fra Firebase først
      const firebaseData = await firebaseSync.getData(this.firebasePath);
      
      if (firebaseData) {
        // Firebase har data - bruk den
        this.localCache = firebaseData;
        localStorage.setItem(this.storageKey, JSON.stringify(firebaseData));
        console.log(`✅ Lastet data fra Firebase for ${this.storageKey}`);
        
        // Start å lytte til endringer
        this.startListening();
        
        return firebaseData;
      }
      
      // Hvis Firebase ikke har data, sjekk localStorage
      const localData = localStorage.getItem(this.storageKey);
      if (localData) {
        const parsed = JSON.parse(localData);
        // Synkroniser lokal data til Firebase
        await this.saveData(parsed, false); // false = ikke vis melding
        console.log(`📤 Synkroniserte lokal data til Firebase`);
        
        this.startListening();
        return parsed;
      }
      
      // Ingen data funnet - returner tom array
      const emptyData = [];
      await this.saveData(emptyData, false);
      this.startListening();
      return emptyData;
      
    } catch (error) {
      console.error('Feil ved lasting av initial data:', error);
      
      // Fallback til localStorage
      const localData = localStorage.getItem(this.storageKey);
      return localData ? JSON.parse(localData) : [];
    }
  }

  // Start å lytte til Firebase-endringer (sanntid)
  startListening() {
    if (this.isListening) return;
    
    firebaseSync.onDataChange(this.firebasePath, (data) => {
      if (data && JSON.stringify(data) !== JSON.stringify(this.localCache)) {
        // Data har endret seg i Firebase - oppdater lokalt
        this.localCache = data;
        localStorage.setItem(this.storageKey, JSON.stringify(data));
        
        // Trigger event så UI kan oppdatere seg
        window.dispatchEvent(new CustomEvent('firebaseDataChanged', {
          detail: { key: this.storageKey, data }
        }));
        
        console.log(`🔄 Data oppdatert fra Firebase: ${this.storageKey}`);
      }
    });
    
    this.isListening = true;
  }

  // Stopp å lytte
  stopListening() {
    if (this.isListening) {
      firebaseSync.offDataChange(this.firebasePath);
      this.isListening = false;
    }
  }

  // Lagre data (både lokalt og til Firebase)
  async saveData(data, showNotification = true) {
    try {
      // Lagre til localStorage først (instant feedback)
      localStorage.setItem(this.storageKey, JSON.stringify(data));
      this.localCache = data;
      
      // Lagre til Firebase
      const success = await firebaseSync.setData(this.firebasePath, data);
      
      if (success) {
        // Oppdater lastUpdated timestamp
        await firebaseSync.updateData('praksisplan/metadata', {
          lastUpdated: new Date().toISOString(),
          lastUpdatedBy: 'student'
        });
      }
      
      return success;
      
    } catch (error) {
      console.error('Feil ved lagring:', error);
      if (showNotification) {
        firebaseSync.showStatus('⚠️ Kunne ikke synkronisere', 'error');
      }
      return false;
    }
  }

  // Hent lokal data (synkron)
  getLocalData() {
    const data = localStorage.getItem(this.storageKey);
    return data ? JSON.parse(data) : null;
  }

  // Slett data
  async clearData() {
    try {
      // Slett lokalt
      localStorage.removeItem(this.storageKey);
      this.localCache = null;
      
      // Slett i Firebase
      await firebaseSync.deleteData(this.firebasePath);
      
      firebaseSync.showStatus('✅ Data slettet', 'success');
      return true;
      
    } catch (error) {
      console.error('Feil ved sletting:', error);
      return false;
    }
  }

  // Eksporter all data (for backup)
  async exportAllData() {
    try {
      const allData = await firebaseSync.getData('praksisplan');
      return allData;
    } catch (error) {
      console.error('Feil ved eksport:', error);
      return null;
    }
  }
}

console.log('✅ Firebase Storage Helper lastet');
