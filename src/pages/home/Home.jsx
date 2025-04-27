import React from "react";
import HeroBanner from "./heroBanner/HeroBanner";
import "./home.scss";
import Popular from "./popular/Popular";
import Trending from "./trending/Trending";
import TopRated from "./topRated/TopRated";

const Home = () => {
  alert("Please use VPN to view the content and try again :)")
  return (
    <div className="homePage">
      <HeroBanner />
      <Trending />
      <Popular />
      <TopRated />
    </div>
  );
};

export default Home;
