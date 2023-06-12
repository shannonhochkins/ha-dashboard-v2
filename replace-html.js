const replace = require('replace-in-file');
const path = require('path');
const paths = [
  path.resolve('./dist/fridge.html'),
  path.resolve('./dist/index.html'),
]
const options = {
  from: /\.js/g,
  to: `.js?version=${Date.now()}`,
};

try {
  paths.forEach(path => {
    const results = replace.sync({
      ...options,
      files: path
    });
    console.log('Replacement results:', results);
  })
} catch (error) {
  console.error('Error occurred:', error);
}