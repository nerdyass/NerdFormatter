const fs = require('fs');
const path = require('path');
const os = require('os');
const readline = require('readline-sync');
const gradient = require('gradient-string');

// Make sure to specify the file path, by default, it saves to the desktop.
const filepath = path.join(os.homedir(), 'Desktop');

const getInput = (prompt) => {
    const input = readline.question(gradient.vice(`> ${prompt}`));
    return input.trim() === '' ? 'INVALID' : input;
};

const importAccount = () => {
    const fileName = getInput('Enter the filename (without extension): ') + '.txt';
    const filePath = path.join(filepath, fileName);

    const username = getInput('Username: ');
    const capes = getInput('Capes: ');
    const email = getInput('Email: ');
    const pass = getInput('Password: ');
    const recoveryCode = getInput('Recovery Code: ');

    const msName = getInput('MS Name: ');
    const msLocation = getInput('MS Region: ');
    const msAddress = getInput('MS Address: ');
    const msDob = getInput('MS DoB: ');

    const ogiName = getInput('OGI Name: ');
    const ogiDob = getInput('OGI DoB: ');
    const ogiPhone = getInput('OGI Phone Number: ');
    const ogiEmail = getInput('OGI Email: ');
    const ogiRegion = getInput('OGI Creation Region: ');
    const ogiAddress = getInput('OGI Address: ');
    const ogiPreviousGT = getInput('OGI Previous GT: ');
    const ogiGender = getInput('OGI Gender: ');
    const ogiXboxGT = getInput('OGI Xbox Gamertag: ');

    const hasMojangOgi = readline.keyInYNStrict(gradient.vice('> Does the account have Mojang OGI?'));

    let mojangData = '\nMojang OGI: INVALID';
    if (hasMojangOgi) {
        const mojangUuid = getInput('UUID: ');
        const mojangOge = getInput('OGE: ');
        const mojangDob = getInput('DoB: ');
        const mojangCreationDate = getInput('Creation Date: ');
        
        mojangData = `\nMojang OGI:\nUUID: ${mojangUuid}\nOGE: ${mojangOge}\nDoB: ${mojangDob}\nCreation Date: ${mojangCreationDate}\n`;
    }

    const currentTime = new Date();

    const fileContent = `///\n-=-=-=-=-=-=-=-=-=-\nPrimary:\n> Username: ${username}\n> Capes: ${capes}\n\n> https://login.live.com/\n> Email: ${email}\n> Pass: ${pass}\n> Recovery Code: ${recoveryCode}\n\nMSA INFO:\n> MS Name: ${msName}\n> MS Region: ${msLocation}\n> MS Address: ${msAddress}\n> MS DoB: ${msDob}\n\nMSA OGI:\n> Name: ${ogiName}\n> DoB: ${ogiDob}\n> Phone Number: ${ogiPhone}\n> Email: ${ogiEmail}\n> Creation Region: ${ogiRegion}\n> Address: ${ogiAddress}\n> Previous GT: ${ogiPreviousGT}\n> Gender: ${ogiGender}\n> Xbox Gamertag: ${ogiXboxGT}\n${mojangData}\n\nAccount via NerdFormatter, Secured @: ${currentTime} >_>\n-=-=-=-=-=-=-=-=-=-\n///`;

    fs.writeFileSync(filePath, fileContent);
    console.log(gradient.vice(`\n> Secured @: ${currentTime}`));
    console.log(gradient.vice(`> Successfully saved to: ${filePath}`));
};

let continueImporting = true;
while (continueImporting) {
    importAccount();
    
    continueImporting = readline.keyInYNStrict(gradient.vice('> Do you want to import another account?'));
}

console.log(gradient.vice('> Exiting...'));
setTimeout(() => {}, 2000);
