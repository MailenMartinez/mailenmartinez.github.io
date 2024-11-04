const gameMenuCanvas = document.getElementById("gameMenuCanvas");
const canvas = document.getElementById("gameCanvas");
const ctxMenu = gameMenuCanvas.getContext("2d");
const ctx = canvas.getContext('2d');

const button = {
    x: 340,
    y: 260,
    width: 200,
    height: 60,
    text: "Iniciar Juego",
};

const MenuCanvasWidth = 880;
const MenuCanvasHeight = 620;
const fichas = [{
    nombre: "Mario",
    imagen: "assets/images/MarioCoin.png"
},
{
    nombre: "Bowser",
    imagen: "assets/images/BowserCoin.png"
},
{
    nombre: "Luigi",
    imagen: "assets/images/LuigiCoin.png"
},
{
    nombre: "Waluigi",
    imagen: "assets/images/WaluigiCoin.png"
}
]; // Puedes agregar más fichas aquí
const boardSizes = [4, 5, 6, 7]; // Tamaños del tablero en línea
let selectedSize = boardSizes[0]; // Tamaño seleccionado por defecto
let inLineToWin = 4; // Fichas necesarias para ganar (esto debe ser menor o igual a selectedSize)

let selectedCoinIndexPlayer1 = 0; // Índice de la ficha seleccionada para el Jugador 1
let selectedCoinIndexPlayer2 = 1; // Índice de la ficha seleccionada para el Jugador 2 (por defecto)

// Función para dibujar el menú
function drawMenu() {
    ctxMenu.fillStyle = "#3D3C42";
    ctxMenu.fillRect(0, 0, MenuCanvasWidth, MenuCanvasHeight);
    ctxMenu.fillStyle = "#FFFFFF";
    ctxMenu.font = "36px Arial";
    ctxMenu.fillText("Menú de Juego", MenuCanvasWidth / 2 - 110, 150);
    ctxMenu.fillStyle = "#5D3FD3";
    ctxMenu.fillRect(button.x, button.y, button.width, button.height);
    ctxMenu.fillStyle = "#FFFFFF";
    ctxMenu.font = "24px Arial";
    ctxMenu.fillText(button.text, button.x + 25, button.y + 40);
    
    drawBoardSizeSelector(); // Dibuja el selector de tamaño del tablero
    drawPieceSelectorPlayer1(); // Dibuja el selector de fichas del Jugador 1
    drawPieceSelectorPlayer2(); // Dibuja el selector de fichas del Jugador 2
}

// Función para dibujar el selector de tamaño
function drawBoardSizeSelector() {
    ctxMenu.fillStyle = "#5D3FD3";
    ctxMenu.fillRect(200, 345, 470, 50); // Fondo del selector
    ctxMenu.fillStyle = "#FFFFFF";
    ctxMenu.font = "24px Arial";
    ctxMenu.fillText("Seleccionar tamaño: " + selectedSize + 
        (selectedSize === 4 ? " en línea (defecto)" : " en línea"), 220, 380);
}

// Función para dibujar el selector de fichas del Jugador 1
function drawPieceSelectorPlayer1() {
    ctxMenu.fillStyle = "#5D3FD3";
    ctxMenu.fillRect(200, 445, 470, 50); // Fondo del selector
    ctxMenu.fillStyle = "#FFFFFF";
    ctxMenu.font = "24px Arial";
    ctxMenu.fillText("Jugador 1 - Seleccionar ficha: " + fichas[selectedCoinIndexPlayer1].nombre, 230, 480);
}

// Función para dibujar el selector de fichas del Jugador 2
function drawPieceSelectorPlayer2() {
    ctxMenu.fillStyle = "#5D3FD3";
    ctxMenu.fillRect(200, 530, 470, 50); // Fondo del selector
    ctxMenu.fillStyle = "#FFFFFF";
    ctxMenu.font = "24px Arial";
    ctxMenu.fillText("Jugador 2 - Seleccionar ficha: " + fichas[selectedCoinIndexPlayer2].nombre, 230, 565);
}

drawMenu();

gameMenuCanvas.addEventListener("click", function (event) {
    const rect = gameMenuCanvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    // Detecta si el clic está dentro del botón
    if (x > button.x && x < button.x + button.width && y > button.y && y < button.y + button.height) {
        gameMenuCanvas.style.display = "none";
        canvas.style.display = "block";
        startGame();
    }

    // Detectar clic en el selector de tamaño
    if (x >= 300 && x <= 580 && y >= 350 && y <= 400) {
        selectedSize = boardSizes[(boardSizes.indexOf(selectedSize) + 1) % boardSizes.length]; // Cambia el tamaño
        inLineToWin = selectedSize; // Actualiza el número de fichas necesarias para ganar
        drawMenu(); // Redibuja el menú para reflejar el nuevo tamaño
    }

    // Detectar clic en el selector de fichas del Jugador 1
    if (x >= 200 && x <= 670 && y >= 445 && y <= 495) { // Verifica si el clic está dentro del área del selector de fichas
        changePlayerPiece(1); // Cambia la ficha del Jugador 1
    }

    // Detectar clic en el selector de fichas del Jugador 2
    if (x >= 200 && x <= 670 && y >= 530 && y <= 580) { // Verifica si el clic está dentro del área del selector de fichas
        changePlayerPiece(2); // Cambia la ficha del Jugador 2
    }
});

