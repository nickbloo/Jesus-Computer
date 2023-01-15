import { useState, useEffect } from "react";
import axios from "axios";
import { api_key } from "../../config.js";
import { books, chapters } from "../bibleData.js";
import { getCookie, setCookie } from "../cookieHelpers.js";
import { prayerData, deedData } from "../bibleData.js";

const config = {
  headers: {
    "api-key": api_key,
  },
};

function randomNum(max, min = 1) {
  return Math.floor(Math.random() * max + min);
}

export default function useDaily() {
  const [verse, setVerse] = useState("");
  const [verseRef, setVerseRef] = useState("");
  const [prayer, setPrayer] = useState("");
  const [deed, setDeed] = useState("");
  const [verseId, setVerseId] = useState(null);

  function getVerseList() {
    const num = randomNum(books.length, 0);
    const book = books[num];
    const chapter = randomNum(chapters[num]);
    axios
      .get(
        `https://api.scripture.api.bible/v1/bibles/de4e12af7f28f599-01/chapters/${book}.${chapter}/verses`,
        config
      )
      .then((res) => {
        const verses = res.data.data;
        const verseNum = randomNum(verses.length);
        setVerseId(verses[verseNum].id);
      })
      .catch((err) => {
        //TODO: better error catching
        console.error(err);
        // setTimeout(getVerseList, 10000);
      });
  }

  function getVerse() {
    axios
      .get(
        `https://api.scripture.api.bible/v1/bibles/de4e12af7f28f599-01/verses/${verseId}?content-type=text&include-notes=false&include-titles=false&include-chapter-numbers=false&include-verse-numbers=false&include-verse-spans=false&use-org-id=false`,
        config
      )
      .then((res) => {
        const verse = res.data.data.content;
        const reference = res.data.data.reference;
        setCookie("verse", verse);
        setCookie("verseref", verseRef);
        setVerse(verse);
        setVerseRef(reference);
      })
      .catch((err) => console.error(err));
  }

  function getPrayersAndDeeds() {
    let randomPrayerNum = randomNum(prayerData.length, 0);
    let randomDeedNum = randomNum(deedData.length, 0);
    let newPrayer = prayerData[randomPrayerNum];
    let newDeed = deedData[randomDeedNum];
    setCookie("prayer", newPrayer);
    setCookie("deed", newDeed);
    setPrayer(newPrayer);
    setDeed(newDeed);
  }

  useEffect(() => {
    const lastDate = getCookie("date");
    const todayDate = new Date();
    const todayString = todayDate.toLocaleDateString();
    const oldVerse = getCookie("verse");
    const oldVerseRef = getCookie("verseref");
    const oldPrayer = getCookie("prayer");
    const oldDeed = getCookie("deed");

    if (lastDate !== todayString) {
      getVerseList();
      getPrayersAndDeeds();
    } else if (
      oldVerse.length > 1 &&
      oldPrayer.length > 1 &&
      oldDeed.length > 1 &&
      oldVerseRef.length > 1
    ) {
      setVerse(oldVerse);
      setVerseRef(oldVerseRef);
      setPrayer(oldPrayer);
      setDeed(oldDeed);
    } else {
      getVerseList();
      getPrayersAndDeeds();
    }
    setCookie("date", todayString);
  }, []);

  useEffect(() => {
    if (verseId) {
      getVerse();
    }
  }, [verseId]);

  return { verse, prayer, deed, verseRef };
}
