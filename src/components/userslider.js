import React from "react";
import Slider from "react-slick";
import PropTypes from "prop-types";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";

import { withStyles } from "@material-ui/core/styles";
import { withRouter } from "react-router-dom";

const styles = theme => ({
  
});
class UserSlider extends React.Component {
  state = {
    userid: "12345678901"
  };

  handleClick = () => {
    this.props.history.push(`/user/${this.state.userid}`);
  }

  render() {
    var settings = {
      dots: false,
      infinite: false,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 4,
      initialSlide: 0,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            infinite: true,
            dots: false
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            initialSlide: 2
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]
    };
   
    return (
      <div className="sliderContainer">
      <Slider {...settings}>
        {this.props.data.map((user, i) => (
          <div key={i}>
            <Card className="card"  onClick={this.handleClick}>
              <Avatar alt={user.first_name} className="cover">
                {user.first_name.charAt(0)}
                {user.last_name.charAt(0)}
              </Avatar>
              <div className="details">
                <CardContent className="content">
                  <Typography className="cardTitle" variant="headline">
                    {user.first_name} {user.last_name}
                  </Typography>
                  <Typography
                    className="cardNumber"
                    variant="subheading"
                    color="textSecondary"
                  >
                    {user.id}
                  </Typography>
                </CardContent>
              </div>
            </Card>
          </div>
        ))}
      </Slider>
      </div>
    );
  }
}
UserSlider.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

let connecteRouter = withRouter(UserSlider);

export default withStyles(styles, { withTheme: true })(connecteRouter);
