document.addEventListener('DOMContentLoaded', () => {
    let reservations = [
        { 
            lab: 'Lab 1', 
            timeSlot: '09:00 - 10:00', 
            seatNo: 1, 
            user: 'John Doe', 
            status: 'Confirmed',
            requestDateTime: '2023-10-01 08:00', // Date and time of reservation request
            reservationDateTime: '2023-10-03 09:00' // Date and time of the reservation
        },
        { 
            lab: 'Lab 2', 
            timeSlot: '10:00 - 11:00', 
            seatNo: 2, 
            user: 'Jane Doe', 
            status: 'Confirmed',
            requestDateTime: '2023-10-02 09:30',
            reservationDateTime: '2023-10-04 10:00'
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
            // Adjusted to include new fields
            ['lab', 'timeSlot', 'seatNo', 'user', 'status', 'requestDateTime', 'reservationDateTime'].forEach(field => {
                let cell = row.insertCell();
                cell.textContent = reservation[field];
            });
        });
    }
});