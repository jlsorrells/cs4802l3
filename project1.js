
GRID_SIZE = 50
grid = []

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

function redrawGrid() {
    for (var i = 0; i < GRID_SIZE; i++) {
        for (var j = 0; j < GRID_SIZE; j++) {
            svgContainer.select("#bottom").append("rect").attr("x", 10 + j * 10)
                                       .attr("y", 10 + i * 10)
                                       .attr("width", 10)
                                       .attr("height", 10)
                                       .attr("fill", "hsl(240,100%," + (50 + 50 * grid[i][j]) + "%)");
        }
    }
}





