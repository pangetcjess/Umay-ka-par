const fs = require('fs');
const cron = require('node-cron');

module.exports.config = {
  name: 'autoclearcache',
  version: '1.0.0',
  hasPermission: 2,
  credits: 'Jonell Magallanes',
  description: 'Automatically clear cache every 1 hour',
  commandCategory: 'system',
  cooldowns: 3
};

module.exports.run = async ({ api }) => {
  const cacheFolder = './cache';

  cron.schedule('0 */1 * * *', () => {
    fs.readdir(cacheFolder, (err, files) => {
      if (err) throw err;

      files.forEach(file => {
        fs.unlink(`${cacheFolder}/${file}`, err => {
          if (err) throw err;
          console.log(`Deleted file: ${file}`);
        });
      });

      api.sendMessage('Cache has been cleaned.', '100036956043695');
    });
  });
};