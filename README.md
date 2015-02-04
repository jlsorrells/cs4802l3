This program simulates the game of life.  It is written in Javascript.  
To view the output, go to http://jlsorrells.github.io/cs4802a1/  
There is a 50x50 gird of cells.  Blue cells are alive, and white cells are dead.  The initial state is randomly generated.  
To pause the simulation, click on the "Pause" button to the right of the grid.  
To change the speed at which it updates, change the value in the box labeled "Update Speed (ms)".  The maximum value is two seconds per generation.  On my computer, the fastest it can go is about 35 ms per generation.  
While the simulation is paused, you can interact with the simulation by clicking on cells in the grid.  Clicking on a live cell will make it die, and clicking on a dead cell will make it alive.  
There are four rules to determine life/death/birth of cells:  
 - A live cell with 2 or 3 neighbours will continue living.  
 - A live cell with 1, 4, 5, 6, 7, 8, or 9 neighbours will die.  
 - A dead cell with 3 neighbours will be born (become a live cell).  
 - A dead cell with 1, 2, 4, 5, 6, 7, 8, or 9 neighbours will continue to be dead.  
