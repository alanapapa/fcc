import React, { useState, useEffect } from "react";
import axios from "axios";
import Quote from "./Quote";

function QuoteContainer() {
  const [quotesData, setQuotesData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [currentQuote, setCurrentQuote] = useState("");
  const [currentAuthor, setCurrentAuthor] = useState("");
  const [tweet, setTweet] = useState("");
  const [tumblr, setTumblr] = useState("");

  useEffect(() => {
    axios(
      "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json"
    ).then((res) => {
      setQuotesData(res.data);
      setIsLoading(true);
    });
  }, []);

  const getRandomQuote = () => {
    return quotesData.quotes[
      Math.floor(Math.random() * quotesData.quotes.length)
    ];
  };

  const getQuote = () => {
    const randomQuote = getRandomQuote();

    setCurrentQuote(randomQuote.quote);
    setCurrentAuthor(randomQuote.author);

    setTweet(
      "https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=" +
        encodeURIComponent('"' + randomQuote.quote + '" ' + randomQuote.author)
    );
    setTumblr(
      "https://www.tumblr.com/widgets/share/tool?posttype=quote&tags=quotes,freecodecamp&caption=" +
        fixedEncodeURIComponent(randomQuote.author) +
        "&content=" +
        fixedEncodeURIComponent(randomQuote.quote) +
        "&canonicalUrl=https%3A%2F%2Fwww.tumblr.com%2Fbuttons&shareSource=tumblr_share_button"
    );
  };

  function fixedEncodeURIComponent(str) {
    return encodeURIComponent(str).replace(/[!'()*]/g, function (c) {
      return "%" + c.charCodeAt(0).toString(16);
    });
  }

  const values = {
    currentAuthor,
    currentQuote,
    getQuote,
    isLoading,
    tweet,
    tumblr,
  };
  return (
    <div>
      <Quote values={values} />
    </div>
  );
}

export default QuoteContainer;
