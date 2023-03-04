import React, { useState, useEffect } from "react";
import { HiOutlineSearch } from "react-icons/hi";
import { SlMenu } from "react-icons/sl";
import { VscChromeClose } from "react-icons/vsc";
import { useNavigate, useLocation } from "react-router-dom";

import "./header.scss";
import logo from "../../assets/movix-logo.svg";
// import Menu from "react-select/dist/declarations/src/components/Menu";

const Header = () => {
  const [show, setShow] = useState(null);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [query, setQuery] = useState("");
  const [showSearch, setShowSearch] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  const navigationControl = () => {
    if (window.scrollY > 200) {
      if (window.scrollY > lastScrollY && !mobileMenu) {
        setShow("top");
      } else {
        setShow("hide");
      }
    }
    setLastScrollY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", navigationControl);
    return () => {
      window.removeEventListener("scroll", navigationControl);
    };
  }, [lastScrollY]);

  const inputHandler = (e) => {
    if (e.key === "Enter" && query.length > 0) {
      navigate(`/search/${query}`);
      setTimeout(() => {
        setShowSearch(false);
      }, 500);
    }
  };
  const openMobileMenu = () => {
    setMobileMenu(true);
    setShowSearch(false);
  };
  const openSearch = () => {
    setMobileMenu(false);
    setShowSearch(true);
  };
  const navigationHandler = (type) => {
    if (type === "movie") {
      navigate("/explore/movie");
    } else {
      navigate("/explore/tv");
    }
    setMobileMenu(false);
  };
  return (
    <header className="header contentWrapper">
      <div
        className={`headerWrapper contentWrapper lrPad ${
          mobileMenu ? "header" : ""
        } ${lastScrollY > 150 ? show : ""}`}
      >
        <div
          className="logo"
          onClick={() => {
            navigate("/");
            setMobileMenu(false);
          }}
        >
          <img src={logo} alt="logo" />
        </div>
        <ul className={`${mobileMenu ? "menuItems" : ""}`}>
          <li className="menuItem" onClick={() => navigationHandler("movie")}>
            Movies
          </li>
          <li className="menuItem" onClick={() => navigationHandler("tv")}>
            TV Show
          </li>
          <li className="menuItem searchIcon">
            <HiOutlineSearch onClick={openSearch} />
          </li>
        </ul>
        <div className="mobileMenu">
          <HiOutlineSearch className="mobIcon" onClick={openSearch} />
          {mobileMenu ? (
            <VscChromeClose
              className="mobIcon"
              onClick={() => setMobileMenu(false)}
            />
          ) : (
            <SlMenu className="mobIcon" onClick={openMobileMenu} />
          )}
        </div>
        {showSearch && (
          <div className="searchBar">
            <div className="searchWrapper contentWrapper">
              <div className="searchInput lrPad">
                <input
                  type="text"
                  autoFocus
                  value={query}
                  placeholder="Search for a Movie or Tv shows..."
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyUp={inputHandler}
                />
                <VscChromeClose onClick={() => setShowSearch(false)} />
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
