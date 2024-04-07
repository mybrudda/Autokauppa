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
            CarShop
          </Typography>
        </Toolbar>
      </AppBar>
      
      <Toolbar />
      
      <div style={{ marginBottom: '40%' }}> {/* Adding margin-top to position Carlist higher */}
        <Carlist />
      </div>
    </>
  );
}

export default App;
