import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import moment from "moment";

import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import "rc-tooltip/assets/bootstrap.css";

import DrmComponent from "./drm";

const styles = theme => ({
  drmContainer: {
    background: "#fff",
    padding: "0 10px 10px"
  },
  drmContent: {
    width: "100%",
    display: "flex",
    height: "480px"
  },
  drmVisual: {
    width: "80%",
    margin: "10px auto 10px",
    position: "relative",
    height: "450px",
    float: "left"
  },
  drmSlider: { float: "right", margin: "20px 0 10px 0", width: "15%" }
});

class UserDrm extends Component {
  constructor(props) {
    super(props);
    this.drm = React.createRef();
    this.state = {
      filterNeighbours: "",
      sliderValue: 49,
      transactions: this.props.transactions || [],
      filterTransactions: [],
      marks: {
        7: {
          style: {
            background: "#fff",
            border: "1px solid #ccc",
            minWidth: "80px",
            padding: "2px"
          },
          label: "Today"
        },
        14: {
          style: {
            background: "#fff",
            border: "1px solid #ccc",
            minWidth: "80px",
            padding: "2px"
          },
          label: "Yesterday"
        },
        21: {
          style: {
            background: "#fff",
            border: "1px solid #ccc",
            minWidth: "80px",
            padding: "2px"
          },
          label: "This Week"
        },
        28: {
          style: {
            background: "#fff",
            border: "1px solid #ccc",
            minWidth: "80px",
            padding: "2px"
          },
          label: "Previous Week"
        },
        35: {
          style: {
            background: "#fff",
            border: "1px solid #ccc",
            minWidth: "80px",
            padding: "2px"
          },
          label: "This Month"
        },
        42: {
          style: {
            background: "#fff",
            border: "1px solid #ccc",
            minWidth: "80px",
            width: "95px",
            padding: "2px"
          },
          label: "Previous Month"
        },
        49: {
          style: {
            background: "#fff",
            border: "1px solid #ccc",
            minWidth: "80px",
            padding: "2px"
          },
          label: <strong>Last 3 Months</strong>
        }
      }
    };
  }

  sliderChange = value => {
    let transactionList = [];
    let days = [];
    let start = "";
    let end = "";
    let day = "";
    switch (value) {
      case 7:
        let today = moment().format("YYYY-MM-DD");
        transactionList = this.state.transactions.filter(val => {
          return today === moment(val.created).format("YYYY-MM-DD");
        });
        break;
      case 14:
        let yesterday = moment()
          .subtract(1, "days")
          .format("YYYY-MM-DD");
        transactionList = this.state.transactions.filter(val => {
          return yesterday === moment(val.created).format("YYYY-MM-DD");
        });
        break;
      case 21:
        start = moment().startOf("isoWeek");
        end = moment().endOf("isoWeek");
        day = start;

        while (day <= end) {
          days.push(moment(day.toDate()).format("YYYY-MM-DD"));
          day = day.clone().add(1, "d");
        }
        transactionList = this.state.transactions.filter(val => {
          return days.includes(moment(val.created).format("YYYY-MM-DD"));
        });

        break;
      case 28:
        start = moment()
          .subtract(7, "days")
          .startOf("isoWeek");
        end = moment()
          .subtract(7, "days")
          .endOf("isoWeek");
        day = start;
        while (day <= end) {
          days.push(moment(day.toDate()).format("YYYY-MM-DD"));
          day = day.clone().add(1, "d");
        }
        transactionList = this.state.transactions.filter(val => {
          return days.includes(moment(val.created).format("YYYY-MM-DD"));
        });
        break;
      case 35:
        start = moment(new Date())
          .startOf("month")
          .format("YYYY-MM-DD");
        end = moment().format("YYYY-MM-DD");
        day = start;
        while (day <= end) {
          days.push(moment(day).format("YYYY-MM-DD"));
          day = moment(day)
            .add(1, "days")
            .format("YYYY-MM-DD");
        }
        transactionList = this.state.transactions.filter(val => {
          return days.includes(moment(val.created).format("YYYY-MM-DD"));
        });
        break;
      case 42:
        start = moment(new Date())
          .subtract(1, "months")
          .startOf("month")
          .format("YYYY-MM-DD");
        end = moment(new Date())
          .subtract(1, "months")
          .endOf("month")
          .format("YYYY-MM-DD");
        day = start;
        while (day <= end) {
          days.push(moment(day).format("YYYY-MM-DD"));
          day = moment(day)
            .add(1, "days")
            .format("YYYY-MM-DD");
        }
        transactionList = this.state.transactions.filter(val => {
          return days.includes(moment(val.created).format("YYYY-MM-DD"));
        });
        break;
      case 49:
        start = moment(new Date())
          .subtract(2, "months")
          .startOf("month")
          .format("YYYY-MM-DD");
        end = moment().format("YYYY-MM-DD");
        day = start;
        while (day <= end) {
          days.push(moment(day).format("YYYY-MM-DD"));
          day = moment(day)
            .add(1, "days")
            .format("YYYY-MM-DD");
        }
        transactionList = this.state.transactions.filter(val => {
          return days.includes(moment(val.created).format("YYYY-MM-DD"));
        });
        break;
      default:
        break;
    }
    console.log(transactionList, days);
    this.setState({ sliderValue: value });

    this.drm.current.reRender(transactionList);
  };

  componentDidMount() {
    if (this.props.transactions && this.props.transactions.length !== 0) {
      this.setState({ transactions: this.props.transactions });
    }
  }

  render() {
    const { classes } = this.props;
    let transactionList = this.props.transactions;
    let days = [];
    if (this.props.transactions && this.props.transactions.length !== 0) {
      let startDay = moment(new Date())
        .subtract(2, "months")
        .startOf("month")
        .format("YYYY-MM-DD");
      let endDay = moment().format("YYYY-MM-DD");
      let day = startDay;
      while (day <= endDay) {
        days.push(moment(day).format("YYYY-MM-DD"));
        day = moment(day)
          .add(1, "days")
          .format("YYYY-MM-DD");
      }
      transactionList = this.props.transactions.filter(val => {
        return days.includes(moment(val.created).format("YYYY-MM-DD"));
      });
    }

    return (
      <div className={classes.drmContainer}>
        <div className={classes.drmContent}>
          <div className={classes.drmVisual}>
            <DrmComponent
              ref={this.drm}
              data={this.props.data}
              transactionList={transactionList}
            />
          </div>
          <div className={classes.drmSlider}>
            <Slider
              vertical
              dots
              min={7}
              max={49}
              marks={this.state.marks}
              step={7}
              defaultValue={49}
              value={this.state.sliderValue}
              included={true}
              onChange={this.sliderChange}
              handleStyle={[
                {
                  border: "none",
                  borderTop: "7px solid transparent",
                  borderBottom: "7px solid transparent",
                  borderLeft: "12px solid #197CB1",
                  transform: "translate(-70%, 0)",
                  background: "none",
                  borderRadius: 0
                }
              ]}
              trackStyle={[
                {
                  backgroundColor: "#197CB1",
                  width: "10px",
                  borderRadius: 0
                }
              ]}
              railStyle={{
                width: "10px",
                borderRadius: 0
              }}
              dotStyle={{
                backgroundColor: "#C8D2E0",
                border: "1px solid #ccc",
                borderRadius: 0,
                width: "15px",
                height: "0"
              }}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(UserDrm);
