//your code here
// Game Variables
const gameContainer = document.getElementById('gameContainer');
const scoreDisplay = document.getElementById('score');
let snake = [{ x: 0, y: 19 }]; // Snake starting position
let food = {};
let score = 0;
let direction = { x: 1, y: 0 }; // Moving right
const gridSize = 40; // 40x40 grid
let gameInterval;

// Create Grid
function createGrid() {
  for (let row = 0; row < gridSize; row++) {
    for (let col = 0; col < gridSize; col++) {
      const pixel = document.createElement('div');
      pixel.classList.add('pixel');
      pixel.id = `pixel:${col}-${row}`;
      gameContainer.appendChild(pixel);
    }
  }
}

// Generate Food
function generateFood() {
  const randomX = Math.floor(Math.random() * gridSize);
  const randomY = Math.floor(Math.random() * gridSize);
  food = { x: randomX, y: randomY };
  const foodPixel = document.getElementById(`pixel:${randomX}-${randomY}`);
  foodPixel.classList.add('food');
}

// Move Snake
function moveSnake() {
  // Calculate new head
  const newHead = {
    x: (snake[0].x + direction.x + gridSize) % gridSize,
    y: (snake[0].y + direction.y + gridSize) % gridSize,
  };

  // Check for collision with itself
  if (snake.some(pixel => pixel.x === newHead.x && pixel.y === newHead.y)) {
    clearInterval(gameInterval);
    alert('Game Over! Your score: ' + score);
    return;
  }

  // Add new head
  snake.unshift(newHead);

  // Check for food
  if (newHead.x === food.x && newHead.y === food.y) {
    score++;
    scoreDisplay.textContent = score;
    document.getElementById(`pixel:${food.x}-${food.y}`).classList.remove('food');
    generateFood();
  } else {
    // Remove tail
    const tail = snake.pop();
    document.getElementById(`pixel:${tail.x}-${tail.y}`).classList.remove('snakeBodyPixel');
  }

  // Update snake in DOM
  snake.forEach(pixel => {
    const snakePixel = document.getElementById(`pixel:${pixel.x}-${pixel.y}`);
    snakePixel.classList.add('snakeBodyPixel');
  });
}

// Change Direction
function changeDirection(event) {
  switch (event.key) {
    case 'ArrowUp':
      if (direction.y === 0) direction = { x: 0, y: -1 };
      break;
    case 'ArrowDown':
      if (direction.y === 0) direction = { x: 0, y: 1 };
      break;
    case 'ArrowLeft':
      if (direction.x === 0) direction = { x: -1, y: 0 };
      break;
    case 'ArrowRight':
      if (direction.x === 0) direction = { x: 1, y: 0 };
      break;
  }
}

// Initialize Game
function startGame() {
  createGrid();
  generateFood();
  gameInterval = setInterval(moveSnake, 100);
  window.addEventListener('keydown', changeDirection);
}

startGame();
