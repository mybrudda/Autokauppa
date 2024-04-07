import { AppBar, Toolbar, Typography } from '@mui/material';
import { useState } from 'react';
import './App.css';
import Carlist from './components/Carlist';

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      
      <AppBar position="fixed" style={{ height: '70px' }}> 
        <Toolbar style={{ justifyContent: 'center' }}> 
          <Typography variant="h4" component="div">
            AutoKauppa
          </Typography>
        </Toolbar>
      </AppBar>
      
      <Toolbar />
      
      <div style={{ marginBottom: '45%' }}> 
        <Carlist />
      </div>
    </>
  );
}

export default App;
