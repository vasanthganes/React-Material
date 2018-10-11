import React, { Component } from "react";

import * as d3 from "d3";

export default class DonutComponent extends Component {
  
  constructor(props){
    super(props);
    this.state = {
      pieData: null
    };
  }

  setFilter(from,to) {
    console.log(`from ${from} to ${to}`)
  }
  componentWillMount() {
    // load data
  }
  componentDidMount() {

    let barWidth = ((window.innerWidth - 120) / 100) * 30;

    let endAngle = 2 * Math.PI;
    const { height } = this.props;
    let radius = Math.min(barWidth, height) / 2;
    let radiusDistance = barWidth / 10;
    //[{ startAngle: 0, endAngle: 0.77 * endAngle, label: "", color: "green", innerradius: 80, outerradius: 100 }]
    const svg = d3
      .select(this.refs.anchor)
      .attr("width", barWidth)
      .attr("height", height);

    let data = [
      {
        title: "tee",
        arcdata: [
          {
            startAngle: 0,
            endAngle: 0.77 * endAngle,
            color: "green",
            percentage: "77%"
          },
          {
            startAngle: 0.77 * endAngle,
            endAngle: 1 * endAngle,
            color: "green"
          }
        ]
      },
      {
        title: "tee",
        arcdata: [
          {
            startAngle: 0,
            endAngle: 0.18 * endAngle,
            color: "orange",
            percentage: "18%"
          },
          {
            startAngle: 0.18 * endAngle,
            endAngle: 1 * endAngle,
            color: "orange"
          }
        ]
      },
      {
        title: "tee",
        arcdata: [
          {
            startAngle: 0,
            endAngle: 0.05 * endAngle,
            color: "red",
            percentage: "5%"
          },
          { startAngle: 0.05 * endAngle, endAngle: 1 * endAngle, color: "red" }
        ]
      }
    ];

    data.forEach((val, index) => {
      radius = radius - radiusDistance;

      let arc = d3
        .arc()
        .outerRadius(radius)
        .innerRadius(radius - radiusDistance);

      svg
        .append("g")
        .attr("transform", `translate(${barWidth / 2} ,${height / 2})`)
        .selectAll("path.arc")
        .data(val.arcdata)
        .enter()
        .append("path")
        .attr("id", function(d, i) {
          return `arc_${index}_${i}`;
        })
        .attr("class", "arc")
        .attr("fill", function(d, i) {
          return d.color;
        })
        .style("opacity", function(d, i) {
          let opacity = 1;
          if (i === 1) {
            opacity = 0.2;
          }
          return opacity;
        })
        .transition()
        .duration(1000)
        .attrTween("d", function(d) {
          let start = { startAngle: 0, endAngle: 0 };
          let interpolate = d3.interpolate(start, d);
          return function(t) {
            return arc(interpolate(t));
          };
        });

      svg
        .selectAll(".monthText")
        .data(val.arcdata)
        .enter()
        .append("text")
        .attr("transform", `translate(${barWidth / 2} ,${height / 2})`)
        .attr("x", 5) //Move the text from the start angle of the arc
        .attr("dy", 18) //Move the text down
        .append("textPath")
        .attr("xlink:href", function(d, i) {
          return `#arc_${index}_${i}`;
        })
        .text(function(d, i) {
          if (i === 0) {
            return d.percentage;
          }

          return "";
        })
        .style("fill", "#fff")
        .attr("font-size", "10px");

      //Append the month names within the arcs
    });
  }

  render() {
    return (
      <div className="chartContainer">
        <h2 className="componentTitle">Transaction Status Summary</h2>
        <svg ref="anchor" />
        <div className="legend">
          <div className="hlegend">
            <p className="country-name">
              <span className="key-dot success" />Succesful
            </p>
          </div>
          <div className="hlegend">
            <p className="country-name">
              <span className="key-dot unknown" />Unknown
            </p>
          </div>
          <div className="hlegend">
            <p className="country-name">
              <span className="key-dot failure" />Failure
            </p>
          </div>
        </div>
      </div>
    );
  }
}
