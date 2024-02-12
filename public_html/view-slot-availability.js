document.addEventListener('DOMContentLoaded', function() {
    const selectedDateElement = document.getElementById('selected-date');
    let currentDate = new Date();
    let selectedSlots = []; // Array to store selected slots

    function clearSearch() {
        document.getElementById('search-box').value = '';
        filterSlots(); 
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

				let availableSlots = 10; // Initialize available slots for each time slot

				for (let seat = 1; seat <= 10; seat++) {
					const seatDiv = document.createElement('div');
					seatDiv.className = 'seat available';
					seatDiv.textContent = seat; // Display seat number
					const slotKey = `${hour}:${mins}-${seat}`;
					if (selectedSlots.includes(slotKey)) {
						seatDiv.classList.add('reserved');
						availableSlots--;
					}
					seatDiv.addEventListener('click', function() {
						toggleReservation(seatDiv, slotKey);
					});
					timeSlotRow.appendChild(seatDiv);
				}

				slotsContainer.appendChild(timeSlotRow);
			}
		}
		return slotsContainer;
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

        for (let hour = 9; hour <= 17; hour++) {
            for (let mins = 0; mins < 60; mins += 30) {
                const row = document.createElement('tr');
                const timeSlot = document.createElement('td');
                timeSlot.textContent = `${hour % 12 === 0 ? 12 : hour % 12}:${mins === 0 ? '00' : mins}${hour >= 12 ? ' PM' : ' AM'}`;
                row.appendChild(timeSlot);

                for (let j = 1; j <= numberOfSeats; j++) {
                    const seatSlot = document.createElement('td');
                    seatSlot.className = 'seat-slot available';
                    seatSlot.addEventListener('click', function() {
                        // Stub function, do nothing on click
                    });
                    row.appendChild(seatSlot);
                }
                table.appendChild(row);
            }
        }

        timeSlotsContainer.appendChild(table);
    }

    function toggleReservation(seat, slotKey) {
        seat.classList.toggle('reserved');
        const index = selectedSlots.indexOf(slotKey);
        if (index === -1) {
            selectedSlots.push(slotKey);
        } else {
            selectedSlots.splice(index, 1);
        }
    }

    function proceedWithReservation() {
        // Redirect to make-reservation.html or handle the reservation process here
        window.location.href = 'make-reservation.html';
    }

    function reserveForStudent() {
        // Redirect to reserve-for-student.html or handle the process here
        window.location.href = 'reserve-for-student.html';
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
	
	function toggleReservation(seat, slotKey) {
		seat.classList.toggle('reserved');
		const index = selectedSlots.indexOf(slotKey);
		if (index === -1) {
			selectedSlots.push(slotKey);
		} else {
			selectedSlots.splice(index, 1);
		}
	}

    document.getElementById('lab-dropdown').addEventListener('change', createLabs);

    populateLabDropdown();
    updateSelectedDate();
    createLabs(1); // Initialize the page with the first lab's time slots
});
