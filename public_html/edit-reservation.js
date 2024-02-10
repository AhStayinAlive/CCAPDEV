document.addEventListener('DOMContentLoaded', function() {
  const reservationsTableBody = document.querySelector('#reservations tbody');
  const editFormContainer = document.getElementById('editFormContainer');
  
  // Sample reservation data
  let reservationData = [
    { id: 1, lab: 1, time: '9:00 AM', seat: 1, user: 'Juan dela Cruz' },
  { id: 2, lab: 2, time: '9:30 AM', seat: 2, user: 'Maria Santos' },
  { id: 3, lab: 3, time: '10:00 AM', seat: 3, user: 'Pedro Reyes' },
  { id: 4, lab: 1, time: '10:30 AM', seat: 4, user: 'Sofia Rivera' },
  { id: 5, lab: 2, time: '11:00 AM', seat: 5, user: 'Diego Garcia' },
  { id: 6, lab: 3, time: '11:30 AM', seat: 6, user: 'Juan dela Cruz' },
  { id: 7, lab: 1, time: '12:00 PM', seat: 7, user: 'Maria Santos' },
  { id: 8, lab: 2, time: '12:30 PM', seat: 8, user: 'Pedro Reyes' },
  { id: 9, lab: 3, time: '1:00 PM', seat: 9, user: 'Sofia Rivera' },
  { id: 10, lab: 1, time: '1:30 PM', seat: 10, user: 'Diego Garcia' },
  { id: 11, lab: 2, time: '2:00 PM', seat: 1, user: 'Juan dela Cruz' },
  { id: 12, lab: 3, time: '2:30 PM', seat: 2, user: 'Maria Santos' },
  { id: 13, lab: 1, time: '3:00 PM', seat: 3, user: 'Pedro Reyes' },
  { id: 14, lab: 2, time: '3:30 PM', seat: 4, user: 'Sofia Rivera' },
  { id: 15, lab: 3, time: '4:00 PM', seat: 5, user: 'Diego Garcia' },
  { id: 16, lab: 1, time: '4:30 PM', seat: 6, user: 'Juan dela Cruz' },
  { id: 17, lab: 2, time: '5:00 PM', seat: 7, user: 'Maria Santos' },
  { id: 18, lab: 3, time: '5:30 PM', seat: 8, user: 'Pedro Reyes' },
  { id: 19, lab: 1, time: '6:00 PM', seat: 9, user: 'Sofia Rivera' },
  { id: 20, lab: 2, time: '6:30 PM', seat: 10, user: 'Diego Garcia' },
    // Add more sample data rows as needed
  ];

  // Display reservations
  function displayReservations() {
    reservationsTableBody.innerHTML = '';
    reservationData.forEach(reservation => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${reservation.lab}</td>
        <td>${reservation.time}</td>
        <td>${reservation.seat}</td>
        <td>${reservation.user}</td>
        <td><button class="editButton" data-id="${reservation.id}">Edit</button></td>
      `;
      reservationsTableBody.appendChild(row);
    });
  }

  // Event listener for edit button click
  reservationsTableBody.addEventListener('click', function(event) {
    if (event.target.classList.contains('editButton')) {
      const reservationId = parseInt(event.target.dataset.id);
      const reservation = reservationData.find(reservation => reservation.id === reservationId);
      if (reservation) {
        showEditForm(reservation);
      }
    }
  });

  // Function to show edit form
  function showEditForm(reservation) {
    const editForm = `
      <form id="editForm">
        <label for="editLab">Lab:</label>
        <input type="text" id="editLab" name="editLab" value="${reservation.lab}" disabled><br><br>
        <label for="editTime">Time Slot:</label>
        <input type="text" id="editTime" name="editTime" value="${reservation.time}" disabled><br><br>
        <label for="editSeat">Seat No.:</label>
        <input type="text" id="editSeat" name="editSeat" value="${reservation.seat}"><br><br>
        <label for="editUser">User:</label>
        <input type="text" id="editUser" name="editUser" value="${reservation.user}" disabled><br><br>
        <button type="submit">Save</button>
      </form>
    `;
    editFormContainer.innerHTML = editForm;
    editFormContainer.style.display = 'block';
    
    // Event listener for form submission
    const editFormElement = document.getElementById('editForm');
    editFormElement.addEventListener('submit', function(event) {
      event.preventDefault();
      const editedReservation = {
        ...reservation,
        seat: parseInt(editFormElement.elements.editSeat.value)
      };
      updateReservation(editedReservation);
    });
  }

  // Function to update reservation
  function updateReservation(editedReservation) {
    // Update reservation in the data
    const index = reservationData.findIndex(reservation => reservation.id === editedReservation.id);
    if (index !== -1) {
      reservationData[index] = editedReservation;
    }
    // Hide edit form
    editFormContainer.style.display = 'none';
    // Redisplay reservations
    displayReservations();
  }

  // Initial display
  displayReservations();
});
