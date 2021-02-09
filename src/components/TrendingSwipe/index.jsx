import React from "react";
// import PropTypes from "prop-types";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styled from "styled-components";

const Wrapper = styled.div`
  .avatar {
    position: relative;
    img {
      border-radius: 20px;
    }
    .handle {
      position: absolute;
      bottom: 8%;
      left: 12%;
      color: var(--white);
    }
    .dot {
      position: absolute;
      bottom: 13%;
      right: 28%;
      height: 8px;
      width: 8px;
      border: 1px solid var(--white);
      border-radius: 50%;
      display: inline-block;
    }
    .dot-active {
      background-color: var(--green);
    }
    .dot-inactive {
      background-color: var(--grey);
    }
  }
`;

const { min } = Math;

const settings = (len) => ({
  arrows: false,
  infinite: true,
  autoplay: true,
  autoplaySpeed: 1200,
  speed: 500,
  slidesToShow: min(len, 3),
  slidesToScroll: min(len, 2),
  // responsive: [
  //   {
  //     breakpoint: 1024,
  //     settings: {
  //       slidesToShow: min(len, 2),
  //       slidesToScroll: min(len, 1),
  //       initialSlide: min(len, 2),
  //     },
  //   },
  //   {
  //     breakpoint: 480,
  //     settings: {
  //       slidesToShow: min(len, 1),
  //       slidesToScroll: min(len, 1),
  //     },
  //   },
  // ],
});
let samples = [1, 2, 3, 4, 5, 6, 7];
const TrendingSwipe = () => {
  return (
    <Wrapper>
      <Slider {...settings(7)}>
        {samples.map((idx) => (
          <div key={idx} className="avatar">
            <img src="/user-avatar2.jpg" height={110} width={97} />
            <div className="medium-10 handle">John</div>
            <span className="dot dot-active"></span>
          </div>
        ))}
      </Slider>
    </Wrapper>
  );
};

TrendingSwipe.propTypes = {};

export default TrendingSwipe;
