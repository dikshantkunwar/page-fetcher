const request = require('request');
const fs = require('fs');

const fetchURL = process.argv[2];
const fileLoc = process.argv[3];
let locExist = fs.existsSync(fileLoc);

if (fetchURL.trim() === '' || fileLoc.trim() === '') {
  console.log('The url or file location argument is empty!');
  return;
}

if (locExist === false) {
  console.log(`File path ${fileLoc} is invalid`);
  return;
}

request(fetchURL, (err, res, body) => {
  if (!err) {
    callbackfn(body);
  } else {
    console.log(`Request error : ${err}`);
  }
});

const callbackfn = (data) => {
  if (data !== undefined) {
    fs.writeFile(fileLoc, data, err => {
      if (err) {
        console.log(err);
        return;
      }
      console.log(`Downloaded and saved ${fs.statSync(fileLoc).size} bytes to ${fileLoc}`);
    });
  }
};

