import { brain } from 'brain.js';
// import { questions } from './QA.js';
import { readFile, writeFile } from 'fs';

readFile('./rawChat.txt', 'utf8' , async (err, data) => {
  if (err) {
    console.error(err)
    return
  }

  let tmp = [];

  let json = await (data.split('\n')).map((line) => {
    const arr = line.split('\t');
    const question = arr[0].trim();
    const ans = arr[1].trim();

    return {
      question,
      answer: ans.slice(0, ans.length - 1),
    }
  });

  for (let index in json) {
    if (json.hasOwnProperty(index)) {
      tmp.push({input: json[index].question, output: json[index].answer});
    }
  }

  // Setting up the net
  const net = new brain.recurrent.LSTM();
  // Training the net
  net.train(tmp, {
    log: details => console.log(details),
    errorThresh: 0.011
  });
  
  const jsonNet = net.toJSON();

  writeFile('net.json', jsonNet, (err) => {
    if (err) {
        throw err;
    }
    console.log("JSON data is saved.");
  });

  // Output
  const output = net.run("How are you?");
  console.log(output);
});