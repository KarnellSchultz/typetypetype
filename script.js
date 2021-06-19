const fs = require("fs");

let content = 'Some content!'


const getWordsArray = (words) => {
  return wordsArray = words.split("\n");
};

fs.readFile("words.txt", "utf8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
data = data.toString()
  console.log(getWordsArray(data));
  content = getWordsArray(data);
  content = JSON.stringify(content)

  fs.writeFile('wordsArray.js', content, err => {
    if (err) {
      console.error(err)
      return
    }
    //file written successfully
  })
  return getWordsArray(data);
});


