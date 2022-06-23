import { Typography } from '@mui/material';
import { Container } from '@mui/system';
import './Collections.scss';

export const Collections = () => {
    return (
      <>
        <Container maxWidth='xl'>
          <Typography component={"h2"} color={"primary.dark"}>
            Collection
          </Typography>
        </Container>
      </>
    );
}