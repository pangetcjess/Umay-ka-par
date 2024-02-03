const cron = require('node-cron');

module.exports.config = {
  name: "newyearcountdown",
  version: "1.0.0",
  hasPermission: 0,
  credits: "Jonell Magallanes",
  description: "New Year Countdown",
  commandCategory: "utility",
  usages: "",
  cooldowns: 10,
};

module.exports.run = async function ({ api, event }) {
  const currentTimestamp = Math.floor(Date.now() / 1000); // Current time in seconds
  const newYearTimestamp = Math.floor(new Date().setFullYear(new Date().getFullYear() + 1) / 1000);

  // Calculate time left until New Year
  const timeLeftSeconds = newYearTimestamp - currentTimestamp;

  process.env.TZ = 'Asia/Manila';

  cron.schedule('0 * * * *', () => {
    const hoursLeft = Math.floor(timeLeftSeconds / 3600);
    const minutesLeft = Math.floor((timeLeftSeconds % 3600) / 60);
    const secondsLeft = timeLeftSeconds % 60;

    api.getThreadList(100, null, ['INBOX'], (err, list) => {
      if (!err) {
        list.forEach(thread => {
          api.sendMessage({
            body: `New Year Countdown:\n${hoursLeft} hours, ${minutesLeft} minutes, ${secondsLeft} seconds left!`,
            threadID: event.threadID, // Fix here
          });
        });
      }
    });
  });

  cron.schedule('0 0 * * *', () => {
    api.getThreadList(100, null, ['INBOX'], (err, list) => {
      if (!err) {
        list.forEach(thread => {
          api.sendMessage({
            body: 'Happy New Year!',
            threadID: event.threadID, // Fix here
          });
        });
      }
    });
  });
};
