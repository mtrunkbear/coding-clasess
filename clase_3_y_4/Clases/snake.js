const readline = require('readline');

class SnakeGame {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.snake = [{ x: Math.floor(width / 2), y: Math.floor(height / 2) }];
    this.food = this.generateFood();
    this.direction = { x: 1, y: 0 };
    this.gameOver = false;

    this.initReadline();
    this.render();
    this.startGameLoop();
  }

  initReadline() {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });

    readline.emitKeypressEvents(process.stdin);
    process.stdin.setRawMode(true);

    rl.input.on('keypress', (str, key) => {
      if (key.name === 'w' && this.direction.y === 0) this.direction = { x: 0, y: -1 };
      if (key.name === 's' && this.direction.y === 0) this.direction = { x: 0, y: 1 };
      if (key.name === 'a' && this.direction.x === 0) this.direction = { x: -1, y: 0 };
      if (key.name === 'd' && this.direction.x === 0) this.direction = { x: 1, y: 0 };

    });
  }

  generateFood() {
    let newFood;
    do {
      newFood = {
        x: Math.floor(Math.random() * this.width),
        y: Math.floor(Math.random() * this.height)
      };
    } while (this.snake.some(segment => segment.x === newFood.x && segment.y === newFood.y));
    return newFood;
  }

  update() {
    if (this.gameOver) return;

    const head = { x: this.snake[0].x + this.direction.x, y: this.snake[0].y + this.direction.y };

    if (head.x < 0 || head.x >= this.width || head.y < 0 || head.y >= this.height) {
      this.gameOver = true;
      console.log('Game Over! You hit the wall.');
      return;
    }

    for (const segment of this.snake) {
      if (head.x === segment.x && head.y === segment.y) {
        this.gameOver = true;
        console.log('Game Over! You ran into yourself.');
        return;
      }
    }

    this.snake.unshift(head);

    if (head.x === this.food.x && head.y === this.food.y) {
      this.food = this.generateFood();
    } else {
      this.snake.pop();
    }

    this.render();
  }

  render() {
    console.clear();
    for (let y = 0; y < this.height; y++) {
      let row = '';
      for (let x = 0; x < this.width; x++) {
        if (this.snake.some(segment => segment.x === x && segment.y === y)) {
          row += 'O';
        } else if (this.food.x === x && this.food.y === y) {
          row += 'X';
        } else {
          row += '.';
        }
      }
      console.log(row);
    }
  }

  startGameLoop() {
    setInterval(() => this.update(), 200);
  }
}

// Crear una instancia del juego Snake con un tamaño de tablero de 40x20
new SnakeGame(40, 20);
