document.addEventListener('DOMContentLoaded', function() {
  const reservationsTableBody = document.querySelector('#reservations tbody');
  const cancelMessageDiv = document.getElementById('cancelMessage');
  const labFilterSelect = document.getElementById('labFilter');
  const sortSelect = document.getElementById('sortSelect');

  // Sample reservation data - Replace with actual data fetched from the server
  let reservationData = [
    { lab: 1, time: '9:00 AM', user: 'Juan dela Cruz', status: 'Not checked in', minutesLate: 5 },
    { lab: 2, time: '9:30 AM', user: 'Maria Santos', status: 'Checked in', minutesLate: 0 },
    { lab: 3, time: '10:00 AM', user: 'Pedro Reyes', status: 'Not checked in', minutesLate: 7 },
    { lab: 1, time: '10:30 AM', user: 'Sofia Rivera', status: 'Not checked in', minutesLate: 0 },
    { lab: 2, time: '11:00 AM', user: 'Diego Garcia', status: 'Checked in', minutesLate: 0 },
    { lab: 3, time: '11:30 AM', user: 'Carmela Hernandez', status: 'Checked in', minutesLate: 0 },
    { lab: 1, time: '12:00 PM', user: 'Josefina Lim', status: 'Not checked in', minutesLate: 10 },
    { lab: 2, time: '12:30 PM', user: 'Ramon Cruz', status: 'Not checked in', minutesLate: 0 },
    { lab: 3, time: '1:00 PM', user: 'Luz Reyes', status: 'Checked in', minutesLate: 0 },
    { lab: 1, time: '1:30 PM', user: 'Elena Santos', status: 'Checked in', minutesLate: 0 },
    { lab: 2, time: '2:00 PM', user: 'Antonio dela Cruz', status: 'Checked in', minutesLate: 0 },
    { lab: 3, time: '2:30 PM', user: 'Angela Garcia', status: 'Not checked in', minutesLate: 12 },
    { lab: 1, time: '3:00 PM', user: 'Felipe Santos', status: 'Not checked in', minutesLate: 0 },
    { lab: 2, time: '3:30 PM', user: 'Carmen Reyes', status: 'Checked in', minutesLate: 0 },
    { lab: 3, time: '4:00 PM', user: 'Emilio Santos', status: 'Not checked in', minutesLate: 0 },
    { lab: 1, time: '4:30 PM', user: 'Rosario Cruz', status: 'Not checked in', minutesLate: 0 },
    { lab: 2, time: '5:00 PM', user: 'Luis Garcia', status: 'Not checked in', minutesLate: 0 },
    { lab: 3, time: '5:30 PM', user: 'Adriana Santos', status: 'Checked in', minutesLate: 0 },
    { lab: 1, time: '6:00 PM', user: 'Rodrigo Cruz', status: 'Not checked in', minutesLate: 0 },
    { lab: 2, time: '6:30 PM', user: 'Marisol Reyes', status: 'Checked in', minutesLate: 0 },
    // Add more sample data rows as needed
];


  // Function to populate reservations table
  function displayReservations() {
    reservationsTableBody.innerHTML = ''; // Clear previous data
    let filteredData = reservationData;
    const selectedLab = parseInt(labFilterSelect.value);
    if (selectedLab !== 0) {
      filteredData = reservationData.filter(reservation => reservation.lab === selectedLab);
    }
    // Sort data
    const sortBy = sortSelect.value;
    if (sortBy === 'lab') {
      filteredData.sort((a, b) => a.lab - b.lab);
    } else if (sortBy === 'time') {
      filteredData.sort((a, b) => {
        // Convert time strings to 24-hour format for proper comparison
        const timeA = convertTo24Hour(a.time);
        const timeB = convertTo24Hour(b.time);
        return timeA.localeCompare(timeB);
      });
    } else if (sortBy === 'user') {
      filteredData.sort((a, b) => a.user.localeCompare(b.user));
    }
    filteredData.forEach(reservation => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${reservation.lab}</td>
        <td>${reservation.time}</td>
        <td>${reservation.user}</td>
        <td>${reservation.status} (${reservation.minutesLate} minutes late)</td>
        <td>
          ${reservation.status === 'Not checked in' ? 
            `<button class="cancelButton" data-lab="${reservation.lab}" data-time="${reservation.time}" data-user="${reservation.user}">Cancel Reservation</button>` : ''}
        </td>
      `;
      reservationsTableBody.appendChild(row);
    });
  }

  // Function to cancel reservation
  function cancelReservation(lab, time, user) {
    // Logic to cancel reservation
    cancelMessageDiv.textContent = `Reservation for lab ${lab}, time: ${time}, user: ${user} has been canceled.`;
    // Simulated cancellation
    reservationData = reservationData.filter(reservation => !(reservation.lab == lab && reservation.time == time && reservation.user == user));
    // Refresh reservations table
    displayReservations();
  }

  // Event listener for cancel button click
  reservationsTableBody.addEventListener('click', function(event) {
    if (event.target.classList.contains('cancelButton')) {
      const lab = event.target.dataset.lab;
      const time = event.target.dataset.time;
      const user = event.target.dataset.user;
      cancelReservation(lab, time, user);
    }
  });

  // Event listener for lab filter
  labFilterSelect.addEventListener('change', function() {
    displayReservations();
  });

  // Event listener for sort select
  sortSelect.addEventListener('change', function() {
    displayReservations();
  });
  
  // Function to cancel all late reservations
  function cancelAllLateReservations() {
    let canceledCount = 0;
    reservationData = reservationData.filter(reservation => {
      if (reservation.minutesLate >= 10) { // Check if reservation is late
        canceledCount++;
        return false; // Remove late reservation
      }
      return true; // Keep non-late reservation
    });
    // Refresh reservations table
    displayReservations();
    // Display appropriate message
    cancelMessageDiv.textContent = `${canceledCount} late reservations have been canceled.`;
  }

  // Event listener for Cancel All button click
  const cancelAllButton = document.getElementById('cancelAllButton');
  cancelAllButton.addEventListener('click', function() {
    cancelAllLateReservations();
  });

  // Initial display
  displayReservations();
});

// Function to convert time from 12-hour format to 24-hour format
function convertTo24Hour(time12h) {
  const [time, modifier] = time12h.split(' ');
  let [hours, minutes] = time.split(':');
  if (hours === '12') {
    hours = '00';
  }
  if (modifier === 'PM') {
    hours = parseInt(hours, 10) + 12;
  }
  return `${hours}:${minutes}`;
}