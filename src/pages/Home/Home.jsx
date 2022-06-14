import React from "react";
import HomeBanner from "./HomeBanner/HomeBanner";
import MovieList from "./MovieList/MovieList";

export default function Home(props) {
  // console.log("Reactjs ver: ", React.version);

  return (
    <section className="home-page" id="homePage">
      <HomeBanner />
      <MovieList />
    </section>
  );
}
