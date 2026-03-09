import { useState } from "react";
import "./App.css";
import questionList from "./data/flashcard-data.json";

function App() {
	const [currIndex, setCurrIndex] = useState(0);
	const [flipped, setflipped] = useState(false);

	const questionBox = document.getElementById("question-box");
	const answerBox = document.getElementById("answer-box");
	
	function showAnswer() {
		if (!flipped) {
			questionBox.classList.replace("block", "hidden");
			answerBox.classList.replace("hidden", "block");
			setflipped(true);
		} else {
			answerBox.classList.replace("block", "hidden");
			questionBox.classList.replace("hidden", "block");
			setflipped(false);
		}
	}
	
	const nextQuestion = () => {
		if (currIndex < questionList.length - 1) {
			setCurrIndex(currIndex + 1);
			answerBox.classList.replace("block", "hidden");
			questionBox.classList.replace("hidden", "block");
			setflipped(false)
		}
	};
	
	const prevQuestion = () => {
		if (currIndex > 0) {
			setCurrIndex(currIndex - 1);
			answerBox.classList.replace("block", "hidden");
			questionBox.classList.replace("hidden", "block");
			setflipped(false)
		}
	};

	const percentageProgress = ((currIndex + 1) / questionList.length) * 100;
	const currQuestion = questionList[currIndex];
	return (
		<>
			<div className="h-screen w-3/4 mx-auto  flex flex-col gap-1 items-center justify-center">
				<div className="w-full p-1 border rounded">
					<div
						className="p-1 bg-gray-300 rounded h-10 duration-300 flex flex-col justify-center"
						style={{ width: `${percentageProgress}%` }}
					>
						<div className="text-right px-2">
							{percentageProgress.toFixed()}%
						</div>
					</div>
				</div>

				<div
					id="question-box"
					className="w-full p-1 border rounded block"
				>
					<div className="w-full p-1 bg-gray-300 rounded h-60 flex items-center justify-center">
						<div className="text-2xl"> {currQuestion.question}</div>
					</div>
					<p className="text-sm bg-gray-300 text-gray-800 text-center pb-2">
						{currIndex + 1} of {questionList.length}
					</p>
				</div>

				<div
					id="answer-box"
					className="w-full p-1 border rounded hidden"
				>
					<div className="w-full p-1 bg-gray-300 rounded h-60 flex items-center justify-center">
						<div className="text-2xl text-center"> {currQuestion.answer}</div>
					</div>
					<p className="text-sm bg-gray-300 text-gray-800 text-center pb-2">
						{currIndex + 1} of {questionList.length}
					</p>
				</div>

				<div className="w-full border rounded p-1">
					<div className="flex justify-between w-full bg-gray-300 rounded p-2">
						<button onClick={prevQuestion}>prev</button>
						<button onClick={showAnswer}>
							{flipped ? `Show Question` : `Show Answer`}
						</button>
						<button onClick={nextQuestion}> next</button>
					</div>
				</div>
			</div>
		</>
	);
}

export default App;
