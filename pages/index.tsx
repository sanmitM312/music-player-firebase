import { useEffect, useState } from 'react';
import { Container, Typography} from '@mui/material';
import Grid from '@mui/material/Grid2'; // Correct import
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '../src/firebase/config';
import { Song } from '../src/types/song';
import AudioPlayer from '../src/components/AudioPlayer';

export default function Home() {
    const [songs, setSongs] = useState<Song[]>([]);
  
    useEffect(() => {
      const q = query(collection(db, 'songs'), orderBy('createdAt', 'desc'));
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const songList = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        } as Song));
        setSongs(songList);
      });
  
      return () => unsubscribe();
    }, []);
  
    return (
      <Container maxWidth="md" sx={{ width: "40rem" ,py: 4, color: '#383838' }}>
        {songs.length !== 0 ? 
            <>
                <Typography 
                    variant="h4" 
                    component="h1" 
                    gutterBottom 
                    sx={{ padding: 2, textAlign: 'center' }}
                    >
                    GROOVE HERE 🎵
                </Typography>
                <Grid container spacing={2} sx={{ mt: 4 }}>
                    {songs.map((song) => (
                        <Grid size={12} key={song.id}>
                        <AudioPlayer
                            url={song.audioUrl}
                            title={song.title}
                            artist={song.artist}
                        />
                        </Grid>
                    ))}
                </Grid>
            </>
             : 
            <Typography variant="h4" component="h1" gutterBottom sx={{ padding: 2, textAlign: 'center' }}>
                No songs available. Add yours!
            </Typography>
            }
      </Container>
    );
  }
  
  