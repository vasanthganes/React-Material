import React from "react";
import { connect } from "react-redux";
import { fetchFrauds } from "../store/actions/fraudlist";

import WorldMap from "../components/worldmap";

class MapContainer extends React.Component {
  componentWillMount() {
    this.props.fetchData();
  }
  render() {
    return <WorldMap frauds={this.props.frauds} />;
  }
}

const mapStateToProps = state => ({
  frauds: state.fraudlist.frauds,
  loading: state.fraudlist.loading,
  error: state.fraudlist.error
});

const mapDispatchToProps = { fetchData: fetchFrauds };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MapContainer);
