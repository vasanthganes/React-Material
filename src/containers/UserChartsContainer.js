import React from "react";

import DateFilterComponent from "../components/datefilter";
import DonutComponent from "../components/donut";
import StackBarComponent from "../components/stackbar";

import BarChartComponent from "../components/barchart";

class UserChartsContainer extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      from:undefined,
      to:undefined,
      filterData: []
    }
    this.filterChange = this.filterChange.bind(this);

    this.donut = React.createRef();
  }

  filterChange(from,to){
   
      if(from && from !== undefined && to && to !== undefined)
      {
        this.setState({
            from:from,
            to:to
        });
      }

      this.donut.current.setFilter(from,to);
  }

  render() {
    
    return (
      <div>
        <DateFilterComponent {...this.props} changeData={this.filterChange}/>
        <DonutComponent width={300} height={350} ref={this.donut} />
        <BarChartComponent />
        <br />
        <StackBarComponent height={40} />
      </div>
    );
  }
}

export default UserChartsContainer;
