import React from "react";
import { useSelector } from "react-redux";


export default function HomeBanner() {
  const { movieBanner } = useSelector((state) => state.movieReducer);

  const bannerRender = () => {
    return movieBanner.map((item, index) => {
      return (
        <div
          key={index}
          className={`carousel-item relative ${
            index === 0 ? "active" : ""
          } float-left w-full`}
        >
          <img
            src={`${item.hinhAnh}`}
            className="w-full"
            alt={item.maPhim}
          />
        </div>
      );
    });
  };

  return (
    <section className="movie-carousel">
      <div
        id="carouselExampleIndicators"
        className="carousel slide relative"
        data-bs-ride="carousel"
      >
        <div className="carousel-indicators absolute right-0 bottom-0 left-0 flex justify-center p-0 pb-6">
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to={0}
            className="active"
            aria-current="true"
            aria-label="Slide 1"
          />
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to={1}
            aria-label="Slide 2"
          />
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to={2}
            aria-label="Slide 3"
          />
        </div>
        <div className="carousel-inner lg:h-bannerLg sm:h-bannerSm relative w-full overflow-hidden">
          {bannerRender()}
        </div>
        <button
          className="carousel-control-prev absolute top-0 bottom-0 flex items-center justify-center p-0 text-center border-0 hover:outline-none hover:no-underline focus:outline-none focus:no-underline left-0"
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon inline-block bg-no-repeat"
            aria-hidden="true"
          />
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next absolute top-0 bottom-0 flex items-center justify-center p-0 text-center border-0 hover:outline-none hover:no-underline focus:outline-none focus:no-underline right-0"
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon inline-block bg-no-repeat"
            aria-hidden="true"
          />
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </section>
  );
}
