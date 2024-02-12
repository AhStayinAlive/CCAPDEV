document.addEventListener('DOMContentLoaded', function() {
        const selectedDateElement = document.getElementById('selected-date');
        let currentDate = new Date();

        updateSelectedDate(selectedDateElement, currentDate);
        populateLabDropdown();

        document.getElementById('prev-date').addEventListener('click', function() {
            changeDate(selectedDateElement, currentDate, -1);
        });

        document.getElementById('next-date').addEventListener('click', function() {
            changeDate(selectedDateElement, currentDate, 1);
        });
		
		function updateSelectedDate(selectedDateElement, currentDate) {
			selectedDateElement.textContent = currentDate.toDateString();
		}

		function changeDate(selectedDateElement, currentDate, days) {
			currentDate.setDate(currentDate.getDate() + days);
			updateSelectedDate(selectedDateElement, currentDate);
			createLabs(currentDate);
		}

	function createLabs() {
		const numberOfSeats = 10; 
		const timeSlotsContainer = document.getElementById('time-slots-container');
		timeSlotsContainer.innerHTML = '';

		const table = document.createElement('table');
		table.className = 'time-slots-table';

		const headerRow = document.createElement('tr');
		const timeHeader = document.createElement('th');
		timeHeader.textContent = 'Time';
		headerRow.appendChild(timeHeader);

		for (let i = 1; i <= numberOfSeats; i++) {
			const seatHeader = document.createElement('th');
			seatHeader.textContent = `Seat ${i}`;
			headerRow.appendChild(seatHeader);
		}
		table.appendChild(headerRow);

		const reservedSeats = {
			10: [[0, 3, 'Sofia Rivera', '#profileUserA'], [30, 5, 'Diego Garcia', '#profileUserB']],
			14: [[0, 2, 'Juan Dela Cruz', '#profileUserC']],
		};

		for (let hour = 9; hour <= 17; hour++) {
			for (let mins = 0; mins < 60; mins += 30) {
				const row = document.createElement('tr');
				const timeSlot = document.createElement('td');
				timeSlot.textContent = `${hour % 12 === 0 ? 12 : hour % 12}:${mins === 0 ? '00' : mins}${hour >= 12 ? ' PM' : ' AM'}`;
				row.appendChild(timeSlot);

				for (let j = 1; j <= numberOfSeats; j++) {
					const seatSlot = document.createElement('td');
					seatSlot.className = 'seat-slot available';

					if (reservedSeats[hour] && reservedSeats[hour].some(reservation => reservation[0] === mins && reservation[1] === j)) {
						const reservation = reservedSeats[hour].find(reservation => reservation[0] === mins && reservation[1] === j);
						seatSlot.className = 'seat-slot reserved';
						const userLink = document.createElement('a');
						userLink.href = reservation[3]; 
						userLink.textContent = reservation[2]; 
						userLink.title = reservation[2]; 
						userLink.style.color = 'white'; 
						userLink.style.textDecoration = 'none'; 
						seatSlot.innerHTML = '';
						seatSlot.appendChild(userLink); 
					}
					row.appendChild(seatSlot);
				}
				table.appendChild(row);
			}
		}

		timeSlotsContainer.appendChild(table);
	}
	
    createLabs(currentDate);
	document.getElementById('proceed-button').addEventListener('click', proceedWithReservation);
});

	function selectSlot(slot) {
		if (selectedSlot) {
			selectedSlot.classList.remove('selected');
		}
		
		selectedSlot = slot;
		slot.classList.add('selected');
		document.getElementById('proceed-button').disabled = false;
	}
	
    function updateSelectedDate() {
        selectedDateElement.textContent = currentDate.toDateString();
        createLabs(3);
    }

    function changeDate(days) {
        currentDate.setDate(currentDate.getDate() + days);
        updateSelectedDate();
    }

    function createTimeSlots(labNumber) {
        const slotsContainer = document.createElement('div');
        slotsContainer.className = 'slots';
        for (let hour = 9; hour <= 17; hour++) {
            for (let mins = 0; mins < 60; mins += 30) {
                const timeSlotRow = document.createElement('div');
                timeSlotRow.className = 'time-slot-row';

                const timeLabel = document.createElement('span');
                timeLabel.className = 'time-label';
                timeLabel.textContent = `${hour}:${mins === 0 ? '00' : mins} ${hour >= 12 ? 'PM' : 'AM'}`;

                timeSlotRow.appendChild(timeLabel);

                for (let seat = 1; seat <= 10; seat++) {
                    const seatDiv = document.createElement('div');
                    seatDiv.className = 'seat available';
                    seatDiv.textContent = seat; // Display seat number
                    seatDiv.onmouseover = function() { this.className = 'seat hover'; };
                    seatDiv.onmouseout = function() { this.className = 'seat available'; };
                    timeSlotRow.appendChild(seatDiv);
                }

                slotsContainer.appendChild(timeSlotRow);
            }
        }
        return slotsContainer;
    }
    
    function populateLabDropdown() {
        const select = document.getElementById('lab-dropdown');
        for (let i = 1; i <= 3; i++) {
            const option = document.createElement('option');
            option.value = i;
            option.textContent = `Lab ${i}`;
            select.appendChild(option);
        }
    }
	
	function proceedWithReservation() {
		window.location.href = 'make-reservation.html';
	}

    document.getElementById('lab-dropdown').addEventListener('change', createLabs);

    populateLabDropdown();
    updateSelectedDate();
    createLabs(1);
	
	document.addEventListener('DOMContentLoaded', function() {
		const timetableContainer = document.getElementById('time-slots-container');
		const selectedSlotsContainer = document.querySelector('.selected-slots');

		// Add event listener to timetable cells
		timetableContainer.addEventListener('click', function(event) {
			const clickedCell = event.target;
			if (clickedCell.classList.contains('time-slot')) {
				// Toggle selection style
				clickedCell.classList.toggle('selected');

				// Update selected slots details on the right side
				if (clickedCell.classList.contains('selected')) {
					const timeSlotDetails = clickedCell.dataset.details;
					const selectedSlotDetails = document.createElement('div');
					selectedSlotDetails.textContent = timeSlotDetails;
					selectedSlotsContainer.appendChild(selectedSlotDetails);
				} else {
					// Remove details if cell is deselected
					const selectedSlotDetails = selectedSlotsContainer.querySelector(`[data-details="${clickedCell.dataset.details}"]`);
					if (selectedSlotDetails) {
						selectedSlotsContainer.removeChild(selectedSlotDetails);
					}
				}
			}
		});
	});