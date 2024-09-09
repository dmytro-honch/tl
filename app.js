const container = document.getElementById('app');
const daysContainer = document.createElement('div');
const timeContainer = document.createElement('div');
const emojiContainer = document.createElement('div');

container.appendChild(daysContainer);
container.appendChild(timeContainer);
container.appendChild(emojiContainer);

emojiContainer.classList.add('emoji');

const targetDateInUTC = new Date("2024-09-22T11:30:00Z");

const heartArray = ["♡", "♥"];

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

  let str = "";
  for (let i = 0; i < 60; i++) {
    str += " ";
    if (i <= seconds) {
      str += heartArray[1];
    } else {
      str += "♡";
    }
  }
  emojiContainer.textContent = str;

  setTimeout(() => {
    requestAnimationFrame(updateCountdown);
  }, 100);
}

updateCountdown();