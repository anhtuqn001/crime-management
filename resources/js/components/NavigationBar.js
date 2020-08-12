import React from 'react';
import ReactDOM from 'react-dom';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import MenuIcon from '@material-ui/icons/Menu';
import logo from '../../../public/images/logo2.png';
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
    padding: theme.spacing(0.5)
  },
  title: {
    flexGrow: 1,
  },
  title2: {
    marginRight: '10px'
  }
}));

function ButtonAppBar({tendangnhap}) {
  const classes = useStyles();
  let history = useHistory();

  function logOut(e) {
    e.preventDefault();
    localStorage.removeItem('token');
    history.push('/dangnhap');
  }

  return (
    <div className={classes.root}>
      <AppBar position="static" >
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
          <img src={logo} style={{width: '75px', height: '61px'}}/>
          </IconButton>
          <Typography variant="h5" className={classes.title}>
            PHẦN MỀM QUẢN LÝ ĐỐI TƯỢNG
          </Typography>
          <Typography variant="subtitle2" className={classes.title2}>
            Xin chào, {tendangnhap}
          </Typography>
          <Button color="inherit" onClick={logOut}>Đăng xuất</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default ButtonAppBar;