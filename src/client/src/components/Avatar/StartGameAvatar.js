import React from "react";
import { useState } from "react";

const Consultant = ({ userName }) => {
  const [showStartGame, setShowStartGame] = useState(true);
  const statement = `Hi ${userName}, welcome to your farm!`;
  return (
    <div>
      {showStartGame ? (
        <div className="dialog">
          <div className="avatar avatar-0"> </div>
          <h1> Consultant </h1>
          {/* <h2> {props.getDescription()} </h2> */}
          <p>{statement}</p>
          <button
            type="button"
            id="close-button"
            onClick={() => setShowStartGame(false)}
          >
            x
          </button>
        </div>
      ) : null}
    </div>
  );
};
export default Consultant;
