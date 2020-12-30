const snakeboard = document.getElementById("gameCanvas");
const ctx = gameCanvas.getContext("2d");
const snake_col = 'lightblue';
const snake_border = 'darkblue';
const background = '#e5e5cc';
const border = "black";

let snake = [ {x:200, y:200}, {x:190, y:200}, {x:180, y:200}, {x:170, y:200}, {x:160, y:200},];
let dx = 10;
let dy = 0;
let score = 0;

gen_food();
document.addEventListener("keydown", change_direction);

function main()
{
 if (has_game_ended())
  return;

 setTimeout(function onTick()
 {
  clearCanvas();
  drawFood();
  move_snake();
  drawSnake();
  main();
 }, 100-score)
}


function drawSnakePart(snakePart)
{
  ctx.fillStyle = snake_col;
  ctx.strokestyle = snake_border;
  ctx.fillRect(snakePart.x, snakePart.y, 10, 10);
  ctx.strokeRect(snakePart.x, snakePart.y, 10, 10);
}

function drawSnake()
{
 snake.forEach(drawSnakePart);
}

function clearCanvas()
{
  ctx.fillStyle = background;
  ctx.strokestyle = border;
  ctx.fillRect(0, 0, snakeboard.width, snakeboard.height);
  ctx.strokeRect(0, 0, snakeboard.width, snakeboard.height);
}

function move_snake()
{
  const head = {x: snake[0].x + dx, y: snake[0].y + dy};
  snake.unshift(head);
  const has_eaten_food = snake[0].x === food_x && snake[0].y === food_y;
  if (has_eaten_food){
   score++;
   document.getElementById('score').innerHTML = score;
   gen_food();
  }
  else
   snake.pop();
}

function change_direction(event)
{
  const LEFT_KEY = 37;
  const RIGHT_KEY = 39;
  const UP_KEY = 38;
  const DOWN_KEY = 40;

  const keyPressed = event.keyCode;
  const goingUp = dy === -10;
  const goingDown = dy === 10;
  const goingRight = dx === 10;
  const goingLeft = dx === -10;

  if (keyPressed === LEFT_KEY && !goingRight)
   {
	dx = -10;
	dy = 0;
   }

  if (keyPressed === RIGHT_KEY && !goingLeft)
   {
        dx = 10;
        dy = 0;
   }

  if (keyPressed === DOWN_KEY && !goingUp)
   {
        dx = 0;
        dy = 10;
   }

  if (keyPressed === UP_KEY && !goingDown)
   {
        dx = 0;
        dy = -10;
   }
}

function has_game_ended()
{
 for (let i=4; i<snake.length; i++)
 {
  const has_collided = snake[i].x === snake[0].x && snake[i].y === snake[0].y;
  if (has_collided)
    return true;
 }
 const hitLeftWall = snake[0].x < 0;
 const hitRightWall = snake[0].x > snakeboard.width-10;
 const hitTopWall = snake[0].y < 0;
 const hitBottomWall = snake[0].y > snakeboard.height - 10;

 return hitLeftWall || hitRightWall || hitTopWall || hitBottomWall
}

function random_food(min, max)
{
  return Math.round((Math.random() * (max-min) + min) / 10) * 10;
}

function gen_food()
{
 food_x = random_food(0, snakeboard.width-10);
 food_y = random_food(0, snakeboard.height-10);
 snake.forEach(function has_snake_eaten_food(part){
	const has_eaten = part.x == food_x && part.y == food_y;
	if (has_eaten)
	  gen_food();
	});
}

function drawFood()
{
  ctx.fillStyle = 'lightgreen';
  ctx.strokestyle = 'darkgreen';
  ctx.fillRect(food_x, food_y, 10, 10);
  ctx.strokeRect(food_x, food_y, 10, 10);
}

function start()
{
 snake = [ {x:200, y:200}, {x:190, y:200}, {x:180, y:200}, {x:170, y:200}, {x:160, y:200},];
 score = 0;
 document.getElementById('score').innerHTML = score;
 main();
}
