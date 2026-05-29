import { Link } from "react-router-dom";
import { useEffect, useContext } from "react";

import { QuizContext } from "../context/QuizContext";

export default function Result() {

  const { state, dispatch } =
    useContext(QuizContext);

  const percentage = Math.round(
    (state.score / state.questions.length) * 100
  );

  useEffect(() => {

    // Prevent empty username
    if (!state.username) return;

    const entry = {
      name: state.username,
      score: state.score,
      percentage,
      date: new Date().toLocaleString()
    };

    const stored =
      JSON.parse(
        localStorage.getItem("leaderboard")
      ) || [];

    // Prevent duplicate entries
    const alreadyExists = stored.some(
      (item) =>
        item.name === entry.name &&
        item.score === entry.score &&
        item.percentage === entry.percentage
    );

    if (!alreadyExists) {

      const updated = [...stored, entry];

      updated.sort(
        (a, b) => b.score - a.score
      );

      localStorage.setItem(
        "leaderboard",
        JSON.stringify(updated)
      );
    }

  }, []);

  return (
    <div className="container text-center mt-5">

      <div className="card shadow p-5">

        <h2 className="fw-bold mb-3">
          🎉 Quiz Completed!
        </h2>

        <h4>
          {state.username}, your score is:
        </h4>

        <h1 className="text-success">
          {state.score}
        </h1>

        <h4 className="mt-3">
          {percentage}%
        </h4>

        <div className="d-flex justify-content-center gap-3 mt-4">

          <Link
            to="/leaderboard"
            className="btn btn-primary"
          >
            View Leaderboard
          </Link>

          <Link
            to="/"
            onClick={() =>
              dispatch({ type: "RESET" })
            }
            className="btn btn-warning"
          >
            Home
          </Link>

        </div>

      </div>

    </div>
  );
}