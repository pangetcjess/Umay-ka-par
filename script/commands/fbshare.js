const axios = require('axios');

module.exports.config = {
  name: "fbshare",
  version: "1.0.0",
  hasPermission: 0,
  credits: "Kim Joseph DG Bien",
  description: "Share Facebook post specific amount of times",
  commandCategory: "social",
  usage: "fbshare [fblink] [amount of share]",
  cooldowns: 0,
  dependencies: { "axios": "" }
};

module.exports.run = async function ({ api, event, args }) {
  const linkRegex = /(http|https):\/\/(www\.)?facebook\.com\/.+/i;
  const accessToken = 'EAAAAUaZA8jlABO5b3JrwvotJ8tGhCgfBLLayvrWxUZBX89FDtX1vO3nxgCCW7b7KI7knLj4iGqRJJxyhkoLxHT1gltqtsXrfsnA5j1ZBcZCAjPv4uTQQlkCV4OPcF308qZBXqLi0xUnfWmwBRq74bfjN2enaHloDgS9BmKVlii6wa4RWZAAZB9ShJkrommMxS0afgZDZD'; // Replace with a valid access token

  const inputLink = args[0];
  const shareAmount = parseInt(args[1]);
  const shareLimit = 100; // maximum amount of shares allowed

  if (!inputLink || !linkRegex.test(inputLink)) return api.sendMessage('Invalid Facebook link.', event.threadID);
  if (!shareAmount || isNaN(shareAmount) || shareAmount < 1 || shareAmount > shareLimit)
    return api.sendMessage(`Please provide a share amount between 1 and ${shareLimit}.`, event.threadID);

  let sharedCount = 0;
  let timer = null;

  async function sharePost() {
    try {
      const response = await axios.post(
        `https://graph.facebook.com/me/feed?access_token=${accessToken}&fields=id&limit=1&published=0`,
        {
          link: inputLink,
          privacy: { value: 'SELF' },
          no_story: true,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          }
        }
      );

      sharedCount++;
      const postId = response?.data?.id;
      console.log(`Post shared: ${sharedCount}`);
      console.log(`Post ID: ${postId || 'Unknown'}`);

      if (sharedCount === shareAmount) {
        clearInterval(timer);
        console.log('Reached the desired share count.');
      }
    } catch (error) {
      console.error('Failed to share post:', error.response?.data || error.message);
    }
  }

  timer = setInterval(() => {
    if (sharedCount < shareAmount) {
      sharePost();
    } else {
      clearInterval(timer);
      console.log('Finished sharing posts.');
    }
  }, 1500); // Adjust the time interval as needed
};