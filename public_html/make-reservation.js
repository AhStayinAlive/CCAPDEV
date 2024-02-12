/* don't mind this code! (megan)

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

for (const [key, value] of urlParams.entries()) {
    const [labNumber, timeSlot, seatNumber] = value.split('&');
    selectedSeats.push({
        labNumber: labNumber,
        timeSlot: timeSlot,
        seatNumber: seatNumber
    });
}

console.log("Selected Seats:", selectedSeats); 
*/

const selectedSeats = [];

document.addEventListener('DOMContentLoaded', function() {
    const selectedDateElement = document.querySelector('.selected-date');
    const prevDateButton = document.querySelector('.prev-date');
    const nextDateButton = document.querySelector('.next-date');
    const timeSlotsContainer = document.querySelector('.time-slots-container');
    const proceedButton = document.querySelector('.proceed-button');
    const labDropdown = document.querySelector('.lab-dropdown');
    const selectedSlotsContainer = document.querySelector('.selected-slots');

    let currentDate = new Date();

    function updateSelectedDate() {
        selectedDateElement.textContent = currentDate.toDateString();
    }

    function changeDate(days) {
        currentDate.setDate(currentDate.getDate() + days);
        updateSelectedDate();
        createLabs();
    }
    
    function createLabs() {
        const numberOfSeats = 10; 
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
            14: [[0, 2, 'Anon.', '#profileUserC']],
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
    
    function proceedWithReservation() {
		const queryString = selectedSeats.map(seatData => {
			return `labNumber=${seatData.labNumber}&timeSlot=${seatData.timeSlot}&seatNumber=${seatData.seatNumber}`;
		}).join('&');

		window.location.href = `make-reservation.html?${queryString}`;
	}
    
    function populateLabDropdown() {
        for (let i = 1; i <= 3; i++) {
            const option = document.createElement('option');
            option.value = i;
            option.textContent = `Lab ${i}`;
            labDropdown.appendChild(option);
        }
    }
    
    prevDateButton.addEventListener('click', function() {
        changeDate(-1);
    });

    nextDateButton.addEventListener('click', function() {
        changeDate(1);
    });

    proceedButton.addEventListener('click', proceedWithReservation);

    labDropdown.addEventListener('change', createLabs);
    
    timeSlotsContainer.addEventListener('click', function(event) {
        const clickedCell = event.target;
        if (clickedCell.classList.contains('seat-slot')) {
			if (!clickedCell.textContent.trim()) {
				clickedCell.classList.toggle('selected');
				const table = clickedCell.closest('table');
				const labNumber = labDropdown.options[labDropdown.selectedIndex].value;
				const timeSlot = clickedCell.parentNode.children[0].textContent;
				const seatNumber = table.querySelector('tr').cells[clickedCell.cellIndex].textContent;
				const seatData = {
					seat: clickedCell,
					labNumber: labNumber,
					timeSlot: timeSlot,
					seatNumber: seatNumber
				};
				const index = selectedSeats.findIndex(item => item.seat === clickedCell);
				if (index !== -1) {
					selectedSeats.splice(index, 1);
				} else {
					selectedSeats.push(seatData);
				}
				updateSelectedSeats();
			}
        }
    });

    function updateSelectedSeats() {
        selectedSlotsContainer.innerHTML = "Selected Seats: <br>" + selectedSeats.map(seatData => {
            return `Lab ${seatData.labNumber}, Time: ${seatData.timeSlot}, ${seatData.seatNumber}`;
        }).join("<br>");
		
		selectedSeats.forEach(seatData => {
			seatData.seat.style.backgroundColor = '#ECA625';
		});
    }
    
    updateSelectedDate();
    createLabs();
    populateLabDropdown();
});
