/* eslint indent: "off", no-mixed-spaces-and-tabs: "off"*/

import React from "react";
import "./plugins.filter";

class Filter extends React.Component {
  constructor() {
    super();
    this.addNeighbors = this.addNeighbors.bind(this);
  }
  componentDidMount() {
    this.filter = new sigma.plugins.filter(this.props.sigma);
    this._apply(this.props);
    // this.addNeighbors()
    console.log(this.filter, "filter");
  }

  componentWillUpdate(props) {
    if (
      props.nodesBy !== this.props.nodesBy ||
      props.neighborsOf !== this.props.neighborsOf
    )
      this._apply(props);
  }
  addNeighbors() {
    this.props.sigma.classes.graph.addMethod("neighbors", function(nodeId) {
      var k,
        neighbors = {},
        index = this.allNeighborsIndex[nodeId] || {};

      for (k in index) neighbors[k] = this.nodesIndex[k];

      return neighbors;
    });

    this.props.sigma.bind("clickNode", function(e) {
      var nodeId = e.data.node.id,
        toKeep = this.props.sigma.graph.neighbors(nodeId);
      toKeep[nodeId] = e.data.node;

      this.props.sigma.graph.nodes().forEach(function(n) {
        if (toKeep[n.id]) n.color = n.originalColor;
        else n.color = "#eee";
      });

      this.props.sigma.graph.edges().forEach(function(e) {
        if (toKeep[e.source] && toKeep[e.target]) e.color = e.originalColor;
        else e.color = "#eee";
      });

      // Since the data has been modified, we need to
      // call the refresh method to make the colors
      // update effective.
      this.props.sigma.refresh();
    });
    this.props.sigma.bind("clickStage", function(e) {
      this.props.sigma.graph.nodes().forEach(function(n) {
        n.color = n.originalColor;
      });

      this.props.sigma.graph.edges().forEach(function(e) {
        e.color = e.originalColor;
      });

      // Same as in the previous event:
      this.props.sigma.refresh();
    });
  }

  render = () => null;

  _apply(props) {
    // this.filter.undo("node-category").nodesBy(function(n) {
    //   console.log("n", n);
    // }, "node-category");

    this.filter.undo(["neighborsOf", "nodesBy"]);
    if (props.neighborsOf) {
      this.filter.neighborsOf(props.neighborsOf, "neighborsOf");
    }
    if (props.nodesBy) this.filter.nodesBy(props.nodesBy, "nodesBy");
    this.filter.apply();
    if (this.props.sigma) this.props.sigma.refresh();
  }
}

export default Filter;
