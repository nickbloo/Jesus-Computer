import "../stylesheets/Verse.css";

export default function Verse ({verse}) {
  //Replace default verse with a variable
  //We need to set up a persistent state for that verse

  return (
    <div className="verse-container">
      <h2 className="verse">{verse}</h2>
      </div>
  )
}