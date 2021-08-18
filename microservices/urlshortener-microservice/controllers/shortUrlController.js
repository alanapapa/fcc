const dns = require("dns");
const URL = require("url").URL;
const ShortURL = require("../model/ShortURL");

exports.postURL = (req, res) => {
  const errRes = { error: "invalid url" };
  try {
    const urlObj = new URL(req.body.url);
    const httpRegex = /^(http|https)(:\/\/)/;
    if (!httpRegex.test(req.body.url)) {
      return res.json(errRes);
    }
    dns.lookup(urlObj.hostname, (err) => {
      if (err) return res.json(errRes);
      const data = new ShortURL({
        original_url: req.body.url,
        short_url: Math.floor(Math.random() * 100000).toString(),
      });

      data.save((err, uData) => {
        if (err) return console.log(err);
        res.json({
          original_url: uData.original_url,
          short_url: uData.short_url,
        });
      });
    });
  } catch (err) {
    if (err) return res.json(errRes);
  }
};

exports.redirectOrigin = (req, res) => {
  ShortURL.findOne({ short_url: req.params.id }, (err, data) => {
    if (err) {
      res.send("Error reading database.");
    }
    res.redirect(301, data.original_url);
  });
};
