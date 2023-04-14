import React, { useState, useRef } from "react";
import {
  PlayPauseIcon,
  TheaterIcon,
  FullScreenIcon,
  MuteIcon,
  CaptionsIcon,
} from "../../../Utils/Icons/Icons";
import "./VideoControlsStyles.scss";
const VideoControls = ({
  videoRef,
  time,
  playVideo,
  togglePlayVideo,
  theaterMode,
  toggleTheaterMode,
  fullScreenMode,
  toggleFullScreenMode,
}) => {
  const timelineContainerRef = useRef(null);
  const [mutedVideo, setMutedVideo] = useState(false);
  const [captionsMode, setCaptionsMode] = useState(false);

  return (
    <div className='video-controls-container'>
      <div
        className='timeline-container'
        ref={timelineContainerRef}
        onMouseDown={e => {
          handleTimeLineUpdate(e);
        }}
      >
        <div className='timeline'>
          <div className='thumb-indicator'></div>
        </div>
      </div>
      <div className='controls'>
        <button
          onClick={() => {
            togglePlayVideo();
          }}
        >
          <PlayPauseIcon isModeOn={playVideo} />
        </button>
        <button
          className='mute-button'
          onClick={() => {
            toggleMute();
          }}
        >
          <MuteIcon isModeOn={mutedVideo} />
        </button>
        <div className='duration-container'>
          <div className='current-time'>{time.current}</div>
          <span>/</span>
          <div className='total-time'>{time.duration}</div>
        </div>
        <button
          className={`captions-button ${captionsMode ? "captions-on" : ""}`}
          onClick={() => {
            toggleCaptions();
          }}
        >
          <CaptionsIcon />
        </button>
        <button
          className='theater-button'
          onClick={() => {
            toggleTheaterMode();
          }}
        >
          <TheaterIcon isModeOn={theaterMode} />
        </button>
        <button
          className='full-screen-button'
          onClick={() => toggleFullScreenMode()}
        >
          <FullScreenIcon isModeOn={fullScreenMode} />
        </button>
      </div>
    </div>
  );
  function toggleMute() {
    videoRef.current.muted = !mutedVideo;
    setMutedVideo(!mutedVideo);
  }
  function toggleCaptions() {
    const captions = videoRef.current.textTracks[0];
    if (captionsMode) {
      captions.mode = "hidden";
    } else {
      captions.mode = "showing";
    }
    setCaptionsMode(!captionsMode);
  }
  function handleTimeLineUpdate(e) {
    e.preventDefault();
    const rect = timelineContainerRef.current.getBoundingClientRect();
    const percent =
      Math.min(Math.max(0, e.pageX - rect.x), rect.width) / rect.width;
    timelineContainerRef.current.style.setProperty(
      "--progress-position",
      percent
    );
    videoRef.current.currentTime = percent * videoRef.current.duration;
  }
};

export default VideoControls;
