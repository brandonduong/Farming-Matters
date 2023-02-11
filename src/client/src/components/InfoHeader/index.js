import { SignOutButton } from "./SignOutButton"

const InfoHeader = (props) => {
  const SEASONS = ["Winter", "Spring", "Summer", "Fall"]

  function endTurn() {
    props.setTurn(props.turn + 1)

    // Change season every 3 turns
    if ((props.turn + 1) % 3 === 1) {
      props.setSeason(SEASONS[(SEASONS.indexOf(props.season) + 1) % 4])
    }
  }

  return (
    <div className="info-header">
      <div className="username info-header-item align-left">User: {props.user}</div>
      <div className="money info-header-item align-left">Money: ${props.money}</div>
      <div className="season info-header-item align-right">Season: {props.season}</div>
      <SignOutButton />
      <div className="turn info-header-item align-right">Turn: {props.turn}
        <button className="end-turn" type="button" onClick={()=>endTurn()}>
          End Turn
        </button>
      </div>
    </div>
  );
}

export default InfoHeader;
