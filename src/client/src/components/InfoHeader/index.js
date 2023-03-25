import { SignOutButton } from "./SignOutButton";
import { EndTurnButton } from "./EndTurnButton";

const InfoHeader = (props) => {

  return (
    <div className="info-header">
      <div className="username info-header-item">{props.user}</div>
      <div className="info-header-item">
        <SignOutButton />
      </div>
      <div className="money info-header-item">
        ${parseFloat(props.money).toFixed(2)}
      </div>
      <div className="season info-header-item">{props.season}</div>
      <div className="info-header-item">
        Day:&nbsp;<div className="info-header-item-value">{props.turn}</div>
      </div>
      <div className="info-header-item">
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
