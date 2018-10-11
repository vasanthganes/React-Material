import React from "react";
import { connect } from "react-redux";
import { fetchRecentItems } from "../store/actions/recentitems";

import UserSlider from "../components/userslider";

class RecentContainer extends React.Component {
  componentWillMount() {
    this.props.fetchData();
  }
  render() {
    return <UserSlider data={this.props.items} />;
  }
}

const mapStateToProps = state => ({
  items: state.recentItems.recentitems,
  loading: state.recentItems.loading,
  error: state.recentItems.error
});

const mapDispatchToProps = { fetchData: fetchRecentItems };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RecentContainer);
