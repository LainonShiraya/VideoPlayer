import React, { useRef } from "react";
import "./VideoPlayerStyles.scss";
import subtitles from "../../Assets/Subtitles/subtitles_en.vtt";
import video from "../../Assets/Videos/atendesoftware2.mp4";
import { VideoControls } from "./VideoControls/VideoControls";
import { useVideoStatus } from "../../Utils/useVideoStatus";
const VideoPlayer = () => {
  const videoRef = useRef(null);
  const timelineContainerRef = useRef(null);
  const videoStatus = useVideoStatus(videoRef);

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
		   ${videoStatus.playVideo ? "" : "paused"}
		   ${videoStatus.theaterMode ? "theater" : ""}
		   ${videoStatus.fullScreenMode ? "full-screen" : ""}
		`}
    >
      <VideoControls
        videoRef={videoRef}
        timelineContainerRef={timelineContainerRef}
        videoStatus={videoStatus}
      />
      <video
        src={video}
        ref={videoRef}
        crossOrigin='anonymous'
        onClick={videoStatus.togglePlayVideo}
        onLoadedMetadata={e => {
          e.target.textTracks[0].mode = "hidden";
          videoStatus.setVideoTime();
        }}
        onTimeUpdate={() => {
          videoStatus.adjustVideoCurrentTime();
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
export { VideoPlayer };
