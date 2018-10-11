import React, { Component } from "react";

import * as d3 from "d3";

export default class BarChartComponent extends Component {
  state = {
    pieData: null
  };

  componentWillMount() {
    // load data
  }
  componentDidMount() {
    let data = [
      {
        date: "2-May-18",
        reputation: 258,
        deviceType: "Mobile",
        deviceName: "Device1"
      },
      {
        date: "30-Mar-18",
        reputation: 453,
        deviceType: "DeskTop",
        deviceName: "Device2"
      },
      {
        date: "1-Feb-18",
        reputation: 667,
        deviceType: "Tablet",
        deviceName: "Device3"
      }
    ];

    let barWidth = ((window.innerWidth - 120) / 100) * 65;

    // set the dimensions and margins of the graph
    var margin = { top: 20, right: 20, bottom: 50, left: 70 },
      width = barWidth - margin.left - margin.right,
      height = 400 - margin.top - margin.bottom;

    // parse the date / time
    var parseTime = d3.timeParse("%d-%b-%y");
    // set the ranges
    var x = d3.scaleTime().range([0, width]);
    var y = d3.scaleLinear().range([height, 0]);

    // define the line
    var valueline = d3
      .line()
      .x(function(d) {
        return x(d.date);
      })
      .y(function(d) {
        return y(d.reputation);
      });
    // append the svg obgect to the body of the page
    // appends a 'group' element to 'svg'
    // moves the 'group' element to the top left margin
    var svg = d3
      .select(this.refs.anchor)
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // format the data
    data.forEach(function(d) {
      d.date = parseTime(d.date);
      d.reputation = +d.reputation;
    });

    x.domain([new Date(2018, 0, 1), new Date(2018, 5, 1)]).nice();
    y.domain([200, 800]).nice();

    var svgDefs = svg.append("defs");

    var mainGradient = svgDefs
      .append("linearGradient")
      .attr("id", "mainGradient");

    // Create the stops of the main gradient. Each stop will be assigned
    // a class to style the stop using CSS.
    mainGradient
      .append("stop")
      .attr("class", "stop-left")
      .attr("stop-color", "#ccc")
      .attr("offset", "0%");

    mainGradient
      .append("stop")
      .attr("class", "stop-right")
      .attr("stop-color", "#000")
      .attr("offset", "100%");
    svg
      .append("path")
      .datum(data)
      .attr("class", "line")
      .attr("fill", "none")
      .attr("d", valueline);

    svg
      .selectAll(".bar")
      .data(data)
      .enter()
      .append("g")
      .append("rect")
      .transition()
      .duration(1000)
      .attr("class", "bar")
      .attr("y", function(d) {
        return y(d.reputation + 35);
      })
      .attr("height", 40)
      .attr("x", 0)
      .attr("width", function(d) {
        return x(d.date);
      })
      .style("fill", "url(#mainGradient)")
      .style("opacity", 0.07);

    // Add the scatterplot
    svg
      .selectAll("dot")
      .data(data)
      .enter()
      .append("circle")
      .attr("r", 20)
      .attr("class", function(d, i) {
        return d.deviceType ? d.deviceType : "";
      })
      // set the stroke opacity
      .style("stroke", function(d, i) {
        if (d.reputation >= 200 && d.reputation < 400) {
          return "red";
        } else if (d.reputation >= 400 && d.reputation < 600) {
          return "orange";
        } else {
          return "green";
        }
      })
      .attr("stroke-width", 3)
      .style("stroke-opacity", 0.5)
      .style("fill", "none")
      .attr("cx", function(d, i) {
        return x(d.date);
      })
      .attr("cy", function(d) {
        return y(d.reputation);
      });

    svg
      .selectAll(".device")
      .data(data)
      .enter()
      .append("text")
      .text(d => d.deviceName)
      .attr("color", "black")
      .attr("font-size", 8)
      .attr("x", function(d, i) {
        return x(d.date) - 12;
      })
      .attr("y", function(d) {
        return y(d.reputation) + 11;
      });

    svg
      .selectAll("image")
      .data(data)
      .enter()
      .append("svg:image")
      .attr("class", "twitter-pic")
      .attr("xlink:href", function(d) {
        return "https://img.freepik.com/free-icon/personal-computer-screen_318-39777.jpg?size=338c&ext=jpg";
      })
      .attr("x", function(d) {
        return x(d.date) - 7;
      })
      .attr("y", function(d) {
        return y(d.reputation) - 12;
      })
      .attr("width", 15)
      .attr("height", 15);

    // Add the X Axis
    svg
      .append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x).tickFormat(d3.timeFormat("%b-%y")));

    // Add the Y Axis
    svg
      .append("g")
      .attr("class", "yaxis")
      .call(d3.axisLeft(y).tickFormat(""));

    svg
      .select(".yaxis")
      .append("rect")
      .attr("class", "bar")
      .attr("x", -30)
      .attr("y", 0)
      .attr("width", 30)
      .attr("height", 110)
      .attr("fill", "green");

    svg
      .append("text")
      .attr("text-anchor", "middle")
      .attr("transform", "translate(-10,55) rotate(-90)")
      .style("fill", "white")
      .style("font-size", "11px")
      .style("font-weight", "300")
      .style("letter-spacing", "1px")
      .style("font-family", "SANS-SERIF")
      .text("HIGH");

    svg
      .select(".yaxis")
      .append("rect")
      .attr("class", "bar")
      .attr("x", -30)
      .attr("y", 110)
      .attr("width", 30)
      .attr("height", 110)
      .attr("fill", "orange");

    svg
      .append("text")
      .attr("text-anchor", "middle")
      .attr("transform", "translate(-10,160) rotate(-90)")
      .style("fill", "white")
      .style("font-size", "11px")
      .style("font-weight", "300")
      .style("letter-spacing", "1px")
      .style("font-family", "SANS-SERIF")
      .text("MEDIUM");

    svg
      .select(".yaxis")
      .append("rect")
      .attr("class", "bar")
      .attr("x", -30)
      .attr("y", 220)
      .attr("width", 30)
      .attr("height", 110)
      .attr("fill", "red");

    svg
      .append("text")
      .attr("text-anchor", "middle")
      .attr("transform", "translate(-10,275) rotate(-90)")
      .style("fill", "white")
      .style("font-size", "11px")
      .style("font-weight", "300")
      .style("letter-spacing", "1px")
      .style("font-family", "SANS-SERIF")
      .text("LOW");
  }

  render() {
    return (
      <div className="chartContainer" style={{ float: `right` }}>
        <h2 className="componentTitle">Device Reputation</h2>
        <svg ref="anchor" />
      </div>
    );
  }
}
