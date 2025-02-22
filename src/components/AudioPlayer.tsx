import { useState, useRef } from 'react';
import { Box, IconButton, Slider, styled, Typography, useTheme } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import Replay10Icon from '@mui/icons-material/Replay10';
import Forward10Icon from '@mui/icons-material/Forward10';
import PauseArrowIcon from '@mui/icons-material/Pause';

const StyledCard = styled(Card)({
    display: "flex",
    borderRadius: 15,
    boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.2)",
    transition: "0.3s",
    "&:hover": {
      transform: "scale(1.03)",
      boxShadow: "0px 6px 16px rgba(0, 0, 0, 0.3)",
    },
  });
interface AudioPlayerProps {
  url: string;
  title: string;
  artist: string;
  onEnded: () => void;
  autoPlay: boolean;
}

export default function AudioPlayer({ url, title, artist }: AudioPlayerProps) {
  const theme = useTheme();
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const previousPlay = () => {
    if(audioRef.current){
      if(audioRef.current.currentTime < 10){
        audioRef.current.currentTime = 0;
      }else{
        audioRef.current.currentTime = audioRef.current.currentTime - 10;
      }
      const progress = (audioRef.current.currentTime / audioRef.current.duration) * 100;
      setProgress(progress);
    }
  };
  const forwardPlay = () => {
    if(audioRef.current){
      if(audioRef.current.currentTime + 10 > audioRef.current.duration){
        audioRef.current.currentTime = 0;
      }else{
        audioRef.current.currentTime = audioRef.current.currentTime + 10;
      }
      const progress = (audioRef.current.currentTime / audioRef.current.duration) * 100;
      setProgress(progress);
    }
  };
  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const progress = (audioRef.current.currentTime / audioRef.current.duration) * 100;
      console.log(audioRef.current.currentTime + " and " + audioRef.current.duration);
      setProgress(progress);
    }
  };

  const handleSliderChange = (event: Event, newValue: number | number[]) => {
    if (audioRef.current && typeof newValue === 'number') {
      // slider value is between 0 and 100
      // the time is calculated by taking the proportion of the value 
      // and the total duration of the audio
      const time = (newValue / 100) * audioRef.current.duration;
      console.log(newValue + " and " + time);
      audioRef.current.currentTime = time;
      setProgress(newValue);
    }
  };

  return (
    <StyledCard>
    <Box sx={{ display: 'flex', flexDirection: 'column', backgroundColor: 'grey',width: "100%" }}>
    <CardContent sx={{ flex: '1 0 auto' }}>
          <Typography component="div" variant="h5" sx={{ textAlign: 'center', color: '#F7E7DC' }}>
            {title}
          </Typography>
          <Typography
            variant="subtitle1"
            component="div"
            sx={{ color: '#F7E7DC', textAlign: 'center' }}
          >
            {artist}
          </Typography>
    </CardContent>
      <audio
        ref={audioRef}
        src={url}
        onTimeUpdate={handleTimeUpdate}
        onEnded={() => setIsPlaying(false)}
      />
      <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
        <Slider
          value={progress}
          onChange={handleSliderChange}
          sx={{ mx: 2, color: '#383838' }}
        />
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', pl: "40%", pb: 1 }}>
          <IconButton aria-label="previous" onClick={previousPlay}>
            <Replay10Icon />
          </IconButton>
          <IconButton aria-label="play/pause" onClick={togglePlay}>
            {isPlaying ? <PauseArrowIcon sx={{ height: 38, width: 38 }}/> : <PlayArrowIcon sx={{ height: 38, width: 38 }} />}
          </IconButton>
          <IconButton aria-label="next" onClick={forwardPlay}>
           <Forward10Icon />
          </IconButton>
        </Box>
    </Box>
    </StyledCard>
  );
}