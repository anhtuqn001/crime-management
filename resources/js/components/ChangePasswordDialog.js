import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Alert } from '@material-ui/lab';
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import {
    useHistory
} from "react-router-dom";
const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
    button: {

    },
    alert: {
        '& .MuiAlert-message': {
            padding: 0,
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column'
          },
        '& .MuiTypography-caption': {
            marginBottom: 0
          },
        '& .MuiAlert-icon': {
            padding: 0
        }
    }
}));

function ChangePasswordDialog({ isOpen, hideChangePasswordDialog, idTaikhoan, showSuccessChangePasswordDialogOpen }) {
    const classes = useStyles();
    const [password1, setPassword1] = useState('');
    const [password2, setPassword2] = useState('');
    const [errors, setErrors] = useState([]);
    const [isLoading, setLoader] = useState(false);
    let history = useHistory();

    function handlePassword1Change(e) {
        setPassword1(e.target.value);
    }

    function handlePassword2Change(e) {
        setPassword2(e.target.value);
    }

    function changePassword(e) {
        e.preventDefault();
        if(password1 != password2) {
            let errors = [];
            errors.push("Mật khẩu không khớp");
            setErrors([...errors]);
            return;
        }
        


        if(password1 > 0) {
            setLoader(true);
            let token = localStorage.getItem("token");
            let data = {
                idTaikhoan,
                password : password1
            }
            //send ajax
            fetch('/api/changepassword', {
                method: 'post',
                headers: {
                  'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
                  'Content-Type': 'application/json',
                  'Authorization': 'Bearer ' + token
                },
                body: JSON.stringify(data)
              })
                .then((response) => response.json())
                .then((data) => {
                  setLoader(false);
                  localStorage.removeItem('token');
                  hideChangePasswordDialogChild();
                  showSuccessChangePasswordDialogOpen();
                })
                .catch((error) => {
                    if (error.status == 401) {
                        localStorage.removeItem("token");
                        history.push('/dangnhap');
                    }
                });
        }
    }

    function hideChangePasswordDialogChild() {
        setErrors([]);
        hideChangePasswordDialog();
    } 
    return (
        <div>
            <Dialog
                open={isOpen}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            //   fullWidth={true}
            //   maxWidth="xs"
            >
                <DialogTitle id="alert-dialog-title">{"Thay Đổi Mật Khẩu"}</DialogTitle>
                <DialogContent>
                    <Grid container spacing={1} justify="center" direction="column" alignItems="center">
                        <Grid item sm={12}>
                            <TextField 
                            label="Mật khẩu mới" 
                            type="password" 
                            fullWidth 
                            variant="outlined"
                            onChange={handlePassword1Change}
                            size="small"
                            />
                        </Grid>
                        <Grid item sm={12}>
                            <TextField 
                            label="Mật khẩu xác nhận" 
                            type="password" 
                            fullWidth 
                            variant="outlined"
                            onChange={handlePassword2Change}
                            size="small"
                            />
                        </Grid>
                    </Grid>
                    {!!errors && errors.length > 0 ? 
                    <Box mt={1}>
                    <Alert severity="error" className={classes.alert}>
                        {errors.map(i => 
                        <Typography variant="caption" display="block" gutterBottom>
                            - {i}
                        </Typography>)}
                    </Alert></Box> : ''
                    }
                </DialogContent>
                <DialogActions>
                    <Button variant="outlined" color="primary" className={classes.button} onClick={changePassword} disabled={isLoading}>
                    {isLoading ? <CircularProgress color="primary" size={24} className={classes.loader} /> : "Thay đổi"}
                    </Button>
                    <Button variant="outlined" onClick={hideChangePasswordDialogChild} autoFocus>
                        Hủy Bỏ
            </Button>
                </DialogActions>
            </Dialog >
        </div >
    );
}

export default ChangePasswordDialog;