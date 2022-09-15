import { useState, useEffect, useMemo } from "react";
import jesusscroll from "../assets/jesusscroll.png";

export default function Scroll({ scroll, verse, prayer, deed, verseRef }) {
  const [scrollText, setScrollText] = useState("");

  const link = useMemo(() => {
    if (verseRef.length < 1) {
      return "https://www.kingjamesbibleonline.org/";
    }
    let refs = verseRef.split(" ");
    let book = refs[0];
    let chap = refs[1].split(":")[0];
    return `https://www.kingjamesbibleonline.org/${book}-Chapter-${chap}/`;
  }, [verseRef]);

  useEffect(() => {
    switch (scroll) {
      case "VERSE":
        setScrollText(verse);
        break;
      case "PRAYER":
        setScrollText(prayer);
        break;
      case "DEED":
        setScrollText(deed);
        break;
      default:
        setScrollText(verse);
        break;
    }
  }, [scroll, verse, prayer, deed]);

  return (
    <div className="verse-container">
      <img id="scroll" src={jesusscroll} />
      <span className="verse">
        {scrollText}
        <br />
        <a
          className="verse-ref"
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          title="Read more on kingjamesbible.org"
        >
          {scroll === "VERSE" ? verseRef : null}
        </a>
      </span>
    </div>
  );
}
