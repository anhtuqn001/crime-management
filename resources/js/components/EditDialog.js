import React, { useState, useEffect, useRef, forwardRef, useImperativeHandle } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';

import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel'
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import DateFnsUtils from '@date-io/date-fns';
import Box from '@material-ui/core/Box';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import viLocale from "date-fns/locale/vi";
import { createMuiTheme } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import { convertToRightDate } from '../Utilities/utils.js';
import { debounce } from '../Utilities/utils.js';
import IconButton from '@material-ui/core/IconButton';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import Divider from '@material-ui/core/Divider';

const defaultMaterialTheme = createMuiTheme({
  spacing: 2,
});

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1)
  },
  addButton: {
    color: 'green'
  }
}));


function EditDialog({ isOpen, hideEditDialog, chosingDoituong, showSuccessSnackBar, changeEditedDoituong }) {
  const classes = useStyles();

  const [hovaten, setHovaten] = useState('');
  const [tenthuonggoi, setTenthuonggoi] = useState('');
  const [ngaysinh, setNgaysinh] = useState(new Date());
  const [gioitinhnam, setGioitinhnam] = useState(false);
  const [gcnthan, setGCNTHAn] = useState('');
  const [nhanthan, setNhanthan] = useState('');
  const [ghichu, setGhichu] = useState('');
  const [isLoading, setLoader] = useState(false);
  const [tenhinhanhs, setTenhinhanhs] = useState([]);

  const hovatenInputRef = useRef();
  const tenthuonggoiInputRef = useRef();
  const gioitinhnamInputRef = useRef();
  const gcnthanInputRef = useRef();
  const nhanthanInputRef = useRef();
  const ghichuInputRef = useRef();
  const hinhanhInputRef = useRef();


  useEffect(() => {
    if (chosingDoituong != null) {
      setHovaten(chosingDoituong.hovaten);
      setTenthuonggoi(chosingDoituong.tenthuonggoi);
      setNgaysinh(new Date(getDateFormat(chosingDoituong.ngaysinh)));
      setGioitinhnam(!!chosingDoituong.gioitinhnam);
      setGCNTHAn(chosingDoituong.gcnthan);
      setNhanthan(chosingDoituong.nhanthan);
      setGhichu(chosingDoituong.ghichu);
      // console.log(chosingDoituong.tenthuonggoi);
      // tenthuonggoiInputRef.current.value = chosingDoituong.tenthuonggoi;
      // console.log(!!chosingDoituong.gioitinhnam);
      // gioitinhnamInputRef.current.checked = !!chosingDoituong.gioitinhnam;
      // console.log(chosingDoituong.gcnthan);
      // gcnthanInputRef.current.value = chosingDoituong.gcnthan;
      // console.log(chosingDoituong.nhanthan);
      // nhanthanInputRef.current.value = chosingDoituong.nhanthan;
      // console.log(chosingDoituong.ghichu);
      // ghichuInputRef.current.value = chosingDoituong.ghichu;
      setTenhinhanhs([...chosingDoituong.hinhanhs]);
    }
  }, [JSON.stringify(chosingDoituong)])

  function getDateFormat(wrongFormat) {
    let arr = wrongFormat.split('/');
    let temp = arr[0];
    arr[0] = arr[1];
    arr[1] = temp;
    let rightFormat = arr.join('/')
    return rightFormat;
  }



  function handleHotenInputChange(event) {
    event.preventDefault();
    setHovaten(event.target.value);
  }


  function handleTenthuonggoiInputChange(event) {
    event.preventDefault();
    setTenthuonggoi(event.target.value);
  }

  function handleGioitinhnamInputChange(event) {
    event.preventDefault();
    setGioitinhnam(event.target.checked);
  }

  function handleGCNTHAnInputChange(event) {
    event.preventDefault();
    setGCNTHAn(event.target.value);
  }

  function handleNhanthanInputChange(event) {
    event.preventDefault();
    setNhanthan(event.target.value);
  }

  function handleGhichuInputChange(event) {
    event.preventDefault();
    setGhichu(event.target.value);
  }


  function submitInputs(event) {
    event.preventDefault();
    setLoader(true);
    console.log(ngaysinh);
    var data = new FormData();
    data.append('_method', 'PUT');
    data.append('hovaten', hovaten);
    data.append('tenthuonggoi', tenthuonggoi);
    data.append('ngaysinh', convertToRightDate(ngaysinh).toISOString().slice(0, 10));
    data.append('gioitinhnam', gioitinhnam);
    data.append('gcnthan', gcnthan);
    data.append('nhanthan', nhanthan);
    data.append('ghichu', ghichu);
    data.append('hinhanh', hinhanhInputRef.current.hinhanh);
    fetch('/api/doituong/' + chosingDoituong.id, {
      method: 'post',
      headers: {
        'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
      },
      body: data
    })
      .then((response) => response.json())
      .then((data) => {
        setLoader(false);
        hideEditDialog();
        showSuccessSnackBar("Cập nhật đối tượng thành công !");
        changeEditedDoituong(data.success);
      })
      .catch((error) => {
        console.log('Request failed', error);
      });
  }

  return (
    <Dialog open={isOpen} aria-labelledby="form-dialog-title" fullWidth={true} maxWidth="sm">
      <DialogTitle id="form-dialog-title">Cập Nhật Đối Tượng</DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item sm={6} >
            <TextField
              autoFocus
              variant="outlined"
              margin="dense"
              label="Họ Tên"
              type="text"
              fullWidth
              onChange={handleHotenInputChange}
              value={hovaten}
            // inputRef={hovatenInputRef}
            />
          </Grid>
          <Grid item sm={6}>
            <TextField
              variant="outlined"
              margin="dense"
              label="Tên Thường Gọi"
              type="text"
              fullWidth
              onChange={handleTenthuonggoiInputChange}
              value={tenthuonggoi}
            // inputRef={tenthuonggoiInputRef}
            />
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item sm={6}>
            <ThemeProvider theme={defaultMaterialTheme}>
              <MuiPickersUtilsProvider utils={DateFnsUtils} locale={viLocale}>
                <KeyboardDatePicker
                  autoOk
                  variant="inline"
                  inputVariant="outlined"
                  label="Ngày Sinh"
                  format="dd/MM/yyyy"
                  padding="small"
                  margin="dense"
                  value={ngaysinh}
                  onChange={date => {
                    setNgaysinh(date);
                  }}
                />
              </MuiPickersUtilsProvider>
            </ThemeProvider>
          </Grid>
          {/* <Grid item sm={2}>
            
          </Grid> */}
          <Grid item sm={6}>
            <Grid item xs={4}>
              <Typography variant="body2">
                Giới Tính:
              </Typography>
            </Grid>
            <Grid item xs={2}>
              <FormControlLabel
                control={
                  <Checkbox
                    name="checkedB"
                    color="primary"
                    style={{ padding: '4px', paddingLeft: '15px' }}
                    onChange={handleGioitinhnamInputChange}
                    checked={gioitinhnam}
                  // inputRef={gioitinhnamInputRef}
                  />
                }
                label="Nam"
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item sm={12}>
            <InputLabel htmlFor="my-input">GCNTH Án</InputLabel>
            <OutlinedInput
              multiline
              rows={2}
              rowsMax={4}
              color="primary"
              fullWidth
              notched={false}
              onChange={handleGCNTHAnInputChange}
              value={gcnthan}
            // inputRef={gcnthanInputRef}
            />
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item sm={12}>
            <InputLabel htmlFor="my-input">Nhân Thân</InputLabel>
            <OutlinedInput
              multiline
              rows={2}
              rowsMax={4}
              color="primary"
              fullWidth
              notched={false}
              onChange={handleNhanthanInputChange}
              value={nhanthan}
            // inputRef={nhanthanInputRef}
            />
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item sm={12}>
            <InputLabel htmlFor="my-input">Ghi Chú</InputLabel>
            <OutlinedInput
              multiline
              rows={1}
              rowsMax={2}
              color="primary"
              fullWidth
              notched={false}
              onChange={handleGhichuInputChange}
              value={ghichu}
            // inputRef={ghichuInputRef}
            />
          </Grid>
        </Grid>
        <HinhanhInputWithRef ref={hinhanhInputRef} tenhinhanhs={tenhinhanhs} />
      </DialogContent>
      <DialogActions>
        <Button color="primary" variant="outlined" onClick={submitInputs} className={classes.button} disabled={isLoading}>
          {isLoading ? <CircularProgress color="primary" size={24} /> : "Cập Nhật"}
        </Button>
        <Button variant="outlined" onClick={hideEditDialog}>
          Hủy Bỏ
            </Button>
      </DialogActions>
    </Dialog>
  );
}

