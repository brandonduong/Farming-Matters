import React from "react";

const Tutorial = ({ setShowTutorial }) => {
  return (
    <div className="modal-screen">
      <div className="modal-component" id="tutorial-modal">
        <h1> How to play </h1>
        <br></br>
        <div className="rules">
          <p>
            <strong>Goal:</strong> To earn $15,000 in 5 years &#40;48 turns&#41;
          </p>
          <ol style={{ textAlign: "initial" }}>
            <li>
              Player must buy seeds from the market available for the current
              season
            </li>
            <li>
              A seed can be planted on the farm by clicking a tile and selecting
              an owned seed
            </li>
            <li>
              Each season consists of 3 turns. Seeds can only be planted in
              their designated season &#40;look for crops with the corresponding
              season icon&#41;
            </li>
            <li>
              Each seed can be harvested after X turns. The number of turns to
              harvest depends on the seed &#40;look over seed information in the
              market before buying&#41;
            </li>
            <li>
              Once harvested, the crop &#40;initially seed&#41; is added to the
              player's inventory.
            </li>
            <li>
              The selling price of each crops may change every turn unlike the
              buy price. The crop can be sold as soon as they are harvested or
              kept to be sold at a later turn.
            </li>
            <li>
              Each crop has an expiry date and cannot be kept in the inventory
              indefinitely. Once a crop expires, it's value is dimished and
              removed from the inventory automatically.
            </li>
            <li>
              There are various tools to aid the player in the process for an
              early retirement:
              <ul>
                <li>Consultant</li>
                <li>Tool Smith</li>
                <li>Local Guide</li>
                <li>Insurance</li>
                <li>Pesticide</li>
                <li>Fertilizer</li>
              </ul>
              Learn more about them as you play and clicking the 'i' icon for
              more information
            </li>
          </ol>
        </div>
        <button
          className="close-button"
          onClick={() => {
            setShowTutorial(false);
          }}
        >
          x
        </button>
      </div>
    </div>
  );
};

export default Tutorial;
