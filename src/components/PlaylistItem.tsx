import { IconButton, Paper, Typography, Box } from '@mui/material';
import { MusicNote, PlayArrow } from '@mui/icons-material';
import { Song } from '../types/song';
// Removed import for Box from 'lucide-react'

interface PlaylistItemProps {
  song: Song;
  isPlaying: boolean;
  onClick: () => void;
}

export default function PlaylistItem({ song, isPlaying, onClick }: PlaylistItemProps) {
  return (
    <Paper 
      sx={{ 
        p: 2, 
        display: 'flex', 
        alignItems: 'center',
        bgcolor: isPlaying ? 'action.selected' : 'background.paper'
      }}
    >
      <IconButton onClick={onClick} color={isPlaying ? 'primary' : 'default'}>
        {isPlaying ? <MusicNote /> : <PlayArrow />}
      </IconButton>
      <Box sx={{ ml: 2 }}>
        <Typography variant="subtitle1">{song.title}</Typography>
        <Typography variant="body2" color="text.secondary">
          {song.artist}
        </Typography>
      </Box>
    </Paper>
  );
}



