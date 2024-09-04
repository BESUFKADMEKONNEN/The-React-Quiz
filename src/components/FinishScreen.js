function FinishScreen({ dispatch, points, maxPossiblePoints, highScore }) {
  const Percent = ((points / maxPossiblePoints) * 100).toFixed(1);
  let emoji;
  if (Percent === 100) emoji = "🥇";
  if (Percent >= 80 && Percent < 100) emoji = "🎉";
  if (Percent >= 50 && Percent < 80) emoji = "😊";
  if (Percent >= 0 && Percent < 50) emoji = "🤔";
  if (Percent === 0) emoji = "🤦‍♂️";

  return (
    <>
      <p className="result">
        {emoji} You Scored <strong>{points}</strong> out of {maxPossiblePoints}{" "}
        ({Percent}
        %)
      </p>
      <p className="highscore">(Highscore: {highScore} points)</p>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "restart" })}
      >
        Restart Quiz
      </button>
    </>
  );
}

export default FinishScreen;
