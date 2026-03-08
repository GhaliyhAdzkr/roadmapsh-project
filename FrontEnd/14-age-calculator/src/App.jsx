import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
	format,
	differenceInDays,
	differenceInYears,
	intervalToDuration,
} from "date-fns";

function App() {
	const [selectedData, setSelectedData] = useState(new Date());
	const [confirmedData, setConfirmedData] = useState(null);

	function handleCalculate() {
		setConfirmedData(selectedData);
	}

	const duration = intervalToDuration({
		start: confirmedData,
		end: Date(),
	});

	const getDurationString = (dur) => {
		const parts = [
			dur.years && `${dur.years} tahun`,
			dur.months && `${dur.months} bulan`,
			dur.days && `${dur.days} hari`,
		].filter(Boolean);

		return parts.length > 0 ? `Umur kamu ${parts.join(', ')}!` : `Kamu Baru lahir!`
	};

	return (
		<>
			<div className="w-3/4 h-screen mx-auto flex flex-col gap-10 items-center justify-center">
				<div className="text-4xl font-bold">Age Calculator</div>

				<div className="w-1/2 flex flex-col gap-2">
					<div>Enter your birth date:</div>
					<DatePicker
						selected={selectedData}
						onChange={(date) => setSelectedData(date)}
						dateFormat={"dd/MM/yyyy"}
						className="bg-gray-300 w-full p-3 text-xl rounded border"
					></DatePicker>
					<div
						onClick={handleCalculate}
						className="w-full bg-gray-800 text-white flex justify-center p-2 rounded"
					>
						Calculate
					</div>
				</div>
				<div className="text-xl">
					{confirmedData
						? getDurationString(duration)
						: `Pilih tanggal dan tekan tombol 'Calculate'`}
				</div>
			</div>
		</>
	);
}

export default App;
