export default function Navbar ({ setScroll }) {
  //TODO: Navbar should be rendered in the top center of the screen
  //TODO: Clicking on one of the buttons, should change the scroll text

  function handleClick (e) {
    setScroll(e.target.name);
  }

  return (
    <div id='navbar'>
      <button name='VERSE' onClick={handleClick}>VERSE</button>
      <button name='PRAYER' onClick={handleClick}>PRAYER</button>
      <button name='DEED' onClick={handleClick}>DEED</button>
    </div>
  );
}