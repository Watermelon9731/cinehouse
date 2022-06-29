import { useEffect } from "react";
import { useDispatch } from "react-redux";
import HomeBanner from "./HomeBanner/HomeBanner";
import MovieList from "./MovieList/MovieList";
import { getMovieBannerApiAction } from "../../redux/actions/movieAction";
import {
  getMovieListApiAction,
  getCinemaChainApi,
} from "../../redux/actions/movieAction";

export default function Home(props) {
  // console.log("Reactjs ver: ", React.version);
  const dispatch = useDispatch();

  useEffect(async () => {
    dispatch(getMovieBannerApiAction());

    dispatch(getMovieListApiAction());

    dispatch(getCinemaChainApi());
  }, []);

  return (
    <section className="home-page" id="homePage">
      <HomeBanner />
      <MovieList />
    </section>
  );
}
