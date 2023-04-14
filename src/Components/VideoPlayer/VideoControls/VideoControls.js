import React from "react";
import {
  PlayPauseIcon,
  TheaterIcon,
  FullScreenIcon,
  MuteIcon,
  CaptionsIcon,
} from "../../../Utils/Icons";
import "./VideoControlsStyles.scss";
const VideoControls = ({ timelineContainerRef, videoStatus }) => {
  function handleTimeLineUpdate(e) {
    e.preventDefault();
    const rect = timelineContainerRef.current.getBoundingClientRect();
    const video = videoStatus.videoRef.current;
    const percent =
      Math.min(Math.max(0, e.pageX - rect.x), rect.width) / rect.width;
    timelineContainerRef.current.style.setProperty(
      "--progress-position",
      percent
    );
    video.currentTime = percent * video.duration;
  }

  return (
    <div className='video-controls-container'>
      <div
        className='timeline-container'
        ref={timelineContainerRef}
        onMouseDown={handleTimeLineUpdate}
      >
        <div className='timeline'>
          <div className='thumb-indicator'></div>
        </div>
      </div>
      <div className='controls'>
        <button onClick={videoStatus.togglePlayVideo}>
          <PlayPauseIcon isModeOn={videoStatus.playVideo} />
        </button>
        <button className='mute-button' onClick={videoStatus.toggleMute}>
          <MuteIcon isModeOn={videoStatus.mutedVideo} />
        </button>
        <div className='duration-container'>
          <div className='current-time'>{videoStatus.time.current}</div>
          <span>/</span>
          <div className='total-time'>{videoStatus.time.duration}</div>
        </div>
        <button
          className={`captions-button ${
            videoStatus.captionsMode ? "captions-on" : ""
          }`}
          onClick={videoStatus.toggleCaptions}
        >
          <CaptionsIcon />
        </button>
        <button
          className='theater-button'
          onClick={videoStatus.toggleTheaterMode}
        >
          <TheaterIcon isModeOn={videoStatus.theaterMode} />
        </button>
        <button
          className='full-screen-button'
          onClick={videoStatus.toggleFullScreenMode}
        >
          <FullScreenIcon isModeOn={videoStatus.fullScreenMode} />
        </button>
      </div>
    </div>
  );
};

export { VideoControls };
