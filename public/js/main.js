function handleTimer() {

	setInterval(() => {

		// get the countdown elements
		const days = document.getElementById('days_countdown');
		const hours = document.getElementById('hours_countdown');
		const mins = document.getElementById('mins_countdown');
		const secs = document.getElementById('secs_countdown');

		// get the current countdown textContents
		let daysValue = parseInt(days.textContent);
		let hoursValue = parseInt(hours.textContent);
		let minsValue = parseInt(mins.textContent);
		let secsValue = parseInt(secs.textContent);

		// decrement the countdown values
		if (secsValue > 0) {
			secsValue--;
		} else {
			secsValue = 59;
			if (minsValue > 0) {
				minsValue--;
			} else {
				minsValue = 59;
				if (hoursValue > 0) {
					hoursValue--;
				} else {
					hoursValue = 23;
					if (daysValue > 0) {
						daysValue--;
					} else {
						// countdown has ended
						// clearInterval(intervalId);
					}
				}
			}
		}

		// update the countdown display
		days.textContent = daysValue.toString().padStart(2, '0');
		hours.textContent = hoursValue.toString().padStart(2, '0');
		mins.textContent = minsValue.toString().padStart(2, '0');
		secs.textContent = secsValue.toString().padStart(2, '0');
	}, 1000);
}

handleTimer();