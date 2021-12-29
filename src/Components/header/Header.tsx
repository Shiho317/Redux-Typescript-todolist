import React from 'react';
import styles from './Header.module.scss';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';


const Header: React.FC = () => {
  return (
    <div className={styles.root}>
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" className={styles.app_bar}>
        <Toolbar className={styles.tool_bars}>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} className={styles.title}>
            Redux Toolkit TODO
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
    </div>
  );
}

export default Header
