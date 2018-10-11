import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

import MapContainer from "./MapContainer";
import RecentContainer from "./RecentContainer";

const styles = theme => ({
  chartContainer: {
    width: "96%",
    height: "auto",
    margin: "10px auto 10px",
    background: "#fff",
    borderWidth: "1px",
    borderRadius: "4px",
    boxShadow: "1px 1px 1px 1px #ccc"
  },
  recentContainer: {
    width: "96%",
    height: "auto",
    margin: "0 auto",
    background: "#fff",
    borderWidth: "1px",
    borderRadius: "4px",
    boxShadow: "1px 1px 1px 1px #ccc"
  },
  widgetTitle: {
    fontSize: "100%",
    padding: "10px 10px 5px"
  }
});
class DashboardContainer extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <div>
        <div className={classes.chartContainer}>
          <MapContainer />
        </div>

        <div className={classes.recentContainer}>
          <Typography
            className={classes.widgetTitle}
            variant="display1"
            gutterBottom
          >
            Recent worked on accounts
          </Typography>

          <RecentContainer />
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(DashboardContainer);
