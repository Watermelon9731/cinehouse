import React, { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadingHideVideoAction } from "../../redux/actions/loadingAction";

export default function VideoModal(props) {
  const { isVideoLoading, videoUrl } = useSelector(
    (state) => state.loadingReducer
  );

  const dispatch = useDispatch();

  return (
    <Fragment>
      {isVideoLoading ? (
        <div
          className="video-modal fixed top-0 left-0 w-full h-full flex justify-center items-center z-10"
          id="videoModal"
          onClick={() => {
            dispatch(loadingHideVideoAction());
          }}
        >
          <iframe
            className="embed-responsive-item absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/2 h-2/3"
            src={videoUrl}
            allowfullscreen=""
            data-gtm-yt-inspected-2340190_699="true"
            id="240632615"
          ></iframe>
        </div>
      ) : (
        ""
      )}
    </Fragment>
  );
}
