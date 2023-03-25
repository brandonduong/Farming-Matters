import React from "react";
import { useState } from "react";
import Tutorial from "./Tutorial";

const Consultant = ({ userName, showTutorial, setShowTutorial }) => {
  const [showStartGame, setShowStartGame] = useState(true);
  const statement = `Hi ${userName}, welcome to Farming Matters! You are a farmer and have been as long as you can remember. \
  As you have gotten older, your body is no longer able to keep up with the demand of running a farm. You are looking to retire and to do that, 
  you need save up $15000 dollars in 5 years (48 turns). Through your journey to retirement, there will be various tool available to \
   to help aid in your early retirement plan!`;

  return (
    <div>
      {showStartGame ? (
        <div className="dialog-background" style={{ zIndex: "20" }}>
          <div className="dialog-grid">
            <div className={"avatar dialog-avatar-0"}> </div>
            <div
              className="box arrow-left"
              style={{ backgroundColor: "rgba(255, 255, 255, 0.76)" }}
            >
              <div
                className="avatar-info"
                style={{ gridTemplateRows: "1fr 4fr", paddingBottom: "10px" }}
              >
                <h1> Welcome! </h1>
                {/* <h2> {props.getDescription()} </h2> */}
                <div className="dialog-statement">{statement}</div>
              </div>
              <button
                className="next-button"
                onClick={() => {
                  setShowStartGame(false);
                  setShowTutorial(true);
                }}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      ) : null}
      {showTutorial ? <Tutorial setShowTutorial={setShowTutorial} /> : null}
    </div>
  );
};
export default Consultant;
