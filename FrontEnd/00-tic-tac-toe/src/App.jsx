import { use, useState } from "react";

function Square({ value, onSquareClick }) {
	return (
		<button
			onClick={onSquareClick}
			className="size-10 bg-gray-100 text-3xl font-bold"
		>
			{value}
		</button>
	);
}

function WinnerCond(squares) {
	const lines = [
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8],
		[0, 3, 26],
		[1, 4, 7],
		[2, 5, 8],
		[0, 4, 8],
		[2, 4, 6],
	];
	for (let i = 0; i < lines.length; i++) {
		const [a, b, c] = lines[i];
		if (
			squares[a] &&
			squares[a] == squares[b] &&
			squares[a] == squares[c]
		) {
			return squares[a];
		}
	}
	return null;
}

export default function Board() {
	const [squares, setSquares] = useState(Array(9).fill(null));
	const [nextMovesX, setNextMovesX] = useState(true);

	function handleSquareClick(i) {
		if (squares[i] || WinnerCond(squares)) {
			return;
		}
		const nextSquares = squares.slice();
		nextMovesX ? (nextSquares[i] = "X") : (nextSquares[i] = "O");
		setSquares(nextSquares);
		setNextMovesX(!nextMovesX);
	}

	const winner = WinnerCond(squares);
	let status;
	winner
		? (status = "Winner : " + winner)
		: (status = "Player Turn : " + (nextMovesX ? "X" : "O"));

  function handleRefresh() {
    window.location.reload();
  }

	return (
		<>
			<div className="m-10 flex flex-col gap-2">
				<div>{status}</div>
				<div className="grid grid-rows-3 grid-cols-3 w-fit border gap-[0.6px] bg-gray-600">
					<Square
						value={squares[0]}
						onSquareClick={() => handleSquareClick(0)}
					></Square>
					<Square
						value={squares[1]}
						onSquareClick={() => handleSquareClick(1)}
					></Square>
					<Square
						value={squares[2]}
						onSquareClick={() => handleSquareClick(2)}
					></Square>
					<Square
						value={squares[3]}
						onSquareClick={() => handleSquareClick(3)}
					></Square>
					<Square
						value={squares[4]}
						onSquareClick={() => handleSquareClick(4)}
					></Square>
					<Square
						value={squares[5]}
						onSquareClick={() => handleSquareClick(5)}
					></Square>
					<Square
						value={squares[6]}
						onSquareClick={() => handleSquareClick(6)}
					></Square>
					<Square
						value={squares[7]}
						onSquareClick={() => handleSquareClick(7)}
					></Square>
					<Square
						value={squares[8]}
						onSquareClick={() => handleSquareClick(8)}
					></Square>
				</div>
      <button onClick={handleRefresh} className="border bg-gray-400 py-1 px-2 w-fit rounded">Reset</button>
			</div>
		</>
	);
}
