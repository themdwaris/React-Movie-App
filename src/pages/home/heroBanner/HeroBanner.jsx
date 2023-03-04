import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import useFetch from "../../../hooks/useFetch";
import "./heroBanner.scss";

import Image from "../../../components/LazyLoadImage/Image";
import ContentWrapper from "../../../components/contentWrapper/contentWrapper";

const HeroBanner = () => {
  const [background, setBackground] = useState("");
  const [query, setQuery] = useState("");

  const { url } = useSelector((state) => {
    return state.home;
  });
  //   console.log(url)
  const navigate = useNavigate();

  const { loading, data } = useFetch("/movie/popular");

  useEffect(() => {
    const bg =
      url?.backdrop +
      data?.results?.[Math.floor(Math.random() * 20)]?.backdrop_path;
    setBackground(bg);
  }, [data]);

  const inputHandler = (e) => {
    if (e.key === "Enter" && query.length > 0) {
      navigate(`/search/${query}`);
    }
  };
//   console.log(loading)
  return (
    <div className="heroBannerWrapper">
      {!loading && (
        <div className="backdropImg">
          <Image src={background} />
        </div>
      )}

      <div className="opacityLayer"></div>
      <ContentWrapper>
        <div className="heroBannerContent">
          <p className="title">Welcome</p>
          <p className="subTitle">
            Millions of movies, TV shows and people to discover, explore now.
          </p>
          <div className="searchInput">
            <input
              type="text"
              value={query}
              placeholder="Search for a Movie or Tv shows..."
              onChange={(e) => setQuery(e.target.value)}
              onKeyUp={inputHandler}
            />
            <button onClick={()=>navigate(`/search/${query}`)}>Search</button>
          </div>
        </div>
      </ContentWrapper>
    </div>
  );
};

export default HeroBanner;
