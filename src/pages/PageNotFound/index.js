import { Box, Button, Container, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import blogiumLogo from '../../assets/images/blogium.png';
import { Link } from 'react-router-dom';

export default function Error() {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
      }}
    >
      <Container maxWidth="md">
        <Grid container spacing={2}>
          <Grid xs={8}>
            <Typography variant="h1">404</Typography>
            <Typography variant="h6">The page you’re looking for doesn’t exist.</Typography>
            <Button component={Link} to="/" variant="contained" sx={{ mt: 2 }}>
              Back Home
            </Button>
          </Grid>
          <Grid xs={4}>
            <img src={blogiumLogo} alt="Blogium" width={300} height={250} />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
