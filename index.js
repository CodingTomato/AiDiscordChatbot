import { brain } from 'brain.js';
import { readFile } from 'fs';

const net = new brain.recurrent.LSTM();
// net.fromJSON();

const readNetFromJSON = () => {
  readFile('./trainModel/net.json', 'utf-8', (err, data) => {
    if(err) throw err;

    return JSON.parse(data);
  });
};

const data = await readNetFromJSON();
console.log(data);