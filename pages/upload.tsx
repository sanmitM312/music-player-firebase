import { Typography } from '@mui/material';
import SongUploadForm from '../src/components/SongUploadForm';
import { useRouter } from 'next/router';

export default function Upload() {
  const router = useRouter();

  const onUploadSuccess = () => {
    router.push('/'); // Redirect to home page after successful upload
  };

  return (
    <>
    <Typography 
            variant="h4" 
            component="h1" 
            gutterBottom 
            sx={{ padding: 2, textAlign: 'center' }}
            >        ADD YOUR TRACK!
      </Typography>
      <SongUploadForm onSuccess={onUploadSuccess}  />
    </>
  );
}