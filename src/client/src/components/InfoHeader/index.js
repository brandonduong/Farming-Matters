import { SignOutButton } from "./SignOutButton";

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
        <SignOutButton header={true} />
      </div>
      <div className="money info-header-item">
        ${parseFloat(props.money).toFixed(2)}
      </div>
      <div className="season info-header-item">{props.season}</div>
      <div className="info-header-item">
        Day:&nbsp;
        <div className="info-header-item-value">
          {props.turn} / {props.MAX_TURNS}
        </div>
      </div>
      <div className="info-header-item">
        <button
          className="info-header-button"
          type="button"
          onClick={() => endTurn()}
        >
          End Turn
        </button>
      </div>
    </div>
  );
};

export default InfoHeader;
