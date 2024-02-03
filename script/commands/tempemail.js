const MailSlurp = require("mailslurp-client").default;

module.exports.config = {
    name: "tempemail",
    version: "1.0.0",
    hasPermission: 0,
    credits: "Your Name",
    description: "Manage disposable emails",
    commandCategory: "Utility",
    usages: "[create/view]",
    cooldowns: 5,
    dependencies: {
        "mailslurp-client": ""
    }
};

module.exports.run = async function({ api, event, args }) {
    const apiKey = 'a8c6989f98254ae41da47c448cbbf3c12d772cdecc2d5689668d00b6c72a4e83'; // replace with your MailSlurp API Key
    const mailslurp = new MailSlurp({ apiKey });

    const action = args[0]; // Expecting 'create' or 'view'
    const emailAddress = args[1]; // Expecting the email address for 'view'

    switch (action) {
        case 'create':
            try {
                // Create an inbox
                const inbox = await mailslurp.createInbox();
                // Send inbox details as a message
                api.sendMessage(`Temporary email created: ${inbox.emailAddress}`, event.threadID, event.messageID);
            } catch (error) {
                console.error("Error creating temporary email:", error);
                api.sendMessage("Failed to create a temporary email. Please try again later.", event.threadID, event.messageID);
            }
            break;

        case 'view':
            if (!emailAddress) {
                return api.sendMessage("Please provide the temporary email to view.", event.threadID, event.messageID);
            }
            try {
                const inbox = await mailslurp.getInbox(emailAddress);
                const emails = await mailslurp.getEmails(inbox.id, { size: 1 }); // Get the latest email
                const message = emails.content ? emails.content : "No messages found.";
                api.sendMessage(`Email: ${inbox.emailAddress}\nMessage: ${message}`, event.threadID, event.messageID);
            } catch (error) {
                console.error("Error viewing emails:", error);
                api.sendMessage("Failed to view emails for the provided temporary email. Please try again later.", event.threadID, event.messageID);
            }
            break;

        default:
            api.sendMessage("Invalid action. Use '?tempemail create' to create a new temporary email or '?tempemail view [email]' to view the inbox.", event.threadID, event.messageID);
            break;
    }
};