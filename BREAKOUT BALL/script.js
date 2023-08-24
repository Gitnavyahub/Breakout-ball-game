let grid = document.querySelector('.grid');
for(let i = 1; i <=64; i++){
    let div = document.createElement('div');
    grid.appendChild(div);
}


let ball = document.querySelector('.ball');
ballDirectionX = 1,
ballDirectionY = 1,
count = 0;

let blocks = document.querySelectorAll('.grid div');

let paddle = document.querySelector('.paddle');

//move the ball
function moveBall(){
    let ballLeft = parseInt(window.getComputedStyle(ball).getPropertyValue('left'));
    let ballTop = parseInt(window.getComputedStyle(ball).getPropertyValue('top'));

    ball.style.left = (ballLeft + (5 * ballDirectionX)) + 'px';
    ball.style.top = (ballTop - (5 * ballDirectionY)) + 'px';
}

// change ball's direction if ball hits the wall
function changeDirection(){
    let ballLeft = parseInt(window.getComputedStyle(ball).getPropertyValue('left'));
    let ballTop = parseInt(window.getComputedStyle(ball).getPropertyValue('top'));
    let ballWidth = parseInt(window.getComputedStyle(ball).getPropertyValue('width'));
    let ballHeight = parseInt(window.getComputedStyle(ball).getPropertyValue('height'));
    
    if(ballLeft < 0 || ballLeft > window.innerWidth - ballWidth){
        ballDirectionX = -ballDirectionX;
    }
    if(ballTop < 0 || ballTop > window.innerHeight - ballHeight){
        ballDirectionY = -ballDirectionY;
    }
}

//remove the blocks
function removeBlock(){
    blocks.forEach(block => {
        let blockPos = block.getBoundingClientRect();
        let ballPos = ball.getBoundingClientRect();

        //if ball hits the block, the block will disappear
        if(blockPos.left < ballPos.right && blockPos.top < ballPos.bottom && blockPos.right > ballPos.left && blockPos.bottom > ballPos.top && !block.classList.contains('remove')){
            block.classList.add('remove');
            ballDirectionY = -ballDirectionY;
            count++;
        }
    });
}

// move the paddle
function movePaddle(e){
    let mousePos = {
        x: e.clientX,
        y: e.clientY
    }

    if(mousePos.x > 0 && mousePos.x < window.innerWidth - 70){
        paddle.style.left = mousePos.x - 30 + 'px';
    }
}

function collision(){
    let paddlePos = paddle.getBoundingClientRect();
    ballPos = ball.getBoundingClientRect();
    //if ball touches the paddle, the ball will jump back
    if(paddlePos.left < ballPos.right && paddlePos.top < ballPos.bottom && paddlePos.right > ballPos.left && paddlePos.bottom > ballPos.top){
        ballDirectionY = -ballDirectionY;
    }
}

//check for gameover
function gameOver(){
    let ballTop = parseInt(window.getComputedStyle(ball).getPropertyValue('top'));
    let ballHeight = parseInt(window.getComputedStyle(ball).getPropertyValue('height'));

    if(ballTop > window.innerHeight - ballHeight){
        alert('Game Over!');
        location.reload();
    }
}

//check for winner
function checkForWin(){
    if(count == 64){
        alert('YOU WIN!');
        location.reload();  
    }
}

//start the game
function startGame(){
    moveBall(); 
    changeDirection();
    removeBlock();
    collision();
    gameOver();
    checkForWin();
}

document.addEventListener('mousemove', movePaddle);

setInterval(startGame, 20);
 

