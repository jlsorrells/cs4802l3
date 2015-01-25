
GRID_SIZE = 50
grid = []

// rules for cell life/death
// live if 2 or 3 neighbours, die otherwise
liveCell = [false, false, true, true, false, false, false, false, false, false];
// born if 3 neighbours
deadCell = [false, false, false, true, false, false, false, false, false, false];

//Make an SVG Container
var svgContainer = d3.select("body").append("svg")
                                    .attr("width", 1000)
                                    .attr("height", 600);

// separate containers to control which things are drawn on top
svgContainer.append("g").attr("id", "bottom");
svgContainer.append("g").attr("id", "top");

// initialize the grid randomly
for (var i = 0; i < GRID_SIZE; i++) {
    temp = []
    for (var j = 0; j < GRID_SIZE; j++) {
        temp.push(Math.random() > 0.5);
    }
    grid.push(temp);
}

// draw the grid
drawGridlines();
redrawGrid();

// draws the girdlines
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
}

// draws the blue/white squares into the grid, blue for alive white for dead
function redrawGrid() {
    for (var i = 0; i < GRID_SIZE; i++) {
        for (var j = 0; j < GRID_SIZE; j++) {
            svgContainer.select("#bottom").append("rect").attr("x", 10 + j * 10)
                                                         .attr("y", 10 + i * 10)
                                                         .attr("width", 10)
                                                         .attr("height", 10)
                                                         .attr("fill", "hsl(240,100%," + (100 - 50 * grid[i][j]) + "%)");
        }
    }
}

// calculates the next generation and updates grid
function nextGeneration() {
    nextGrid = [];
    for (var i = 0; i < GRID_SIZE; i++) {
        temp = []
        for (var j = 0; j < GRID_SIZE; j++) {
            temp.push(calculateLife(i, j));
        }
        nextGrid.push(temp);
    }
    grid = nextGrid;
}

// determines what a specific gridcell should be in the next generation
function calculateLife(y, x) {
    // count how many alive neighbours
    neighbours = 0;
    for (var i = -1; i < 2; i++) {
        if (y+i < 0 || y+i >= GRID_SIZE) {
            continue;
        }
        for (var j = -1; j < 2; j++) {
            if (x+j < 0 || x+j >= GRID_SIZE || (i == 0 && j == 0)) {
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







