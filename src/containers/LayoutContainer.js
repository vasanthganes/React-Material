import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import NotificationsIcon from "@material-ui/icons/Notifications";
import { mainListItems, secondaryListItems } from "../components/listItems";

import { Route, Router } from "react-router-dom";
import { fade } from '@material-ui/core/styles/colorManipulator';
import { withStyles } from '@material-ui/core/styles';
import withRoot from '../withRoot';

import { history } from "../store/store";

/**containers */
import DashboardContainer from "./DashboardContainer";
import SearchContainer from "./SearchContainer";

import TabBarContainer from "./TabBarContainer";
import UserChartsContainer from "./UserChartsContainer";



const drawerWidth = 240;
//#197CB1
const styles = theme => ({
  root: {
    display: "flex"
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
    height: "60px"
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar
  },
  appBar: {
    backgroundColor: "#197CB1",
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing.unit * 2,
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing.unit * 3,
      width: '25%',
    },
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
    width: '100%',
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 200,
    },
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 36
  },
  menuButtonHidden: {
    display: "none"
  },
  title: {
    flexGrow: 1
  },
  widgetTitle: {
    fontSize: "100%",
    padding: "10px 10px 5px"
  },
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    width: theme.spacing.unit * 7,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing.unit * 9
    }
  },
  appBarSpacer: theme.mixins.toolbar,
  dashFilter: { width: "96%", margin: "0 auto" },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    height: "100vh",
    overflow: "auto"
  },
  chartContainer: {
    width: "96%",
    height: "auto",
    margin: "10px auto 10px",
    background: "#fff",
    borderWidth: "1px",
    borderRadius: "4px",
    boxShadow: "1px 1px 1px 1px #ccc"
  },
  tableContainer: {
    width: "96%",
    height: "auto",
    margin: "0 auto",
    background: "#fff",
    borderWidth: "1px",
    borderRadius: "4px",
    boxShadow: "1px 1px 1px 1px #ccc"
  },
  tableContent: {
    width: "94%",
    height: "auto",
    margin: "0 auto"
  }
});

class LayoutContainer extends React.Component {
  state = {
    open: false
  };

  componentWillMount() {
    //store.dispatch(fetchPhotos());
  }
  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { classes } = this.props;
   
    return (
       <Router history={history}>
        <div>
          <React.Fragment>
            <CssBaseline />
            <div className={classes.root}>
              <AppBar
                position="absolute"
                className={classNames(
                  classes.appBar,
                  this.state.open && classes.appBarShift
                )}
              >
                <Toolbar
                  disableGutters={!this.state.open}
                  className={classes.toolbar}
                >
                  <IconButton
                    color="inherit"
                    aria-label="Open drawer"
                    onClick={this.handleDrawerOpen}
                    className={classNames(
                      classes.menuButton,
                      this.state.open && classes.menuButtonHidden
                    )}
                  >
                    <MenuIcon />
                  </IconButton>
                  <Typography
                    variant="title"
                    color="inherit"
                    noWrap
                    className={classes.title}
                  >
                    Dashboard
                  </Typography>
                  <div className={classes.search}>
                      <SearchContainer/>
                  </div>
                  <IconButton color="inherit">
                    <Badge badgeContent={4} color="secondary">
                      <NotificationsIcon />
                    </Badge>
                  </IconButton>
                </Toolbar>
              </AppBar>
              <Drawer
                variant="permanent"
                classes={{
                  paper: classNames(
                    classes.drawerPaper,
                    !this.state.open && classes.drawerPaperClose
                  )
                }}
                open={this.state.open}
              >
                <div className={classes.toolbarIcon}>
                  <IconButton onClick={this.handleDrawerClose}>
                    <ChevronLeftIcon />
                  </IconButton>
                </div>
                <Divider />
                <List>{mainListItems}</List>
                <Divider />
                <List>{secondaryListItems}</List>
              </Drawer>
              <main className={classes.content}>
                <div className={classes.appBarSpacer} />
                <Route exact path="/" component={DashboardContainer} />
                <Route path="/user/:id" component={TabBarContainer} />
                <Route
                  path="/user-charts/:account"
                  component={UserChartsContainer}
                />
              </main>
            </div>
          </React.Fragment>
        </div>
        </Router>
    );
  }
}

LayoutContainer.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withRoot(withStyles(styles)(LayoutContainer));

