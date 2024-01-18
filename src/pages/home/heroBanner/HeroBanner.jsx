import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "./style.scss";

import useFetch from "../../../hooks/useFetch";

import Img from "../../../components/lazyLoadImage/Img";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";

const HeroBanner = () => {
    const [background, setBackground] = useState("");
    const [query, setQuery] = useState("");
    const navigate = useNavigate();
    const { url } = useSelector((state) => state.home);
    const { data, loading } = useFetch("/movie/upcoming");
    const [counter, setCounter] = useState(0)
    
    setInterval(()=> setCounter(1),1000)

    useEffect(() => {
        
        const bg =
            url.backdrop +
            data?.results?.[Math.floor(Math.random() * 20)]?.backdrop_path;
        setBackground(bg);
    }, [counter]);

    const searchQueryHandler = (event) => {
        // if (event.key === "Enter" && query.length > 0) {
            navigate(`/search/${query}`);
        // }
    };

    return (
        <div className="heroBanner">
            {!loading && (
                <div className="backdrop-img">
                    <Img src={background} />
                </div>
            )}

            <div className="opacity-layer"></div>
            <ContentWrapper>
                <div className="heroBannerContent">
                    <span className="title">Welcome</span>
                    <br />
                    <span className="subTitle">
                        Millions of Movies, TV shows and people to discover.
                        <br />
                        <br />
                        Explore now.
                    </span>
                    <div className="searchInput">
                        <input
                            type="text"
                            placeholder="Search for a Movie or TV show...."
                            onChange={(e) => setQuery(e.target.value)}
                            onKeyDown={(e) => {
                                if(e.key === 'Enter')
                                searchQueryHandler();
                            }}
                        />
                        <button onClick={searchQueryHandler}>Search</button>
                    </div>
                </div>
            </ContentWrapper>
        </div>
    );
};

export default HeroBanner;
