module.exports.config = {

    name: "search",

    version: "1.0.0",

    hasPermssion: 0,

    credits: "D-Jukie",

    description: "",

    commandCategory: "other",

    usages: "[text]",

    cooldowns: 0

};



module.exports.run = async function({ api, event, args, utils }) {

const axios = require('axios');

const { threadID, messageID } = event;

const body = args.join(' ');

    axios.post('https://qa-honeycomb.giainhanh.io/api/search-text', {

            content: body

        })

        .then(res => {

            var data = [];

            var links = [];

            for(let i of res.data.data) {

                if(i.question.content != null && i.best_answer.content != null) {

                    var qs = i.question.content.replace(/<\/?[^>]+(>|$)/g, "").trimEnd()

                    var an = i.best_answer.content.replace(/<\/?[^>]+(>|$)/g, "").trimEnd()

                    data.push({

                        question: filterHTML(qs),

                        ans: filterHTML(an)

                    })

                }

            }

            for(let i of res.data.data) {

                if(i.question.content == null || i.best_answer.content == null) {

                    //các câu hỏi và trả lời dạng ảnh

                }

            }

            var msg = `n\n`SEARCH RESULTS OF THE QUESTION        

            for(let i =0; i < 3; i++) {

                msg += `🎨 Question: ${data[i].question}\n📈 Answer: ${data[i].ans}\n\n`

            }

            return api.sendMessage(msg.trim(), threadID, messageID);

        })

        .catch(error => {

            console.log(error)

        })

}

function filterHTML(i) {

    var data = i.trim()

            .replace('\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n', '\n')

            .replace('\n\n\n\n\n\n\n\n\n\n\n\n\n\n', '\n')

            .replace('\n\n\n\n\n\n\n\n\n\n\n\n\n', '\n')

            .replace('\n\n\n\n\n\n\n\n\n\n\n\n', '\n')

            .replace('\n\n\n\n\n\n\n\n\n\n\n', '\n')

            .replace('\n\n\n\n\n\n\n\n\n\n', '\n')

            .replace('\n\n\n\n\n\n\n\n\n', '\n')

            .replace('\n\n\n\n\n\n\n\n', '\n')

            .replace('\n\n\n\n\n\n\n', '\n')

            .replace('\n\n\n\n\n\n', '\n')

            .replace('\n\n\n\n\n', '\n')

            .replace('\n\n\n\n', '\n')

            .replace('\n\n\n', '\n')

            .replace('\n\n', '\n')

            .replace('\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r', '\r')

            .replace('\r\r\r\r\r\r\r\r\r\r\r\r\r\r', '\r')

            .replace('\r\r\r\r\r\r\r\r\r\r\r\r\r', '\r')

            .replace('\r\r\r\r\r\r\r\r\r\r\r\r', '\r')

            .replace('\r\r\r\r\r\r\r\r\r\r\r', '\r')

            .replace('\r\r\r\r\r\r\r\r\r\r', '\r')

            .replace('\r\r\r\r\r\r\r\r\r', '\r')

            .replace('\r\r\r\r\r\r\r\r', '\r')

            .replace('\r\r\r\r\r\r\r', '\r')

            .replace('\r\r\r\r\r\r', '\r')

            .replace('\r\r\r\r\r', '\r')

            .replace('\r\r\r\r', '\r')

            .replace('\r\r\r', '\r')

            .replace('\r\r', '\r')

    return data

}

