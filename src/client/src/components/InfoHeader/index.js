import { SignOutButton } from "./SignOutButton";
import { EndTurnButton } from "./EndTurnButton";
import { fallIcon } from "../GameLogic/constants";
import { winterIcon } from "../GameLogic/constants";
import { springIcon } from "../GameLogic/constants";
import { summerIcon } from "../GameLogic/constants";


const InfoHeader = (props) => {

  return (
    <div className="info-header">
      <div className="username info-header-item">{props.user}</div>
      <div className="info-header-item">
        <SignOutButton header={true} />
      </div>
      <div className="money info-header-item">
        ${parseFloat(props.money).toFixed(2)}
      </div>

      <div className="season info-header-item">
        <img
          className="season-icon"
          src={
            props.season == "Fall"
              ? fallIcon
              : props.season == "Winter"
              ? winterIcon
              : props.season == "Spring"
              ? springIcon
              : summerIcon
          }
        ></img>
        {props.season}
      </div>
      <div className="info-header-item">
        Day:&nbsp;
        <div className="info-header-item-value">
          {props.turn} / {props.MAX_TURNS}
        </div>
      </div>
      <div className="info-header-item gap-4">
        <EndTurnButton 
            season={props.season} 
            setSeason={props.setSeason}
            turn={props.turn}
            setTurn={props.setTurn}
          />
      </div>
    </div>
  );
};

export default InfoHeader;
