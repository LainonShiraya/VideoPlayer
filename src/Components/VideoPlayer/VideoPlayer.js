import React, { useState, useRef } from "react";
import "./VideoPlayerStyles.scss";
import { formatDuration } from "../../Utils/Functions/Time.js";
import subtitles from "../../Assets/Subtitles/subtitles_en.vtt";
import video from "../../Assets/Videos/atendesoftware2.mp4";
import VideoControls from "./VideoControls/VideoControls";
const VideoPlayer = () => {
  const [playVideo, setPlayVideo] = useState(false);
  const [theaterMode, setTheaterMode] = useState(false);
  const [fullScreenMode, setfullScreenMode] = useState(false);
  const [time, setTime] = useState(0);
  const videoRef = useRef(null);
  const timelineContainerRef = useRef(null);
  function togglePlayVideo() {
    videoRef.current.paused
      ? videoRef.current.play()
      : videoRef.current.pause();
    setPlayVideo(!playVideo);
  }
  function toggleTheaterMode() {
    setTheaterMode(!theaterMode);
  }
  function toggleFullScreenMode() {
    setfullScreenMode(!fullScreenMode);
  }
  function currentTimestamp() {
    const percent = videoRef.current.currentTime / videoRef.current.duration;
    timelineContainerRef.current.style.setProperty(
      "--progress-position",
      percent
    );
  }
  return (
    <div
      className={`video-player-container
		   ${playVideo ? "" : "paused"}
		   ${theaterMode ? "theater" : ""}
		   ${fullScreenMode ? "full-screen" : ""}
		`}
    >
      <VideoControls
        videoRef={videoRef}
        time={time}
        playVideo={playVideo}
        togglePlayVideo={togglePlayVideo}
        theaterMode={theaterMode}
        toggleTheaterMode={toggleTheaterMode}
        fullScreenMode={fullScreenMode}
        toggleFullScreenMode={toggleFullScreenMode}
        timelineContainerRef={timelineContainerRef}
      />
      <video
        src={video}
        ref={videoRef}
        crossOrigin='anonymous'
        onClick={() => {
          togglePlayVideo();
        }}
        onLoadedMetadata={e => {
          e.target.textTracks[0].mode = "hidden";
          setTime({
            current: formatDuration(e.target.currentTime),
            duration: formatDuration(e.target.duration),
          });
        }}
        onTimeUpdate={e => {
          setTime(prvsTime => ({
            ...prvsTime,
            current: formatDuration(e.target.currentTime),
          }));
          currentTimestamp();
        }}
      >
        <track
          default
          kind='captions'
          label='English'
          srcLang='en'
          src={subtitles}
          className='subtitles'
        />
      </video>
    </div>
  );
};
export default VideoPlayer;
