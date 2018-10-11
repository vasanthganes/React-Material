import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";

import { connect } from "react-redux";
import { fetchUser } from "../store/actions/user";

import Cards from "../components/cards";
import Accounts from "../components/accounts";
import UserDrm from "../components/userdrm";
import TransactionsComponent from "../components/table";
import UserFactorComponent from "../components/userfactor";

function TabContainer({ children, dir }) {
  return (
    <Typography component="div" dir={dir} style={{ padding: 8 * 3 }}>
      {children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
  dir: PropTypes.string.isRequired
};

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper
  },
  tabbar: {
    backgroundColor: "#EBEFF5"
  },
  userfactor: {
    margin: "10px 0"
  },
  tabselected: { backgroundColor: "#FFFFFF" },
  tabs: { border: "1px solid #DAE0EA" }
});

class TabBarContainer extends React.Component {
  state = {
    value: 5
  };

  componentWillMount() {
    this.props.fetchData();
  }

  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleChangeIndex = index => {
    this.setState({ value: index });
  };

  render() {
    const { classes, theme } = this.props;
    const { value } = this.state;
    if (this.props.loading) {
      return <div>Loading.....</div>;
    }
    return (
      <div className={classes.root}>
        <div className={classes.userfactor}>
          <UserFactorComponent data={this.props.userObject} />
        </div>
        <div className={classes.tabs}>
          <AppBar position="static" className={classes.tabbar} color="default">
            <Tabs
              value={this.state.value}
              onChange={this.handleChange}
              indicatorColor="primary"
              textColor="primary"
              fullWidth
              scrollable
              scrollButtons="auto"
            >
              <Tab
                label="Alerts"
                disabled
                classes={{
                  selected: classes.tabselected
                }}
              />
              <Tab
                label="DRM"
                classes={{
                  selected: classes.tabselected
                }}
              />
              <Tab
                label="Apps"
                disabled
                classes={{
                  selected: classes.tabselected
                }}
              />
              <Tab
                label="Device"
                disabled
                classes={{
                  selected: classes.tabselected
                }}
              />
              <Tab
                label="Transactions"
                classes={{
                  selected: classes.tabselected
                }}
              />
              <Tab
                label="Accounts"
                classes={{
                  selected: classes.tabselected
                }}
              />
              <Tab
                label="Cases"
                disabled
                classes={{
                  selected: classes.tabselected
                }}
              />
            </Tabs>
          </AppBar>

          {value === 1 && (
            <TabContainer dir={theme.direction}>
              <UserDrm
                data={this.props.userObject}
                transactions={this.props.transactions}
              />
            </TabContainer>
          )}
          {value === 4 && (
            <TabContainer dir={theme.direction}>
              <TransactionsComponent transactions={this.props.transactions} />
            </TabContainer>
          )}

          {value === 5 && (
            <TabContainer dir={theme.direction}>
              <Accounts data={this.props.userObject} />
              <Cards data={this.props.userObject} />
            </TabContainer>
          )}
        </div>
      </div>
    );
  }
}

TabBarContainer.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  userObject: state.userData.userObject,
  transactions: state.userData.transactions,
  loading: state.userData.loading,
  error: state.userData.error
});
const mapDispatchToProps = { fetchData: fetchUser };

let connectedStore = connect(
  mapStateToProps,
  mapDispatchToProps
)(TabBarContainer);

export default withStyles(styles, { withTheme: true })(connectedStore);