// Función para cambiar la ficha de un jugador
function changePlayerPiece(player) {
    let currentIndex = player === 1 ? selectedCoinIndexPlayer1 : selectedCoinIndexPlayer2;
    let nextIndex = (currentIndex + 1) % fichas.length; // Calcula el índice de la próxima ficha

    // Salta las fichas seleccionadas por el otro jugador
    while (nextIndex === selectedCoinIndexPlayer1 || nextIndex === selectedCoinIndexPlayer2) {
        nextIndex = (nextIndex + 1) % fichas.length; // Salta a la siguiente ficha
    }

    // Actualiza el índice del jugador correspondiente
    if (player === 1) {
        selectedCoinIndexPlayer1 = nextIndex;
    } else {
        selectedCoinIndexPlayer2 = nextIndex;
    }

    drawMenu(); // Redibuja el menú para mostrar la nueva selección
}

function startGame() {
const ctx = canvas.getContext('2d');
const hintAreaHeight = 100;
const boardSize = 10;
const rows = 6; // Número de filas del tablero
const cols = selectedSize+2; // Número de columnas del tablero
const cellSize = 86; // Tamaño de cada celda
const spacing = 11;
const pieceSize = cellSize - spacing;
 // Tamaño de cada celda
 canvas.width = 880;
 canvas.height = 620 + hintAreaHeight;



// Calcular el offset para centrar el tablero en el canvas
const boardWidth = cols * cellSize;
const boardHeight = rows * cellSize;
// Calcular el offset para centrar el tablero en el canvas
const offsetX = (canvas.width - boardWidth) / 2; // Offset para centrar el tablero en X
const offsetY = (canvas.height - boardHeight + 10) / 2; // Offset para centrar el tablero en Y y dejar espacio para los hints


 const hintBackground = new Image();
 hintBackground.src = './assets/images/hintBackground.png';

const cellBackground = new Image();

cellBackground.src = './assets/images/cellBackground.png'; // Asegúrate de tener la imagen en esta ruta

const boardImg = new Image();
boardImg.src = './assets/images/board.png';

const player1Piece = new Image();
player1Piece.src = fichas[selectedCoinIndexPlayer1].imagen;

const player2Piece = new Image();
player2Piece.src = fichas[selectedCoinIndexPlayer2].imagen;

let board = Array(rows).fill().map(() => Array(cols).fill(null));
let currentPlayer = 1;
let timer = 60;

boardImg.onload = () => {
    drawBoard(); // Llama a drawBoard una vez que la imagen de fondo está cargada
};



function drawBoard() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Limpia el canvas antes de dibujar

    // Dibuja la imagen de fondo del tablero
    ctx.drawImage(boardImg, 0, 0, canvas.width, canvas.height);

    // Dibuja las celdas y las fichas
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            // Dibuja el fondo de cada celda
            ctx.drawImage(cellBackground, offsetX + col * cellSize, offsetY + row * cellSize, cellSize, cellSize);

            // Dibuja la ficha del jugador, si existe en esta celda
            const piece = board[row][col];
            if (piece === 1) {
                ctx.drawImage(
                    player1Piece, 
                    offsetX + col * cellSize + spacing / 2, 
                    offsetY + row * cellSize + spacing / 2, 
                    pieceSize, 
                    pieceSize
                );
            } else if (piece === 2) {
                ctx.drawImage(
                    player2Piece, 
                    offsetX + col * cellSize + spacing / 2, 
                    offsetY + row * cellSize + spacing / 2, 
                    pieceSize, 
                    pieceSize
                );
            }
        }
    }
}


let currentHintCol = -1; // Columna donde se muestra el hint

canvas.addEventListener('mousemove', (event) => {
    const mouseX = event.offsetX;
    currentHintCol = Math.floor((mouseX - offsetX) / cellSize); // Determina en qué columna está el mouse

    // Asegúrate de que la columna esté dentro del rango
    if (currentHintCol < 0 || currentHintCol >= cols) {
        currentHintCol = -1; // Si no está en rango, no mostrar hint
    }
});

