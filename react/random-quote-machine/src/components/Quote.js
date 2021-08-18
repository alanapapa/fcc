import React, { useEffect } from "react";

function Quote(props) {
  useEffect(() => {
    if (props.values.currentAuthor === "" && props.values.isLoading) {
      props.values.getQuote();
    }
  });
  return (
    <div>
      <div id="wrapper">
        <div id="quote-box">
          <div className="quote-text">
            <i className="fa fa-quote-left"> </i>
            <span id="text">{props.values.currentQuote}</span>
          </div>
          <div className="quote-author">
            - <span id="author">{props.values.currentAuthor}</span>
          </div>
          <div className="buttons">
            <a
              className="button"
              id="tweet-quote"
              title="Tweet this quote!"
              target="_top"
              href={props.values.tweet}
            >
              <i className="fa fa-twitter"></i>
            </a>
            <a
              className="button"
              id="tumblr-quote"
              title="Post this quote on tumblr!"
              target="_blank"
              rel="noreferrer"
              href={props.values.tumblr}
            >
              <i className="fa fa-tumblr"></i>
            </a>
            <button className="button" id="new-quote" onClick={props.values.getQuote}>
              New quote
            </button>
          </div>
        </div>
        <div className="footer">
          by <a href="https://github.com/alanapapa/">Alanapapa</a>
        </div>
      </div>
    </div>
  );
}

export default Quote;
