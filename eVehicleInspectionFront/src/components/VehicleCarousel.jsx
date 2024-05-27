import React, { useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CompanyInfoModal } from "../components/CompanyInfoModal";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import "../style/company-carousel.css";
import car from "../assets/car.png";
import cargo from "../assets/cargo.png";
import bike from "../assets/bike.png";

export const VehicleCarousel = (props) => {
  return (
    <div id="carousel">
      <Carousel
        additionalTransfrom={0}
        arrows
        centerMode={false}
        className=""
        containerClass="container-with-dots"
        dotListClass=""
        draggable
        focusOnSelect={false}
        itemClass=""
        keyBoardControl
        minimumTouchDrag={80}
        pauseOnHover
        renderArrowsWhenDisabled={false}
        renderButtonGroupOutside={false}
        renderDotsOutside={false}
        responsive={{
          desktop: {
            breakpoint: {
              max: 3000,
              min: 1024,
            },
            items: 5,
            partialVisibilityGutter: 40,
          },
          mobile: {
            breakpoint: {
              max: 464,
              min: 0,
            },
            items: 1,
            partialVisibilityGutter: 30,
          },
          tablet: {
            breakpoint: {
              max: 1024,
              min: 464,
            },
            items: 2,
            partialVisibilityGutter: 30,
          },
        }}
        rewind={false}
        rewindWithAnimation={false}
        rtl={false}
        shouldResetAutoplay
        showDots={false}
        sliderClass=""
        slidesToSlide={2}
        swipeable
        id="slideshow"
      >
        {props.vehicles.map((v) => (
          <Card sx={{ maxWidth: 315 }} key={v.id}>
            <CardMedia
              sx={{ height: 150, marginLeft: 5, marginRight: 5 }}
              image={v.type === "CAR" ? car : v.type === "CARGO" ? cargo : bike}
              title={v.manufacturer + " " + v.model}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {v.manufacturer + " " + v.model}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {"Godina: " + v.productionYear}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {"Motor: " + v.engine}
              </Typography>
            </CardContent>
            <CardActions sx={{ justifyContent: "end" }}>
              <Button
                color="error"
                className="info-btn"
                // sx={{ marginLeft: 20 }}
                onClick={() => props.delete(v.id)}
              >
                OBRIŠI
              </Button>
              <Button
                className="info-btn"
                // sx={{ marginLeft: 20 }}
                onClick={() => props.info(v)}
              >
                DETALJI
              </Button>
            </CardActions>
          </Card>
        ))}
      </Carousel>
    </div>
  );
};
