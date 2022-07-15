const OPTIONS = ['🗿', '📄', '✂️', '🦎', '✌'];
const LOSERS = {
  '📄': ['🗿', '✌'],
  '🗿': ['✂️', '🦎'],
  '✂️': ['📄', '🦎'],
  '🦎': ['📄', '✌'],
  '✌': ['🗿', '✂️'],
};

document
  .querySelectorAll('button')
  .forEach((button) =>
    button.addEventListener('click', () => startGame(button.textContent)),
  );

const status = document.querySelector('.status');
const startGame = (playerOption) => {
  const cpuIndex = Math.floor(Math.random() * OPTIONS.length);
  const cpuOption = OPTIONS[cpuIndex];

  status.innerHTML =
    `Player ${playerOption} - CPU ${cpuOption}<br>` +
    (LOSERS[playerOption].includes(cpuOption)
      ? 'Has ganado'
      : cpuOption === playerOption
      ? 'Empate'
      : 'Has perdido');
};
