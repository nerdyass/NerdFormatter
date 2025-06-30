const fs = require('fs');
const path = require('path');
const os = require('os');
const readline = require('readline-sync');
const gradient = require('gradient-string');

// Save files to Desktop by default
const filepath = path.join(os.homedir(), 'Desktop');

// Gradient for the logo title (soft pink to purple)
const titleGradient = gradient(['#ff9de2', '#9d91ff']);
// Solid soft pink ANSI for prompts
const promptColor = (text) => `\x1b[38;2;255;157;226m${text}\x1b[0m`;

// Centered and underlined "Nerd Formatter" logo
const printTitle = () => {
  const title = 'Nerd Formatter';
  const cols = process.stdout.columns || 80;
  const padding = Math.max(0, Math.floor((cols - title.length) / 2));
  const spacePad = ' '.repeat(padding);
  console.log(titleGradient(`\n${spacePad}${title}`));
  console.log(titleGradient(`${spacePad}${'-'.repeat(title.length)}`));
};

printTitle();

const getInput = (prompt) => {
  const input = readline.question(promptColor(` > ${prompt}`));
  return input.trim() === '' ? 'N/A' : input;
};

const getMultiInput = (title, startAt = 1, prefill = null) => {
  const inputs = [];
  let index = startAt;

  if (prefill !== null) {
    inputs.push(`${index++}. ${prefill}`);
  }

  while (readline.keyInYNStrict(promptColor(` > Add another ${title}?`))) {
    const value = getInput(`${title}:`);
    inputs.push(`${index++}. ${value}`);
  }

  return inputs.join('\n');
};

const importAccount = () => {
  const fileName = getInput('Enter the filename (without extension): ') + '.txt';
  const filePath = path.join(filepath, fileName);

  // Primary account details
  const username = getInput('Username: ');
  const capes = getInput('Capes: ');

  // Email history for primary
  const email = getInput('Current Email: ');
  const ogeEmail = getInput('OGE Email for primary (leave blank if none): ');
  const emailHistory = getMultiInput('Primary Email History', 1, ogeEmail === 'N/A' ? null : ogeEmail);

  // Password history
  const pass = getInput('Current Password: ');
  const passwordHistory = getMultiInput('Password History', 1, pass === 'N/A' ? null : pass);

  // Recovery code and 2FA
  const recoveryCode = getInput('Recovery Code: ');
  const twoFA = getInput('2FA Secret (leave blank if none): ');
  let twoFAWebsite = 'N/A';
  if (twoFA !== 'N/A') {
    twoFAWebsite = getInput('2FA Secret Site: ');
  }

  // Recovery email history
  const recoveryOgeEmail = getInput('OGE Recovery Email (leave blank if none): ');
  const recoveryEmailHistory = getMultiInput('Recovery Email History', 1, recoveryOgeEmail === 'N/A' ? null : recoveryOgeEmail);

  // Microsoft account info
  const msName = getInput('MS Name: ');
  const msRegion = getInput('MS Region: ');
  const msAddress = getInput('MS Address: ');
  const msDob = getInput('MS DoB: ');
  const ogiXboxGT = getInput('Xbox Gamertag (GT): ');

  // OGI info
  const ogiName = getInput('OGI Name: ');
  const ogiDob = getInput('OGI DoB: ');
  const ogiPhone = getInput('OGI Phone Number: ');
  const ogiRegion = getInput('OGI Creation Region: ');
  const ogiAddress = getInput('OGI Address: ');
  const ogiPreviousGT = getInput('OGI Xbox Gamertag (GT): ');
  const ogiGender = getInput('OGI Gender: ');

  // Mojang OGI
  const hasMojangOgi = readline.keyInYNStrict(promptColor(' > Does the account have Mojang OGI?'));
  let mojangData = 'Mojang OGI: N/A';
  if (hasMojangOgi) {
    const mojangUuid = getInput('UUID: ');
    const mojangOge = getInput('OGE: ');
    const mojangDob = getInput('DoB: ');
    const mojangCreationDate = getInput('Creation Date: ');
    mojangData = `Mojang OGI:\nUUID: ${mojangUuid}\nOGE: ${mojangOge}\nDoB: ${mojangDob}\nCreation Date: ${mojangCreationDate}`;
  }

  const currentTime = new Date();

  // Assemble file content
  const fileContent = `\n-=-=-=-=-=-=-=-=-=-
Primary:
> Username: ${username}
> Capes: ${capes}

> https://login.live.com/
> Primary Email: ${email}
> OGE Email: ${ogeEmail}
> Primary Password: ${pass}
> Recovery Code: ${recoveryCode}
> 2FA Secret: ${twoFA}
> 2FA Website: ${twoFAWebsite}

Primary Email History:
${emailHistory}

Password History:
${passwordHistory}

Recovery Email History:
${recoveryEmailHistory}

MSA INFO:
> MS Name: ${msName}
> MS Region: ${msRegion}
> MS Address: ${msAddress}
> MS DoB: ${msDob}
> Xbox Gamertag: ${ogiXboxGT}

MSA OGI:
> Name: ${ogiName}
> DoB: ${ogiDob}
> Phone Number: ${ogiPhone}
> Creation Region: ${ogiRegion}
> Address: ${ogiAddress}
> OG Xbox Gamertag: ${ogiPreviousGT}
> Gender: ${ogiGender}
${mojangData}

Account via NerdFormatter, Secured @: ${currentTime} >_>
-=-=-=-=-=-=-=-=-=-\n`;

  // Write to file and confirm
  fs.writeFileSync(filePath, fileContent);
  console.log(promptColor(`\n > Secured @: ${currentTime}`));
  console.log(promptColor(` > Successfully saved to: ${filePath}`));
};

// Main loop
let continueImporting = true;
while (continueImporting) {
  importAccount();
  continueImporting = readline.keyInYNStrict(promptColor(' > Import another account?'));
}
console.log(promptColor(' > Exiting...'));
setTimeout(() => {}, 3000);
