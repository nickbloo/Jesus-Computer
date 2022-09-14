import { useState, useEffect } from 'react';

export default function Scroll ({ scroll, verse, prayer, deed }) {
  const [scrollText, setScrollText] = useState('');

  useEffect(() => {
    switch (scroll) {
      case 'VERSE':
        setScrollText(verse);
        break;
      case 'PRAYER':
        setScrollText(prayer);
        break;
      case 'DEED':
        setScrollText(deed);
        break;
      default:
        setScrollText(verse);
        break;
    }
  }, [scroll, verse, prayer, deed]);

  return (
    <div className="verse-container">
      <img id="scroll" src='/src/assets/jesusscroll.png' />
      <h2 className="verse">{scrollText}</h2>
    </div>
  )
}