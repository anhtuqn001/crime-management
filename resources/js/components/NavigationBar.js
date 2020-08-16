import React, { useState } from 'react';
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
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ChangePasswordDialog from './ChangePasswordDialog.js';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {
  Link
} from "react-router-dom";
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
    marginRight: '10px',
    color: 'white'
  },
  button: {
    textTransform: 'none',
    '& h6' : {
      marginRight: 0
    } 
  }
}));

function ButtonAppBar({tendangnhap, idTaikhoan }) {
  const classes = useStyles();
  let history = useHistory();
  const [isChangePasswordDialogOpen, setIsChangePasswordDialogOpen] = useState(false);
  const [isSuccessChangePasswordDialogOpen, setIsSuccessChangePasswordDialogOpen] = useState(false);

  function logOut(e) {
    e.preventDefault();
    localStorage.removeItem('token');
    history.push('/dangnhap');
  }

  function showChangePasswordDialog(e) {
    e.preventDefault();
    setIsChangePasswordDialogOpen(true);
  }

  function hideChangePasswordDialog() {
    setIsChangePasswordDialogOpen(false);
  }

  function showSuccessChangePasswordDialogOpen() {
    setIsSuccessChangePasswordDialogOpen(true);
  }
  return (
    <div className={classes.root}>
      <ChangePasswordDialog isOpen={isChangePasswordDialogOpen} hideChangePasswordDialog={hideChangePasswordDialog} idTaikhoan={idTaikhoan} showSuccessChangePasswordDialogOpen={showSuccessChangePasswordDialogOpen}/>
      <SuccessChangePasswordDialog isOpen={isSuccessChangePasswordDialogOpen} />
      <AppBar position="static" >
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
          <img src={logo} style={{width: '75px', height: '61px'}}/>
          </IconButton>
          <Typography variant="h5" className={classes.title}>
            PHẦN MỀM QUẢN LÝ ĐỐI TƯỢNG
          </Typography>
          {/* <Typography variant="subtitle2" className={classes.title2}>
            Xin chào, {tendangnhap}
          </Typography> */}
          <SimpleMenu tendangnhap={tendangnhap} showChangePasswordDialog={showChangePasswordDialog} />
          <Button color="inherit" onClick={logOut}>Đăng xuất</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}

function SimpleMenu({ tendangnhap, showChangePasswordDialog }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const classes = useStyles();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick} className={classes.button}>
      
      <Typography variant="subtitle2" className={classes.title2}>
        Xin chào, {tendangnhap}
      </Typography> 
      <ArrowDropDownIcon style={{color: 'white'}} />
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        elevation={0}
        getContentAnchorEl={null}
      >
        <MenuItem onClick={showChangePasswordDialog}>Đổi mật khẩu</MenuItem>
      </Menu>
    </div>
  );
}

function SuccessChangePasswordDialog({ isOpen }) {
  return (
    <div>
            <Dialog
                open={isOpen}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            //   fullWidth={true}
            //   maxWidth="xs"
            >
              <DialogTitle>Bạn đã đổi mật khẩu thành công</DialogTitle>
                <DialogContent> 
                  <DialogContentText >
                  <Link to="/dangnhap">Nhấn vào đây để chuyển sang trang đăng nhập</Link>
                  </DialogContentText>
                </DialogContent>
            </Dialog >
        </div >
  );
}

export default ButtonAppBar;