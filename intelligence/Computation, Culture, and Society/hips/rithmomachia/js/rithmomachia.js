/**
 * Rithmomachia - The Philosophers' Game
 * A medieval mathematical board game
 */

document.addEventListener('DOMContentLoaded', function() {
    // Game configuration and state
    const gameState = {
        currentPlayer: 'white', // 'white' or 'black'
        selectedPiece: null,
        validMoves: [],
        board: createEmptyBoard(),
        capturedPieces: {
            white: [],
            black: []
        },
        gameOver: false
    };

    // DOM Elements
    const gameBoard = document.getElementById('game-board');
    const gameStatus = document.getElementById('game-status').querySelector('p');
    const resetButton = document.getElementById('reset-game');
    const autoPlayButton = document.getElementById('auto-play');
    const tutorialButton = document.getElementById('tutorial');
    const rulesButton = document.getElementById('rules');
    const modals = document.querySelectorAll('.modal');
    const closeButtons = document.querySelectorAll('.close-button');
    const prevStepButton = document.getElementById('prev-step');
    const nextStepButton = document.getElementById('next-step');
    
    // Auto-play DOM Elements
    const autoPlayModal = document.getElementById('auto-play-modal');
    const moveSpeedSelect = document.getElementById('move-speed');
    const whiteStrategySelect = document.getElementById('white-strategy');
    const blackStrategySelect = document.getElementById('black-strategy');
    const moveLimitInput = document.getElementById('move-limit');
    const startAutoPlayWithSettingsButton = document.getElementById('start-auto-play-with-settings');
    
    // Auto-play configuration
    const autoPlayConfig = {
        isPlaying: false,
        moveDelay: 800, // milliseconds between moves
        moveInterval: null,
        maxMoves: 100, // Safety limit for max number of moves
        movesPlayed: 0,
        strategies: {
            white: "aggressive",
            black: "aggressive"
        },
        moveHistory: [] // For tracking game replay
    };

    // Tutorial content
    const tutorialContent = [
        {
            title: "Welcome to Rithmomachia",
            content: "Rithmomachia, also known as 'The Philosophers' Game', is an ancient mathematical board game. This tutorial will teach you the basics of this medieval game."
        },
        {
            title: "The Board",
            content: "The game is played on a 16x8 board. Each player controls a set of pieces with unique numbers based on Boethian number theory."
        },
        {
            title: "The Pieces",
            content: "There are different piece types with specific movements: Rounds move one square diagonally, Triangles move exactly two squares orthogonally, Squares move exactly three squares orthogonally, and Pyramids can move like any piece they contain."
        },
        {
            title: "Pyramids",
            content: "Pyramids are special pieces with composite values. The white pyramid (value 91) contains squares, triangles, and rounds. The black pyramid (value 190) also contains various pieces. These can move according to any piece type they contain."
        },
        {
            title: "Basic Movement",
            content: "Click on a piece to select it. Valid moves will be highlighted. Click on a highlighted square to move your piece."
        },
        {
            title: "Capturing",
            content: "Pieces can capture opponents through various methods: Meeting (same value), Assault (value × empty spaces), Ambuscade (two pieces' sum equals enemy piece between them), and Siege (surrounding on all four sides)."
        },
        {
            title: "Common Victories",
            content: "You can win by capturing a certain number of pieces (De corpore), by capturing pieces with a certain total value (De bonis), or by other similar conditions."
        },
        {
            title: "Proper Victories",
            content: "You can also win by arranging your pieces on the opponent's side in specific mathematical progressions: arithmetic (Victoria magna), multiple progressions (Victoria major), or all three types of progressions (Victoria excellentissima)."
        },
        {
            title: "Ready to Play?",
            content: "Now that you know the basics, you're ready to start playing Rithmomachia. Good luck!"
        }
    ];

    // Piece definitions
    const pieceDefinitions = {
        white: {
            // Circles (round) - multiples
            circles: [
                { value: 2, position: { row: 7, col: 0 } },
                { value: 4, position: { row: 7, col: 1 } },
                { value: 6, position: { row: 7, col: 2 } },
                { value: 8, position: { row: 7, col: 3 } },
                { value: 10, position: { row: 7, col: 4 } },
                { value: 12, position: { row: 7, col: 5 } },
                { value: 14, position: { row: 7, col: 6 } },
                { value: 16, position: { row: 7, col: 7 } },
                { value: 4, position: { row: 6, col: 0 } },
                { value: 16, position: { row: 6, col: 1 } },
                { value: 36, position: { row: 6, col: 2 } },
                { value: 64, position: { row: 6, col: 3 } },
                { value: 100, position: { row: 6, col: 4 } },
                { value: 144, position: { row: 6, col: 5 } },
                { value: 196, position: { row: 6, col: 6 } },
                { value: 256, position: { row: 6, col: 7 } }
            ],
            // Triangles - superparticulares
            triangles: [
                { value: 6, position: { row: 5, col: 0 } },
                { value: 20, position: { row: 5, col: 1 } },
                { value: 42, position: { row: 5, col: 2 } },
                { value: 72, position: { row: 5, col: 3 } },
                { value: 110, position: { row: 5, col: 4 } },
                { value: 156, position: { row: 5, col: 5 } },
                { value: 210, position: { row: 5, col: 6 } },
                { value: 272, position: { row: 5, col: 7 } }
            ],
            // Squares - superpartientes
            squares: [
                { value: 9, position: { row: 4, col: 0 } },
                { value: 25, position: { row: 4, col: 1 } },
                { value: 49, position: { row: 4, col: 2 } },
                { value: 81, position: { row: 4, col: 3 } },
                { value: 121, position: { row: 4, col: 4 } },
                { value: 169, position: { row: 4, col: 5 } },
                { value: 225, position: { row: 4, col: 6 } },
                { value: 289, position: { row: 4, col: 7 } }
            ],
            // Pyramid
            pyramid: { value: 91, position: { row: 4, col: 4 }, components: [36, 25, 16, 9, 4, 1] }
        },
        black: {
            // Circles (round) - multiples
            circles: [
                { value: 3, position: { row: 0, col: 0 } },
                { value: 5, position: { row: 0, col: 1 } },
                { value: 7, position: { row: 0, col: 2 } },
                { value: 9, position: { row: 0, col: 3 } },
                { value: 11, position: { row: 0, col: 4 } },
                { value: 13, position: { row: 0, col: 5 } },
                { value: 15, position: { row: 0, col: 6 } },
                { value: 17, position: { row: 0, col: 7 } },
                { value: 9, position: { row: 1, col: 0 } },
                { value: 25, position: { row: 1, col: 1 } },
                { value: 49, position: { row: 1, col: 2 } },
                { value: 81, position: { row: 1, col: 3 } },
                { value: 121, position: { row: 1, col: 4 } },
                { value: 169, position: { row: 1, col: 5 } },
                { value: 225, position: { row: 1, col: 6 } },
                { value: 289, position: { row: 1, col: 7 } }
            ],
            // Triangles - superparticulares
            triangles: [
                { value: 12, position: { row: 2, col: 0 } },
                { value: 30, position: { row: 2, col: 1 } },
                { value: 56, position: { row: 2, col: 2 } },
                { value: 90, position: { row: 2, col: 3 } },
                { value: 132, position: { row: 2, col: 4 } },
                { value: 182, position: { row: 2, col: 5 } },
                { value: 240, position: { row: 2, col: 6 } },
                { value: 306, position: { row: 2, col: 7 } }
            ],
            // Squares - superpartientes
            squares: [
                { value: 16, position: { row: 3, col: 0 } },
                { value: 36, position: { row: 3, col: 1 } },
                { value: 64, position: { row: 3, col: 2 } },
                { value: 100, position: { row: 3, col: 3 } },
                { value: 144, position: { row: 3, col: 4 } },
                { value: 196, position: { row: 3, col: 5 } },
                { value: 256, position: { row: 3, col: 6 } },
                { value: 324, position: { row: 3, col: 7 } }
            ],
            // Pyramid
            pyramid: { value: 190, position: { row: 3, col: 4 }, components: [64, 49, 36, 25, 16] }
        }
    };

    // Create empty board
    function createEmptyBoard() {
        const board = [];
        for (let row = 0; row < 8; row++) {
            board[row] = [];
            for (let col = 0; col < 16; col++) {
                board[row][col] = null;
            }
        }
        return board;
    }

    // Initialize game board
    function initializeGame() {
        // Reset game state
        gameState.currentPlayer = 'white';
        gameState.selectedPiece = null;
        gameState.validMoves = [];
        gameState.board = createEmptyBoard();
        gameState.capturedPieces = { white: [], black: [] };
        gameState.gameOver = false;

        // Clear the game board display
        gameBoard.innerHTML = '';

        // Create board squares
        for (let row = 0; row < 8; row++) {
            for (let col = 0; col < 16; col++) {
                const square = document.createElement('div');
                square.classList.add('board-square');
                square.classList.add((row + col) % 2 === 0 ? 'light' : 'dark');
                square.dataset.row = row;
                square.dataset.col = col;
                square.addEventListener('click', handleSquareClick);
                gameBoard.appendChild(square);
            }
        }

        // Place pieces on the board
        placePieces('white');
        placePieces('black');

        // Update game status
        updateGameStatus();
    }

    // Place pieces on the board
    function placePieces(color) {
        // Place circle pieces
        pieceDefinitions[color].circles.forEach(piece => {
            const { row, col } = piece.position;
            createPiece(row, col, piece.value, color, 'circle');
        });

        // Place triangle pieces
        pieceDefinitions[color].triangles.forEach(piece => {
            const { row, col } = piece.position;
            createPiece(row, col, piece.value, color, 'triangle');
        });

        // Place square pieces
        pieceDefinitions[color].squares.forEach(piece => {
            const { row, col } = piece.position;
            createPiece(row, col, piece.value, color, 'square');
        });

        // Place pyramid
        const pyramid = pieceDefinitions[color].pyramid;
        createPiece(pyramid.position.row, pyramid.position.col, pyramid.value, color, 'pyramid');
    }

    // Create a game piece on the board
    function createPiece(row, col, value, color, shape) {
        // Create piece element
        const piece = document.createElement('div');
        piece.classList.add('game-piece', color, shape);
        piece.textContent = value;

        // Add piece to game state
        gameState.board[row][col] = {
            value: value,
            color: color,
            shape: shape
        };

        // Find the board square and append the piece
        const square = document.querySelector(`.board-square[data-row="${row}"][data-col="${col}"]`);
        if (square) {
            square.appendChild(piece);
        }
    }

    // Handle square click event
    function handleSquareClick(event) {
        if (gameState.gameOver) return;

        const square = event.currentTarget;
        const row = parseInt(square.dataset.row);
        const col = parseInt(square.dataset.col);

        // Check if a piece is already selected and this is a valid move
        if (gameState.selectedPiece && isValidMove(row, col)) {
            // Move the piece
            movePiece(row, col);
        } else if (gameState.board[row][col] && gameState.board[row][col].color === gameState.currentPlayer) {
            // Select the piece
            selectPiece(row, col);
        }
    }

    // Select a piece
    function selectPiece(row, col) {
        // Clear previous selection
        clearSelection();

        // Select new piece
        gameState.selectedPiece = { row, col };
        const square = document.querySelector(`.board-square[data-row="${row}"][data-col="${col}"]`);
        square.classList.add('selected');

        // Calculate valid moves
        calculateValidMoves(row, col);

        // Highlight valid moves
        gameState.validMoves.forEach(move => {
            const moveSquare = document.querySelector(`.board-square[data-row="${move.row}"][data-col="${move.col}"]`);
            moveSquare.classList.add('valid-move');
        });
    }

    // Clear selection and highlights
    function clearSelection() {
        // Clear selected piece
        gameState.selectedPiece = null;

        // Remove highlighting
        document.querySelectorAll('.board-square.selected, .board-square.valid-move').forEach(square => {
            square.classList.remove('selected', 'valid-move');
        });

        // Clear valid moves
        gameState.validMoves = [];
    }

    // Calculate valid moves for a piece
    function calculateValidMoves(row, col) {
        const piece = gameState.board[row][col];
        if (!piece) return;

        // Clear previous valid moves
        gameState.validMoves = [];

        // Calculate moves based on piece type
        switch (piece.shape) {
            case 'circle': // Rounds: move one square in any of the four diagonals
                addRoundMoves(row, col, piece.color);
                break;
            case 'triangle': // Triangles: move exactly two squares vertically or horizontally
                addTriangleMoves(row, col, piece.color);
                break;
            case 'square': // Squares: move exactly three squares vertically or horizontally
                addSquareMoves(row, col, piece.color);
                break;
            case 'pyramid': // Pyramids: can move like any piece type it contains
                addPyramidMoves(row, col, piece.color);
                break;
        }
    }

    // Add Round moves (one square diagonally)
    function addRoundMoves(row, col, pieceColor) {
        // Check all four diagonal directions
        const directions = [
            { dr: -1, dc: -1 }, // up-left
            { dr: -1, dc: 1 },  // up-right
            { dr: 1, dc: -1 },  // down-left
            { dr: 1, dc: 1 }    // down-right
        ];

        directions.forEach(dir => {
            const newRow = row + dir.dr;
            const newCol = col + dir.dc;

            if (isValidPosition(newRow, newCol)) {
                if (gameState.board[newRow][newCol]) {
                    // If there's a piece here, we can only move if it's an opponent's piece
                    if (gameState.board[newRow][newCol].color !== pieceColor) {
                        gameState.validMoves.push({ row: newRow, col: newCol, capture: true });
                    }
                } else {
                    gameState.validMoves.push({ row: newRow, col: newCol, capture: false });
                }
            }
        });
    }

    // Add Triangle moves (exactly two squares orthogonally)
    function addTriangleMoves(row, col, pieceColor) {
        // Check in all four orthogonal directions: up, right, down, left
        const directions = [
            { dr: -2, dc: 0 }, // up
            { dr: 0, dc: 2 },  // right
            { dr: 2, dc: 0 },  // down
            { dr: 0, dc: -2 }  // left
        ];

        directions.forEach(dir => {
            const newRow = row + dir.dr;
            const newCol = col + dir.dc;

            if (isValidPosition(newRow, newCol)) {
                // Check if there are no pieces in the path
                const midRow = row + dir.dr / 2;
                const midCol = col + dir.dc / 2;
                
                if (isValidPosition(midRow, midCol) && !gameState.board[midRow][midCol]) {
                    if (gameState.board[newRow][newCol]) {
                        // If there's a piece at the destination, we can only move if it's an opponent's piece
                        if (gameState.board[newRow][newCol].color !== pieceColor) {
                            gameState.validMoves.push({ row: newRow, col: newCol, capture: true });
                        }
                    } else {
                        gameState.validMoves.push({ row: newRow, col: newCol, capture: false });
                    }
                }
            }
        });
    }

    // Add Square moves (exactly three squares orthogonally)
    function addSquareMoves(row, col, pieceColor) {
        // Check in all four orthogonal directions: up, right, down, left
        const directions = [
            { dr: -3, dc: 0 }, // up
            { dr: 0, dc: 3 },  // right
            { dr: 3, dc: 0 },  // down
            { dr: 0, dc: -3 }  // left
        ];

        directions.forEach(dir => {
            const newRow = row + dir.dr;
            const newCol = col + dir.dc;

            if (isValidPosition(newRow, newCol)) {
                // Check if there are no pieces in the path
                const midRow1 = row + dir.dr / 3;
                const midCol1 = col + dir.dc / 3;
                const midRow2 = row + (2 * dir.dr) / 3;
                const midCol2 = col + (2 * dir.dc) / 3;
                
                if (isValidPosition(midRow1, midCol1) && !gameState.board[midRow1][midCol1] &&
                    isValidPosition(midRow2, midCol2) && !gameState.board[midRow2][midCol2]) {
                    if (gameState.board[newRow][newCol]) {
                        // If there's a piece at the destination, we can only move if it's an opponent's piece
                        if (gameState.board[newRow][newCol].color !== pieceColor) {
                            gameState.validMoves.push({ row: newRow, col: newCol, capture: true });
                        }
                    } else {
                        gameState.validMoves.push({ row: newRow, col: newCol, capture: false });
                    }
                }
            }
        });
    }

    // Add pyramid moves (can move like round, triangle, or square if it contains those pieces)
    function addPyramidMoves(row, col, pieceColor) {
        // For the white pyramid (contains rounds, triangles, and squares)
        if (pieceColor === 'white') {
            // Can move like a round
            addRoundMoves(row, col, pieceColor);
            
            // Can move like a triangle
            addTriangleMoves(row, col, pieceColor);
            
            // Can move like a square
            addSquareMoves(row, col, pieceColor);
        } 
        // For the black pyramid (contains rounds, triangles, and squares)
        else {
            // Can move like a round
            addRoundMoves(row, col, pieceColor);
            
            // Can move like a triangle
            addTriangleMoves(row, col, pieceColor);
            
            // Can move like a square
            addSquareMoves(row, col, pieceColor);
        }
    }

    // Check if a position is valid on the board
    function isValidPosition(row, col) {
        return row >= 0 && row < 8 && col >= 0 && col < 16;
    }

    // Check if a move is valid
    function isValidMove(row, col) {
        return gameState.validMoves.some(move => move.row === row && move.col === col);
    }

    // Move a piece
    function movePiece(toRow, toCol) {
        if (!gameState.selectedPiece) return;

        const fromRow = gameState.selectedPiece.row;
        const fromCol = gameState.selectedPiece.col;
        const piece = gameState.board[fromRow][fromCol];

        // Move piece in game state
        gameState.board[toRow][toCol] = piece;
        gameState.board[fromRow][fromCol] = null;

        // Update DOM
        const fromSquare = document.querySelector(`.board-square[data-row="${fromRow}"][data-col="${fromCol}"]`);
        const toSquare = document.querySelector(`.board-square[data-row="${toRow}"][data-col="${toCol}"]`);
        
        // Clear any existing pieces in the target square
        toSquare.innerHTML = '';
        
        // Move the piece element
        const pieceElement = fromSquare.querySelector('.game-piece');
        fromSquare.removeChild(pieceElement);
        toSquare.appendChild(pieceElement);

        // After moving, check for captures
        checkForCaptures(toRow, toCol);

        // Clear selection and switch player
        clearSelection();
        
        // Check for victory conditions
        if (checkVictory()) {
            gameState.gameOver = true;
            gameStatus.textContent = `${capitalizeFirstLetter(gameState.currentPlayer)} wins!`;
            // Stop auto-play if it's running
            if (autoPlayConfig.isPlaying) {
                stopAutoPlay();
            }
        } else {
            // Switch player
            gameState.currentPlayer = gameState.currentPlayer === 'white' ? 'black' : 'white';
            updateGameStatus();
        }
    }

    // Check for all possible captures after a move
    function checkForCaptures(row, col) {
        const piece = gameState.board[row][col];
        if (!piece) return;
        
        // Get opponent color
        const opponentColor = piece.color === 'white' ? 'black' : 'white';
        
        // Check all capture methods
        const capturedPieces = [
            ...checkMeetingCapture(row, col, piece),
            ...checkAssaultCapture(row, col, piece),
            ...checkAmbuscadeCapture(row, col, piece),
            ...checkSiegeCapture(row, col, piece)
        ];
        
        // Process all captured pieces
        if (capturedPieces.length > 0) {
            capturedPieces.forEach(capturedPos => {
                const capturedPiece = gameState.board[capturedPos.row][capturedPos.col];
                if (capturedPiece) {
                    // Add to captured pieces
                    gameState.capturedPieces[piece.color].push(capturedPiece);
                    
                    // Remove from board
                    gameState.board[capturedPos.row][capturedPos.col] = null;
                    
                    // Update DOM
                    const capturedSquare = document.querySelector(`.board-square[data-row="${capturedPos.row}"][data-col="${capturedPos.col}"]`);
                    capturedSquare.innerHTML = '';
                }
            });
            
            // Update captured pieces display
            updateCapturedPieces();
        }
    }

    // Meeting: If a piece could capture another piece with the same value by landing on it
    function checkMeetingCapture(row, col, piece) {
        const capturedPieces = [];
        const opponentColor = piece.color === 'white' ? 'black' : 'white';
        
        // Check all adjacent squares for opponent pieces with the same value
        const directions = [
            { dr: -1, dc: 0 }, // up
            { dr: 0, dc: 1 },  // right
            { dr: 1, dc: 0 },  // down
            { dr: 0, dc: -1 }, // left
            { dr: -1, dc: -1 }, // up-left
            { dr: -1, dc: 1 },  // up-right
            { dr: 1, dc: -1 },  // down-left
            { dr: 1, dc: 1 }    // down-right
        ];
        
        directions.forEach(dir => {
            const newRow = row + dir.dr;
            const newCol = col + dir.dc;
            
            if (isValidPosition(newRow, newCol)) {
                const targetPiece = gameState.board[newRow][newCol];
                if (targetPiece && targetPiece.color === opponentColor && targetPiece.value === piece.value) {
                    capturedPieces.push({ row: newRow, col: newCol });
                }
            }
        });
        
        return capturedPieces;
    }

    // Assault: If a piece with a small value, multiplied by the number of vacant spaces between it and another larger piece is equal to the larger piece
    function checkAssaultCapture(row, col, piece) {
        const capturedPieces = [];
        const opponentColor = piece.color === 'white' ? 'black' : 'white';
        
        // Check in all directions
        const directions = [
            { dr: -1, dc: 0 }, // up
            { dr: 0, dc: 1 },  // right
            { dr: 1, dc: 0 },  // down
            { dr: 0, dc: -1 }, // left
            { dr: -1, dc: -1 }, // up-left
            { dr: -1, dc: 1 },  // up-right
            { dr: 1, dc: -1 },  // down-left
            { dr: 1, dc: 1 }    // down-right
        ];
        
        directions.forEach(dir => {
            let emptySpaces = 0;
            let currentRow = row + dir.dr;
            let currentCol = col + dir.dc;
            
            // Count empty spaces until we hit a piece or the edge of the board
            while (isValidPosition(currentRow, currentCol) && !gameState.board[currentRow][currentCol]) {
                emptySpaces++;
                currentRow += dir.dr;
                currentCol += dir.dc;
            }
            
            // Check if we found an opponent's piece
            if (isValidPosition(currentRow, currentCol)) {
                const targetPiece = gameState.board[currentRow][currentCol];
                if (targetPiece && targetPiece.color === opponentColor) {
                    // Check if our piece value times empty spaces equals the target piece value
                    if (piece.value * emptySpaces === targetPiece.value) {
                        capturedPieces.push({ row: currentRow, col: currentCol });
                    }
                }
            }
        });
        
        return capturedPieces;
    }

    // Ambuscade: If two pieces' sum is equal to an enemy piece that is placed between them
    function checkAmbuscadeCapture(row, col, piece) {
        const capturedPieces = [];
        const opponentColor = piece.color === 'white' ? 'black' : 'white';
        
        // For each friendly piece on the board
        for (let r = 0; r < 8; r++) {
            for (let c = 0; c < 16; c++) {
                const otherPiece = gameState.board[r][c];
                // Skip if not a friendly piece or is the same piece
                if (!otherPiece || otherPiece.color !== piece.color || (r === row && c === col)) {
                    continue;
                }
                
                // Check if there's an enemy piece between this piece and the other friendly piece
                // We need to check if they're in a straight line (horizontal, vertical, or diagonal)
                
                // Check if they're in the same row
                if (r === row) {
                    const minCol = Math.min(col, c);
                    const maxCol = Math.max(col, c);
                    // Check each column between
                    for (let checkCol = minCol + 1; checkCol < maxCol; checkCol++) {
                        const betweenPiece = gameState.board[row][checkCol];
                        if (betweenPiece && betweenPiece.color === opponentColor) {
                            // Check if sum of the two friendly pieces equals the enemy piece
                            if (piece.value + otherPiece.value === betweenPiece.value) {
                                capturedPieces.push({ row: row, col: checkCol });
                            }
                        }
                    }
                }
                
                // Check if they're in the same column
                if (c === col) {
                    const minRow = Math.min(row, r);
                    const maxRow = Math.max(row, r);
                    // Check each row between
                    for (let checkRow = minRow + 1; checkRow < maxRow; checkRow++) {
                        const betweenPiece = gameState.board[checkRow][col];
                        if (betweenPiece && betweenPiece.color === opponentColor) {
                            // Check if sum of the two friendly pieces equals the enemy piece
                            if (piece.value + otherPiece.value === betweenPiece.value) {
                                capturedPieces.push({ row: checkRow, col: col });
                            }
                        }
                    }
                }
                
                // Check if they're in a diagonal
                const rowDiff = r - row;
                const colDiff = c - col;
                // They're in a diagonal if the absolute row difference equals the absolute column difference
                if (Math.abs(rowDiff) === Math.abs(colDiff) && rowDiff !== 0) {
                    const rowDir = rowDiff > 0 ? 1 : -1;
                    const colDir = colDiff > 0 ? 1 : -1;
                    
                    let checkRow = row + rowDir;
                    let checkCol = col + colDir;
                    
                    while (checkRow !== r && checkCol !== c) {
                        const betweenPiece = gameState.board[checkRow][checkCol];
                        if (betweenPiece && betweenPiece.color === opponentColor) {
                            // Check if sum of the two friendly pieces equals the enemy piece
                            if (piece.value + otherPiece.value === betweenPiece.value) {
                                capturedPieces.push({ row: checkRow, col: checkCol });
                            }
                        }
                        checkRow += rowDir;
                        checkCol += colDir;
                    }
                }
            }
        }
        
        return capturedPieces;
    }

    // Siege: If a piece is surrounded on all four sides, it is removed
    function checkSiegeCapture(row, col, piece) {
        const capturedPieces = [];
        const opponentColor = piece.color === 'white' ? 'black' : 'white';
        
        // Check for enemy pieces that might be surrounded
        for (let r = 0; r < 8; r++) {
            for (let c = 0; c < 16; c++) {
                const targetPiece = gameState.board[r][c];
                if (!targetPiece || targetPiece.color !== opponentColor) continue;
                
                // Check if the piece is surrounded on all four orthogonal sides
                const orthogonalDirections = [
                    { dr: -1, dc: 0 }, // up
                    { dr: 0, dc: 1 },  // right
                    { dr: 1, dc: 0 },  // down
                    { dr: 0, dc: -1 }  // left
                ];
                
                let surrounded = true;
                
                orthogonalDirections.forEach(dir => {
                    const adjacentRow = r + dir.dr;
                    const adjacentCol = c + dir.dc;
                    
                    // If the adjacent position is invalid or doesn't contain a friendly piece, the target isn't surrounded
                    if (!isValidPosition(adjacentRow, adjacentCol) || 
                        !gameState.board[adjacentRow][adjacentCol] || 
                        gameState.board[adjacentRow][adjacentCol].color !== piece.color) {
                        surrounded = false;
                    }
                });
                
                if (surrounded) {
                    capturedPieces.push({ row: r, col: c });
                }
            }
        }
        
        return capturedPieces;
    }

    // Check for victory conditions
    function checkVictory() {
        // Get current player's side of the board
        const playersSide = gameState.currentPlayer === 'white' ? 
                            { startRow: 0, endRow: 3 } : 
                            { startRow: 4, endRow: 7 };
        
        // Check common victories
        if (checkDeCorpore() || checkDeBonis() || checkDeLite() || 
            checkDeHonore() || checkDeHonoreLiteque()) {
            return true;
        }
        
        // Check proper victories (only on opponent's side of the board)
        if (checkVictoriaMagna() || checkVictoriaMajor() || checkVictoriaExcellentissima()) {
            return true;
        }
        
        return false;
    }

    // De corpore: If a player captures a certain number of pieces
    function checkDeCorpore() {
        // For simplicity, we'll set the threshold to 8 pieces (half the opponent's pieces)
        const captureThreshold = 8;
        return gameState.capturedPieces[gameState.currentPlayer].length >= captureThreshold;
    }

    // De bonis: If a player captures pieces adding up to a certain value
    function checkDeBonis() {
        // For simplicity, set the threshold to 500
        const valueThreshold = 500;
        const totalValue = gameState.capturedPieces[gameState.currentPlayer].reduce(
            (sum, piece) => sum + piece.value, 0
        );
        return totalValue >= valueThreshold;
    }

    // De lite: Captured pieces add up to a value and the number of digits is less than a threshold
    function checkDeLite() {
        // For simplicity, value threshold = 500, digit threshold = 15
        const valueThreshold = 500;
        const digitThreshold = 15;
        
        const capturedPieces = gameState.capturedPieces[gameState.currentPlayer];
        const totalValue = capturedPieces.reduce((sum, piece) => sum + piece.value, 0);
        
        // Count digits in all captured piece values
        const totalDigits = capturedPieces.reduce((sum, piece) => {
            return sum + piece.value.toString().length;
        }, 0);
        
        return totalValue >= valueThreshold && totalDigits < digitThreshold;
    }

    // De honore: Captured pieces add up to a value and the number of pieces is less than a threshold
    function checkDeHonore() {
        // For simplicity, value threshold = 500, piece count threshold = 5
        const valueThreshold = 500;
        const pieceThreshold = 5;
        
        const capturedPieces = gameState.capturedPieces[gameState.currentPlayer];
        const totalValue = capturedPieces.reduce((sum, piece) => sum + piece.value, 0);
        
        return totalValue >= valueThreshold && capturedPieces.length < pieceThreshold;
    }

    // De honore liteque: Combination of De honore and De lite
    function checkDeHonoreLiteque() {
        // For simplicity, value threshold = 500, digit threshold = 15, piece count threshold = 5
        const valueThreshold = 500;
        const digitThreshold = 15;
        const pieceThreshold = 5;
        
        const capturedPieces = gameState.capturedPieces[gameState.currentPlayer];
        const totalValue = capturedPieces.reduce((sum, piece) => sum + piece.value, 0);
        
        // Count digits in all captured piece values
        const totalDigits = capturedPieces.reduce((sum, piece) => {
            return sum + piece.value.toString().length;
        }, 0);
        
        return totalValue >= valueThreshold && 
               totalDigits < digitThreshold && 
               capturedPieces.length < pieceThreshold;
    }

    // Victoria magna: Three pieces in an arithmetic progression
    function checkVictoriaMagna() {
        // Check for arithmetic progression (pieces with equal differences)
        // We'll only check on the opponent's side of the board
        const opponentSide = gameState.currentPlayer === 'white' ? 
                             { startRow: 0, endRow: 3 } : 
                             { startRow: 4, endRow: 7 };
        
        // Find all player's pieces on the opponent's side
        const pieces = [];
        for (let row = opponentSide.startRow; row <= opponentSide.endRow; row++) {
            for (let col = 0; col < 16; col++) {
                const piece = gameState.board[row][col];
                if (piece && piece.color === gameState.currentPlayer) {
                    pieces.push({ row, col, value: piece.value });
                }
            }
        }
        
        // Need at least 3 pieces to form an arithmetic progression
        if (pieces.length < 3) return false;
        
        // Check all possible combinations of 3 pieces
        for (let i = 0; i < pieces.length - 2; i++) {
            for (let j = i + 1; j < pieces.length - 1; j++) {
                for (let k = j + 1; k < pieces.length; k++) {
                    // Sort the pieces by value
                    const values = [pieces[i].value, pieces[j].value, pieces[k].value].sort((a, b) => a - b);
                    
                    // Check if they form an arithmetic progression
                    if (values[1] - values[0] === values[2] - values[1]) {
                        return true;
                    }
                }
            }
        }
        
        return false;
    }

    // Victoria major: Four pieces with three in one progression and another three in another progression
    function checkVictoriaMajor() {
        // This is a complex check - we need 4 pieces total, with overlapping progressions
        // Check for geometric and arithmetic progressions
        
        const opponentSide = gameState.currentPlayer === 'white' ? 
                             { startRow: 0, endRow: 3 } : 
                             { startRow: 4, endRow: 7 };
        
        // Find all player's pieces on the opponent's side
        const pieces = [];
        for (let row = opponentSide.startRow; row <= opponentSide.endRow; row++) {
            for (let col = 0; col < 16; col++) {
                const piece = gameState.board[row][col];
                if (piece && piece.color === gameState.currentPlayer) {
                    pieces.push({ row, col, value: piece.value });
                }
            }
        }
        
        // Need at least 4 pieces
        if (pieces.length < 4) return false;
        
        // Check all possible combinations of 4 pieces
        for (let i = 0; i < pieces.length - 3; i++) {
            for (let j = i + 1; j < pieces.length - 2; j++) {
                for (let k = j + 1; k < pieces.length - 1; k++) {
                    for (let l = k + 1; l < pieces.length; l++) {
                        const values = [
                            pieces[i].value, 
                            pieces[j].value, 
                            pieces[k].value, 
                            pieces[l].value
                        ];
                        
                        // Check if there are two different progressions within these 4 pieces
                        if (hasMultipleProgressions(values)) {
                            return true;
                        }
                    }
                }
            }
        }
        
        return false;
    }

    // Victoria excellentissima: Four pieces with all three types of progressions
    function checkVictoriaExcellentissima() {
        // This is the most complex check - we need 4 pieces with arithmetic, geometric, and harmonic progressions
        
        const opponentSide = gameState.currentPlayer === 'white' ? 
                             { startRow: 0, endRow: 3 } : 
                             { startRow: 4, endRow: 7 };
        
        // Find all player's pieces on the opponent's side
        const pieces = [];
        for (let row = opponentSide.startRow; row <= opponentSide.endRow; row++) {
            for (let col = 0; col < 16; col++) {
                const piece = gameState.board[row][col];
                if (piece && piece.color === gameState.currentPlayer) {
                    pieces.push({ row, col, value: piece.value });
                }
            }
        }
        
        // Need at least 4 pieces
        if (pieces.length < 4) return false;
        
        // Check all possible combinations of 4 pieces
        for (let i = 0; i < pieces.length - 3; i++) {
            for (let j = i + 1; j < pieces.length - 2; j++) {
                for (let k = j + 1; k < pieces.length - 1; k++) {
                    for (let l = k + 1; l < pieces.length; l++) {
                        const values = [
                            pieces[i].value, 
                            pieces[j].value, 
                            pieces[k].value, 
                            pieces[l].value
                        ];
                        
                        // Check if all three progression types exist
                        if (hasAllProgressionTypes(values)) {
                            return true;
                        }
                    }
                }
            }
        }
        
        return false;
    }

    // Helper function to check if there are multiple types of progressions within 4 values
    function hasMultipleProgressions(values) {
        // We need to check all possible combinations of 3 values from the 4
        const combinations = [
            [values[0], values[1], values[2]],
            [values[0], values[1], values[3]],
            [values[0], values[2], values[3]],
            [values[1], values[2], values[3]]
        ];
        
        let hasArithmetic = false;
        let hasGeometric = false;
        
        for (const combo of combinations) {
            // Sort the values
            combo.sort((a, b) => a - b);
            
            // Check for arithmetic progression
            if (combo[1] - combo[0] === combo[2] - combo[1]) {
                hasArithmetic = true;
            }
            
            // Check for geometric progression
            if (combo[0] !== 0 && combo[1] / combo[0] === combo[2] / combo[1]) {
                hasGeometric = true;
            }
            
            if (hasArithmetic && hasGeometric) {
                return true;
            }
        }
        
        return false;
    }

    // Helper function to check if all three progression types exist within 4 values
    function hasAllProgressionTypes(values) {
        // We need to check all possible combinations of 3 values from the 4
        const combinations = [
            [values[0], values[1], values[2]],
            [values[0], values[1], values[3]],
            [values[0], values[2], values[3]],
            [values[1], values[2], values[3]]
        ];
        
        let hasArithmetic = false;
        let hasGeometric = false;
        let hasHarmonic = false;
        
        for (const combo of combinations) {
            // Sort the values
            combo.sort((a, b) => a - b);
            
            // Check for arithmetic progression
            if (combo[1] - combo[0] === combo[2] - combo[1]) {
                hasArithmetic = true;
            }
            
            // Check for geometric progression
            if (combo[0] !== 0 && combo[1] / combo[0] === combo[2] / combo[1]) {
                hasGeometric = true;
            }
            
            // Check for harmonic progression
            // In a harmonic progression, the reciprocals of the values form an arithmetic progression
            const reciprocals = combo.map(v => v !== 0 ? 1 / v : 0);
            if (combo[0] !== 0 && combo[1] !== 0 && combo[2] !== 0 && 
                reciprocals[1] - reciprocals[0] === reciprocals[2] - reciprocals[1]) {
                hasHarmonic = true;
            }
            
            if (hasArithmetic && hasGeometric && hasHarmonic) {
                return true;
            }
        }
        
        return hasArithmetic && hasGeometric && hasHarmonic;
    }

    // Update captured pieces display
    function updateCapturedPieces() {
        // Clear captured pieces displays
        document.querySelectorAll('.captured-pieces').forEach(el => {
            el.innerHTML = '';
        });
        
        // Update white's captured pieces
        const whiteCaptured = document.querySelector('#white-player .captured-pieces');
        gameState.capturedPieces.white.forEach(piece => {
            const capturedPiece = document.createElement('div');
            capturedPiece.classList.add('captured-piece', piece.color, piece.shape);
            capturedPiece.textContent = piece.value;
            whiteCaptured.appendChild(capturedPiece);
        });
        
        // Update black's captured pieces
        const blackCaptured = document.querySelector('#black-player .captured-pieces');
        gameState.capturedPieces.black.forEach(piece => {
            const capturedPiece = document.createElement('div');
            capturedPiece.classList.add('captured-piece', piece.color, piece.shape);
            capturedPiece.textContent = piece.value;
            blackCaptured.appendChild(capturedPiece);
        });
    }

    // Update game status
    function updateGameStatus(customMessage = null) {
        if (customMessage) {
            gameStatus.textContent = customMessage;
        } else {
            gameStatus.textContent = `${capitalizeFirstLetter(gameState.currentPlayer)}'s turn to play`;
        }
        
        // If auto-playing, add move count
        if (autoPlayConfig.isPlaying) {
            gameStatus.textContent += ` (Move ${autoPlayConfig.movesPlayed}/${autoPlayConfig.maxMoves})`;
        }
    }

    // Show tutorial
    function showTutorial() {
        const tutorialModal = document.getElementById('tutorial-modal');
        const tutorialContentElement = document.getElementById('tutorial-content');
        
        // Display first tutorial step
        let currentStep = 0;
        displayTutorialStep(currentStep);
        
        // Show modal
        tutorialModal.style.display = 'flex';
        
        // Navigation buttons
        prevStepButton.disabled = true;
        nextStepButton.disabled = currentStep >= tutorialContent.length - 1;
        
        // Display tutorial step
        function displayTutorialStep(step) {
            const tutorialStep = tutorialContent[step];
            tutorialContentElement.innerHTML = `
                <h3>${tutorialStep.title}</h3>
                <p>${tutorialStep.content}</p>
            `;
            
            // Update button states
            prevStepButton.disabled = step === 0;
            nextStepButton.disabled = step >= tutorialContent.length - 1;
        }
        
        // Previous step button
        prevStepButton.onclick = function() {
            if (currentStep > 0) {
                currentStep--;
                displayTutorialStep(currentStep);
            }
        };
        
        // Next step button
        nextStepButton.onclick = function() {
            if (currentStep < tutorialContent.length - 1) {
                currentStep++;
                displayTutorialStep(currentStep);
            }
        };
    }

    // Show rules
    function showRules() {
        const rulesModal = document.getElementById('rules-modal');
        rulesModal.style.display = 'flex';
    }

    // Close modals
    function closeModals() {
        modals.forEach(modal => {
            modal.style.display = 'none';
        });
    }

    // Helper function to capitalize first letter
    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    // Event listeners
    resetButton.addEventListener('click', initializeGame);
    autoPlayButton.addEventListener('click', toggleAutoPlay);
    tutorialButton.addEventListener('click', showTutorial);
    rulesButton.addEventListener('click', showRules);
    
    closeButtons.forEach(button => {
        button.addEventListener('click', closeModals);
    });

    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
        modals.forEach(modal => {
            if (event.target === modal) {
                modal.style.display = 'none';
            }
        });
    });

    // Show auto-play settings
    function showAutoPlaySettings() {
        // Update settings with current values
        moveSpeedSelect.value = autoPlayConfig.moveDelay;
        whiteStrategySelect.value = autoPlayConfig.strategies.white;
        blackStrategySelect.value = autoPlayConfig.strategies.black;
        moveLimitInput.value = autoPlayConfig.maxMoves;
        
        // Show the modal
        autoPlayModal.style.display = 'flex';
    }
    
    // Start auto-play with custom settings
    function startAutoPlayWithSettings() {
        // Update auto-play configuration with selected values
        autoPlayConfig.moveDelay = parseInt(moveSpeedSelect.value);
        autoPlayConfig.strategies.white = whiteStrategySelect.value;
        autoPlayConfig.strategies.black = blackStrategySelect.value;
        autoPlayConfig.maxMoves = parseInt(moveLimitInput.value);
        
        // Close the modal
        autoPlayModal.style.display = 'none';
        
        // Start auto-play
        startAutoPlay();
        autoPlayButton.textContent = 'Stop Auto Play';
    }

    // Toggle auto-play mode
    function toggleAutoPlay() {
        if (autoPlayConfig.isPlaying) {
            stopAutoPlay();
            autoPlayButton.textContent = 'Auto Play';
        } else {
            showAutoPlaySettings();
        }
    }

    // Start auto-play mode
    function startAutoPlay() {
        // Reset auto-play state
        autoPlayConfig.isPlaying = true;
        autoPlayConfig.movesPlayed = 0;
        autoPlayConfig.moveHistory = [];
        
        // Reset game if it's already over
        if (gameState.gameOver) {
            initializeGame();
        }
        
        // Add game info to status
        updateGameStatus(`Auto-playing with ${capitalizeFirstLetter(autoPlayConfig.strategies.white)} vs ${capitalizeFirstLetter(autoPlayConfig.strategies.black)} strategy`);
        
        // Schedule auto moves
        autoPlayConfig.moveInterval = setInterval(() => {
            if (gameState.gameOver || autoPlayConfig.movesPlayed >= autoPlayConfig.maxMoves) {
                stopAutoPlay();
                return;
            }
            
            makeAutoMove();
            autoPlayConfig.movesPlayed++;
        }, autoPlayConfig.moveDelay);
    }

    // Stop auto-play mode
    function stopAutoPlay() {
        autoPlayConfig.isPlaying = false;
        clearInterval(autoPlayConfig.moveInterval);
        autoPlayButton.textContent = 'Auto Play';
        
        // Show game summary if game was stopped due to reaching move limit
        if (autoPlayConfig.movesPlayed >= autoPlayConfig.maxMoves && !gameState.gameOver) {
            gameState.gameOver = true;
            gameStatus.textContent = `Game drawn after ${autoPlayConfig.movesPlayed} moves (move limit reached)`;
        }
    }

    // Make a single auto move for the current player
    function makeAutoMove() {
        // Get current strategy for the player
        const currentStrategy = autoPlayConfig.strategies[gameState.currentPlayer];
        
        // Get all valid moves for current player based on strategy
        const availableMoves = getAllValidMovesForPlayer(gameState.currentPlayer, currentStrategy);
        
        if (availableMoves.length === 0) {
            gameStatus.textContent = `No valid moves for ${capitalizeFirstLetter(gameState.currentPlayer)}. Game over!`;
            gameState.gameOver = true;
            stopAutoPlay();
            return;
        }
        
        // Choose a move based on strategy
        let moveToMake;
        
        // Take one of the top 3 moves (to add some variety)
        const moveIndex = Math.floor(Math.random() * Math.min(3, availableMoves.length));
        moveToMake = availableMoves[moveIndex];
        
        // Record move in history
        autoPlayConfig.moveHistory.push({
            player: gameState.currentPlayer,
            from: { row: moveToMake.fromRow, col: moveToMake.fromCol },
            to: { row: moveToMake.toRow, col: moveToMake.toCol },
            piece: { ...moveToMake.piece }
        });
        
        // Highlight the piece being moved
        selectPiece(moveToMake.fromRow, moveToMake.fromCol);
        
        // Wait a moment before making the move (for visual effect)
        setTimeout(() => {
            movePiece(moveToMake.toRow, moveToMake.toCol);
        }, autoPlayConfig.moveDelay / 3);
    }

    // Get all valid moves for a player based on strategy
    function getAllValidMovesForPlayer(playerColor, strategy = "aggressive") {
        const moves = [];
        
        // Iterate through all squares
        for (let row = 0; row < 8; row++) {
            for (let col = 0; col < 16; col++) {
                const piece = gameState.board[row][col];
                
                // Skip empty squares or opponent's pieces
                if (!piece || piece.color !== playerColor) continue;
                
                // Calculate valid moves for this piece
                gameState.validMoves = [];
                calculateValidMoves(row, col);
                
                // Store all valid moves for this piece
                gameState.validMoves.forEach(validMove => {
                    moves.push({
                        fromRow: row,
                        fromCol: col,
                        toRow: validMove.row,
                        toCol: validMove.col,
                        piece: piece,
                        capture: validMove.capture,
                        // Add score for strategic evaluation
                        score: evaluateMoveScore(row, col, validMove.row, validMove.col, piece, validMove.capture, playerColor, strategy)
                    });
                });
            }
        }
        
        // Clear valid moves after we're done
        gameState.validMoves = [];
        
        // Return moves sorted by score (higher is better)
        return moves.sort((a, b) => b.score - a.score);
    }
    
    // Evaluate move score based on strategy
    function evaluateMoveScore(fromRow, fromCol, toRow, toCol, piece, isCapture, playerColor, strategy) {
        let score = 0;
        
        // Base scoring: random strategy has small random scores
        if (strategy === "random") {
            return Math.random() * 10;
        }
        
        // All strategies prioritize captures
        if (isCapture) {
            const targetPiece = gameState.board[toRow][toCol];
            if (targetPiece) {
                score += targetPiece.value * 2; // Value of the piece being captured
            }
        }
        
        // Aggressive strategy: prioritize captures and advancing toward opponent's side
        if (strategy === "aggressive") {
            // Prioritize moving toward opponent's side
            if (playerColor === 'white' && fromRow > toRow) {
                // White moving up
                score += (fromRow - toRow) * 5;
            } else if (playerColor === 'black' && fromRow < toRow) {
                // Black moving down
                score += (toRow - fromRow) * 5;
            }
            
            // Bonus for pyramid moves (they're valuable)
            if (piece.shape === 'pyramid') {
                score += 10;
            }
            
            // Bonus for moves into opponent's side (for victory conditions)
            const opponentSide = playerColor === 'white' ? 
                             { startRow: 0, endRow: 3 } : 
                             { startRow: 4, endRow: 7 };
            
            if (toRow >= opponentSide.startRow && toRow <= opponentSide.endRow) {
                score += 20;
            }
        }
        
        // Defensive strategy: prioritize keeping pieces safe and moving valuable pieces less
        if (strategy === "defensive") {
            // Prioritize moving less valuable pieces
            score += 100 - piece.value; // Lower value pieces get higher scores
            
            // Penalize moving into opponent's side (more dangerous)
            const opponentSide = playerColor === 'white' ? 
                             { startRow: 0, endRow: 3 } : 
                             { startRow: 4, endRow: 7 };
            
            if (toRow >= opponentSide.startRow && toRow <= opponentSide.endRow) {
                score -= 10;
            }
            
            // Penalize moving pyramid (it's valuable)
            if (piece.shape === 'pyramid') {
                score -= 20;
            }
            
            // Check if move puts piece at risk of capture in the next move
            if (isPieceAtRiskAfterMove(fromRow, fromCol, toRow, toCol, playerColor)) {
                score -= 30;
            }
        }
        
        return score;
    }
    
    // Check if a piece would be at risk after a move
    function isPieceAtRiskAfterMove(fromRow, fromCol, toRow, toCol, playerColor) {
        // Simple implementation: check if destination is adjacent to opponent pieces
        const opponentColor = playerColor === 'white' ? 'black' : 'white';
        const adjacentDirections = [
            { dr: -1, dc: 0 }, // up
            { dr: 0, dc: 1 },  // right
            { dr: 1, dc: 0 },  // down
            { dr: 0, dc: -1 }, // left
            { dr: -1, dc: -1 }, // up-left
            { dr: -1, dc: 1 },  // up-right
            { dr: 1, dc: -1 },  // down-left
            { dr: 1, dc: 1 }    // down-right
        ];
        
        for (const dir of adjacentDirections) {
            const adjacentRow = toRow + dir.dr;
            const adjacentCol = toCol + dir.dc;
            
            if (isValidPosition(adjacentRow, adjacentCol)) {
                const adjacentPiece = gameState.board[adjacentRow][adjacentCol];
                if (adjacentPiece && adjacentPiece.color === opponentColor) {
                    return true; // Adjacent to opponent piece
                }
            }
        }
        
        return false;
    }

    // Initialize game
    initializeGame();

    // Auto-play event listeners
    startAutoPlayWithSettingsButton.addEventListener('click', startAutoPlayWithSettings);
}); 