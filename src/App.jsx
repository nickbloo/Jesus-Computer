import { useState, useEffect } from "react";
import useDaily from "./components/useDaily.jsx";
import Scroll from "./components/Scroll.jsx";
import Navbar from "./components/Navbar.jsx";
import cloudbackground from "./assets/cloudbackground.png";
import hearts from "./assets/hearts.png";

export default function App() {
  const [scroll, setScroll] = useState("VERSE");
  const { verse, prayer, deed, verseRef } = useDaily();

  return (
    <div className="App">
      <Navbar setScroll={setScroll} />
      <img id="clouds" src={cloudbackground} />
      <img id="hearts" src={hearts} />
      <Scroll
        scroll={scroll}
        verse={verse}
        prayer={prayer}
        deed={deed}
        verseRef={verseRef}
      />
    </div>
  );
}
