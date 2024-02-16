document.addEventListener('DOMContentLoaded', () => {
    let reservations = [
        { 
            lab: 'Lab 1', 
            timeSlot: '09:00 AM - 9:30 AM', 
            seatNo: 1, 
            user: 'Maria Santos', 
            requestDateTime: '2023-10-01 08:00',
            reservationDateTime: '2023-10-03 09:00'
        },
        { 
            lab: 'Lab 2', 
            timeSlot: '10:00 AM - 10:30 AM', 
            seatNo: 2, 
            user: 'Pedro Reyes', 
            requestDateTime: '2023-10-02 09:30',
            reservationDateTime: '2023-10-04 10:00'
        },
		{ 
            lab: 'Lab 3', 
            timeSlot: '2:30 PM - 3:00 PM', 
            seatNo: 9, 
            user: 'Diego Garcia', 
            requestDateTime: '2023-10-02 09:30',
            reservationDateTime: '2023-10-07 2:30'
        },
    ];

    populateTable(reservations);

    document.getElementById('labFilter').addEventListener('change', function() {
        filterAndSortReservations();
    });

    document.getElementById('sortSelect').addEventListener('change', function() {
        filterAndSortReservations();
    });

    function filterAndSortReservations() {
        let filteredReservations = filterReservations(reservations);
        let sortedReservations = sortReservations(filteredReservations);
        populateTable(sortedReservations);
    }

    function filterReservations(reservations) {
        let labFilter = document.getElementById('labFilter').value;
        return reservations.filter(reservation => labFilter === '0' || reservation.lab === `Lab ${labFilter}`);
    }

    function sortReservations(reservations) {
        let sortValue = document.getElementById('sortSelect').value;
        return reservations.sort((a, b) => {
            if (a[sortValue] < b[sortValue]) return -1;
            if (a[sortValue] > b[sortValue]) return 1;
            return 0;
        });
    }

    function populateTable(reservations) {
        const tableBody = document.getElementById('reservationsTable').getElementsByTagName('tbody')[0];
        tableBody.innerHTML = ''; 
        reservations.forEach(reservation => {
            let row = tableBody.insertRow();
            ['lab', 'timeSlot', 'seatNo', 'user','requestDateTime', 'reservationDateTime'].forEach(field => {
                let cell = row.insertCell();
                cell.textContent = reservation[field];
            });
        });
    }
});