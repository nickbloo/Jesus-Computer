export default function Navbar ({ setScroll }) {

  function handleClick (e) {
    setScroll(e.target.name);
  }

  return (
    <div id='navbar'>
      <button id="btn" name='VERSE' onClick={handleClick}>VERSE</button>
      <button id="btn" name='PRAYER' onClick={handleClick}>PRAYER</button>
      <button id="btn" name='DEED' onClick={handleClick}>DEED</button>
    </div>
  );
}