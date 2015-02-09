Jon Sorrells, lab 3, cs 4802
To view the output, go to http://jlsorrells.github.io/cs4802l3/  

For this lab, I added a graph of population over time, and a button to clear the board.  
For the graph code, I modified an example from http://bl.ocks.org/mbostock/3883245 

supported interactions before lab:
 - Button to pause/unpause simulation.  This allows the user to stop at a certain generation and look more closely at it.  
 - Input box to control speed of simulation.  This allows users to slow down the simulation to watch each generation more closely, or speed it up to see the long term results.  
 - Click on cells to change their state.  This allows users to put in custom patterns.  

interaction opportunities:
 - Ability to clear board so you can more easily put in a specific pattern.  The user needs to be able to easily input a custom pattern.  Currently, there is no way to clean the board, so a user inputting a pattern needs to manually clear it by clicking on every single live cell.  A single button to set the board to empty would fix this.  
 - View population over time.  Currently, there is no way to see how many live cells there are (you could count them one at a time, but the gird is 50x50, so it would take a while).  A nice fix for this would be to include a graph of population over time.  
 - Ability to modify rules to control cell life/death.  Users may want to simulate different environments with custom rules.  The current system has default rules and no options to change them.  A fix for this would be to have checkboxes where users could select if a cell should live or die if it has x neighbours.  
 
 