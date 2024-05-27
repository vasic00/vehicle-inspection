import React, { useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import { CompanyInfoModal } from "../components/CompanyInfoModal";
import "../style/company-carousel.css";

import CompanyCard from "./CompanyCard";

export const CompanyCarousel = (props) => {
  const [companyInfo, changeCompanyInfo] = useState(null);
  const closeDialog = () => {
    changeCompanyInfo(null);
  };
  const addGrade = (grade, id) => {
    props.httpClient
      .put(`/companies/grade/` + id, {
        value: grade,
      })
      .then((res) => {
        props.render();
      })
      .catch((exc) => {
        props.feedback("Sign up first!", true);
      });
  };
  return (
    <div id="carousel">
      <Carousel
        additionalTransfrom={0}
        arrows
        autoPlay
        autoPlaySpeed={4000}
        centerMode={false}
        className=""
        containerClass="container-with-dots"
        dotListClass=""
        draggable
        focusOnSelect={false}
        infinite
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
        {props.companies.map((c) => (
          <CompanyCard
            company={c}
            changeInfo={changeCompanyInfo}
            grade={addGrade}
            station={false}
          ></CompanyCard>
        ))}
      </Carousel>
      {companyInfo && (
        <CompanyInfoModal
          close={closeDialog}
          info={companyInfo}
          open={companyInfo !== null}
        ></CompanyInfoModal>
      )}
    </div>
  );
};
