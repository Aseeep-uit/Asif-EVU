// config.js - HEMMELIG FIL - IKKE PUSH TIL GITHUB!
// Denne filen inneholder dine GitHub API credentials

const GITHUB_CONFIG = {
  username: 'aseeep-uit',
  repo: 'Asif-EVU',
  token: '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',
  branch: 'main',
  dataFile: 'data.json'
};

// API endpoints
const GITHUB_API = {
  getFile: `https://api.github.com/repos/${GITHUB_CONFIG.username}/${GITHUB_CONFIG.repo}/contents/${GITHUB_CONFIG.dataFile}`,
  updateFile: `https://api.github.com/repos/${GITHUB_CONFIG.username}/${GITHUB_CONFIG.repo}/contents/${GITHUB_CONFIG.dataFile}`
};
