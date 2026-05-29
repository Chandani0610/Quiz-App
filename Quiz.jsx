import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { QuizContext } from "../context/QuizContext";

import Timer from "../components/Timer";
import ProgressBar from "../components/ProgressBar";
import QuestionCard from "../components/QuestionCard";

import useTimer from "../hooks/useTimer";

export default function Quiz() {

  const { state, dispatch } =
    useContext(QuizContext);

  const { index, questions } = state;

  const navigate = useNavigate();

  const { time, reset } = useTimer(15);

  // Timer logic
  useEffect(() => {

    if (
      time === 0 &&
      index < questions.length
    ) {

      dispatch({
        type: "ANSWER",
        payload: false
      });

      reset();
    }

  }, [time, dispatch, index, questions.length, reset]);

  // Finish quiz
  useEffect(() => {

    if (index >= questions.length) {

      dispatch({
        type: "FINISH"
      });

      navigate("/result");
    }

  }, [index, dispatch, navigate, questions.length]);

  // Loading check
  if (
    !questions ||
    questions.length === 0
  ) {

    return (
      <h2 className="text-center mt-5">
        Loading Questions...
      </h2>
    );
  }

  // Current question
  const current = questions[index];

  // Prevent undefined error
  if (!current) {

    return (
      <h2 className="text-center mt-5">
        Quiz Finished...
      </h2>
    );
  }

  // Option select
  const handleSelect = (option) => {

    dispatch({
      type: "ANSWER",
      payload:
        option === current.answer
    });

    reset();
  };

  return (
    <div className="container mt-4">

      <Timer time={time} />

      <ProgressBar
        current={index + 1}
        total={questions.length}
      />

      <QuestionCard
        question={current.question}
        options={current.options}
        onSelect={handleSelect}
      />

    </div>
  );
}