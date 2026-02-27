# ⚡ RASK INTEGRASJON - GitHub Sync

## 🎯 MÅL

Legge til GitHub synkronisering i alle 7 HTML-filer ved å copy-paste 3 script-tags.

**Tid:** 5-10 minutter totalt

---

## 📋 STEG-FOR-STEG

### **For hver av de 7 filene:**

1. index.html
2. del1_egenomsorg_oppdatert.html
3. del2_reseptur.html
4. del3_arbeidskrav.html
5. del4_kontinuerlige_aktiviteter.html
6. del5_apokus.html
7. gantt_apotekpraksis.html

**Gjør følgende:**

---

## 📝 COPY-PASTE INSTRUKSJONER

### **A) Åpne filen i en teksteditor**

Bruk: VS Code, Notepad++, eller hvilken som helst teksteditor

### **B) Finn `</head>` taggen**

Søk etter `</head>` i filen (vanligvis rundt linje 400-500)

### **C) RETT FØR `</head>`, lim inn dette:**

```html
  <!-- GitHub Sync -->
  <script>
    const GITHUB_CONFIG = {
      username: 'aseeep-uit',
      repo: 'Asif-EVU',
      token: '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',
      branch: 'main',
      dataFile: 'data.json'
    };
    const GITHUB_API = {
      getFile: `https://api.github.com/repos/${GITHUB_CONFIG.username}/${GITHUB_CONFIG.repo}/contents/${GITHUB_CONFIG.dataFile}`,
      updateFile: `https://api.github.com/repos/${GITHUB_CONFIG.username}/${GITHUB_CONFIG.repo}/contents/${GITHUB_CONFIG.dataFile}`
    };
  </script>
  <script src="github-sync.js"></script>
  <script src="storage-helper.js"></script>
</head>
```

**VIKTIG:** Sørg for at `</head>` kommer ETTER de 3 script-tagsene!

---

## ✅ EKSEMPEL

**FØR:**
```html
  <link href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;600;700;800&display=swap" rel="stylesheet">
  <style>
    * {
      margin: 0;
      ...
    }
  </style>
</head>
<body>
```

**ETTER:**
```html
  <link href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;600;700;800&display=swap" rel="stylesheet">
  <style>
    * {
      margin: 0;
      ...
    }
  </style>
  
  <!-- GitHub Sync -->
  <script>
    const GITHUB_CONFIG = {
      username: 'aseeep-uit',
      repo: 'Asif-EVU',
      token: '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',
      branch: 'main',
      dataFile: 'data.json'
    };
    const GITHUB_API = {
      getFile: `https://api.github.com/repos/${GITHUB_CONFIG.username}/${GITHUB_CONFIG.repo}/contents/${GITHUB_CONFIG.dataFile}`,
      updateFile: `https://api.github.com/repos/${GITHUB_CONFIG.username}/${GITHUB_CONFIG.repo}/contents/${GITHUB_CONFIG.dataFile}`
    };
  </script>
  <script src="github-sync.js"></script>
  <script src="storage-helper.js"></script>
</head>
<body>
```

---

## 🧪 TEST ETTER HVER FIL

1. Lagre filen
2. Åpne den i nettleseren
3. Åpne Console (F12)
4. Se etter:
   ```
   ✅ GitHub Sync bibliotek lastet
   ✅ Storage Helper lastet
   ```

---

## 🎯 SJEKKLISTE

Kryss av når ferdig:

- [ ] index.html
- [ ] del1_egenomsorg_oppdatert.html
- [ ] del2_reseptur.html
- [ ] del3_arbeidskrav.html
- [ ] del4_kontinuerlige_aktiviteter.html
- [ ] del5_apokus.html
- [ ] gantt_apotekpraksis.html

---

## 🚀 ETTER DU ER FERDIG

1. Test én fil grundig:
   - Åpne f.eks. del1_egenomsorg_oppdatert.html
   - Kryss av en oppgave
   - Se etter melding: "✅ Synkronisert til GitHub"
   - Gå til GitHub og se at data.json er oppdatert!

2. Push til GitHub:
   ```bash
   git add .
   git commit -m "Legg til GitHub synkronisering"
   git push origin main
   ```

3. Test live:
   - Åpne: https://aseeep-uit.github.io/Asif-EVU/
   - Kryss av noe
   - Se at det synkroniseres!

---

## ⚠️ VIKTIG SIKKERHET

**Token er nå inline i filene!**

Dette betyr at tokens er synlig for alle som ser kildekoden.

**Vurder å:**
1. Bruke en token med begrenset tilgang (kun dette repoet)
2. Sette expiration på token (90 dager)
3. Regenerere token regelmessig

**Alternativt** kan du bruke GitHub Actions + Secrets for mer sikkerhet, men det krever mer oppsett.

---

## ❓ SPØRSMÅL?

**Q: Hvorfor inline i stedet for config.js?**  
A: GitHub Pages kan ikke laste config.js siden den ikke er pushet (beskyttet av .gitignore). Inline config gjør at det fungerer direkte.

**Q: Er dette sikkert?**  
A: For et personlig prosjekt som dette: Ja. For produksjon med sensitive data: Nei. Men for en praksisplan er det helt greit.

**Q: Kan jeg bruke config.js i stedet?**  
A: Ja, men da må du pushe config.js til GitHub (ikke anbefalt) ELLER sette opp en build-prosess.

---

**Alt klart!** 🎉

Når du har gjort dette for alle 7 filene, vil GitHub synkronisering fungere automatisk!
