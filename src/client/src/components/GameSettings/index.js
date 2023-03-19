import React from "react";
import { useState } from "react";
import SliderBar from "./SliderBar";
import { deleteLoggingTable } from "../../utils/withdraw";
import { useAuth } from "../../utils/auth/hooks";
import { deleteUser } from "firebase/auth";
import { BsFillGearFill } from "react-icons/bs";
import { IconContext } from "react-icons";

export const GameSettings = (props) => {
  const { user, signOutHandler, socket, setIsLoggedIn } = useAuth();
  const [showSettings, setSettings] = useState(false);
  const [confirmDialog, setConfirmDialog] = useState(false);

  // Study - refers to deleting account and game data
  // Game - refers to deleting account only
  const [selectedWithdrawType, setSelectedWithdrawType] = useState(null);
  const allDisplayPrompt = {
    study:
      "Withdrawing from the study will delete the account and all play data that may be used for research. Are you sure you want to withdraw from the study?",
    game: "Withdrawing from the game will delete the account but retain all play data that may be used for research. Are you sure you want to withdraw from the game?",
  };
  const [currentDisplayPrompt, setCurrentDisplayPrompt] = useState(null);

  const displaySettings = () => {
    setSettings(!showSettings);
  };

  const handleWithdraw = async () => {
    if (selectedWithdrawType == "study") {
      await deleteLoggingTable();
      // ----------------------------------------------------------------
      // will also need to delete game state table entry--------------------------------
      // --------------------------------------------------------
    }

    // sign out before deleting account so there's no issue signing out when account doesn't exist
    signOutHandler();
    socket.emit("logout", user.uid);
    setIsLoggedIn(false);
    sessionStorage.clear();

    // user table will always be deleted regardless of the withdraw option selected
    deleteUser(user)
      .then(() => {
        console.log("user deleted from firebase");
      })
      .catch((error) => {
        console.log("error occured", error);
      });
    console.log(selectedWithdrawType);
    setSelectedWithdrawType(null);
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
              <button
                className="withdraw-btn"
                onClick={() => {
                  setConfirmDialog(true);
                  setSelectedWithdrawType("study");
                  setCurrentDisplayPrompt(allDisplayPrompt.study);
                }}
              >
                Withdraw from the study
              </button>
              <button
                className="withdraw-btn"
                style={{ marginLeft: "10%" }}
                onClick={() => {
                  setConfirmDialog(true);
                  setSelectedWithdrawType("game");
                  setCurrentDisplayPrompt(allDisplayPrompt.game);
                }}
              >
                Withdraw from the game
              </button>
            </div>
          </div>
          {confirmDialog ? (
            <div className="settings">
              <div className="confirm-dialog">
                <p id="confirm-heading">Confirm</p>
                <p id="confirm-prompt">
                  <em>{currentDisplayPrompt}</em>
                </p>
                <button
                  type="button"
                  className="confirm-dialog-btn"
                  id="confirm-dialog-cancel-btn"
                  onClick={() => setConfirmDialog(false)}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="confirm-dialog-btn"
                  id="confirm-dialog-confirm-btn"
                  style={{ marginLeft: "10%" }}
                  onClick={() => {
                    setConfirmDialog(false);
                    handleWithdraw();
                  }}
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
