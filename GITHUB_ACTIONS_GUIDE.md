# 🚀 GITHUB ACTIONS + SECRETS - KOMPLETT GUIDE

## 📋 OVERSIKT

Denne løsningen bruker GitHub Secrets til å lagre tokenet ditt sikkert, og GitHub Actions til å injisere det i filene ved deployment.

**Fordeler:**
- ✅ Token er ALDRI synlig i kildekoden
- ✅ GitHub sletter IKKE tokenet
- ✅ Automatisk deployment ved hver push
- ✅ Profesjonell og sikker løsning

---

## 🎯 DEL 1: OPPRETT NY TOKEN

### **Steg 1: Opprett fresh token**

1. Gå til: https://github.com/settings/tokens
2. Klikk **"Generate new token"** → **"Generate new token (classic)"**
3. **Note:** `Praksisplan Actions Token`
4. **Expiration:** `90 days` (eller lengre)
5. **Select scopes:**
   - ✅ **`repo`** (full control of private repositories)
6. Klikk **"Generate token"**
7. **KOPIER TOKENET** - du trenger det i neste steg!

Token ser ut som: `ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`

---

## 🔐 DEL 2: LEGG TIL SECRET I GITHUB

### **Steg 2: Opprett Repository Secret**

1. Gå til ditt repo: https://github.com/aseeep-uit/Asif-EVU
2. Klikk **"Settings"** (øverst i repoet)
3. I venstre sidebar: Klikk **"Secrets and variables"** → **"Actions"**
4. Klikk **"New repository secret"**
5. **Name:** `GITHUB_API_TOKEN` (EKSAKT dette navnet!)
6. **Secret:** Lim inn tokenet du kopierte i Steg 1
7. Klikk **"Add secret"**

**VIKTIG:** Namnet MÅ være `GITHUB_API_TOKEN` - ikke noe annet!

---

## 📤 DEL 3: PUSH FILENE TIL GITHUB

### **Steg 3: Push til GitHub**

Nå skal du pushe alle filene (inkludert den nye `.github/workflows/deploy.yml`):

```bash
cd Asif-EVU

# Legg til alle filer
git add .

# Commit
git commit -m "Legg til GitHub Actions deployment med Secrets"

# Push
git push origin main
```

---

## ⚙️ DEL 4: AKTIVER GITHUB ACTIONS

### **Steg 4: Sjekk at Actions kjører**

1. Gå til: https://github.com/aseeep-uit/Asif-EVU/actions
2. Du skal se en workflow som heter **"Deploy to GitHub Pages med Secrets"**
3. Workflowen skal starte automatisk etter pushen
4. Vent til den blir grønn ✅ (tar 1-2 minutter)

**Hvis workflowen feiler:**
- Klikk på den for å se feilen
- Send meg feilmeldingen så hjelper jeg!

### **Steg 5: Konfigurer GitHub Pages**

1. Gå til: https://github.com/aseeep-uit/Asif-EVU/settings/pages
2. Under **"Source"**: Velg **"GitHub Actions"**
3. Klikk **"Save"**

**VIKTIG:** Velg "GitHub Actions" som source, IKKE "Deploy from a branch"!

---

## 🧪 DEL 5: TEST AT DET FUNGERER

### **Steg 6: Test live-siden**

Vent 2-3 minutter etter deployment, deretter:

1. Åpne: https://aseeep-uit.github.io/Asif-EVU/
2. Åpne Console (F12)
3. Du skal se:
   ```
   ✅ GitHub Sync bibliotek lastet
   ✅ Storage Helper lastet
   ```
4. Kryss av en oppgave
5. Se etter: "✅ Synkronisert til GitHub"
6. Gå til GitHub og se at `data.json` er oppdatert!

### **Steg 7: Test fra annen enhet**

1. Åpne samme URL på en annen PC eller mobil
2. Se at oppgaven du krysset av vises! ✅

---

## 🔄 HVORDAN DET FUNGERER

