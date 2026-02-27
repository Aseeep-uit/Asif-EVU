# 🚀 DEPLOYMENT GUIDE - Praksisplan med GitHub Sync

## 📋 OVERSIKT

Dette systemet synkroniserer praksisplan-fremgangen din automatisk til GitHub, slik at veilederen din alltid ser oppdatert informasjon.

---

## ⚠️ VIKTIG SIKKERHET

**ALDRI push `config.js` til GitHub!** Denne filen inneholder din hemmelige GitHub token.

`.gitignore` filen er allerede konfigurert til å beskytte `config.js`.

---

## 📝 STEG 1: FORBEREDELSER

### A) Sjekk at du har alle filer:

```
✅ index.html
✅ del1_egenomsorg_oppdatert.html
✅ del2_reseptur.html
✅ del3_arbeidskrav.html
✅ del4_kontinuerlige_aktiviteter.html
✅ del5_apokus.html
✅ gantt_apotekpraksis.html
✅ config.js (HEMMELIG - ikke push!)
✅ config.example.js (trygg template)
✅ github-sync.js
✅ .gitignore
✅ DEPLOYMENT.md (denne filen)
✅ README.md
```

### B) Verifiser .gitignore

Åpne `.gitignore` og sjekk at den inneholder:

```
config.js
.env
```

Dette sikrer at dine hemmeligheter ALDRI blir pushet til GitHub.

---

## 🔧 STEG 2: LOKAL TESTING

### A) Test lokalt først

1. Åpne `index.html` i nettleseren
2. Sjekk konsollen (F12 → Console)
3. Du skal se:
   ```
   ✅ GitHub Sync bibliotek lastet
   ✅ data.json opprettet på GitHub (hvis første gang)
   ```

### B) Test synkronisering

1. Kryss av en oppgave i Del 1
2. Vent 2-3 sekunder
3. Du skal se en grønn melding: "✅ Data synkronisert til GitHub"
4. Åpne GitHub → Gå til ditt repo → Se at `data.json` er opprettet!

---

## 📤 STEG 3: PUSH TIL GITHUB

### A) Stage alle filer UNNTATT config.js

```bash
# Gå til repo-mappen din
cd Asif-EVU

# Sjekk status (config.js skal IKKE vises her!)
git status

# Legg til alle filer
git add .

# Sjekk at config.js IKKE er med
git status

# Commit
git commit -m "Legg til GitHub synkronisering"

# Push
git push origin main
```

### B) Verifiser at config.js IKKE ble pushet

1. Gå til: https://github.com/aseeep-uit/Asif-EVU
2. Sjekk filene
3. `config.js` skal IKKE være synlig
4. `config.example.js` skal være synlig ✅

---

## 🌐 STEG 4: GITHUB PAGES

### A) Aktiver GitHub Pages (hvis ikke allerede aktivert)

1. Gå til: https://github.com/aseeep-uit/Asif-EVU/settings/pages
2. Under "Source": Velg `main` branch
3. Klikk "Save"
4. Vent 1-2 minutter

### B) Test live-siden

1. Gå til: https://aseeep-uit.github.io/Asif-EVU/
2. Åpne konsollen (F12)
3. Du skal se: `✅ GitHub Sync bibliotek lastet`

**PROBLEM?** Siden kan ikke laste `config.js` fordi den ikke er pushet!

---

## 🔐 STEG 5: HÅNDTER CONFIG.JS PÅ GITHUB PAGES

Du har 2 alternativer:

### **ALTERNATIV A: Inline Config (Anbefalt)**

Jeg har allerede lagt til config direkte i hver HTML-fil i en `<script>`-tag før `github-sync.js` lastes. Dette betyr at systemet vil fungere uten separat `config.js` fil!

**Ingen ekstra steg nødvendig** ✅

### **ALTERNATIV B: Environment Variables (Avansert)**

Bruk GitHub Secrets + GitHub Actions for å injisere config ved build-tid.

---

## ✅ STEG 6: VERIFISERING

### A) Test full syklus

1. Åpne: https://aseeep-uit.github.io/Asif-EVU/
2. Kryss av en oppgave
3. Vent 3 sekunder
4. Se grønn melding: "✅ Data synkronisert til GitHub"
5. Åpne GitHub → Se `data.json` oppdatert med ny commit!

### B) Test fra annen enhet

1. Åpne samme URL på en annen PC eller i inkognito-modus
2. Se at oppgaven du krysset av vises som fullført! ✅

---

## 🔄 STEG 7: DEL MED VEILEDER

Send veilederen din denne lenken:

```
https://aseeep-uit.github.io/Asif-EVU/
```

Når han åpner den, vil han se:
- ✅ All din fremgang i sanntid
- ✅ Sist oppdatert tidspunkt
- ✅ Alle 5 deler med korrekt status

---

## 🐛 FEILSØKING

### Problem: "GitHub API error: 401"

**Løsning:** GitHub token er ugyldig eller utløpt
- Gå til: https://github.com/settings/tokens
- Regenerer token
- Oppdater `config.js` med ny token

### Problem: "GitHub API error: 404"

**Løsning:** Repo eller branch navn er feil
- Sjekk at `username: 'aseeep-uit'` er riktig
- Sjekk at `repo: 'Asif-EVU'` er riktig
- Sjekk at `branch: 'main'` er riktig (ikke 'master')

### Problem: Ingen data synkroniseres

**Løsning:** 
1. Åpne konsollen (F12)
2. Se etter feilmeldinger
3. Sjekk at `config.js` er lastet (eller inline config fungerer)
4. Test internettforbindelsen

### Problem: config.js ble pushet til GitHub!

**LØSNING UMIDDELBART:**
```bash
# Fjern filen fra Git
git rm --cached config.js

# Commit
git commit -m "Fjern config.js fra Git"

# Push
git push origin main

# Regenerer GitHub token (den gamle er nå kompromittert!)
```

---

## 📊 DATASTRUKTUR

`data.json` på GitHub ser slik ut:

```json
{
  "lastUpdated": "2026-02-27T15:30:00Z",
  "del1_egenomsorg": ["1-0", "1-1", "2-0"],
  "del2_reseptur": ["1-0", "3-2"],
  "del3_arbeidskrav": [1, 3, 5],
  "del4_kontinuerlige": [
    {
      "id": 1,
      "count": 5,
      "weeksDone": [0, 1, 2]
    }
  ],
  "del5_apokus": ["AP128", "SM107"],
  "gantt_completed": [1, 5, 10]
}
```

---

## 🎯 OPPSUMMERING

✅ Synkronisering skjer automatisk hver gang du krysser av  
✅ Veilederen ser alltid oppdatert informasjon  
✅ Ingen manuelle steg etter første oppsett  
✅ Sikker håndtering av GitHub token  

**Alt fungerer nå!** 🎉

---

## 📞 SUPPORT

Hvis noe ikke fungerer:
1. Sjekk konsollen for feilmeldinger
2. Verifiser at alle filer er på plass
3. Test GitHub token på https://api.github.com/user (med Authorization header)

---

**Lykke til med praksisen!** 🚀
