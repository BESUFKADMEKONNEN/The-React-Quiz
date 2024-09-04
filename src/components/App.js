import { useEffect, useReducer } from "react";
import Header from "./Header";
import Loader from "./Loader";
import Error from "./Error";
import Questions from "./Question";
import Main from "./Main";
import "./../index.css";
import StartScreen from "./StartScreen";
import NextButton from "./NextButton";
import Progress from "./progress";
import FinishScreen from "./FinishScreen";
import Timer from "./Timer";

const SECS_PER_QUESTION = 30;
const initialStates = {
  questions: [],

  //loading, error, ready, active ,finished
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  highScore: 0,
  remainingSeconds: null,
};

function reducer(state, action) {
  // console.log( action.payload);
  switch (action.type) {
    case "dataRecived":
      return { ...state, questions: action.payload, status: "ready" };
    case "dataFailed":
      return { ...state, status: "error" };
    case "start":
      return {
        ...state,
        status: "active",
        remainingSeconds: state.questions.length * SECS_PER_QUESTION,
      };
    case "newAnswer":
      const question = state.questions.at(state.index);
      return {
        ...state,
        answer: action.payload,
        points:
          question.correctOption === action.payload
            ? state.points + question.points
            : state.points,
      };
    case "nextQuestion":
      return { ...state, index: state.index + 1, answer: null };
    case "finish":
      return {
        ...state,
        status: "finished",
        highScore:
          state.points > state.highScore ? state.points : state.highScore,
      };
    case "restart":
      return { ...initialStates, status: "ready", questions: state.questions };
    case "tick":
      return {
        ...state,
        remainingSeconds: state.remainingSeconds - 1,
        status: state.remainingSeconds === 0 ? "finished" : state.status,
      };

    default:
      throw new Error("Action Unknown");
  }
}

export default function App() {
  // const [state, dispatch] = useReducer(reducer, initialStates);
  // const { questions, status } = state;

  const [
    { questions, status, index, answer, points, highScore, remainingSeconds },
    dispatch,
  ] = useReducer(reducer, initialStates);

  const numQuestions = questions.length;
  const maxPossiblePoints = questions.reduce((acc, curr) => {
    return acc + curr.points;
  }, 0);
  // console.log(numQuestions, questions.lenght);
  useEffect(function () {
    fetch("http://localhost:8000/questions")
      .then((res) => res.json())
      .then((data) => dispatch({ type: "dataRecived", payload: data }))
      .catch((err) => dispatch({ type: "dataFailed" }));
  }, []);
  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartScreen numQuestions={numQuestions} dispatch={dispatch} />
        )}
        {status === "active" && (
          <>
            <Progress
              index={index}
              numQuestions={numQuestions}
              points={points}
              maxPossiblePoints={maxPossiblePoints}
              answer={answer}
            />

            <Questions
              question={questions[index]}
              dispatch={dispatch}
              answer={answer}
            />
            <NextButton dispatch={dispatch} answer={answer} index={index} numQuestions={numQuestions} />

            <Timer dispatch={dispatch} remainingSeconds={remainingSeconds} />
          </>
        )}
        {status === "finished" && (
          <FinishScreen
            points={points}
            dispatch={dispatch}
            maxPossiblePoints={maxPossiblePoints}
            highScore={highScore}
          />
        )}
      </Main>
    </div>
  );
}
