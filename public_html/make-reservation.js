// Parse the query string from the URL
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

// Initialize an empty array to store the selected seats
const selectedSeats = [];

// Iterate over each parameter in the query string
for (const [key, value] of urlParams.entries()) {
    // Split the parameter value into individual components (labNumber, timeSlot, seatNumber)
    const [labNumber, timeSlot, seatNumber] = value.split('&');

    // Push the parsed data into the selectedSeats array
    selectedSeats.push({
        labNumber: labNumber,
        timeSlot: timeSlot,
        seatNumber: seatNumber
    });
}

// Now you have the selectedSeats array populated with the data from the query string
// You can operate on this array as needed
// Log the contents of the selectedSeats array to the console
console.log("Selected Seats:", selectedSeats);
