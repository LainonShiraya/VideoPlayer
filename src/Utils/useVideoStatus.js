import { useState } from "react";
import { formatTimeDuration } from "./Time";
export function useVideoStatus(videoRef) {
  const [mutedVideo, setMutedVideo] = useState(false);
  const [captionsMode, setCaptionsMode] = useState(false);
  const [playVideo, setPlayVideo] = useState(false);
  const [theaterMode, setTheaterMode] = useState(false);
  const [fullScreenMode, setfullScreenMode] = useState(false);
  const [time, setTime] = useState({ duration: 0, current: 0 });

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
  function setVideoTime() {
    setTime({
      duration: formatTimeDuration(videoRef.current.duration),
      current: formatTimeDuration(time.current),
    });
  }
  function adjustVideoCurrentTime() {
    setTime(prvsTime => ({
      ...prvsTime,
      current: formatTimeDuration(videoRef.current.currentTime),
    }));
  }
  return {
    videoRef,
    playVideo,
    captionsMode,
    mutedVideo,
    fullScreenMode,
    theaterMode,
    time,
    togglePlayVideo,
    toggleTheaterMode,
    toggleFullScreenMode,
    toggleMute,
    toggleCaptions,
    setVideoTime,
    adjustVideoCurrentTime,
  };
}
