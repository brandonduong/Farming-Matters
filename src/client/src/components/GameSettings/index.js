import React from "react";
import { useState } from "react";
import SliderBar from "./SliderBar";

export const GameSettings = (props) => {
  const [showSettings, setSettings] = useState(false);

  const displaySettings = () => {
    setSettings(!showSettings);
  };

  return (
    <>
      {showSettings ? (
        <>
          <div className="settings">
            <div className="settings-component">
              <button type="button" id="close-button" onClick={displaySettings}>
                x
              </button>
              <p className="center settings-heading">Settings</p>
              <p className="settings-header">Music Volume:</p>
              <SliderBar value={props.volume} setValue={props.setVolume} />
              <p className="settings-header" style={{ marginTop: "65px" }}>
                Sound Effects Volume:
                <br></br>
                <em>don't modify as it's not implemented yet</em>
              </p>
              <SliderBar />
              <p className="settings-header" style={{ marginTop: "100px" }}>
                Withdraw:
              </p>
              <button className="withdraw-btn">Withdraw from the study</button>
              <button className="withdraw-btn" style={{ marginLeft: "10%" }}>
                Withdraw from the game
              </button>
            </div>
          </div>
        </>
      ) : (
        <button
          type="button"
          className="settings-button"
          onClick={displaySettings}
        >
          Settings
        </button>
      )}
    </>
  );
};
