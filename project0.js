
//Make an SVG Container
var svgContainer = d3.select("body").append("svg")
                                    .attr("width", 1000)
                                    .attr("height", 500);
                         
var points = [[50,50],[60,170],[150,100],[70,10],[70,30]];

/*var poly = svgContainer.append("polygon")
                       .attr("fill", "hsl(240,100%,50%)")
                       .attr("points", points);*/

//draw some points of different sizes
var x = 10;
for (var i = 0; i < 18; i++) {
    //the size of the current point
    var radius = Math.pow(1.3, i);
    x += radius;
    svgContainer.append("circle").attr("cx", x)
                                 .attr("cy", 100)
                                 .attr("r", radius)
                                 // give points different colors
                                 .attr("fill", "hsl("+ (radius * 5 - 1000 / radius) +",100%,50%)");
    //space 5 pixels between the points
    x += 5 + radius;
}

//label for the points
svgContainer.append("text").attr("x", 10)
                           .attr("y", 60)
                           .attr("font-size", "30px")
                           .text("Points");
                           
//draw some lines
//single line
svgContainer.append("line").attr("x1",10)
                           .attr("y1",200)
                           .attr("x2",50)
                           .attr("y2",300)
                           .attr("stroke","hsl(0,100%,50%)")
                           .attr("stroke-width",2);
//polyline
var points = [[70,200],[80,300],[100,200],[130,300],[170,200],[220,300],[280,200]];
svgContainer.append("polyline").attr("points",points)
                               .attr("stroke","hsl(120,100%,50%)")
                               .attr("stroke-width",2)
                               .attr("fill", "none");

//label for the lines
svgContainer.append("text").attr("x", 10)
                           .attr("y", 160)
                           .attr("font-size", "30px")
                           .text("Lines");