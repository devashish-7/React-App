import React, { useState, useEffect } from "react";

const App = () => {
  // input number state
  const [inputNumber, setInputNumber] = useState("");
  // mostRepeatedWordState
  const [mostRepeatedWordState, setMostRepeatedWord] = useState([]);
  // fetched data stored in this state
  const [str, setStr] = useState("");
  const [loading, setLoading] = useState(false);
// component did mount
  useEffect(() => {
    setLoading(true);
    fetch("http://raw.githubusercontent.com/invictustech/test/main/README.md")
      .then((res) => res.text())
      .then((result) => {
        setLoading(false);
        // console.log("result from github:", result);
        setStr(result);
      })
      .catch((err) => {
        setLoading(false);
        alert("failed to fetch data");
      });
  }, []);

  let mostRepeatedWord = [];
  const findMostRepeatedWord = () => {
    let words = str.split(" ");
    let occurances = {};
    // console.log("input word", words);

    for (let word of words) {
      if (occurances[word]) {
        occurances[word]++;
      } else {
        occurances[word] = 1;
      }
    }

    for (let word of Object.keys(occurances)) {
      if (occurances[word] >= inputNumber) {
        // max = occurances[word];
        mostRepeatedWord.push({ word, occurence: occurances[word] });
      }
    }

    setMostRepeatedWord(mostRepeatedWord);
  };
  // console.log("mostRepeatedWordState", mostRepeatedWordState);

  return (
    <>
      <div>
        <h1>Hello Invictus</h1>
        {loading && <p>Loading data</p>}
        <input
          type="text"
          placeholder="Enter Your Number"
          onChange={(event) => setInputNumber(event.target.value)}
        />
        <button onClick={findMostRepeatedWord}>Click Me</button>
      </div>
      <div>
        <table>
          <thead>
            <tr>
              <th>SR</th>
              <th>Word</th>
              <th>Occurences</th>
            </tr>
          </thead>
          <tbody>
            {mostRepeatedWordState.map((mostRepeatedWord, index) => (
              <tr key={index}>
                <td> {index + 1}</td>
                <td> {mostRepeatedWord.word}</td>
                <td> {mostRepeatedWord.occurence}</td>
              </tr>
            ))}
            {mostRepeatedWordState.length == 0 && <p>No words </p>}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default App;