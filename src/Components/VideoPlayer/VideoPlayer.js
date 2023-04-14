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
  function togglePlayVideo() {
    console.log(videoRef);
    videoRef.current.paused
      ? videoRef.current.play()
      : videoRef.current.pause();
    console.log(playVideo);
    setPlayVideo(!playVideo);
  }
  function toggleTheaterMode() {
    setTheaterMode(!theaterMode);
  }
  function toggleFullScreenMode() {
    setfullScreenMode(!fullScreenMode);
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
