# connect-4
Connect 4 game, implemented in Vue 3

I was challenged to implement a Connect-4 game in seven days, beginning from monday the 9th of May 2022.
The game should have state persistence and undo functionality


## Log:

### Day 1: Mission accomplished! :)
The first day, I just focused on getting the job done.
And actually, I managed to get a fully functional game up and running with state persistence and *undo* functionality.

I used vite to get quickly up and running. The new Composition API and `<script setup>` was new to me, so I read up on it. Very nice additions to Vue! - I opted in! A project like this needs a global data model. I thought Vuex, but discovered [Pinia](https://pinia.vuejs.org/).

The implementation is very simple. The main data structure is an array of columns of cell states (0 = no disc, 1 = player 1 disc, etc). This is easily converted to a visual representation. Reactivity keeps it updated. The data structure also allows quickly accessing columns and cells, which is needed for determining if the game is won.
The method for determining if the game is won is to examine the discs next to the piece just played.

For state persistence, I simply used the "persist" feature of Pinia.
The *undo* functionality was implemented by maintaining a history of moves. Ie [4,2] would mean that the first disc was placed in column 4 and the second was placed in column 2. Removing a disc translates into popping the column index from history and removing the disc on the top of that row.

### Day 2: Quality
Having a working game allowed me to turn to the quality. Quality of code and quality of the UI

*Code quality*
First thing I wanted was to do was switch to TypeScript. There are [plenty of good reasons to use Typescript](https://serokell.io/blog/why-typescript). So why didn't I start out with TypeScript? Well, I hadn't used it before, and wanted the piece of mind of having the job done. With that out of the way already, there should be plenty of time to learn TypeScript. Actually, it was quite quick to learn and also pretty quick to implement. For testing, I went with [vite-plugin-checker](https://github.com/fi3ework/vite-plugin-checker), which performs the checks during development, which is nice.

Next, I turned to the coding style. I needed a brush-up of the recommendations and wanted to get it right early, to avoid needing to change stuff. After that, the code applies to [the official Vue style guide](https://vuejs.org/style-guide/)

Finally, I changed the CSS to SCSS. SCSS is more readable and easier to maintain.

*UI quality*
First of all, the game should be playable on small screens too. It didn't take too many media queries to make that happen.

Next, I wanted it to be playable on keyboard too. I implemented two ways to interact. Pressing a number key simply drops the disc in the corresponding slot. Using the right and left arrow keys, you can select a column and then press down arrow to drop it.

### Day 3: Game experience (animation and sound)
With job specification fulfilled and quality in place, I could now move on to improving the game experience.

*Drop animation*
First of all, it would be nice to see those discs drop. Actually, this would not only look good, but also make it easier to see what was just played.

The data-model chosen was however not suited for the drop animations. In the model, the discs are just states of cells, which means they cannot easily be tracked, should they move. To remedy this, I decided to argument the model with a `discs` array containing discs played. Each disc contains information on where it is (column and row) and who played it.

Another thing that needed changing in order to ease animation was the grid. Each cell was its own SVG. If discs are to move from cell to cell, they cannot be part of such a solution. I had the alternatives of either implementing the discs in another layer or merge the cells in the column. I chose the latter. In fact, I merged all the cells. Doing this prevents future problems if animations needs to cross column borders.

For the animation algorithm, II found [dynamics.js](http://dynamicsjs.com/), which produces physics-based animations

*Undo animation*
With the drop animation in place, it wouldn't take much effort to create a similar effect when the discs are removed. I experimented a bit with the algorithms and went with a reversed gravity, which gives the impression that the disc is sucked up, which I found satisfying.

*Sound*
Sound is also part of the user experience. In the real world, things makes sounds, so to provide an authentic feeling, it would be nice with a little unintrusive bump when the discs are dropped. To back up the sucking-up effect, a suck-up sound would be in place.

These sounds could easily be recorded by myself. But they could probably also easily be found on the net. I googled up open source sound effect libraries and found a good bump sound by searching for "coin fall". It was harder to find a good suck-up sound, but after a while, I found a good quality sound called [Air Lock](https://freesound.org/people/VlatkoBlazek/sounds/185761/), which I imagined would work if played backwards. I reversed it and speeded it a bit up, and it became very close to what I had imagined.

### Day 4:
- Don't show game interactions when game is over


## Other ideas
- Mark the winning connection (ie by blinking)
- Upload demo
- API version number (to prevent problems when loading old saved games)
- Redo
- Save game
- 3 player game (n player)
- Play against computer
- Watch a replay of the entire game
- Save the game as SVG animation
- Game settings: Board size
- Game settings: Number of players
- Game settings: Color, name and controller of players
- Rule variation: [PopOut](https://en.wikipedia.org/wiki/Connect_Four)
- Rule variation: Cylinder-Infinite Connect-Four
- Rule variation: [Power up](https://en.wikipedia.org/wiki/Connect_Four)
- Docker
- More sound effects:
  - When user tries to play a piece, but the slot is full
  - When the game is won
