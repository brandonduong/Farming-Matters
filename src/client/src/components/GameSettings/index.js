import React from "react";
import { useState } from "react";

export const GameSettings = () => {
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
