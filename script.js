const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const movieSelect = document.getElementById('movie');
const count = document.getElementById('count');
const total = document.getElementById('total');

populateData();

let ticketPrice = +movieSelect.value;


//set movie data to local storage
function setMovieData(movieIndex, moviePrice) {
  localStorage.setItem('selectedMovieIndex', movieIndex);
  localStorage.setItem('selectedMoviePrice', moviePrice);
}

//update count and total data
function updateSelectedSeatCount() {
  const selectedSeat = document.querySelectorAll('.row .seat.selected');
  const selectedSeatCount = selectedSeat.length;
  const selectedSeatIndex = [...selectedSeat].map( seat => [...seats].indexOf(seat));

  //set selected seat index in local storage
  localStorage.setItem('selectedSeats', JSON.stringify(selectedSeatIndex));

  count.innerHTML = selectedSeatCount;
  total.innerHTML = selectedSeatCount * ticketPrice;
}

//get data from local storage
function populateData() {
  const selectedSeatIndex = JSON.parse(localStorage.getItem('selectedSeats'));

  if (selectedSeatIndex !== null && selectedSeatIndex.length > 0) {
    seats.forEach((seat, index) => {
      if (selectedSeatIndex.indexOf(index) > -1) {
        seat.classList.add('selected');
      }
    });
  }

  const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');

  if (selectedMovieIndex !== null) {
    movieSelect.selectedIndex = selectedMovieIndex;
  }
}

//movie select event
movieSelect.addEventListener('change', e => {
  ticketPrice = +e.target.value;
  setMovieData(e.target.selectedIndex, e.target.value);
  updateSelectedSeatCount();
});

//seat select event
container.addEventListener('click', e => {
  if (e.target.classList.contains('seat') && !e.target.classList.contains('occupied')) {
    e.target.classList.toggle('selected');
    updateSelectedSeatCount();
  }
});

//set initial count and totla data
updateSelectedSeatCount();