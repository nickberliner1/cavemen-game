# Cavemen Game

Two player game built with OOP in ES6.

[Live Demo](https://nickberliner1.github.io/cavemen-game/)

## Game concepts
The concept of the game is to have two players switch off turns, where they can only move up to 3 spaces, but not through the blocks. Each player can pick up different weapons, but will drop whatever current weapon they have (they originally start with just rocks).

Once the players get within one square of each other, they are no longer allowed to move and the fight starts. Each player can choose to either attack or defend, if they choose "defend" then the damge done to them by the other player will only be 50% of the weapon's power. Once one player's health gets to 0 (or less) the game is over and you can restart.

Every object in the game is automatically generated every time the game is started (or page is refreshed), with the players never allowed to start exactly next to each other.
