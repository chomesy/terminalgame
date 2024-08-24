import React, { useRef } from 'react';
import AudiotrackIcon from '@mui/icons-material/Audiotrack';

interface MusicPlayerProps {
  song: string;
  startPlaying: boolean;
}

export default function MusicPlayer(props: MusicPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);

  const handlePlayPause = () => {
    if (!audioRef.current) return;

    if (audioRef.current.paused) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  };

  return (
    <div>
      <audio ref={audioRef} src={props.song} autoPlay={props.startPlaying} />
      <button onClick={handlePlayPause}><AudiotrackIcon /></button>
      
    </div>
  );
}