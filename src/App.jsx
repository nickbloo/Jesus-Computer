import { useState, useEffect } from 'react';
import useVerse from './components/useVerse.jsx';
import Scroll from "./components/Scroll.jsx";
import Navbar from './components/Navbar.jsx';
import { prayerData, deedData } from './bibleData.js';
import { setCookie, getCookie } from './cookieHelpers.js';

function randomNum (x) {
  return Math.floor(Math.random() * (x));
}

export default function App() {
  const [scroll, setScroll] = useState('VERSE');
  //logic for verses is in the useVerse.jsx file
  const { verse } = useVerse();
  const [prayer, setPrayer] = useState('');
  const [deed, setDeed] = useState('');

  function getPrayersAndDeeds () {
    let randomPrayerNum = randomNum(prayerData.length);
    let randomDeedNum = randomNum(deedData.length);
    let newPrayer = prayerData[randomPrayerNum];
    let newDeed = deedData[randomDeedNum];
    setCookie('prayer', newPrayer);
    setCookie('deed', newDeed);
    setPrayer(newPrayer);
    setDeed(newDeed);
  }

  useEffect(() => {
    const lastDate = getCookie("date");
    const todayDate = new Date();
    const todayString = todayDate.toLocaleDateString();
    if (lastDate !== todayString) {
      getPrayersAndDeeds();
    } else {
      const oldPrayer = getCookie('prayer');
      const oldDeed = getCookie('deed')
      if (oldPrayer.length > 1 && oldDeed.length > 1) {
        setPrayer(oldPrayer);
        setDeed(oldDeed);
      } else {
        getPrayersAndDeeds();
      }
    }
  }, []);

  return (
    <div className="App">
      <Navbar setScroll={setScroll} />
      <img id='clouds' src='/src/assets/cloudbackground.png' />
      <img id='hearts' src='/src/assets/hearts.png' />
      <Scroll scroll={scroll} verse={verse} prayer={prayer} deed={deed} />
    </div>
  )
}