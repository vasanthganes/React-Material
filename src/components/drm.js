import React, { Component } from "react";
import { Sigma, NOverlap, Filter } from "react-sigma";
import SigmaLoader from "./Sigma/Loader";


class DrmComponent extends Component {
  graphData;
  merchant = [];
  device = [];
  accounts = [];
  constructor(props) {
    super(props);

    this.anchor = React.createRef();
    this.state = {
      filterNeighbours: "",
      ui: {
        renderer: "canvas",
        labels: {
          labelThreshold: 2,
          labelSize: "fixed",
          labelSizeRatio: 2,
          fontStyle: "400",
          font: "Roboto",
          labelColor: "node"
        }
      },
      graphData: {},
      drmData: [],
      data: this.props.data || {},
      transactionList: this.props.transactionList || []
    };
    this.graphData = {
      nodes: [],
      edges: []
    };
    this.clickNode = this.clickNode.bind(this);
    this.createGraph = this.createGraph.bind(this);
    this.reRender = this.reRender.bind(this);
  }

  componentDidMount() {
    this.reRender(this.state.transactionList);
  }

  createGraph(transactionList) {
    this.graphData.nodes = [];
    this.graphData.edges = [];

    this.merchant = [
      ...new Set(transactionList.map(({ merchant_name }) => merchant_name))
    ];

    this.device = [
      ...new Set(transactionList.map(({ ip_address }) => ip_address))
    ];

    this.accounts = [...new Set(transactionList.map(({ account }) => account))];

    this.graphData.nodes.push({
      id: `root`,
      label: `${this.props.data.first_name} ${this.props.data.last_name}`,
      x: 20,
      y: Math.random() * (60 - 50) + 50,
      size: 15,
      color: "#F4F2B8"
    });

    this.accounts.forEach((val, i) => {
      this.graphData.nodes.push({
        id: val.trim(),
        label: `Account ${val}`,
        x: 40,
        y: Math.random() * (70 - 40) + 40,
        size: 10,
        color: "#B9D6AF",
        neighborsOf: "root"
      });

      this.graphData.edges.push({
        id: `accountedge${i}`,
        source: "root",
        target: val,
        label: `Account No ${val}`,
        size: 20,
        color: "#B9D6AF"
      });
    });

    this.device.forEach((val, i) => {
      this.graphData.nodes.push({
        id: `${val}`,
        label: `Device ${val}`,
        x: 60,
        y: Math.random() * (90 - 30) + 30,
        size: 10,
        color: "#88C0AE",
        neighborsOf: "root"
      });
    });

    this.merchant.forEach((val, i) => {
      this.graphData.nodes.push({
        id: `${val}`,
        label: `Merchant ${val}`,
        x: 80,
        y: Math.random() * (100 - 20) + 20,
        size: 8,
        color: "#1A4A76"
      });
    });

    transactionList.forEach((val, i) => {
      this.graphData.nodes.push({
        id: `${i}`,
        label: `Transaction id ${val.id}`,
        x: 100,
        y: Math.random() * (110 - 10) + 10,
        size: 6,
        color: "#091D3E"
      });
      this.graphData.edges.push({
        id: `de${i}`,
        label: `de${i}`,
        source: val.account,
        target: val.ip_address,
        size: 20,
        color: "#88C0AE"
      });
      this.graphData.edges.push({
        id: `me${i}`,
        label: `me${i}`,
        source: val.ip_address,
        target: val.merchant_name,
        size: 20,
        color: "#1A4A76"
      });
      this.graphData.edges.push({
        id: `te${i}`,
        label: `te${i}`,
        source: val.merchant_name,
        target: i,
        size: 20,
        color: "#091D3E",
        nodeBy: val.merchant_name
      });
    });

    this.setState({ graphData: this.graphData });
    this.setState({
      drmData: [
        {
          title: "Accounts",
          count: this.accounts.length | 0,
          color: "#B9D6AF"
        },
        { title: "Devices", count: this.device.length | 0, color: "#88C0AE" },
        {
          title: "Merchants",
          count: this.merchant.length | 0,
          color: "#1A4A76"
        },
        {
          title: "Transactions",
          count: transactionList.length | 0,
          color: "#091D3E"
        },
        { title: "Cutomer", count: 1, color: "#F4F2B8" }
      ]
    });
  }

  reRender(transactionList) {
    this.setState({
      transactionList: transactionList,
      graphData: {}
    });

    this.createGraph(transactionList);
  }
  clickNode(e) {
    //this.setState({ settings: e.data.node.id })
    this.setState({ filterNeighbours: e.data.node.id });
    // labelThreshold: this.state.ui.labels.labelThreshold,
    //   labelSize: this.state.ui.labels.labelSize,
    //     labelSizeRatio: this.state.ui.labels.labelSizeRatio,
    //       fontStyle: this.state.ui.labels.fontStyle,
    //         font: this.state.ui.labels.font,
  }

  render() {
    let drmData = "";
    if (this.state.drmData !== "") {
      drmData = this.state.drmData.map((value, i) => (
        <div key={i} className="hlegend">
          <p className="country-name">
            <span className="key-dot " style={{ background: value.color }} />
            {value.title}({value.count})
          </p>
        </div>
      ));
    }

    return (
      <div>
        <Sigma
          renderer={this.state.ui.renderer}
          onClickNode={this.clickNode}
          onClickStage={e => this.setState({ filterNeighbours: "" })}
          settings={{
            drawLabels: false,
            hideEdgesOnMove: false,
            animationsTime: 3000,
            clone: false,
            doubleClickEnabled: false,
            mouseWheelEnabled: false,
            labelColor: this.state.ui.labels.labelColor,
            minNodeSize: 5,
            maxNodeSize: 20
          }}
        >
          <SigmaLoader graph={this.state.graphData}>
            <NOverlap gridSize={5} maxIterations={100} />
            <Filter neighborsOf={ this.state.filterNeighbours } />
          </SigmaLoader>
        </Sigma>

        <div className="drmVisualDetails">
          <div className="legend">{drmData}</div>
        </div>
      </div>
    );
  }
}
export default DrmComponent;

//<SigmaFilter neighborsOf={this.state.filterNeighbours} />