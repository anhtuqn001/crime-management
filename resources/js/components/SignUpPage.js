import React, { useRef, useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import logo1 from '../../../public/images/logo1.png';
import IconButton from '@material-ui/core/IconButton';
import CircularProgress from '@material-ui/core/CircularProgress';
import CustomizedSnackbars from './SnackBars.js';

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Bản quyền © '}
            <Link color="inherit" href="https://material-ui.com/">
                Lihanet
      </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    loader: {
        color: 'white'
    }
}));

function SignUpPage() {
    const classes = useStyles();

    const [tendangnhap, setTendangnhap] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setLoader] = useState(false);
    const [isSuccessSnackBarOpen , setSnackBar] = useState(false);
    const [successSnackBarContent, setSnackBarContent] = useState('');

    function handleTendangnhapChange(event) {
        event.preventDefault();
        setTendangnhap(event.target.value);
    }

    function handleEmailChange(event) {
        event.preventDefault();
        setEmail(event.target.value);
    }

    function handlePasswordChange(event) {
        event.preventDefault();
        setPassword(event.target.value);
    }

    function register(e) {
        e.preventDefault();
        setLoader(true);
        let data = {
            tendangnhap,
            email,
            password
        }
        fetch('/api/signup', {
            method: 'post',
            headers: {
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then((response) => response.json())
            .then((resData) => {
                console.log(resData);
                clearInputsContent();
                setLoader(false);
                showSuccessSnackBar("Tạo tài khoản mới thành công!");
            })
            .catch((error) => {
                console.log('Request failed', error);
            });
    }

    function showSuccessSnackBar(message) {
        setSnackBarContent(message);
        setSnackBar(true);
    }

    function hideSuccessSnackBar() {
        setSnackBar(false);
    }

    function clearInputsContent() {
        setTendangnhap('');
        setEmail('');
        setPassword('');
    }

    return (
        <Container component="main" maxWidth="xs">
            <CustomizedSnackbars isOpen={isSuccessSnackBarOpen} hideSuccessSnackBar={hideSuccessSnackBar} successSnackBarContent={successSnackBarContent} />
            <CssBaseline />
            <div className={classes.paper}>
                {/* <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar> */}
                <IconButton edge="start" color="inherit" aria-label="menu">
                    <img src={logo1} style={{ width: '75px', height: '75px' }} />
                </IconButton>
                <Typography component="h1" variant="h5">
                    PHẦN MỀM QUẢN LÝ ĐỐI TƯỢNG
                </Typography>
                <Box mt={2}>
                    <Typography component="h1" variant="h5" color="primary">
                        ĐĂNG KÝ
                    </Typography>
                </Box>
                    {/* <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="fname"
                  name="firstName"
                  variant="outlined"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="lname"
                />
              </Grid> */}
                <form className={classes.form} noValidate onSubmit={register}>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            id="tendangnhap"
                            label="Tên Đăng Nhập"
                            name="tendangnhap"
                            autoComplete="tendangnhap"
                            onChange={handleTendangnhapChange}
                            value={tendangnhap}
                        />
                    <Box mt={1}>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            id="email"
                            label="Email"
                            name="email"
                            autoComplete="email"
                            onChange={handleEmailChange}
                            value={email}
                        />
                    </Box>
                    <Box mt={1}>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            name="password"
                            label="Mật Khẩu"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            onChange={handlePasswordChange}
                            value={password}
                        />
                    </Box>
                    {/* <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid> */}
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    disabled={isLoading}
                >
                    {isLoading ? <CircularProgress size={24} className={classes.loader} /> : "Đăng Ký"}
                </Button>
                </form>
                <Grid container justify="flex-end">
                    <Grid item>
                        <Link href="/dangnhap" variant="body2">
                            Đã có tài khoản ? Đăng nhập
                        </Link>
                    </Grid>
                </Grid>
            </div>
            <Box mt={5}>
                <Copyright />
            </Box>
        </Container>
    );
}

export default SignUpPage; 