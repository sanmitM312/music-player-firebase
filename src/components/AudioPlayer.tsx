import { useState, useRef } from 'react';
import { Box, IconButton, Slider, styled, Typography, useTheme } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipNextIcon from '@mui/icons-material/SkipNext';
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

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const progress = (audioRef.current.currentTime / audioRef.current.duration) * 100;
      setProgress(progress);
    }
  };

  const handleSliderChange = (event: Event, newValue: number | number[]) => {
    if (audioRef.current && typeof newValue === 'number') {
      const time = (newValue / 100) * audioRef.current.duration;
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
          <IconButton aria-label="previous">
            {theme.direction === 'rtl' ? <SkipNextIcon /> : <SkipPreviousIcon />}
          </IconButton>
          <IconButton aria-label="play/pause" onClick={togglePlay}>
            {isPlaying ? <PauseArrowIcon sx={{ height: 38, width: 38 }}/> : <PlayArrowIcon sx={{ height: 38, width: 38 }} />}
          </IconButton>
          <IconButton aria-label="next">
            {theme.direction === 'rtl' ? <SkipPreviousIcon /> : <SkipNextIcon />}
          </IconButton>
        </Box>
    </Box>
    </StyledCard>
  );
}