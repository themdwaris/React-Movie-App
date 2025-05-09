import React from "react";
import { useSelector } from "react-redux";

import "./cast.scss";

import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import Image from "../../../components/LazyLoadImage/Image";
import avatar from "../../../assets/avatar.png";

const Cast = ({ data, loading }) => {
  const { url } = useSelector((state) => state.home);

  const skeleton = () => {
    return (
      <div className="skItem">
        <div className="circle skeleton"></div>
        <div className="row skeleton"></div>
        <div className="row2 skeleton"></div>
      </div>
    );
  };
  return (
    <div className="castSection">
      <ContentWrapper>
        <div className="sectionHeading">Top Cast</div>
        {!loading ? (
          <div className="listItems">
            {data?.map((item) => {
              let profileURL = item?.profile_path
                ? url.profile + item.profile_path
                : avatar;
              return (
                <div key={item.id}>
                  <div className="listItem">
                    <div className="profileImg">
                      <Image src={profileURL} alt="avatar" />
                    </div>
                    <div className="name">{item.name}</div>
                    <div className="character">{item.character}</div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="castSkeleton">
            {skeleton()}
            {skeleton()}
            {skeleton()}
            {skeleton()}
            {skeleton()}
            {skeleton()}
          </div>
        )}
      </ContentWrapper>
    </div>
  );
};

export default Cast;
