const path = require('path');

module.exports = {
  entry: './public/scripts/firebase.js', // Adjust based on your entry file
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'public/dist'),
  },
  // Add other configurations as needed, e.g., plugins or loaders for CSS
};