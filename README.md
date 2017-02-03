# NG2 Tic Tac Toe

by Patryk Bernasiewicz, the owner of his own repository!


### Technical Details

This app was built using [Angular 2](https://angular.io/) and [Angular CLI](https://github.com/angular/angular-cli).

The app can save the status if there is already a game running on the server. It uses the `localStorage` to save the last played game's token.

### How it works

- The app loads, the `Game` component is called
- The `Game` component calls the `GameService` to initialize the game
- The `GameService` checks the `localStorage` for an existing game token
  - If the token is found in `localStorage`, then only the current game status is returned.
  - If the token is NOT found, then a new game is initialized and API is called for new token, which then gets saved by the `localStorage`.
- Depending on whether the user decided to start first, the board gets updated with or without the first Circle move and awaits for the Cross move from the Player.
- When the Player clicks one of the empty fields, `GameComponent`'s `handleUserMove()` method is called:
  - `handleUserMove()` method checks if there is any move that can be performed (ie. if the board still has empty fields and the game still has no winner)
  - `handleUserMove()` method calls the `GameService.sendMove()` method, which sends the move to the API and returns the `Observable` with the response.
- The board gets updated again, this time with both the user's move and the server's move.  

The game ends with either the player or the server wins the game, or when there's no more room to make a move, which results in a tie.

### ToDo List

- Add a Restart button if the User wants to restart the game during an active game.