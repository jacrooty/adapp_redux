const d3 = require("d3")
// ensure that d3 code executes only after the document is ready
HTMLDocument.prototype.ready = new Promise(function (resolve) {
  if (document.readyState != "loading")
    resolve();
  else
    document.addEventListener("DOMContentLoaded", function () {
      resolve();
    });
});

document.ready.then(function () {

// $(document).ready(function() {
  // set the dimensions and margins of the graph
  var margin = { top: 80, right: 20, bottom: 30, left: 60 },
    width = 500 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

  // set the ranges
  var x = d3.scaleBand()
    .range([0, width])
    .padding(0.5);

  var y = d3.scaleLinear()
  .range([height, 0.34]);


  // define asset names as global variables
  var usa;
  var can;
  var v;


  // variables required for modifying asset positions
  // in response to user button activity
  // boolean switch for logging to console for debugging button actions
  var reportStatus = true;


  // data array object with default settings
  var data = [
    { asset: "United States", amount: usa },
    { asset: "Canada", amount: can },
  ];

  // append the svg object to the body of the page
  // append a 'group' element to 'svg'
  // moves the 'group' element to the top left margin
  var svg = d3.select("#barchart").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
      "translate(" + margin.left + "," + margin.top + ")");

  // this function makes the figure... initially and with data updates
  function makefigure() {

    // clear out the previous bar chart
    d3.selectAll('svg > g > *').remove();

    // Scale the range of the data in the domains
    x.domain(data.map(function(d) {
      return d.asset; }));
    y.domain([0, d3.max(data, function(d) {
      return d.amount; })]);

    // make the title of the figure
    svg.append("text")
      .attr("class", "title")
      .attr("x", x(data[0].name))
      .attr("y", -50)
      .style("font-size", "15px")
      .text("Top Reasons for Incorporating Plant-based Foods - Canada vs U.S.");


    // append the rectangles for the bar chart
    svg.selectAll(".bar")
      .data(data)
      .enter().append("rect")
      .transition().duration(500).ease(d3.easeBounce)
      //.attr("class", "bar")
      .attr("fill", function (d){
        if (d.asset === "United States") {
          return "#0B8EB3";
        } else if (d.asset === "Canada") {
          return "#EB300C";
        }
      })
      .attr("x", function(d) {
        return x(d.asset); })
      .attr("width", x.bandwidth())
      .attr("y", function(d) {
        return y(d.amount); })
      .attr("height", function(d) {
        return height - y(d.amount);
      });

    // add asset value annotation at top of bars
    svg.selectAll(".labels")
      .data(data)
      .enter().append("text")
      .transition().duration(500).ease(d3.easeBounce)
      .text(function(d) {
        return d.amount;
      })
      .attr("text-anchor", "middle")
      .attr("x", function(d) {
        return x(d.asset) + 40; })
      .attr("y", function(d) {
        return y(d.amount) + 30; })
      .attr("font-family", "Arial")
      .attr("font-size", "16px")
      .attr("fill", "white");

    // add the x Axis
    svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x))
      .selectAll(".tick text")
      .call(wrap, x.bandwidth());

    // add the y Axis
    svg.append("g")
      .call(d3.axisLeft(y));

    // text label for the y axis
    svg.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left)
      .attr("x", 0 - (height / 2))
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .text("Response Percentages");
  };

  // Mike Bostock function for wrapping long text labels
  // useful in typesetting text labels under axis tick marks
  function wrap(text, width) {
    text.each(function() {
      var text = d3.select(this),
        words = text.text().split(/\s+/).reverse(),
        word,
        line = [],
        lineNumber = 0,
        lineHeight = 1.1, // ems
        y = text.attr("y"),
        dy = parseFloat(text.attr("dy")),
        tspan = text.text(null).append("tspan").attr("x", 0).attr("y", y).attr("dy", dy + "em");
      while (word = words.pop()) {
        line.push(word);
        tspan.text(line.join(" "));
        if (tspan.node().getComputedTextLength() > width) {
          line.pop();
          tspan.text(line.join(" "));
          line = [word];
          tspan = text.append("tspan").attr("x", 0).attr("y", y).attr("dy", ++lineNumber * lineHeight + dy + "em").text(word);
        };
      };
    });
  };


function setObjectiveValues() {
  // set asset variable values to match investment objective
  if (objective === "health") {
    usa = 83;
    can = 85;
  };

  if (objective === "weight") {
    usa = 62;
    can = 56;
  };

  if (objective === "clean") {
    usa = 51;
    can = 55;

  };

  if (objective === "concerns") {
    usa = 24;
    can = 23;
  };

  if (objective === "money") {
    usa = 17;
    can = 20;
  };

  if (objective === "environ") {
    usa = 14;
    can = 21;
  };

};

  makefigure(); // initial drawing of the bar chart

  // update the data for user selection of investment objective
  $("#objectiveInput").change(function(){
      objective = document.getElementById("objectiveInput").value;
      if (reportStatus) console.log("objective set to: ", objective);
      setObjectiveValues();
      data = [
        { asset: "United States", amount: usa },
        { asset: "Canada", amount: can },
      ];

      if (reportStatus) console.log(data);
      if (reportStatus) listValues();
      makefigure();  // redrawing of the bar chart to fit new objective input
  });

  // update data on user button activity when appropriate
  // there is a separate action for each button
  // (no values less than zero or greater than 100)

  function colorPicker(v) {

  }


// Draw legend

// Draw legend
var legendRectSize = 18,
    legendSpacing  = 4;

var legend = chart.selectAll('.legend')
    .data(data.series)
    .enter()
    .append('g')
    .attr('transform', function (d, i) {
        var height = legendRectSize + legendSpacing;
        var offset = -gapBetweenGroups/2;
        var horz = spaceForLabels + chartWidth + 40 - legendRectSize;
        var vert = i * height - offset;
        return 'translate(' + horz + ',' + vert + ')';
    });

legend.append('rect')
    .attr('width', legendRectSize)
    .attr('height', legendRectSize)
    .style('fill', function (d, i) { return color(i); })
    .style('stroke', function (d, i) { return color(i); });

legend.append('text')
    .attr('class', 'legend')
    .attr('x', legendRectSize + legendSpacing)
    .attr('y', legendRectSize - legendSpacing)
    .text(function (d) { return d.label; });


  // report results from button pressing when reportStatus is true
  function listValues() {
    console.log("usa: ", usa);
    console.log("can: ", can);
  };

}); // end document ready function
