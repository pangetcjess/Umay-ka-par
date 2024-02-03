const axios = require("axios");
const fs = require("fs-extra");
const request = require("request");
const cheerio = require("cheerio");
const stringSimilarity = require("string-similarity");
const moment = require("moment-timezone");

module.exports.config = {
   name: "ddos",
   version: "1.0.0",
   hasPermission: 0,
   credits: "D-Jukie",
   description: "DDoS một website",
   commandCategory: "ddos",
   cooldowns: 5,
};

module.exports.run = async ({ api, event, args }) => {
   const { threadID, messageID } = event;
   if (args.length == 0) return api.sendMessage("Bạn chưa nhập địa chỉ website!", threadID, messageID);
   const website = args.join(" ");
   const url = `https://${website}`;
   try {
      const response = await axios.get(url);
      const $ = cheerio.load(response.data);
      const title = $("title").text();
      const links = $("a");
      const images = $("img");
      const scripts = $("script");
      const stylesheets = $("link[rel='stylesheet']");
      const forms = $("form");
      const inputs = $("input");
      const textareas = $("textarea");
      const buttons = $("button");
      const selects = $("select");
      const options = $("option");
      const iframes = $("iframe");
      const embeds = $("embed");
      const objects = $("object");
      const applets = $("applet");
      const videos = $("video");
      const audios = $("audio");
      const canvases = $("canvas");
      const svgs = $("svg");
      const maths = $("math");
      const codes = $("code");
      const pres = $("pre");
      const tables = $("table");
      const trs = $("tr");
      const tds = $("td");
      const ths = $("th");
      const uls = $("ul");
      const ols = $("ol");
      const lis = $("li");
      const ps = $("p");
      const divs = $("div");
      const spans = $("span");
      const h1s = $("h1");
      const h2s = $("h2");
      const h3s = $("h3");
      const h4s = $("h4");
      const h5s = $("h5");
      const h6s = $("h6");
      const strongs = $("strong");
      const ems = $("em");
      const superscripts = $("sup");
      const subscripts = $("sub");
      const del = $("del");
      const ins = $("ins");
      const cites = $("cite");
      const q = $("q");
      const blocks = $("blockquote");
      const figures = $("figure");
      const captions = $("figcaption");
      const footers = $("footer");
      const headers = $("header");
      const navs = $("nav");
      const asides = $("aside");
      const articles = $("article");
      const sections = $("section");
      const details = $("details");
      const summaries = $("summary");
      const dialogs = $("dialog");
      const menus = $("menu");
      const lists = $("datalist");
      const keys = $("keygen");
      const outputs = $("output");
      const progresses = $("progress");
      const meters = $("meter");
      const timeouts = $("time");
      const dates = $("date");
      const numbers = $("number");
      const ranges = $("range");
      const colors = $("color");
      const files = $("file");
      const hidden = $("hidden");
      const resets = $("reset");
      const submits = $("submit");
      const imagesizes = $("image");
      const audiosources = $("audio");
      const videosources = $("video");
      const tracks = $("track");
      const cues = $("cue");
      const figcaptions = $("figcaption"); // Changed variable name
      const colgroups = $("colgroup");
      const col = $("col");
      const theads = $("thead");
      const tbodies = $("tbody");
      const tfoots = $("tfoot");
      const rows = $("row");
      const cells = $("cell");
      const headers = $("header"); // Changed variable name
      // ... continue with the rest of your code
   } catch (error) {
      console.error(error);
      api.sendMessage('Đã xảy ra lỗi khi thực hiện DDoS!', threadID, messageID);
   }
};
