import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { theme } from '../src/styles/theme';
import { AppProps } from 'next/app';
import { Container } from '@mui/material';
import Navbar from '@/components/NavBar';

function MyApp({ Component, pageProps }: AppProps) {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Navbar />
        <Container maxWidth="md" sx={{ mt: 5, py: 4, backgroundColor: '#FAF0E6' }}>
          <Component {...pageProps} />
        </Container>
      </ThemeProvider>
    );
  }
  
  export default MyApp;