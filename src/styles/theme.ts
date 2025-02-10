import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    background: {
        default: "#F7E7DC", // Change this color
      },
    primary: {
      main: '#556cd6',
    },
    secondary: {
      main: '#19857b',
      light: '#b75252',
    },
  },
  typography: {
        h4: {
            fontFamily: 'PT Serif serif',
            "fontWeight" : 400,
            fontStyle: 'normal',
            color: '#703434'
        }

    },
    components: {
        MuiTextField: {
          styleOverrides: {
            root: {
                '& .MuiOutlinedInput-root': {
                '& fieldset': {
                    borderColor: '#b75252', // Change this to your desired color
                },
                '&:hover fieldset': {
                    borderColor: '#b75252', // Change this to your desired color
                },
                '&.Mui-focused fieldset': {
                    borderColor: '#b75252', // Change this to your desired color
                },
                },
                '& .MuiInputLabel-root': {
                color: '#994c4c', // Change this to your desired color
                },
                '& .MuiInputLabel-root.Mui-focused': {
                color: '#994c4c', // Change this to your desired color
                },
            },
        }
    }

    }
  
});