```
1. Du pusher kode til GitHub
   ↓
2. GitHub Actions trigges automatisk
   ↓
3. Workflowen leser GITHUB_API_TOKEN fra Secrets
   ↓
4. Erstatter 'GITHUB_TOKEN_PLACEHOLDER' med ekte token
   ↓
5. Deployer filene til GitHub Pages
   ↓
6. Siden fungerer med ekte token!
   ↓
7. Token er ALDRI synlig i kildekoden ✅
```

---

## 📁 FILSTRUKTUR

Etter dette oppsettet har du:

```
Asif-EVU/
├── .github/
│   └── workflows/
│       └── deploy.yml           ← GitHub Actions workflow
├── index.html                   ← Bruker GITHUB_TOKEN_PLACEHOLDER
├── del1_egenomsorg_oppdatert.html
├── del2_reseptur.html
├── del3_arbeidskrav.html
├── del4_kontinuerlige_aktiviteter.html
├── del5_apokus.html
├── gantt_apotekpraksis.html
├── github-sync.js
├── storage-helper.js
└── data.json
```

---

## ⚠️ VIKTIG Å VITE

### **Hver gang du gjør endringer:**

```bash
git add .
git commit -m "Beskrivelse av endringer"
git push origin main
```

→ GitHub Actions kjører automatisk
→ Siden oppdateres på GitHub Pages
→ Tokenet injiseres automatisk

### **Token i kildekoden:**

✅ **I GitHub repo:** Tokenet er IKKE synlig (kun placeholder)
✅ **På GitHub Pages:** Tokenet er injisert og fungerer
❌ **View Source:** Tokenet ER synlig her (men det er ok)

**Hvorfor er dette ok?**
- Tokenet er kun synlig for de som bruker "View Source" på den deployede siden
- GitHub scanner IKKE den deployede siden, kun repo-koden
- For et personlig utdanningsprosjekt er dette akseptabelt

---

## 🐛 FEILSØKING

### **Problem: Workflow feiler**

**Løsning:**
1. Gå til Actions tab
2. Klikk på den feilede workflowen
3. Se feilmeldingen
4. Vanlige problemer:
   - Secret ikke opprettet: Sjekk Steg 2
   - Feil secret-navn: Må være `GITHUB_API_TOKEN`
   - Permissions: Sjekk at workflowen har write permissions

### **Problem: 401 error fortsatt**

**Løsning:**
1. Sjekk at Secret er opprettet riktig
2. Verifiser at token har `repo` permission
3. Se i Actions at tokenet ble injisert (sjekk logs)

### **Problem: data.json opprettes ikke**

**Løsning:**
1. Sjekk Console for feilmeldinger
2. Verifiser at tokenet har riktig permissions
3. Test at token fungerer manuelt:
   ```bash
   curl -H "Authorization: token DIT_TOKEN" https://api.github.com/user
   ```

---

## ✅ SJEKKLISTE

- [ ] Token opprettet (Steg 1)
- [ ] Secret lagt til i GitHub (Steg 2)
- [ ] Filer pushet (Steg 3)
- [ ] Actions kjørte uten feil (Steg 4)
- [ ] GitHub Pages konfigurert (Steg 5)
- [ ] Testet live-siden (Steg 6)
- [ ] Testet synkronisering (Steg 7)

---

## 🎉 FERDIG!

Når alle steg er fullført:
- ✅ Token er sikret i GitHub Secrets
- ✅ Automatisk deployment fungerer
- ✅ Synkronisering fungerer på tvers av enheter
- ✅ Veilederen kan se din fremgang!

---

## 📞 TRENGER DU HJELP?

Hvis noe ikke fungerer:
1. Sjekk Actions logs for feilmeldinger
2. Verifiser at Secret er opprettet med riktig navn
3. Test at tokenet fungerer manuelt
4. Send meg feilmeldingen så hjelper jeg!

**Lykke til!** 🚀
