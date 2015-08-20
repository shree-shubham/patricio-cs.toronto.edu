(function(){

var width = Math.max(960, innerWidth),
    height = Math.max(500, innerHeight);

var i = 0;

var svg = d3.select("#hidden").append("svg")
    .attr("width", width)
    .attr("height", height);

var rect = svg.append("rect")
    .attr("width", width)
    .attr("height", height)
    .on("ontouchstart" in document ? "touchmove" : "mousemove", particle)
    .on("click", background);

function particle() {
  var m = d3.mouse(this);

  svg.insert("circle", "rect")
      .attr("cx", m[0])
      .attr("cy", m[1])
      .attr("r", 10)
      .style("fill", d3.hsl((i = (i + 1) % 360), 1, .5))
      .style("stroke", d3.hsl((i), 1, .5))
      .style("stroke-opacity", 1)
      .style("fill-opacity", 1)
    .transition()
      .duration(20000)
      .ease(Math.sqrt)
      .attr("r", 50)
      .style("fill-opacity", 1e-6)
      .style("stroke-opacity", 1e-6)
      .remove();

  d3.event.preventDefault();
}

function background(){
  rect.style("fill", d3.hsl((i), 1, .5))
      .style("fill-opacity", 1)
    .transition()
      .duration(10000)
      .style("fill", "#FFFFFF")
      .style("fill-opacity", 1e-6);
}

})(window);