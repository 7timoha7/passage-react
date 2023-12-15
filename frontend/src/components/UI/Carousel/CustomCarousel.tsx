import React from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import rakLogo from '../../../assets/images/rakLogo.png';

const images = [
  'https://d2n0nh46x4cajo.cloudfront.net/media/products/tiles/images/series/amani%20marble/ambience/high-res/amani1.jpg',
  'https://d2n0nh46x4cajo.cloudfront.net/media/products/tiles/images/series/black%20iron/ambience/high-res/RAK_BLACK%20IRON_BATHROOM_HR_V3.jpg',
  'https://d2n0nh46x4cajo.cloudfront.net/media/products/tiles/images/series/atlantis%20marble/ambience/high-res/atlantis%202.jpg',
];

const CustomCarousel: React.FC = () => {
  const responsive = {
    desktop: {
      breakpoint: { max: 1500, min: 1024 },
      items: 1,
      slidesToSlide: 1,
    },
    tablet: {
      breakpoint: { max: 1024, min: 700 },
      items: 1,
      slidesToSlide: 1,
    },
    mobile: {
      breakpoint: { max: 700, min: 0 },
      items: 1,
      slidesToSlide: 1,
    },
  };

  return (
    <div style={{ position: 'relative' }}>
      <img
        src={rakLogo}
        alt="Rak keramics"
        style={{
          position: 'absolute',
          top: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          maxWidth: '50%',
          zIndex: 999,
        }}
      />
      <Carousel
        swipeable={false}
        draggable={false}
        showDots={false}
        responsive={responsive}
        ssr={false}
        infinite={true}
        autoPlay={false}
        keyBoardControl={true}
        transitionDuration={500}
        focusOnSelect={false}
        itemClass="carousel_item"
        minimumTouchDrag={80}
        pauseOnHover
        rewind={false}
        rewindWithAnimation={true}
        shouldResetAutoplay
      >
        {images.map((image, index) => (
          <div key={index} style={{ width: '100%' }}>
            <img src={image} alt={''} key={index} style={{ width: '100%', height: 'auto', objectFit: 'cover' }} />
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default CustomCarousel;