function drawHints() {
    // Limpia solo el área del hint, manteniendo la parte superior del canvas intacta
    ctx.clearRect(0, 0, canvas.width, 80); // Limpia solo el área del hint

    if (currentHintCol >= 0) { // Solo dibuja si hay una columna válida
        const currentPieceImage = currentPlayer === 1 ? player1Piece : player2Piece; // Selecciona la imagen del jugador actual

        // Calcula la posición X del hint para la columna actual
        const hintX = offsetX + currentHintCol * cellSize + (cellSize - pieceSize) / 2; // Centrar el hint sobre la columna
        const hintY = 5 + Math.sin(Date.now() / 500) * 3; // Movimiento oscilante de la ficha

        // Dibuja el hint en una posición fija por encima del tablero
        ctx.drawImage(currentPieceImage, hintX, hintY, pieceSize, pieceSize); // Dibuja la ficha del jugador actual
    }
    
    // No llamamos a clearRect para el área superior en otras partes del código
    requestAnimationFrame(drawHints); // Llama de nuevo para la animación
}
drawHints();


function togglePlayer() {
    currentPlayer = currentPlayer === 1 ? 2 : 1;
}


canvas.addEventListener('click', (event) => {
    if (isDropping) return; // Si una ficha está cayendo, no permitir otra acción

    const col = Math.floor((event.offsetX - offsetX) / cellSize); // Ajusta para el offset X
    if (col < 0 || col >= cols) return;

    // Encuentra la fila más baja disponible en la columna seleccionada
    let row = rows - 1;
    while (row >= 0 && board[row][col] !== null) {
        row--;
    }

    if (row < 0) return; // La columna está llena

    // Ejecuta la animación y luego coloca la ficha en el tablero lógico
    isDropping = true; // Marca que una ficha está cayendo
    animatePieceDrop(row, col, currentPlayer, () => {
        // Actualiza el tablero lógico después de que la animación termine
        board[row][col] = currentPlayer;

        // Verifica si el jugador actual ha ganado
        if (checkWin(row, col, currentPlayer)) {
            alert(`Jugador ${currentPlayer} ha ganado!`);
            resetGame();
            return;
        }

        // Cambia de jugador
        currentPlayer = currentPlayer === 1 ? 2 : 1;
        isDropping = false; // Marca que la ficha ha terminado de caer
    });
});


function checkWin(row, col, player) {
    return checkDirection(row, col, player, 1, 0) ||  // Horizontal
           checkDirection(row, col, player, 0, 1) ||  // Vertical
           checkDirection(row, col, player, 1, 1) ||  // Diagonal descendente
           checkDirection(row, col, player, 1, -1);   // Diagonal ascendente
}

function checkDirection(row, col, player, rowDir, colDir) {
    let count = 0;

    for (let i = -inLineToWin; i <= inLineToWin; i++) {
        const r = row + i * rowDir;
        const c = col + i * colDir;
        if (r >= 0 && r < rows && c >= 0 && c < cols && board[r][c] === player) {
            count++;
            if (count === inLineToWin) return true;
        } else {
            count = 0;
        }
    }
    return false;
}



let isDropping = false;

function animatePieceDrop(row, col, player, callback) {
    let y = 0;
    const pieceImage = player === 1 ? player1Piece : player2Piece;
    const finalY = offsetY + row * cellSize + spacing / 2; // Ajuste para la posición final

    const interval = setInterval(() => {
        drawBoard(); // Redibuja el tablero en cada fotograma

        // Incrementa la posición de `y`, pero detén la animación al alcanzar `finalY`
        if (y + 10 >= finalY) {
            y = finalY; // Fija `y` a la posición final exacta
            clearInterval(interval);
            drawBoard(); // Redibuja el tablero final

            // Dibuja la ficha en su posición final exacta
            ctx.drawImage(
                pieceImage, 
                offsetX + col * cellSize + spacing / 2,  // Ajuste para la posición X
                y, 
                pieceSize, 
                pieceSize
            );

            if (callback) callback(); // Ejecuta el callback para continuar después de la animación
        } else {
            y += 10; // Incrementa la posición de `y` para la animación
            ctx.drawImage(
                pieceImage, 
                offsetX + col * cellSize + spacing / 2,  // Ajuste para la posición X
                y, 
                pieceSize, 
                pieceSize
            );
        }
    }, 30);
}


document.getElementById('restartButton').addEventListener('click', resetGame);

function resetGame() {
    board = Array(rows).fill().map(() => Array(cols).fill(null)); // Resetea el tablero
    currentPlayer = 1; // Vuelve a poner al jugador 1
    timer=60
    drawBoard(); // Dibuja el tablero vacío
}

function startTimer() {
    const timerInterval = setInterval(() => {
        timer--;
        document.getElementById('timer').innerText = `Tiempo restante: ${timer}s`;
        if (timer <= 0) {
            alert("Tiempo agotado!");
            clearInterval(timerInterval);
            resetGame();
        }
    }, 1000);
}
startTimer();

document.getElementById('boardSize').addEventListener('change', (e) => {
    const selectedSize = parseInt(e.target.value);
    resetGame();
    inLineToWin = selectedSize;
});
}


