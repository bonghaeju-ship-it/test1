document.getElementById('generate-btn').addEventListener('click', generateLottoNumbers);

function generateLottoNumbers() {
  const numbers = [];
  while (numbers.length < 6) {
    const num = Math.floor(Math.random() * 45) + 1;
    if (!numbers.includes(num)) {
      numbers.push(num);
    }
  }

  // Sort numbers in ascending order
  numbers.sort((a, b) => a - b);

  const container = document.getElementById('lotto-numbers');
  container.innerHTML = ''; // Clear previous numbers

  numbers.forEach(num => {
    const ball = document.createElement('div');
    ball.classList.add('ball');
    ball.innerText = num;
    
    // Assign color based on the number range
    if (num <= 10) {
      ball.classList.add('color-yellow');
    } else if (num <= 20) {
      ball.classList.add('color-blue');
    } else if (num <= 30) {
      ball.classList.add('color-red');
    } else if (num <= 40) {
      ball.classList.add('color-grey');
    } else {
      ball.classList.add('color-green');
    }

    container.appendChild(ball);
  });
}
