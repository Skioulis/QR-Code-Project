/* 
1. Use the inquirer npm package to get user input.
2. Use the qr-image npm package to turn the user entered URL into a QR code image.
3. Create a txt file to save the user input using the native fs node module.
*/
import qr from "qr-image";

const textFile = "qr-code.txt";
const qrCode = "qr-code.svg";

import { writeFile, createWriteStream } from 'node:fs';
// import {createWriteStream} from 'node:fs';
import inquirer from 'inquirer';

const questions = [
    {
        type: 'input',
        name: 'url',
        message: 'Enter a URL to turn into a QR code:',
    }
]

inquirer.prompt([
  questions[0]
])
    .then((answers) => {
      console.log(answers.url);

      writeToFile(textFile,answers.url);

      generateQRCode(answers.url);



    })
    .catch((error) => {
      if (error.isTtyError) {
        // Prompt couldn't be rendered in the current environment
      } else {
        // Something else went wrong
      }
    });

function writeToFile(fileName, data) {
    writeFile(fileName, data, (err) => {
        if (err) throw err;
        console.log("The file has been saved!");
    });
}

function generateQRCode(url) {
    import('qr-image').then((qr) => {
        var qr_svg = qr.image(url, { type: 'svg' });
        qr_svg.pipe(createWriteStream(qrCode));
        qr.imageSync(url, { type: 'svg' });
    });


    console.log("QR code generated!");
}