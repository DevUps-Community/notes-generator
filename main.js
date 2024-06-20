const fs = require('fs');
const path = require('path');
const marked = require('marked');

const parseMarkdown = (filePath) => {
  const markdownContent = fs.readFileSync(filePath, 'utf-8');
  const lines = markdownContent.split('\n');

  let notes = [];
  let currentNote = null;
  let topicOrder = 1;
  let universalTopic = '';

  lines.forEach(line => {
    if (line.startsWith('# ')) {
      universalTopic = line.slice(2).trim();
    } else if (line.startsWith('## ')) {
      if (currentNote) {
        notes.push(currentNote);
        topicOrder++;
      }
      currentNote = {
        topic: universalTopic,
        tags: [line.slice(3).trim()],
        topic_order: topicOrder,
        content: ''
      };
    } else if (line.startsWith('### ') || line.startsWith('#### ') || line.startsWith('##### ') || line.startsWith('###### ')) {
      if (currentNote) {
        currentNote.tags.push(line.trim());
      }
    } else {
      if (currentNote) {
        currentNote.content += line + '\n';
      }
    }
  });

  if (currentNote) {
    notes.push(currentNote);
  }

  return notes;
};

const writeNotesToFile = (notes, outputPath) => {
  const htmlNotes = notes.map(note => {
    return {
      ...note,
      content: marked.parse(note.content)
    };
  });

  fs.writeFileSync(outputPath, JSON.stringify(htmlNotes, null, 2), 'utf-8');
};

const processMarkdownFiles = (directoryPath) => {
  fs.readdir(directoryPath, (err, files) => {
    if (err) {
      console.error(`Error reading directory: ${err.message}`);
      return;
    }

    files.forEach(file => {
      const filePath = path.join(directoryPath, file);
      if (path.extname(file) === '.md') {
        const notes = parseMarkdown(filePath);
        const outputFilePath = path.join(directoryPath, `${path.basename(file, '.md')}-notes.json`);
        writeNotesToFile(notes, outputFilePath);
        console.log(`Notes have been written to ${outputFilePath}`);
      }
    });
  });
};

const directoryPath = './Notes/';
processMarkdownFiles(directoryPath);