const HinhanhInputWithRef = forwardRef(HinhanhInput);

function HinhanhInput({ tenhinhanhs }, ref) {
  const classes = useStyles();
  const [file, setFile] = useState(tenhinhanhs.map(i => null));
  const [hinhanh, setHinhanh] = useState(null);
  const [times, setTimes] = useState(tenhinhanhs.map(i => i.thoigian));


  function handleImgFileChange(e, index) {
    let newArrFile = [...file];
    newArrFile[index] = URL.createObjectURL(e.target.files[0]);
    setFile([...newArrFile]);
    // setHinhanh(event.target.files[0]);
    console.log(file);
    
  }

  function handleDateChange(date, index) {
    let newArrTimes = [...times];
    newArrTimes[index] = date;
    setTimes([...newArrTimes]);
  }

  useImperativeHandle(ref, () => ({
    hinhanh
  }));

  return (
    // <Grid container spacing={2}>
    //   <Grid item sm={6}>
    //     <InputLabel htmlFor="my-input">Hình Ảnh</InputLabel>
    //     <TextField type="file" onChange={handleImgFileChange} />
    //   </Grid>
    //   <Grid item sm={6}>
    //     <img src={file != null ? file : (tenhinhanh == null || tenhinhanh.length == 0 ? null : '/images/' + tenhinhanh)} style={{ height: 'auto', width: 'auto', maxWidth: '100%' }} />
    //   </Grid>
    // </Grid>
    <Box mt={1}>
      <Grid container spacing={2}>
        <Grid item sm={11}>
          <InputLabel>Hình Ảnh</InputLabel>
        </Grid>
        <Grid item sm={1}>
          <IconButton>
            <AddCircleIcon className={classes.addButton} />
          </IconButton>
        </Grid>
      </Grid>
      {tenhinhanhs.map((item, index)=>
        <React.Fragment>
          <Grid container spacing={2}>
            <Grid item sm={6}>
              <TextField type="file" onChange={(e) => {
                e.preventDefault();
                handleImgFileChange(e, index);
              }} />
              <Box mt={1}>
                <ThemeProvider theme={defaultMaterialTheme}>
                  <MuiPickersUtilsProvider utils={DateFnsUtils} locale={viLocale}>
                    <KeyboardDatePicker
                      autoOk
                      variant="inline"
                      label="Ngày"
                      format="dd/MM/yyyy"
                      padding="small"
                      margin="dense"
                      onChange={(date) => {
                        handleDateChange(date, index)
                      }}
                      value={times[index]}
                    />
                  </MuiPickersUtilsProvider>
                </ThemeProvider>
              </Box>
            </Grid>
            <Grid item sm={6}>
              <img src={file[index] != null ? file[index] : '/images/' + item.hinhanh} style={{ height: 'auto', width: 'auto', maxWidth: '100%' }} />
            </Grid>
          </Grid>
          <Divider />
        </React.Fragment>
      )}
    </Box>
  );
}


export default EditDialog;