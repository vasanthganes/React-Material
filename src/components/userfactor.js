import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";

const styles = {
  
};

class UserFactorComponent extends React.Component {
  render() {
    if (!this.props.data) {
      return <div>Loading.....</div>;
    }
    return (
      <div className="userFactors">
        <AppBar className="appbar" position="static" color="inherit">
          <Toolbar>
            <Avatar alt={this.props.data.first_name} className="avatar">
              {this.props.data.first_name &&
                this.props.data.first_name.substring(0, 1)}
              {this.props.data.last_name &&
                this.props.data.last_name.substring(0, 1)}
            </Avatar>
            <div className="headRoot">
              <Typography className="subhead" variant="subheading">
                Full Name
              </Typography>
              <Typography className="mainhead" color="inherit">
                {this.props.data.first_name} {this.props.data.last_name}
              </Typography>
            </div>
            <div className="headRoot">
              <Typography className="subhead" variant="subheading">
                Customer Id
              </Typography>
              <Typography className="mainhead" color="inherit">
                {this.props.data.id}
              </Typography>
            </div>
            <div className="headRoot">
              <Typography className="subhead" variant="subheading">
                Phone Number
              </Typography>
              <Typography className="mainhead" color="inherit">
                {this.props.data.phone}
              </Typography>
            </div>
            <div className="headRoot">
              <Typography className="subhead" variant="subheading">
                Email Address
              </Typography>
              <Typography className="mainhead" color="inherit">
                {this.props.data.email}
              </Typography>
            </div>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

UserFactorComponent.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(UserFactorComponent);
