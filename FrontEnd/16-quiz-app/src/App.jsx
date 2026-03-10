import { useState } from "react";
import "./App.css";
import questionList from "./data/quiz-data.json";

function App() {
	const [currIndex, setCurrIndex] = useState(0);
	const [points, setPoints] = useState(0);
	const [selectedOptionID, setSelectedOptionID] = useState(null);

	const percentageProgress = ((currIndex + 1) / questionList.length) * 100;
	const currQuestion = questionList[currIndex];

	const nextQuestion = () => {
		if (currIndex < questionList.length - 1) {
			setCurrIndex(currIndex + 1);
			setSelectedOptionID(null);
		}
	};

	const resetQuestion = () => {
		setCurrIndex(0)
		setSelectedOptionID(null)
		setPoints(0)
	}


	const handleAnswer = (optID) => {
		if (selectedOptionID != null) return;
		setSelectedOptionID(optID);

		const clickedOption = currQuestion.option.find(o => o.id === optID)
		if (clickedOption && clickedOption.correct) {
			setPoints(points + 1)
		}
		else if (points>0){
			setPoints(points - 0.5)
		}
	};

	return (
		<>
			<div className="h-screen w-150 mx-auto  flex flex-col gap-1 items-center justify-center">
				<div className="w-full p-1 border rounded">
					<div
						className="p-1 bg-gray-300 rounded h-10 duration-300 flex flex-col justify-center"
					>
						<div className="text-center px-2">
							Points : {points}
						</div>
					</div>
				</div>

				<div
					id="question-box"
					className="w-full p-1 border rounded block"
				>
					<div className="w-full p-2 bg-gray-300 rounded h-60 flex flex-col">
						<div className="p-2"> {currQuestion.question}</div>
						<div className="flex flex-col gap-1">
							{currQuestion.option.map((opt) => {
								let statusClass = `border-slate-500 bg-slate-50 px-2`;

								if (selectedOptionID != null) {
									if (opt.correct) {
										statusClass = `border-green-500 bg-green-50`;
										// setPoints(points + 1);
									} else if (
										selectedOptionID == opt.id &&
										!opt.correct
									) {
										statusClass = `border-red-500 bg-red-50`;
									}
								}

								return (
									<button
										key={opt.id}
										onClick={() => handleAnswer(opt.id)}
										className={`option-button w-full text-left p-2 border-2 rounded-lg transition-all ${statusClass}`}
									>
										{opt.name}
									</button>
								);
							})}
						</div>
					</div>
					<p className="text-sm bg-gray-300 text-gray-800 text-center pb-2">
						{currIndex + 1} of {questionList.length}
					</p>
				</div>

				<div className="w-full border rounded p-1">
					<div className=" w-full bg-gray-300 rounded p-2 flex flex-col">
						<button onClick={nextQuestion}> next</button>
						<button onClick={resetQuestion} className={currIndex==questionList.length-1 ? `block`:`hidden`}>reset</button>
					</div>
				</div>
			</div>
		</>
	);
}

export default App;
