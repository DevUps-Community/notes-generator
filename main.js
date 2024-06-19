const fs = require('fs');
const marked = require('marked');

const readMarkDownFile = (path) => {
  return new Promise((resolve, reject) => {
    fs.readFile(path, 'utf8', (error, result) => {
      if (error) {
        return reject(error);
      }
      resolve(result);
    });
  });
};

const main = async () => {
  let topicOrder = 0;
  const topicRegex = /#\s\w+(\s\w+)*\s/
  const tagsRegex = /#{2}\s\w+(\s\w+)*\s/
  try {
    let tags = []
    let topic = '';
    let red = '';
    let note = {};
    const filePath = 'node.md';
    const result = await readMarkDownFile(filePath);
    Array.from(result).forEach((character) => {
      red += character;
      if (tagsRegex.test(red)) {
        tags.push(red)
        red = '';
      }
    });
    //console.log('markdown contents: \n', result);
    console.log('tags are ', tags);
  } catch (error) {
    console.error('Error reading file', error);
  }
};

main();

// TODO Create js objects based on json file
// TODO /^(#{1,6})\s+(.*)$/gm
// TODO Write new files
// TODO regex ^(?!#{1,6}\s).+$  - For content
/// TODO /^(#{1,6})\s+(.*)$/gm - For Headings