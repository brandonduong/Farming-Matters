import { SignOutButton } from "../InfoHeader/SignOutButton";
import { RestartGameButton } from "./RestartGameButton";

const MONEY_GOAL = 15000;
function EndGamePopup(props) {
  return (
    <div className="end-game">
      <div className="end-game-box">
        <h1>Year 4 Passed</h1>
        <h2>
          You have finished with ${props.money} and{" "}
          {props.money >= MONEY_GOAL ? (
            <text>can happily retire!</text>
          ) : (
            <text>unfortunately can not retire.</text>
          )}
        </h2>

        <div className="end-game-buttons">
          <SignOutButton />
          <RestartGameButton />
        </div>
      </div>
    </div>
  );
}

export default EndGamePopup;
