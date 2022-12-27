import React from 'react';
import Alert from '@mui/material/Alert';
import { AlertTitle } from '@mui/material';

export default function AlertNotFound() {
  return (
    <Alert severity="warning" sx={{ width: 50 + '%', mt: 2, justifyContent: 'center', mx: 'auto' }}><AlertTitle>
      No Pokémon Matched Your Search!</AlertTitle>
    </Alert>
  )
}
