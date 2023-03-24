import { SignOutButton } from "./SignOutButton";
import { fallIcon } from "../GameLogic/constants";
import { winterIcon } from "../GameLogic/constants";
import { springIcon } from "../GameLogic/constants";
import { summerIcon } from "../GameLogic/constants";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Button from "react-bootstrap/Button";

const InfoHeader = (props) => {
  const SEASONS = ["Winter", "Spring", "Summer", "Fall"];

  function endTurn() {
    props.setTurn(props.turn + 1);

    // Change season every 3 turns
    if ((props.turn + 1) % 3 === 1) {
      props.setSeason(SEASONS[(SEASONS.indexOf(props.season) + 1) % 4]);
    }
  }

  return (
    <div className="info-header">
      <div className="username info-header-item">{props.user}</div>
      <div className="info-header-item">
        <SignOutButton />
      </div>
      <div className="money info-header-item">
        ${parseFloat(props.money).toFixed(2)}
      </div>
      
      
    
      <div className="season info-header-item">
      <img className="season-icon" src={props.season=="Fall" ? fallIcon : props.season =="Winter" ? winterIcon : props.season == "Spring"
          ? springIcon : summerIcon
        }></img>
        {props.season}</div>
      <div className="info-header-item">
        Day:&nbsp;<div className="info-header-item-value">{props.turn}</div>
      </div>
      <div className="info-header-item gap-4">
     
        <Button
          className="info-header-button"
          type="button"
          variant="danger"
          size="lg"
          onClick={() => endTurn()}
        >
          End Turn
        </Button>
     
      </div>
    </div>
  );
};

export default InfoHeader;
