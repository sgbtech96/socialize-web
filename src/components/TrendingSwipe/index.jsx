import React, { useState, useEffect } from "react";
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
      display: block;
      max-width: 230px;
      max-height: 95px;
      width: auto;
      height: auto;
    }
    .handle {
      position: absolute;
      bottom: 8%;
      left: 12%;
      color: var(--white);
    }
  }
`;

const settings = {
  arrows: false,
  infinite: true,
  autoplay: true,
  autoplaySpeed: 1200,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 2,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
        initialSlide: 2,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};
let samples = [1, 2, 3, 4, 5, 6, 7];
const TrendingSwipe = () => {
  const [height, setHeight] = useState(null);
  useEffect(() => {
    setHeight(document.getElementById("user-avatar").clientHeight);
    console.log(document.getElementById("user-avatar"));
  }, []);
  return (
    <Wrapper height={height}>
      <Slider {...settings}>
        {samples.map((idx) => (
          <div key={idx} className="avatar">
            <img src="/user-avatar2.jpg" id="user-avatar" />
            <div className="medium-10 handle">Miley</div>
          </div>
        ))}
      </Slider>
    </Wrapper>
  );
};

TrendingSwipe.propTypes = {};

export default TrendingSwipe;
