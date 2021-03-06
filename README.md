# connect-4
Connect 4 game, implemented in Vue 3

I was challenged to implement a Connect-4 game in seven days, beginning from monday the 9th of May 2022.
The game should have state persistence and undo functionality

You can see the demo [here](https://little-b.it/connect4/deliverence/)

## Log:

### Day 1: Mission accomplished! :)
The first day, I just focused on getting the job done.
And actually, I managed to get a fully functional game up and running with state persistence and *undo* functionality.

I used vite to get quickly up and running. The new Composition API and [<script setup>](https://vuejs.org/api/sfc-script-setup.html) was new to me, so I read up on it. Very nice additions to Vue! - I opted in! A project like this needs a global data model. I thought Vuex, but discovered [Pinia](https://pinia.vuejs.org/).

The implementation is very simple. The main data structure is an array of columns of cell states (0 = no disc, 1 = player 1 disc, etc). This is easily converted to a visual representation. Reactivity keeps it updated. The data structure also allows quickly accessing columns and cells, which is needed for determining if the game is won.
The method for determining if the game is won is to examine the discs next to the piece just played.

For state persistence, I simply used the "persist" feature of Pinia.
The *undo* functionality was implemented by maintaining a history of moves. Ie [4,2] would mean that the first disc was placed in column 4 and the second was placed in column 2. Removing a disc translates into popping the column index from history and removing the disc on the top of that row.

Demo for [DAY 1](https://little-b.it/connect4/day1/)
I have tagged the code each day. Here is the code for [day 1](https://github.com/rosell-dk/connect-4/tree/day1)

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

For the animation algorithm, I found [dynamics.js](http://dynamicsjs.com/), which produces physics-based animations. For some reason it errored when trying to animate SVG properties, but I found a workaround (which was to tell dynamics to animate a reactive property instead, watch it, and then update the SVG attribute)

*Undo animation*
With the drop animation in place, it wouldn't take much effort to create a similar effect when the discs are removed. I experimented a bit with the algorithms and went with a reversed gravity, which gives the impression that the disc is sucked up, which I found satisfying.

*Sound*
Sound is also part of the user experience. In the real world, things makes sounds, so to provide an authentic feeling, it would be nice with a little unintrusive bump when the discs are dropped. To back up the sucking-up effect, a suck-up sound would be in place.

These sounds could easily be recorded by myself. But they could probably also easily be found on the net. I googled up open source sound effect libraries and found a good bump sound by searching for "coin fall". It was harder to find a good suck-up sound, but after a while, I found a good quality sound called [Air Lock](https://freesound.org/people/VlatkoBlazek/sounds/185761/), which I imagined would work if played backwards. I reversed it and speeded it a bit up, and it became very close to what I had imagined.

### Day 4: Various improvements

*New functionality*
- Mute / unmute

*UI*
- Don't show game interactions when game is over
- Don't play sounds until user interacted with the page
- Shortcut for undo: Arrow Up

*Code quality*
- Refactored code for checking if user interacted with the page into a [composable](https://vuejs.org/guide/reusability/composables.html)
- Refactured code for hooking into keyboard event into using [useEventListener composable](https://vueuse.org/core/useEventListener/) from vueuse.org
- Refactured the workaround for using dynamics.js with SVG into a composable

### Day 5: Various improvements
*Code quality*
- Refactored audio play into a composable

*UI*
- Limit simultaneously suck-up sounds (it generated too much noise when all discs where sucked up simultaneously)
- Play a fanfare when the game is won
- Using naiveui for basic components

*Features*
- Let the players choose their colors
- Choose input method for players
- 3 player game (n player)
- The required connections to win can now be tweaked

Uploaded a demo

### Day 6-7: Weekend with family

## Ideas for improvements

*Code Quality*
- The logic in the model (GameStore.js) has grown too big. It needs refactoring.

*Features*
- Mark the winning connection (ie by blinking)
- Game settings: Board size
- Redo
- Save game
- Play against computer
- Watch a replay of the entire game
- Save the game as SVG animation
- Rule variation: [PopOut](https://en.wikipedia.org/wiki/Connect_Four)
- Rule variation: Cylinder-Infinite Connect-Four
- Rule variation: [Power up](https://en.wikipedia.org/wiki/Connect_Four)
- Pan through history
- Optionally only allow the player to undo his own moves

*Performance*
- [Compile without options api](https://github.com/vuejs/core/tree/main/packages/vue#bundler-build-feature-flags)
