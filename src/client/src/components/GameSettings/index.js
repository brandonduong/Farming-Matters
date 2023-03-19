import React from "react";
import { useState } from "react";
import SliderBar from "./SliderBar";
import { deleteLoggingTable } from "../../utils/withdraw";

export const GameSettings = (props) => {
  const [showSettings, setSettings] = useState(false);
  const [confirmDialog, setConfirmDialog] = useState(false);

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
              <p className="settings-header" style={{ marginTop: "80px" }}>
                Withdraw:
              </p>
              <button className="withdraw-btn">Withdraw from the study</button>
              <button
                className="withdraw-btn"
                style={{ marginLeft: "10%" }}
                onClick={() => setConfirmDialog(true)}
              >
                Withdraw from the game
              </button>
            </div>
          </div>
          {confirmDialog ? (
            <div className="settings">
              <div className="confirm-dialog">
                <p>
                  Are you sure you want to withdraw? Have more text about what
                  happens
                </p>
                <button
                  type="button"
                  className="confirm-dialog-btn"
                  onClick={() => setConfirmDialog(false)}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="confirm-dialog-btn"
                  style={{ marginLeft: "10%" }}
                  onClick={() => setConfirmDialog(false)}
                >
                  Confirm
                </button>
              </div>
            </div>
          ) : null}
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
