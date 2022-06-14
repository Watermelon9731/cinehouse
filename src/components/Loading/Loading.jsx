import React, { Fragment } from "react";
import { useSelector } from "react-redux";

export default function Loading(props) {
  const { isLoading } = useSelector((state) => state.loadingReducer);

  return (
    <Fragment>
      {isLoading ? (
        <div
          className="loading fixed top-0 left-0 w-full h-full flex justify-center items-center z-10"
          id="loading"
        >
          <div className="text-4xl text-white font-bold">Sắp xong rồi....</div>
        </div>
      ) : (
        ""
      )}
    </Fragment>
  );
}
