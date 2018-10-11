import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

import { withRouter } from "react-router-dom";

const styles = theme => ({
  
});

class Accounts extends React.Component {
  constructor(props) {
    super(props);
    this.navigatePage = this.navigatePage.bind(this);
  }

  navigatePage(account) {
    this.props.history.push(`/user-charts/${account}`);
  }

  render() {
    return (
      <div className="cardsContent">
        <h2 className="cardsTitle">Accounts</h2>
        {this.props.data.accountList &&
          this.props.data.accountList.map((account, i) => (
            <div key={i} className="card">
              <Card
                className="accountcard"
                onClick={() => this.navigatePage(account.accountNumber)}
              >
                {/* <p className={classes.newcase}>
                  <Note className={classes.caseicon} /> New case
                </p> */}
                <div className="details">
                  <CardContent className="content">
                    <Typography className="cardName" variant="headline">
                      {this.props.data && this.props.data.first_name}{" "}
                      {this.props.data.last_name}
                    </Typography>
                    <Typography
                      className="cardNumber"
                      variant="headline"
                    >
                      {account.accountNumber}
                    </Typography>
                    <Typography
                      className="cardType"
                      variant="subheading"
                      color="textSecondary"
                    >
                      {account.type}
                    </Typography>
                  </CardContent>
                </div>
               
              </Card>
            </div>
          ))}
      </div>
    );
  }
}
Accounts.propTypes = {
  classes: PropTypes.object.isRequired
};

let connecteRouter = withRouter(Accounts);

export default withStyles(styles, { withTheme: true })(connecteRouter);
