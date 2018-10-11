import React, { Component } from "react";

import * as d3 from "d3";

export default class StackBarComponent extends Component {
  state = {
    pieData: null
  };

  componentDidMount() {
    let datavars = [
      { title: "Frictionless", value: 80 },
      { title: "Challenge", value: 20 }
    ];
    var colors = ["green", "orange"];
    const { height } = this.props;

    let width = ((window.innerWidth - 125) / 100) * 99;

    const svg = d3
      .select(this.refs.anchor)
      .attr("width", width)
      .attr("height", height)
      .attr("transform", function(d, i) {
        return "translate(0," + i * height + ")";
      });

    svg
      .selectAll("rect")
      .data(datavars)
      .enter()
      .append("rect")
      .transition()
      .duration(1000)
      .attr("width", function(d) {
        return (d.value / 100) * width;
      })
      .attr("height", function(d) {
        return height;
      })
      .attr("id", function(d, i) {
        return `arc_${i}`;
      })
      .attr("x", function(d, i) {
        let x = 0;
        if (i === 1) {
          x = width - (d.value / 100) * width;
        }
        return x;
      })
      .attr("fill", function(d, i) {
        return colors[i];
      })
      .attr("y", 0);

    svg
      .selectAll(".authtext")
      .data(datavars)
      .enter()
      .append("text")
      .attr("x", function(d, i) {
        let x = 10;
        if (i === 1) {
          x = width - (d.value / 100) * width + 10;
        }
        return x;
      })
      .attr("y", height / 2)
      .attr("dy", ".35em")
      .text(function(d) {
        return `${d.title}- ${d.value}%`;
      })
      .style("fill", "#fff")
      .attr("font-size", "10px");
  }
  render() {
    return (
      <div className="chartContainer">
        <h2 className="componentTitle">Authentication Summary</h2>
        <svg ref="anchor" />
      </div>
    );
  }
}
