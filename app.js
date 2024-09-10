const container = document.getElementById('app');
const daysContainer = document.createElement('div');
const timeContainer = document.createElement('div');
const emojiContainer = document.createElement('div');
const emojiFilled = document.createElement('span');
const emojiEmpty = document.createElement('span');

container.appendChild(daysContainer);
container.appendChild(timeContainer);
container.appendChild(emojiContainer);

emojiContainer.classList.add('emoji');
emojiContainer.appendChild(emojiFilled);
emojiContainer.appendChild(emojiEmpty);
emojiFilled.classList.add('filled');
emojiEmpty.classList.add('empty');

const targetDateInUTC = new Date('2024-09-22T11:30:00Z');
const heartArray = new Array(60).fill(undefined);

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
  timeContainer.textContent =
    `${String(hours)
      .padStart(2, '0')}:${String(minutes)
      .padStart(2, '0')}:${String(seconds)
      .padStart(2, '0')}`;

  if (seconds === 0) {
    container.classList.add("stress");
  }

  if (seconds === 55) {
    container.classList.remove("stress");
  }

  const { filled = '', empty = '' } = heartArray.reduce((strings, _, index) => {
    (index <= seconds) ? strings.filled += '♥ ' : strings.empty += '♥ ';
    return strings;
  }, {filled: '', empty: ''})
  emojiFilled.textContent = filled;
  emojiEmpty.textContent = empty;

  setTimeout(() => {
    requestAnimationFrame(updateCountdown);
  }, 100);
}

updateCountdown();