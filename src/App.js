import React, { useRef, useEffect } from 'react';
import 'video.js/dist/video-js.css';

const App = () => {
  const videoRef = useRef(null);
  let videoPlayer;
  let intervalId;

  useEffect(() => {
    if (videoRef.current) {
      videoPlayer = videoRef.current;
      videoPlayer.addEventListener('timeupdate', handleTimeUpdate);
      videoPlayer.play();
      
      return () => {
        if (videoPlayer) {
          videoPlayer.removeEventListener('timeupdate', handleTimeUpdate);
          videoPlayer.pause();
        }
        clearInterval(intervalId);
      };
    }
  }, []);

  let lastCheckedSecond = -1; // Keep track of the last checked second


let isCheckingTime = false; // Flag to track if a time check is in progress

const handleTimeUpdate = () => {
  if (!isCheckingTime) {
    isCheckingTime = true;

    setTimeout(() => {
      // Get the current time of the video
      const currentTime = Math.round(videoPlayer.currentTime);
      console.log(currentTime)
      // Check the time and show/hide MCQ overlays accordingly
      if (currentTime >= 10 && currentTime < 11 && currentTime!=lastCheckedSecond) {
        lastCheckedSecond= currentTime;
        displayMCQOverlay('Question 1: What is the color of the water?');
      } else {
        hideMCQOverlay();
      }

      isCheckingTime = false;
    }, 785); // Throttle the time check to once per second (1000ms)
  }
};

  const displayMCQOverlay = (text) => {
    // Implement logic to display the MCQ overlay
    videoPlayer.pause();
    alert('Display Overlay:', text);
    videoPlayer.play();
    console.log("last checked",lastCheckedSecond)
  };

  const hideMCQOverlay = () => {

  };

  return (
    <div className="App">
      <div data-vjs-player>
        <video
          ref={videoRef}
          className="video-js vjs-big-play-centered"
          controls
          width="430"
          height="180"
          
        >
          <source src="//vjs.zencdn.net/v/oceans.mp4" type="video/mp4" />
          <track kind="captions" src="./mcq.vtt" srcLang="en" label="English" default />
        </video>
      </div>
    </div>
  );
};

export default App;
