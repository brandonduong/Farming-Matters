import React from "react";
import { useState } from "react";
import SliderBar from "./SliderBar";
import { deleteLoggingTable } from "../../utils/withdraw";
import { useAuth } from "../../utils/auth/hooks";
import { deleteUser } from "firebase/auth";

export const GameSettings = (props) => {
  const { user, signOutHandler, socket, setIsLoggedIn } = useAuth();
  const [showSettings, setSettings] = useState(false);
  const [confirmDialog, setConfirmDialog] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // study - refers to deleting account and game data
  // game - refers to deleting account only
  const [selectedWithdrawType, setSelectedWithdrawType] = useState();
  const allDisplayPrompt = {
    study:
      "Withdrawing from the study will delete the account and all play data that may be used for research.",
    game: "Withdrawing from the game will delete the account but retain all play data that may be used for research. ",
  };
  const [currentDisplayPrompt, setCurrentDisplayPrompt] = useState(null);

  const displaySettings = () => {
    setSettings(!showSettings);
  };

  const displayMoreInformation = (withdrawOption) => {
    let selectedType = withdrawOption.toLowerCase();

    let withdrawExcerpts = {
      study:
        "Players may choose to withdraw from the study. This will delete the player account. It will also delete all anonymized game data, that may have been used in research, associated with the account.",
      game: "Players may choose to withdraw from the game. This will delete the player account; however, it will not delete the game data that may be used research. The game data is anonymized and will not be tied to any user information.",
    };
    return (
      <div className="settings">
        <div
          className="dialog-modal"
          style={{ backgroundColor: "rgba(255, 255, 255, 0.91)" }}
        >
          <button
            type="button"
            className="close-button"
            onClick={() => setShowModal(false)}
          >
            x
          </button>
          <p id="confirm-heading">Withdrawing from the {selectedType}</p>
          <p id="withdraw-info">{withdrawExcerpts[selectedType]}</p>
        </div>
      </div>
    );
  };

  const handleWithdraw = async () => {
    if (selectedWithdrawType === "study") {
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
              <button type="button" className="close-button" onClick={displaySettings}>
                x
              </button>
              <p className="center settings-heading">Settings</p>
              <p className="settings-header">Music Volume:</p>
              <SliderBar value={props.volume} setValue={props.setVolume} />
              <p className="settings-header" style={{ marginTop: "65px" }}>
                Sound Effects Volume:
                <br></br>
                {/* <em>don't modify as it's not implemented yet</em> */}
              </p>
              <SliderBar />
              <p className="settings-header" style={{ marginTop: "80px" }}>
                Withdraw:
              </p>

              <div className="withdraw-btns">
                <div className="withdraw-btn-group">
                  <button
                    className="withdraw-btn"
                    onClick={() => {
                      setConfirmDialog(true);
                      setSelectedWithdrawType("game");
                      setCurrentDisplayPrompt(allDisplayPrompt.game);
                    }}
                  >
                    Withdraw from the game
                  </button>
                  <button
                    className="more-info-btn"
                    onClick={() => {
                      setShowModal(true);
                      setSelectedWithdrawType("game");
                    }}
                  >
                    i
                  </button>
                </div>
                <div className="withdraw-btn-group" id="right-button">
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
                    className="more-info-btn"
                    onClick={() => {
                      setShowModal(true);
                      setSelectedWithdrawType("study");
                    }}
                  >
                    i
                  </button>
                </div>
              </div>
            </div>
          </div>
          {showModal ? displayMoreInformation(selectedWithdrawType) : null}
          {confirmDialog ? (
            <div className="settings">
              <div className="dialog-modal">
                <p id="confirm-heading">Confirm</p>
                <p id="confirm-prompt">
                  <em>
                    {currentDisplayPrompt} Are you sure you want to withdraw?
                  </em>
                </p>
                <button
                  type="button"
                  className="confirm-dialog-btn"
                  id="confirm-dialog-cancel-btn"
                  onClick={() => {
                    setConfirmDialog(false);
                    setSelectedWithdrawType(null);
                  }}
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
