import React from "react";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import Cinema from "./Cinema/Cinema";
import DetailBanner from "./DetailBanner/DetailBanner";

export default function Detail() {
  return (
    <section className="detail">
      <DetailBanner />
      <Cinema />
    </section>
  );
}
