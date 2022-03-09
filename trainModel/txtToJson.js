import { readFile } from 'fs';

readFile('./rawChat.txt', 'utf8' , (err, data) => {
  if (err) {
    console.error(err)
    return
  }
  console.log(data.split('\n'));

  let json = (data.split('\n')).map((line) => {
    const arr = line.split('\t');
    const question = arr[0].trim();
    const ans = arr[1].trim();

    return {
      question,
      answer: ans.slice(0, ans.length - 1),
    }
  });

  console.log(json);
});