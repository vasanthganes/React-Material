import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { withRouter } from "react-router-dom";

import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import TextField from "@material-ui/core/TextField";
import { Search } from "@material-ui/icons";

const styles = theme => ({
  input: {
    color: "#fff",
    textAlign: "left",
    padding:"7px 0"
  },
  icon: {
    color: "#fff"
  }
});

class SearchBarComponent extends React.Component {
  state = {
    userid: ""
  };

  handleChange = prop => event => {
    this.setState({ [prop]: event.target.value });
  };

  handleClick = () => {
    this.props.history.push(`/user/${this.state.userid}`);
  };

  render() {
    const { classes } = this.props;

    return (
      <div>
        <TextField
          id="searchbox"
          type="text"
          placeholder="Search a user"
          fullWidth
          value={this.state.userid}
          onChange={this.handleChange("userid")}
          InputProps={{
            className: classes.input,
            endAdornment: (
              <InputAdornment variant="filled" position="end">
                <IconButton
                  aria-label="Search a user"
                  onClick={this.handleClick}
                >
                  <Search className={classes.icon} />
                </IconButton>
              </InputAdornment>
            )
          }}
        />
      </div>
    );
  }
}

SearchBarComponent.propTypes = {
  classes: PropTypes.object.isRequired
};
let connecteRouter = withRouter(SearchBarComponent);

export default withStyles(styles, { withTheme: true })(connecteRouter);
