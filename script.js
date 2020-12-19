let canvas = document.getElementById("snake");
let context = canvas.getContext("2d");
let box = 32; /* quadrado com 32 pixels */
let snake = [];
snake[0] = {
    x: 8 * box,
    y: 8 * box
}
let direction = "right";
let food = {  /* A comida precisa aparecer em lugares aleatórios e incrementar tamanho a cobrinha */
    x:  Math.floor(Math.random() * 15 + 1) * box, /* Math.floor retira a parte flutuante (o .0) o Math.random gera uma numeração randômica */
    y:  Math.floor(Math.random() * 15 + 1) * box
}

function criarBG() { /* Função início do canvas */
    context.fillStyle = "rgb(5, 30, 5)"; /* O fillRect desenha o retangulo do jogo nos seguintes parametros (posição x e y, altura e largura) */
    context.fillRect(0, 0, 16 * box, 16 * box);
}

function criarCobrinha(){
    for( i=0; i < snake.length; i++){
        context.fillStyle = "darkred";
        context.fillRect(snake[i].x, snake[i].y, box, box);
    }
}

function drawFood(){ /* Alimento da cobra */
    context.fillStyle = "rgb(170, 130, 5)";
    context.fillRect(food.x, food.y, box, box); /* Paramentros de geração da comida */
}

/* Comandos de controle da cobra */

document.addEventListener('keydown', update);

function update (event){
    if(event.keyCode == 37 && direction != "right") direction = "left"; /* A direção não pode ser oposta para não dar erro na cobrinha, por isso será criada uma condicional & informando que não pode ser a direção oposta */
    if(event.keyCode == 38 && direction != "down") direction = "up";
    if(event.keyCode == 39 && direction != "left") direction = "right";
    if(event.keyCode == 40 && direction != "up") direction = "down";
}



function iniciarJogo(){
    if(snake[0].x > 15 * box && direction == "right") snake[0].x = 0; /* Se a cobrinha atingir o valor 15 (final da tela) será atribuido o valor 0 (inicial da tela) e ela continuará o movimento */
    if(snake[0].x < 0 && direction == "left") snake[0].x = 16 * box;
    if(snake[0].y > 15 * box && direction == "down") snake[0].y = 0;
    if(snake[0].y < 0 && direction == "up") snake[0].y = 16 * box;

    /* Game Over */

    for(i = 1; i < snake.length; i++){
        if(snake[0].x == snake[i].x && snake[0].y == snake[i].y){ /* Essa linha significa que se as posições x e y da cabeça da cobra forem iguais as posições x e y de qual quer parte do corpo então será criada a condição de game over */
            clearInterval(jogo); /* Aqui para a função do jogo */
            alert('Game Over :( ! Não foi dessa vez campeão, mas não se preocupe que o seu dia de vencer vai chegar! Agora Pressione F5 por favor e obrigado.');
        }
    }

    criarBG(); /* Criar Background - array de cordenadas. O movimento funciona adicionando um elemento e retirando o último*/
    criarCobrinha(); 
    drawFood();
    
    let snakeX =    snake[0].x; /* Setup de posição inicial da cobrinha nas posições 0 do array em x e em y */
    let snakeY =    snake[0].y;

    if(direction == "right") snakeX += box; /* essa linha significa que se a direção for direita será acrescentado um quadrado a direita */
    if(direction == "left") snakeX -= box;  /* Devido a dinâmica cartesiana o movimento esquerdo se dá pelo decremento de um quadrado */
    if(direction == "up") snakeY -= box;    /* Para o eixo y(vertical) ocorre a mesma dinâmica */
    if(direction == "down") snakeY += box;

    if(snakeX != food.x || snakeY != food.y){
        snake.pop(); /* função pop retira o ultimo elemento do array */
    }
    else{
        food.x = Math.floor(Math.random() * 15 + 1) * box; /* Aqui a fruta vai receber outra posição randômica */
        food.y = Math.floor(Math.random() * 15 + 1) * box;
    }

    
    let newHead = { 
        x: snakeX,
        y: snakeY
    }

    snake.unshift(newHead); /* o unshifit acrescenta um elemento a frente */

}    

let jogo = setInterval(iniciarJogo, 100); /* A cada 100 milissegundos será reiniciada o jogo se caso ele trave */

