import { resetGame } from "../../utils/gameState";

export const RestartGameButton = (props) => {
  const handleRestartGame = async () => {
    await resetGame();
    window.location.reload(true);
  };

  return (
    <button
      className={"end-game-button"}
      type="button"
      onClick={handleRestartGame}
    >
      Restart Game
    </button>
  );
};
