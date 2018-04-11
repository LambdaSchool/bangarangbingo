/* eslint-disable */

import React, { Component } from "react";
import Slider from "react-slick";
import bingocard1 from '../images/bingocard1.png';
import bingocard2 from '../images/bingocard2.png';
import bingocard3 from '../images/bingocard3.png';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import './carousel.css'
 
class Carousel extends Component {
    render() {
      var settings = {
        dots: true
      };
      return (
        <div className="container">
          <Slider {...settings}>
            <div>
              <img src={bingocard1} width="177" height="255"  />
            </div>
            <div>
              <img src={bingocard2} width="177" height="255"  />
            </div>
            <div>
              <img src={bingocard3} width="177" height="255"  />
            </div>
          </Slider>
        </div>
      );
    }
  }
  

export default Carousel;
