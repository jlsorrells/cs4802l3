
"use strict"

var GRID_SIZE = 50;
var grid = [];
var updateSpeed = 1000;
var generations = 0;

// rules for cell life/death
// live if 2 or 3 neighbours, die otherwise
var liveCell = [false, false, true, true, false, false, false, false, false, false];
// born if 3 neighbours
var deadCell = [false, false, false, true, false, false, false, false, false, false];

//Make an SVG Container
var svgContainer = d3.select("body").append("svg")
                                    .attr("width", 1000)
                                    .attr("height", 600);

// separate containers to control which things are drawn on top
svgContainer.append("g").attr("id", "bottom");
svgContainer.append("g").attr("id", "top");

// initialize the grid randomly
for (var i = 0; i < GRID_SIZE; i++) {
    var temp = []
    for (var j = 0; j < GRID_SIZE; j++) {
        temp.push(Math.random() > 0.5);
    }
    grid.push(temp);
}

// start doing things
drawGridlines();
drawGrid();
var running = setInterval(run, updateSpeed);

// draws the girdlines and other static UI elements
function drawGridlines() {
    for (var i = 0; i <= GRID_SIZE; i++) {
        // vertical lines
        svgContainer.select("#top").append("line").attr("x1", 10 + i * 10)
                                                  .attr("y1", 10)
                                                  .attr("x2", 10 + i * 10)
                                                  .attr("y2", 10 + GRID_SIZE * 10)
                                                  .attr("stroke", "black")
                                                  .attr("stroke-width", 2);
        // horizontal lines
        svgContainer.select("#top").append("line").attr("x1", 10)
                                                  .attr("y1", 10 + i * 10)
                                                  .attr("x2", 10 + GRID_SIZE * 10)
                                                  .attr("y2", 10 + i * 10)
                                                  .attr("stroke", "black")
                                                  .attr("stroke-width", 2);
    }
    // draw some UI things as well
    // generations counter
    svgContainer.append("text").attr("x", 40 + GRID_SIZE * 10)
                               .attr("y", 40)
                               .attr("font-size", 20)
                               .attr("id", "gen_counter")
                               .text("Generations: 0");
    // pause button
    svgContainer.append("rect").attr("x", 40 + GRID_SIZE * 10)
                               .attr("y", 63)
                               .attr("width", 100)
                               .attr("height", 22)
                               .attr("id", "pause_rect")
                               .attr("fill", "hsl(0,0%,80%")
                               .attr("stroke", "black")
                               .attr("stroke-width", 2)
                               .on("click", pause);
    svgContainer.append("text").attr("x", 40 + GRID_SIZE * 10)
                               .attr("y", 80)
                               .attr("font-size", 20)
                               .attr("id", "pause_button")
                               .text("Pause")
                               .on("click", pause);
    // update speed
    svgContainer.append("text").attr("x", 40 + GRID_SIZE * 10)
                               .attr("y", 120)
                               .attr("font-size", 20)
                               .attr("id", "update_label")
                               .text("Update Speed (ms)");
    svgContainer.append("foreignObject").attr("x", 40 + GRID_SIZE * 10)
                                        .attr("y", 130)
                                        .attr("width", 100)
                                        .attr("height", 25)
                                        .html("<input type=\"number\" min=\"0\" max=\"2000\" step=\"10\" value=\"500\" id=\"updateSpeedBox\" oninput=\"setUpdateTime(this.value)\">");

}

// draws the grid for the first time
function drawGrid() {

    for (var i = 0; i < GRID_SIZE; i++) {
        for (var j = 0; j < GRID_SIZE; j++) {
            svgContainer.select("#bottom").append("rect").attr("x", 10 + j * 10)
                                                         .attr("y", 10 + i * 10)
                                                         .attr("width", 10)
                                                         .attr("height", 10)
                                                         .attr("fill", "hsl(240,100%," + (100 - 50 * grid[i][j]) + "%)")
                                                         .on("click", function(){cellClicked(this);});
        }
    }
}

// updates existing gridcells
function redrawGrid() { 
    // update the color of each cell
    svgContainer.select("#bottom").selectAll("rect").each(colorGridCell);
        
    svgContainer.select("#gen_counter").text("Generations: " + generations);
}

function colorGridCell() {
    this.setAttribute("fill", "hsl(240,100%," + 
    (100 - 50 * grid[this.getAttribute("y") / 10 - 1][this.getAttribute("x") / 10 - 1]) + "%)");
}

// calculates the next generation and updates grid
function nextGeneration() {
    var nextGrid = [];
    for (var i = 0; i < GRID_SIZE; i++) {
        temp = []
        for (var j = 0; j < GRID_SIZE; j++) {
            temp.push(calculateLife(i, j));
        }
        nextGrid.push(temp);
    }
    grid = nextGrid;
    generations++;
}

// determines what a specific gridcell should be in the next generation
function calculateLife(y, x) {
    // count how many alive neighbours
    var neighbours = 0;
    for (var i = -1; i < 2; i++) {
        if (y+i < 0 || y+i >= GRID_SIZE) {
            continue;
        }
        for (var j = -1; j < 2; j++) {
            if (x+j < 0 || x+j >= GRID_SIZE || (i === 0 && j === 0)) {
                continue;
            }
            neighbours += grid[y + i][x + j];
        }
    }
    if (grid[y][x]) {
        return liveCell[neighbours];
    } else {
        return deadCell[neighbours];
    }
}

// calculate the next generation then update the grid
function run() {
    nextGeneration();
    redrawGrid();
}

function pause() {
    if (running !== null) {
        clearInterval(running);
        running = null;
        svgContainer.select("#pause_button").text("Unpause");
    } else {
        //run();
        running = setInterval(run, updateSpeed);
        svgContainer.select("#pause_button").text("Pause");
    }
}

function setUpdateTime(timeStep) {
    // 2000 is max allowed value
    if (timeStep > 2000) {
        //d3.select("#updateSpeedBox").attr("value", 2000); // doesn't work?
        d3.select("#updateSpeedBox")[0][0].value = 2000;
        timeStep = 2000;
    }
    updateSpeed = timeStep;
    // if running, pause and unpause to start using the new value
    if (running !== null) {
        pause();
        pause();
    }
}

function cellClicked(gridCell) {
    // only allow interaction with grid while paused
    if (running === null) {
        // find which cell was clicked
        var x = gridCell.getAttribute("x") / 10 - 1;
        var y = gridCell.getAttribute("y") / 10 - 1;
        
        // change its state
        var state = grid[y][x];
        grid[y][x] = !state;
        
        // recolor it
        colorGridCell.call(gridCell);
    }
}










