const container = document.getElementById('app');
const daysContainer = document.createElement('div');
const timeContainer = document.createElement('div');
container.appendChild(daysContainer);
container.appendChild(timeContainer);
const targetDateInUTC = new Date("2024-09-22T11:30:00Z");

function updateCountdown() {
  const now = new Date();
  const timeDifference = targetDateInUTC.getTime() - now.getTime();

  if (timeDifference <= 0) {
    container.textContent = "00:00:00";
    return;
  }

  const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

  daysContainer.textContent = days < 1 ? '' : `${String(days)} days`;
  timeContainer.textContent = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  setTimeout(() => {
    requestAnimationFrame(updateCountdown);
  }, 100);
}

updateCountdown();