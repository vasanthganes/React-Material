import React from "react";
import PropTypes from "prop-types";
import moment from "moment";

import DayPickerInput from "react-day-picker/DayPickerInput";
import "react-day-picker/lib/style.css";

import { formatDate, parseDate } from "react-day-picker/moment";

import Icon from "@material-ui/core/Icon";

import Button from "@material-ui/core/Button";
import Chip from "@material-ui/core/Chip";

import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  iconSmall: {
    fontSize: "15px !important"
  },
  chiproot: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap"
    
  },
  chip: {height:"29px"}
});

class DateFilterComponent extends React.Component {
  state = { filterData: [] };
  constructor(props) {
    super(props);
    this.handleFromChange = this.handleFromChange.bind(this);
    this.handleToChange = this.handleToChange.bind(this);
    this.handleResetClick = this.handleResetClick.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.state = this.getInitialState();
    
  }
  showFromMonth() {
    const { from, to } = this.state;
    if (!from) {
      return;
    }
    if (moment(to).diff(moment(from), "months") < 2) {
     this.to.getDayPicker().showMonth(from);
    }
  }
  handleFromChange(from) {
    // Change the from date and focus the "to" input field
    this.setState({ from });
  }
  handleToChange(to) {
    this.setState({ to }, this.showFromMonth);
    const { from } = this.state;
    if(from !== undefined && to!==undefined){
      this.props.changeData(from,to);
    }
  }

  getInitialState() {
    return {
      from: undefined,
      to: undefined
    };
  }

  handleResetClick() {
    this.setState(this.getInitialState());
  }

  handleDelete(index) {
    let filteredData = this.state.filterData;
    var isIndex = filteredData.indexOf(index);

    if (isIndex === -1) {
      filteredData.splice(index, 1);
    }
    this.setState({ filterData: filteredData });
  }

  componentDidMount() {
    if (this.props.match.params) {
      let filterData = [this.props.match.params.account];
      this.setState({ filterData: filterData });
    }
    
  }
  
  render() {


    const { classes } = this.props;
    const { from, to } = this.state;
    const modifiers = { start: from, end: to };
    

    let chips = "";

    if (this.state.filterData) {
      chips = this.state.filterData.map((value, i) => (
        <Chip
          key={i}
          label={value}
          onDelete={() => this.handleDelete(i)}
          className={classes.chip}
          color="primary"
        />
      ));
    }

    return (
      <div className="dateFilter">
        <div className="InputFromTo">
          <span>
            <DayPickerInput
              value={from}
              placeholder="From"
              format="LL"
              formatDate={formatDate}
              parseDate={parseDate}
              dayPickerProps={{
                selectedDays: [from, { from, to }],
                disabledDays: { after: to },
                toMonth: to,
                modifiers,
                numberOfMonths: 2,
                onDayClick: () => this.to.getInput().focus()
              }}
              onDayChange={this.handleFromChange}
            />
          </span>
          <span>
            <DayPickerInput
              ref={el => (this.to = el)}
              value={to}
              placeholder="To"
              format="LL"
              formatDate={formatDate}
              parseDate={parseDate}
              dayPickerProps={{
                selectedDays: [from, { from, to }],
                disabledDays: { before: from },
                modifiers,
                month: from,
                fromMonth: from,
                numberOfMonths: 2
              }}
              onDayChange={this.handleToChange}
            />
          </span>
          <span>
            <Button
              variant="contained"
              color="primary"
              size="small"
              aria-label="Delete"
              onClick={this.handleResetClick}
            >
              <Icon className={classes.iconSmall}>refresh</Icon>
            </Button>
          </span>
          <span className={classes.chiproot}>{chips}</span>
        </div>
      </div>
    );
  }
}

DateFilterComponent.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(DateFilterComponent);
