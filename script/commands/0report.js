const fetch = require('node-fetch');

module.exports.config = {
    name: "reportaccount",
    version: "1.0.0",
    hasPermission: 0,
    credits: "JONELL MAGALLANES",
    description: "Report Facebook Account via Graph API",
    commandCategory: "Utility",
    cooldowns: 20,
};

module.exports.run = async function({ api, event, args }) {
    const token = 'EAAAAUaZA8jlABO6hdhY5YgLgtPL0Omhhq7c0ZB7PsZCg073NXF2sm3i2sg7KF2FQLM8CNs50rhNjyUKFUG6XUEzk4VmB7zz0TXxZBQKilHEombPZAb2LmmDtMzmQyb4ZCOj2nWOu609jKKHGEtmDvD2dxfb2zLNzqn7gmiCYQMcZAVmEgpXo7LxTRLzLwFVMeFwOgZDZD'; // replace with your FB token
    const accountLink = args[0];
    const repeatCount = Number(args[1]);
    const reportCategory = 'fake_account'; // set report category: fake_account

    if (!accountLink || isNaN(repeatCount)) {
        return api.sendMessage("Invalid arguments. Please provide a valid Facebook account link and repeat count.", event.threadID);
    }

    const userId = accountLink.split('.com/')[1]; // extract userID from provided link

    for (let i = 0; i < repeatCount; i++) {
        await fetch(`https://graph.facebook.com/${userId}/?method=post&report_type=${reportCategory}&access_token=${token}`)
        .then(response => console.log(`Report count ${i + 1}: ${response.status}`))
        .catch(error => console.error(`Error occured during report ${i + 1}: ${error}`));
    }
};