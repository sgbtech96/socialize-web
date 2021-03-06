import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styled from 'styled-components';

const Wrapper = styled.div`
  img {
    width: 170px;
    height: auto;
  }
`;

const settings = {
  arrows: false,
  infinite: true,
  autoplay: true,
  autoplaySpeed: 1200,
  speed: 500,
  slidesToShow: 2.5,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 1200,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 2.8,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 2.5,
        slidesToScroll: 1,
      },
    },
  ],
};

const TrendingSwipe = () => {
  return (
    <Wrapper>
      <Slider {...settings}>
        <div>
          <img src="/slide1.jpg" alt="slide1" />
        </div>
        <div>
          <img src="/slide3.jpg" alt="slide3" />
        </div>
        <div>
          <img src="/slide2.jpg" alt="slide2" />
        </div>
      </Slider>
    </Wrapper>
  );
};

export default TrendingSwipe;
