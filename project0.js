
//Make an SVG Container
var svgContainer = d3.select("body").append("svg")
                                    .attr("width", 1000)
                                    .attr("height", 500);

//Draw a Circle
var circle = svgContainer.append("circle")
                         .attr("cx", 150)
                         .attr("cy", 150)
                         .attr("r", 100)
                         .attr("fill", "hsl(120,100%,50%)");
                         
var points = [[50,50],[60,170],[150,100],[70,10],[70,30]];

var poly = svgContainer.append("polygon")
                       .attr("fill", "hsl(240,100%,50%)")
                       .attr("points", points);
