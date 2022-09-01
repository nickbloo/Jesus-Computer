import './App.css'
import Verse from "./components/Verse.jsx";
import { useState, useEffect } from 'react';
import axios from 'axios';
import { api_key } from '../config.js';

const VERSES = [
  `JER.29.11`,
  `PSA.23`,
  `1COR.4.4-8`,
  `PHP.4.13`,
  `JHN.3.16`,
  `ROM.8.28`,
  `ISA.41.10`,
  `PSA.46.1`,
  `GAL.5.22-23`,
  `HEB.11.1`,
  `2TI.1.7`,
  `1COR.10.13`,
  `PRO.22.6`,
  `ISA.40.31`,
  `JOS.1.9`,
  `HEB.12.2`,
  `MAT.11.28`,
  `ROM.10.9-10`,
  `PHP.2.3-4`,
  `MAT.5.43-44`,
];
//yarn add axios

const config = {
  headers: {
    "api-key": api_key
  }
}

export default function App() {
  const [verse, setVerse] = useState("other verse");
  const [verseId, setVerseId] = useState("1CO.1.1");
  //Get a database of bible verses

function randomChapter (x, y) {
  return math.Random()
}

  useEffect(() => {
    console.log("Stream Bladee");
    // getNewVerse();
  }, []);

  function getNewVerse () {
    console.log("Get a new verse");
    axios.get(`https://api.scripture.api.bible/v1/bibles/de4e12af7f28f599-01/verses/${verseId}?content-type=text&include-notes=false&include-titles=false&include-chapter-numbers=false&include-verse-numbers=false&include-verse-spans=false&use-org-id=false`, config)
      .then((res) => {
        console.log(res.data.data);
        const newVerse = res.data.data.content;
        setVerse(newVerse);
      })
      .catch((err) => {
        //better error catching
        console.error(err);
      });
  }

  return (
    <div className="App">
      <Verse verse={verse} />
      <div>
        <button onClick={getNewVerse}>Get a new verse</button>
      </div>
    </div>
  )
}