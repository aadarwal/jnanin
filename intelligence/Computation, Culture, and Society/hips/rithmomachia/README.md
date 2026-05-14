# Rithmomachia - The Philosophers' Game

A web-based implementation of the medieval mathematical board game Rithmomachia, also known as "The Philosophers' Game."

## Overview

Rithmomachia is an educational board game dating back to medieval times (circa 1000 CE). The name derives from Greek, meaning "Battle of Numbers." It was widely played among scholars and was considered intellectually superior to chess during the Middle Ages.

This implementation provides a modern web interface for playing this ancient game, following the historical rules as closely as possible while making the game accessible to modern players.

## Features

- Interactive game board with proper piece movement
- Visual representation of different piece types (circles, triangles, squares, pyramids)
- Game rules and tutorial for new players
- Captured pieces tracking
- Turn-based gameplay
- Responsive design for different screen sizes

## Game Rules

### The Board
The game is played on a 16x8 board. The two sides are referred to as "White" (even) and "Black" (odd), although both sides contain a mix of even and odd numbers.

### The Pieces
Each player has a set of pieces with numbers according to Boethian number theory:
- Round pieces (circles): Contains the "multiples"
- Triangular pieces: Contains the "superparticulares" (numbers in the form [n+1]/n)
- Square pieces: Contains the "superpartientes" (numbers in the form [n+2]/[n+1])
- Pyramids: Special pieces with composite values

### Basic Movement
- Circle: Moves like a chess rook (orthogonally any number of spaces)
- Triangle: Moves like a chess bishop (diagonally any number of spaces)
- Square: Moves like a chess queen (orthogonally or diagonally any number of spaces)
- Pyramid: Moves like a chess king (one square in any direction)

### Capturing
Pieces can capture opponent's pieces through various mathematical relationships:
- By Addition: When your piece lands on a square where the sum equals an opponent's piece value
- By Subtraction: When the difference between your piece and another equals the value of an opponent's piece
- By Multiplication: When the product of your pieces equals an opponent's piece value
- By Division: When the quotient of your pieces equals an opponent's piece value

### Game Objective
The goal is to arrange three or four of your pieces on the opponent's side of the board in specific mathematical relationships (harmonies). These can be:
- Arithmetic progression
- Geometric progression
- Harmonic proportion
- Musical harmony

## Historical Context

Rithmomachia was created to teach the number theory of Boethius and was widely used in medieval schools and universities. The game faded in popularity in the late 16th century as the rules of chess evolved.

## Technical Implementation

This project is built using:
- HTML5
- CSS3
- Vanilla JavaScript

No external libraries or frameworks are used, making it easy to run in any modern browser.

## How to Run

Simply open the `index.html` file in a web browser to start playing.

## Future Improvements

- Advanced capturing mechanics
- Full implementation of harmony victory conditions
- Multiplayer support
- AI opponent
- Save/load game functionality

## Credits

This implementation is based on historical sources and modern research on the game Rithmomachia.

## License

This project is licensed under the MIT License. 