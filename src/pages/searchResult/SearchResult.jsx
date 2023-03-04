import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";

import "./searchResult.scss";

import { fetchFromApi } from "../../utils/api";
import ContentWrapper from "../../components/contentWrapper/ContentWrapper";
import MovieCard from "../../components/movieCard/MovieCard";
import Spinner from "../../components/spinner/Spinner";
import noResults from "../../assets/no-results.png";
const SearchResult = () => {
  const [data, setData] = useState(null);
  const [pageNum, setPageNum] = useState(1);
  const [loading, setLoading] = useState(false);
  const { query } = useParams();


  const fetchSerachPageData = () => {
    setLoading(true);
    fetchFromApi(`/search/multi?query=${query}&page=${pageNum}`).then((res) => {
      setData(res);
      console.log(res)
      setPageNum((prevPage) => prevPage + 1);
      setLoading(false);
    });
  };

  const fetchNextPageData = () => {
    fetchFromApi(`/search/multi?query=${query}&page=${pageNum}`).then((res) => {
      if (data?.results) {
        setData({
          ...data,
          results: [...data?.results, ...res.results],
        });
      } else {
        setData(res);
      }
      setPageNum((prevPage) => prevPage + 1);
    });
  };

  useEffect(() => {
    setPageNum(1)
    fetchSerachPageData();
    // fetchNextPageData()
  }, [query]);

  return (
    <div className="searchResultsPage">
      {loading && <Spinner initial={true} />}
      {!loading && (
        <ContentWrapper>
          {data?.results?.length > 0 ? (
            <>
              <div className="pageTitle">
                {`Search ${
                  data?.total_results?.length > 1 ? "reuslts" : "result"
                } of '${query}'`}
              </div>
              <InfiniteScroll
                className="content"
                dataLength={data?.results?.length || []}
                next={fetchNextPageData()}
                hasMore={pageNum <= data?.total_page}
                loader={<Spinner />}
              >
                {data?.results?.map((item, index) => {
                  if (item?.media_type === "person") return;
                  return (
                    <MovieCard key={index} data={item} fromSearch={true} />
                  );
                })}
              </InfiniteScroll>
            </>
          ) : (
            <span className="resultNotFound">Sorry, no results found</span>
          )}
        </ContentWrapper>
      )}
    </div>
  );
};

export default SearchResult;
