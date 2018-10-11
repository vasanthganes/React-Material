import React, { Component } from "react";
import {
  ComposableMap,
  ZoomableGroup,
  Geographies,
  Geography,
  Markers,
  Marker
} from "react-simple-maps";

import  { keyframes } from 'styled-components'
import IconButton from "@material-ui/core/IconButton";
import { withStyles } from "@material-ui/core/styles";
import { withRouter } from "react-router-dom";

import * as d3 from "d3";
import { scaleLinear } from "d3-scale";

const cityScale = scaleLinear()
  .domain([0, 35])
  .range([1, 25]);


const styles = theme => ({
  wrapperStyles: {
    width: "100%",
    maxWidth: 980,
    margin: "0 auto",
    display:"inline-block",
    position:"relative"
  }
});


class WorldMap extends Component {
  
  constructor() {
    super();
    this.state = {
      cities: [],
      zoom: 1,
      userid: "1"
    };
    
    this.tooltip = "";
    this.hadleZoom = this.hadleZoom.bind(this);
    this.hadleZoomOut = this.hadleZoomOut.bind(this);
  }
  hadleZoom() {
  
    let zoomV = this.state.zoom;
    this.setState({ zoom: zoomV + 1 });
  }
  hadleZoomOut() {
    let zoomV = this.state.zoom;

    if (zoomV > 1) {
      this.setState({ zoom: zoomV - 1 });
    }
  }
  
  handleClick = () => {
    this.props.history.push(`/user/${this.state.userid}`);
  };

  componentDidMount(){
    this.tooltip  = d3.select("#tooltip");

  document.addEventListener('click',()=>{
    console.log('clicked')
    this.tooltip.transition()
    .duration(200)
    .style("opacity", 0);
  })

  }

  render() {
    const { classes } = this.props;

    let pulse = keyframes`
    0% {
      r: ${cityScale(2 * this.state.zoom)};
    }
    50% {
      r: ${ 8* this.state.zoom};
      opacity: 1;
    }
    99% {
      opacity: 0;
    }
    100% {
      opacity: 0;
      r: ${cityScale(4 * this.state.zoom)};
    }
    `;
    
    let pulse2 = keyframes`
    0% {
      opacity: 1;
    }
    40% {
      opacity: 0;
    }
    49.99% {
      r: ${cityScale(4 * this.state.zoom)};
      opacity: 0;
    }
    50% {
      r: ${cityScale(2 * this.state.zoom)};
      opacity: 1;
    }
    100% {
      r: ${cityScale(4 * this.state.zoom)};
      opacity: 1;
    }
    `;
    let pulseCircle = {
      animation: `${pulse} 3s cubic-bezier(0.39, 0.54, 0.41, 1.5) infinite`,
      stroke:`#ff3c64`,
      fill:`transparent`
      
    };
    let pulseCircle2 = {
      animation: `${pulse2} 3s cubic-bezier(0.39, 0.54, 0.41, 1.5) infinite`,
      stroke:`#ff3c64`,
      fill:`transparent`
    }
    

    return (
      <div className={classes.wrapperStyles} id="mapcontainer">
     
        <div className="zoomControl">
          <IconButton onClick={this.hadleZoom} aria-label="Zoom">
            +
          </IconButton>
          <IconButton onClick={this.hadleZoomOut} aria-label="ZoomOut">
            -
          </IconButton>
        </div>
        <ComposableMap
          projectionConfig={{ scale: 195 }}
          width={980}
          height={540}
          style={{
            width: "100%",
            height: "auto"
          }}
        >
          <ZoomableGroup center={[0, 20]} zoom={this.state.zoom}>
            <Geographies geography="https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/examples/bubbles-map/static/world-50m.json">
              {(geographies, projection) =>
                geographies.map(
                  (geography, i) =>
                    geography.id !== "ATA" && (
                      <Geography
                        key={i}
                        geography={geography}
                        projection={projection}
                        style={{
                          default: {
                            fill: "#ECEFF1",
                            stroke: "#607D8B",
                            strokeWidth: 0.75,
                            outline: "none"
                          },
                          hover: {
                            fill: "#ECEFF1",
                            stroke: "#607D8B",
                            strokeWidth: 0.75,
                            outline: "none"
                          },
                          pressed: {
                            fill: "#ECEFF1",
                            stroke: "#607D8B",
                            strokeWidth: 0.75,
                            outline: "none"
                          }
                        }}
                      />
                    )
                )
              }
            </Geographies>
            <Markers>
              {this.props.frauds.map((city, i) => (
                <Marker key={i} marker={city}>
                  <circle
                    r={cityScale(3 * this.state.zoom)}
                    className="pulse-disk "
                    cx="50"
                    cy="50"
                    fill="rgba(0,200,120,1)"
                    
                  />
                  <circle style={pulseCircle}
                   r={cityScale(2 * this.state.zoom)}
                    className={
                      (city.currentfraud === true ? " enablecir" : " disablecir")
                    }
                    cx="50"
                    cy="50"
                    stroke="rgba(0,200,120,1)"
                    strokeWidth="2"
                  />
                  <circle style={pulseCircle2}
                    r={cityScale(1 * this.state.zoom)}
                    className={
                      (city.currentfraud === true ? " enablecir" : " disablecir")
                    }
                    cx="50"
                    cy="50"
                    stroke="rgba(0,200,120,1)"
                    strokeWidth="2"
                    onMouseOver={(e) => {
                      console.dir(e)

                      this.tooltip.transition()
                      .duration(200)
                      .style("opacity", .9);
                      this.tooltip.html(`
                        <div>
                        <h3>Banking - <span>Login</span></h3><p>March 25, 2018 | 19:02:11</p>
                        <button>Challenge OTP</button>
                        </div>
                        <div><p>IP Address</p> <h2>10.50.156.64</h2></div>
                        `)
                      .style("left", (e.pageX - 100) + "px")
                      .style("top", (e.pageY - 100) + "px");
                    }
                    
                  
                  }
                  
                  />
                </Marker>
              ))}
            </Markers>
          </ZoomableGroup>
        </ComposableMap>
        <div className="maptooltip" id="tooltip" style={{opacity: 0}} onClick={this.handleClick}></div>
      </div>
    );
  }
}

let connecteRouter = withRouter(WorldMap);

export default withStyles(styles, { withTheme: true })(connecteRouter);

