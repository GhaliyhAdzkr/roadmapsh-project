function QuizComp() {
	const [selectedId, setSelectedId] = useState(null);
	const currentQuestion = questionList[0];

	const handleAnswer = (optId) => {
		if (selectedId !== null) return;
		setSelectedId(optId);
	};
	return (
		<div className="w-3/4 mx-auto my-20">
			<div className="border p-3 rounded flex flex-col gap-2">
				<div>
					<div className="text-xs">
						No {questionList[0].id + 1} of {questionList.length}
					</div>
					<div className="text-l w-full">
						{questionList[0].question}
					</div>
				</div>

				<div className="flex flex-col gap-2">
					{currentQuestion.option.map((opt) => {
						const isSelected = selectedId == opt.id;
						const isCorrect = opt.correct == 1;

						let statusClass =
							"border-slate-200 hover:border-blue-500";

						if (selectedId != null) {
							if (isCorrect) {
								statusClass = `border-green-500 bg-green-50`;
							} else if (isSelected && !isCorrect) {
								statusClass = `border-red-500 bg-red-50`;
							}
						}

						return (
							<button
								key={opt.id}
								onClick={() => handleAnswer(opt.id)}
								disabled={selectedId != null}
								className={`option-button w-full text-left p-2 border-2  
									rounded-lg transition-all ${statusClass} `}
							>
								{opt.name}
							</button>
						);
					})}
				</div>
			</div>
		</div>
	);
}
