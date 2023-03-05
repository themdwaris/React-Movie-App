import React, { useRef } from "react";
import {
  BsFillArrowLeftCircleFill,
  BsFillArrowRightCircleFill,
} from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import dayjs from "dayjs";

import Image from "../lazyLoadImage/Image";
import PosterFallback from "../../assets/no-poster.png";

import "./crousel.scss";
import CircleRating from "../circleRating/CircleRating";
import Genres from "../genres/Genres";

const Carousel = ({ data, loading, endpoint,title,className }) => {
  const containerRef = useRef();
  const navigate = useNavigate();
  const { url } = useSelector((state) => state.home);

  const navigation = (direction) => {
    const container = containerRef.current;
    const scrollAmount =
      direction === "left"
        ? container.scrollLeft - (container.offsetWidth + 20)
        : container.scrollLeft + (container.offsetWidth + 20);

    container.scrollTo({
      left: scrollAmount,
      behavior: "smooth",
    });
  };

  const skelenItem = () => {
    return (
      <div className="skeletonItem">
        <div className="posterBlock skeleton"></div>
        <div className="textBlock">
          <div className="title skeleton"></div>
          <div className="date skeleton"></div>
        </div>
      </div>
    );
  };

  return (
    <div className="carousel">
      <div className={`contentWrapper ${className}`}>
        {title&& <div className="carouselTitle">{title}</div>}
        <BsFillArrowLeftCircleFill
          className="carouselLeftNav arrow"
          onClick={() => navigation("left")}
        />
        <BsFillArrowRightCircleFill
          className="carouselRighttNav arrow"
          onClick={() => navigation("right")}
        />
        {!loading ? (
          <div className="carouselItems" ref={containerRef}>
            {data?.map((currItem) => {
              const posterUrl = currItem.poster_path
                ? url.poster + currItem?.poster_path
                : PosterFallback;
              return (
                <div
                  key={currItem?.id}
                  className="carouselItem"
                  onClick={() =>
                    navigate(
                      `/${currItem?.media_type || endpoint}/${currItem?.id}`
                    )
                  }
                >
                  <div className="posterBlock">
                    <Image src={posterUrl} alt="poster" />
                    <CircleRating rating={currItem?.vote_average.toFixed(1)} />
                    <Genres data={currItem?.genre_ids.slice(0, 2)} />
                  </div>
                  <div className="textBlock">
                    <span className="title">
                      {currItem?.title || currItem?.name}
                    </span>
                    <span className="date">
                      {dayjs(currItem.release_Date).format("MMM D, YYYY")}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="loadingSkeleton">
            {skelenItem()}
            {skelenItem()}
            {skelenItem()}
            {skelenItem()}
            {skelenItem()}
          </div>
        )}
      </div>
    </div>
  );
};

export default Carousel;
