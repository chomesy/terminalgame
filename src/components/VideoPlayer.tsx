"use client"

import React, { useState, useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';

const VideoPlayer = () => {
  const [hasAudioPermission, setHasAudioPermission] = useState(false);

  const videoRef = React.createRef<HTMLVideoElement>();

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch((error) => {
        if (error.name === 'NotAllowedError') {
          // Prompt the user to allow audio playback
          setHasAudioPermission(false);
        }
      });
    }
  }, [videoRef]);

  const handleAllowAudio = () => {
    if (!videoRef.current) return;
    // Set hasAudioPermission to true and retry playing the video
    setHasAudioPermission(true);
    videoRef.current.play();
  };

  return (
    <div>
      {!hasAudioPermission && (
        <Dialog open={hasAudioPermission === false} >
          <Button onClick={handleAllowAudio}>Allow Audio Playback</Button>
        </Dialog>
      )}
      <video ref={videoRef} src="/tg-title-card.mp4" />

    </div>
  );
};

export default VideoPlayer;