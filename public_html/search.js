document.addEventListener('DOMContentLoaded', function() {
    const selectedDateElement = document.querySelector('.selected-date');
    const prevDateButton = document.querySelector('.prev-date');
    const nextDateButton = document.querySelector('.next-date');
    const timeSlotsContainer = document.querySelector('.time-slots-container');
    const proceedButton = document.querySelector('.proceed-button');
    const labDropdown = document.querySelector('.lab-dropdown');
    const selectedSlotsContainer = document.querySelector('.selected-slots');
    const calendarContainer = document.querySelector('.calendar-container');

    let currentDate = new Date();
    let currentLab = 1; // Default lab selection

    function updateSelectedDate() {
        selectedDateElement.textContent = currentDate.toDateString();
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

        // Reserved seats structure should be adjusted based on the current lab and date selection
        // This is a placeholder for the structure. Actual implementation would require
        // fetching this data based on the lab and date.
        const reservedSeats = {
            // Example data structure
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
                    // Adjust logic to mark a seat as reserved based on new data structure
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
    
    function populateLabDropdown() {
        // Adjust the number of labs if needed
        for (let i = 1; i <= 3; i++) {
            const option = document.createElement('option');
            option.value = i;
            option.textContent = `Lab ${i}`;
            labDropdown.appendChild(option);
        }
    }
    
    function generateWeekCalendar() {
        calendarContainer.innerHTML = '';
    
        let startOfWeek = new Date(currentDate);
        startOfWeek.setDate(currentDate.getDate() - currentDate.getDay());
        
        for (let i = 0; i < 7; i++) {
            const date = new Date(startOfWeek);
            date.setDate(startOfWeek.getDate() + i);
    
            const dateButton = document.createElement('button');
            dateButton.classList.add('date-button', 'calendar-day');
            dateButton.textContent = date.toDateString();
            dateButton.value = date.toISOString().split('T')[0];
    
            dateButton.addEventListener('click', function() {
                currentDate = new Date(this.value);
                updateSelectedDate();
                createLabs(); // Refresh slots based on the selected date
            });
    
            calendarContainer.appendChild(dateButton);
        }
    }
    
    labDropdown.addEventListener('change', function() {
        currentLab = this.value; // Update current lab based on selection
        createLabs(); // Refresh slots based on the selected lab
    });
    
    updateSelectedDate();
    createLabs();
    populateLabDropdown();
    generateWeekCalendar();
});
