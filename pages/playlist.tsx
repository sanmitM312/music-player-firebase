import { useEffect, useState } from 'react';
import { Typography, Button, Box } from '@mui/material';
import Grid from '@mui/material/Grid';
import { Shuffle, PlayArrow } from '@mui/icons-material';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '../src/firebase/config';
import { Song } from '../src/types/song';
import AudioPlayer from '../src/components/AudioPlayer';
import PlaylistItem from '../src/components/PlaylistItem';

export default function Playlist() {
  const [songs, setSongs] = useState<Song[]>([]);
  const [shuffledSongs, setShuffledSongs] = useState<Song[]>([]);
  const [currentSongIndex, setCurrentSongIndex] = useState<number>(-1);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const q = query(collection(db, 'songs'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const songList = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as Song));
      setSongs(songList);
      setShuffledSongs(songList);
    });

    return () => unsubscribe();
  }, []);

  const shufflePlaylist = () => {
    const shuffled = [...songs];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    setShuffledSongs(shuffled);
    setCurrentSongIndex(-1);
    setIsPlaying(false);
  };

  const startPlaylist = () => {
    setCurrentSongIndex(0);
    setIsPlaying(true);
  };

  const playNext = () => {
    if (currentSongIndex < shuffledSongs.length - 1) {
      setCurrentSongIndex(prev => prev + 1);
    } else {
      setCurrentSongIndex(-1);
      setIsPlaying(false);
    }
  };

  const playSpecificSong = (index: number) => {
    setCurrentSongIndex(index);
    setIsPlaying(true);
  };

  return (
    <Box>
    <Box sx={{ mb: 4, display: 'flex', gap: 2 }}>
      <Button 
        variant="contained" 
        startIcon={<Shuffle />}
        onClick={shufflePlaylist}
        sx={{ backgroundColor: 'brown' }}
      >
        Shuffle Playlist
      </Button>
      <Button 
        variant="contained" 
        startIcon={<PlayArrow />}
        onClick={startPlaylist}
        disabled={shuffledSongs.length === 0}
        sx={{ backgroundColor: 'brown' }}
      >
        Play All
      </Button>
    </Box>
      {currentSongIndex !== -1 && (
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" gutterBottom>
            Now Playing
          </Typography>
          <AudioPlayer
            url={shuffledSongs[currentSongIndex].audioUrl}
            title={shuffledSongs[currentSongIndex].title}
            artist={shuffledSongs[currentSongIndex].artist}
            onEnded={playNext}
            autoPlay={isPlaying}
          />
        </Box>
      )}

      <Typography variant="h4" gutterBottom>
        Playlist Order
      </Typography>
      <Grid container spacing={2}>
        {shuffledSongs.map((song, index) => (
          <Grid xs={12} key={song.id}>
            <PlaylistItem
              song={song}
              isPlaying={index === currentSongIndex}
              onClick={() => playSpecificSong(index)}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
