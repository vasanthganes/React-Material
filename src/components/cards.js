import React from "react";
import Slider from "react-slick";

import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

const styles = theme => ({
  
});

class Cards extends React.Component {
  render() {
    var settings = {
      dots: false,
      infinite: false,
      speed: 500,
      slidesToShow: 5,
      slidesToScroll: 5,
      initialSlide: 0,
      responsive: [
        {
          breakpoint: 1025,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            infinite: true,
            dots: false
          }
        },
        {
          breakpoint: 900,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2
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
      <div className="cardsContent">
        <h2 className="cardsTitle">Cards</h2>
        <Slider {...settings}>
          {this.props.data.cardList &&
            this.props.data.cardList.map((card, i) => (
              <div key={i} className="card">
                <Card
                  className={
                    card.issuer.toLowerCase() === "visa"
                      ? "cardvisa"
                      : "cardmaster"
                  }
                >
                  <div className="details">
                    <CardContent className="content">
                      <Typography
                        className="cardName"
                        variant="headline"
                      >
                        {this.props.data && this.props.data.first_name}{" "}
                        {this.props.data && this.props.data.last_name}
                      </Typography>
                      <Typography
                        className="cardNumber"
                        variant="headline"
                      >
                        {card.cardNumber}
                      </Typography>
                      <Typography
                        className="cardType"
                        variant="subheading"
                        color="textSecondary"
                      >
                        {card.type}
                      </Typography>
                      <p
                        className={
                          card.issuer.toLowerCase() === "visa"
                            ? `cardIssuer visalogo`
                            : `cardIssuer masterlogo`
                        }
                      />
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
Cards.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(Cards);
