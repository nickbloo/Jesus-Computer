import { useState, useEffect } from "react";
import useDaily from "./components/useDaily.jsx";
import Scroll from "./components/Scroll.jsx";
import Navbar from "./components/Navbar.jsx";
import background from "./assets/background.png";
import cloudbackground from "./assets/cloudbackground.png";
import hearts from "./assets/hearts.png";
import jesusscroll from "./assets/jesusscroll.png";
import scroll from "./assets/scroll.png";

export default function App() {
  const [scroll, setScroll] = useState("VERSE");
  const { verse, prayer, deed, verseRef } = useDaily();

  return (
    <div className="App">
      <Navbar setScroll={setScroll} />
      <img id="clouds" src="/src/assets/cloudbackground.png" />
      <img id="hearts" src="/src/assets/hearts.png" />
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
