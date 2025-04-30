# FreeCell
## Description

The 'FreeCell' project is a software rendition of the classic card game of the same name. The objective of the game is to fill all four foundation piles (located at the top right), where each pile can only contain cards of the same suit, stacked in ascending order. [See more for the rules](https://en.wikipedia.org/wiki/FreeCell)

## Features
The project features a game board with all 52 cards shuffled and stacked on the eight tableau piles. Cards are moved by clicking and dragging with the mouse, and inserted at a pile situated at the cursor's position (if there exists such pile). The movement and selection of cards is based on the games rules such as not being able to place a 3 of hearts on a 10 of spades. In addition to dragging cards, cards can be quickly tapped to play the 'best valid move'; best in the sense that any move to the foundation pile is tried before the tableau piles which are all tried before the free cell pile. When the free cell is empty and all cards in the tableaus form cascades (descending piles of cards that alternate in color and differ only by +1 in terms of numbers such as 8 of Hearts, 7 of Spades, 6 of Diamonds), the game is complete and all cards are automatically assigned to their foundation piles.

The game board is structure with 8 tableau piles at the bottom, 4 free cell piles to the top left and 4 foundation piles to the top right. The project also features an undo button that undoes the player's last move. It also features a 'move counter' that records how many moves the player took and a timer that keeps track of how the time elapsed since the beginning of the game. In addition, the project features a 'New Game' button to reshuffle/ start a new game.

## Getting Started
To launch the game, go to the root directory of the project (same as the app.js file) and run node app.js in the terminal. Follow the local host link and press the 'Start Game' button to begin the game.

## Limitations and Future Plans


