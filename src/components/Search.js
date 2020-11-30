import React, { useState, useEffect } from "react";
import axios from "axios";

const Search = () => {
  //initialize piece of state
  const [term, setTerm] = useState("");
  const [results, setResults] = useState([]);

  useEffect(() => {
    // temporary helper function
    const search = async () => {
      const { data } = await axios.get("https://en.wikipedia.org/w/api.php?", {
        params: {
          action: "query",
          list: "search",
          origin: "*",
          format: "json",
          srsearch: term,
        },
      });

      setResults(data.query.search);
    };
    // if there is a term, and it's the first term, then search
    if (term && !results.length) {
      search();
    } else {
      // only search if there is a term, wait until 500ms after last change to search
      const timeoutID = setTimeout(() => {
        if (term) {
          search();
        }
      }, 500);
      // clears setTimeout everytime someone makes a change so that the 500ms delay is only at the end
      return () => clearTimeout(timeoutID);
    };
  }, [term]);

  // map out results of rendered results, assigning a key based on page id and displaying title, snippet, and read more button linked to page
  // using dangeoruslySetInnerHTML to convert html from wiki API, for simplicity - aware of security concerns
  const renderedResults = results.map((result) => {
    return (
      <div key={result.pageid} className="item">
        <div className="right floated content">
          <a
            href={`https://en.wikipedia.org?curid=${result.pageid}`}
            className="ui button"
          >
            Read More
          </a>
        </div>
        <div className="content">
          <div className="header">{result.title}</div>
          <span dangerouslySetInnerHTML={{ __html: result.snippet }}></span>
        </div>
      </div>
    );
  });

  return (
    // return searchbar and displayed results on page
    <div>
      <div className="ui form">
        <div className="field">
          <label>Enter Search Term</label>
          <input
            value={term}
            onChange={(e) => setTerm(e.target.value)}
            className="input"
          />
        </div>
      </div>
      <div className="ui celled list">{renderedResults}</div>
    </div>
  );
};

export default Search;
