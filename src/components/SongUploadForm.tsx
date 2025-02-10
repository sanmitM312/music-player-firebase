import { useState } from 'react';
import { Box, Button, TextField, CircularProgress } from '@mui/material';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection, addDoc } from 'firebase/firestore';
import { storage, db } from '../firebase/config';

interface SongUploadFormProps {
    onSuccess?: () => void;
  }
  
  export default function SongUploadForm({ onSuccess }: SongUploadFormProps) {
    const [title, setTitle] = useState('');
    const [artist, setArtist] = useState('');
    const [audioFile, setAudioFile] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);
  
    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      if (!title || !artist || !audioFile) return;
  
      try {
        setLoading(true);
        // Upload audio file to Firebase Storage
        const storageRef = ref(storage, `songs/${audioFile.name}`);
        await uploadBytes(storageRef, audioFile);
        const audioUrl = await getDownloadURL(storageRef);
  
        // Add song data to Firestore
        await addDoc(collection(db, 'songs'), {
          title,
          artist,
          audioUrl,
          createdAt: new Date().toISOString(),
        });
  
        // Reset form
        setTitle('');
        setArtist('');
        setAudioFile(null);
        
        // Call onSuccess callback if provided
        if (onSuccess) {
          onSuccess();
        }
      } catch (error) {
        console.error('Error uploading song:', error);
      } finally {
        setLoading(false);
      }
    };
  
    return (
      <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 400, mx: 'auto' }}>
        <TextField
          fullWidth
          label="Song Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="Artist"
          value={artist}
          onChange={(e) => setArtist(e.target.value)}
          margin="normal"
          required
        />
        <input
          type="file"
          accept="audio/*"
          onChange={(e) => setAudioFile(e.target.files?.[0] || null)}
          style={{ margin: '16px 0' }}
          required
        />
        <Button
          fullWidth
          type="submit"
          variant="contained"
          disabled={loading}
          sx={{ mt: 2 , backgroundColor : "#b75252"}}
        >
          {loading ? <CircularProgress size={24} /> : 'Upload Song'}
        </Button>
      </Box>
    );
  }