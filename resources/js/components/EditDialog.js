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
import { convertToRightDate, convertFromStringToDate } from '../Utilities/utils.js';
import { debounce } from '../Utilities/utils.js';
import IconButton from '@material-ui/core/IconButton';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import Divider from '@material-ui/core/Divider';
import ClearIcon from '@material-ui/icons/Clear';
import AddPhotoAlternateIcon from '@material-ui/icons/AddPhotoAlternate';
import { Alert } from '@material-ui/lab';

const defaultMaterialTheme = createMuiTheme({
  spacing: 2,
});

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
    padding: '5px',
    width: '89px'
  },
  addButton: {
    color: 'green'
  },
  upload: {
    margin: theme.spacing(1),
    // backgroundColor: 'white',
    // color: 'green',
    // borderColor: 'green',
    margin: 0
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
    }
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
  const [lsnghe, setLsnghe] = useState('');
  const [ghichu, setGhichu] = useState('');
  const [isLoading, setLoader] = useState(false);
  const [tenhinhanhs, setTenhinhanhs] = useState([]);
  const [errors, setErrors] = useState([]);

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
      setTenthuonggoi(chosingDoituong.tenthuonggoi != null ? chosingDoituong.tenthuonggoi : '');
      setNgaysinh(new Date(getDateFormat(chosingDoituong.ngaysinh)));
      setGioitinhnam(!!chosingDoituong.gioitinhnam);
      setGCNTHAn(chosingDoituong.gcnthan != null ? chosingDoituong.gcnthan : '');
      setNhanthan(chosingDoituong.nhanthan != null ? chosingDoituong.nhanthan : '');
      setLsnghe(chosingDoituong.lsnghe != null ? chosingDoituong.lsnghe : '');
      setGhichu(chosingDoituong.ghichu != null ? chosingDoituong.ghichu : '');
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

  function handleLsngheInputChange(event) {
    event.preventDefault();
    setLsnghe(event.target.value);
  }


  function submitInputs(event) {
    event.preventDefault();
    if(hovaten.length == 0 || ngaysinh == null) {
      let errors = []
      if(hovaten.length == 0){
        errors.push('Họ tên không được để trống!');
      }
      if(ngaysinh == null){
        errors.push('Ngày sinh không được để trống!');
      }
      setErrors([...errors])
      return; 
    }
    setLoader(true);
    var data = new FormData();
    data.append('_method', 'PUT');
    data.append('hovaten', hovaten);
    data.append('tenthuonggoi', tenthuonggoi);
    data.append('ngaysinh', convertToRightDate(ngaysinh).toISOString().slice(0, 10));
    data.append('gioitinhnam', gioitinhnam);
    data.append('gcnthan', gcnthan);
    data.append('nhanthan', nhanthan);
    data.append('lsnghe', lsnghe);
    data.append('ghichu', ghichu);

    hinhanhInputRef.current.hinhanh.filter((i, index) => i != null || hinhanhInputRef.current.timesChange[index] != null || hinhanhInputRef.current.times[index] == null).forEach(i => {
      data.append('hinhanhstr[]', i == null ? 'null' : 'notnull');
      data.append('hinhanh[]', i);
    })

    hinhanhInputRef.current.hinhanh.forEach((item, index) => {
      if (item != null || hinhanhInputRef.current.timesChange[index] != null || hinhanhInputRef.current.times[index] == null) {
        data.append('id[]', hinhanhInputRef.current.id[index]);
        data.append('thoigian[]', hinhanhInputRef.current.times[index] == null ? null : convertToRightDate(hinhanhInputRef.current.times[index]).toISOString().slice(0, 10));
      }
    })

    for (var pair of data.entries()) {
      console.log(pair[0] + ', ' + pair[1]);
    }

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
        // console.log(data);
        hideEditDialogChild();
        showSuccessSnackBar("Cập nhật đối tượng thành công !");
        changeEditedDoituong(data.success);
      })
      .catch((error) => {
        console.log('Request failed', error);
      });
  }

  function hideEditDialogChild() {
    hideEditDialog();
    if(errors.length > 0) {
      setErrors([]);
    }
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
                  invalidDateMessage="Sai định dạng"
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
            <InputLabel>Lịch Sử Nghề Nghiệp</InputLabel>
            <OutlinedInput
              multiline
              rows={2}
              rowsMax={4}
              color="primary"
              fullWidth
              notched={false}
              onChange={handleLsngheInputChange}
              value={lsnghe}
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
        <Grid container justify="space-between">
          <Grid item sm={8}>
            {errors != null && errors.length > 0 ? <Alert severity="error" className={classes.alert}>{errors.map(i =>
              <Typography variant="caption" display="block" gutterBottom>
                - {i}
              </Typography>
            )}</Alert> : ''}
          </Grid>
          <Grid item sm={4}>
            <Button color="primary" variant="outlined" onClick={submitInputs} className={classes.button} disabled={isLoading}>
              {isLoading ? <CircularProgress color="primary" size={24} /> : "Cập nhật"}
            </Button>
            <Button variant="outlined" onClick={hideEditDialogChild}>
               Hủy Bỏ
            </Button> 
          </Grid>
        </Grid>
        {/* <Button color="primary" variant="outlined" onClick={submitInputs} className={classes.button} disabled={isLoading}>
          {isLoading ? <CircularProgress color="primary" size={24} /> : "Cập Nhật"}
        </Button>
        <Button variant="outlined" onClick={hideEditDialog}>
          Hủy Bỏ
        </Button> */}
      </DialogActions>
    </Dialog>
  );
}

const HinhanhInputWithRef = forwardRef(HinhanhInput);

function HinhanhInput({ tenhinhanhs }, ref) {
  const classes = useStyles();
  const [file, setFile] = useState(tenhinhanhs.map(i => null));
  const [hinhanh, setHinhanh] = useState(tenhinhanhs.map(i => null));
  const [items, setItems] = useState([...tenhinhanhs]);
  const [id, setId] = useState(tenhinhanhs.map(i => i.id));
  const [times, setTimes] = useState(tenhinhanhs.map(i => convertFromStringToDate(i.thoigian)));
  const [timesChange, setTimesChange] = useState(tenhinhanhs.map(i => null));


  function handleImgFileChange(e, index) {
    let newArrFile = [...file];
    newArrFile[index] = URL.createObjectURL(e.target.files[0]);
    setFile([...newArrFile]);
    let newArrHinhanh = [...hinhanh];
    newArrHinhanh[index] = e.target.files[0];
    setHinhanh([...newArrHinhanh]);
  }

  function handleDateChange(date, index) {
    let newArrTimes = [...times];
    newArrTimes[index] = date;
    setTimes([...newArrTimes]);
    let newArrTimesChange = [...timesChange];
    newArrTimesChange[index] = date;
    setTimesChange([...newArrTimesChange]);
  }

  function handleAddButton(e) {
    e.preventDefault();
    let length = items.length;
    let newItem = parseInt(items[items.length - 1]) + 1;
    setItems([...items, {}]);
    setFile([...file, null]);
    setId([...id, 'add']);
    setHinhanh([...hinhanh, null]);
    setTimes([...times, new Date()]);
  }

  function handleRemoveItem(e, index) {
    e.preventDefault();
    let newArrTimes = [...times];
    newArrTimes[index] = null;
    setTimes([...newArrTimes]);
    let newArrItems = [...items];
    newArrItems[index] = null;
    setItems([...newArrItems]);
  }

  useImperativeHandle(ref, () => ({
    hinhanh,
    id,
    times,
    timesChange
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
          <IconButton onClick={handleAddButton}>
            <AddCircleIcon className={classes.addButton} />
          </IconButton>
        </Grid>
      </Grid>
      {items.map((item, index) => {
        return item == null ? <React.Fragment></React.Fragment> : <React.Fragment>
          <Grid container spacing={2}>
            <Grid item sm={6}>
              <Grid container justify={"flex-end"}>
                <Grid item sm={1}>
                  <TextField type="file" id={"file-edit-" + index} style={{ display: "none" }} onChange={(e) => {
                    e.preventDefault();
                    handleImgFileChange(e, index);
                  }} />
                  <IconButton
                    aria-label="delete"
                    size="small"
                    color="secondary"
                    onClick={(e) => { handleRemoveItem(e, index) }}
                  >
                    <ClearIcon />
                  </IconButton>
                </Grid>
              </Grid>
              <Box mt={1}>
                <Grid container justify="space-around">
                  <Grid item sm={7}>
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
                  </Grid>
                  <Grid item sm={4}>
                    <label htmlFor={"file-edit-" + index}>
                      <IconButton color="primary" className={classes.upload} component="span">
                        <AddPhotoAlternateIcon fontSize="large" />
                      </IconButton>
                    </label>
                  </Grid>
                </Grid>
                {/* <Grid item sm={5}>
                  <IconButton onClick={handleAddButton}>
                    <AddCircleIcon className={classes.addButton} />
                  </IconButton>
                </Grid> */}
              </Box>
            </Grid>
            <Grid item sm={6}>
              <img src={file[index] != null ? file[index] : (item.hinhanh != null ? '/images/' + item.hinhanh : null)} style={{ height: 'auto', width: 'auto', maxWidth: '100%' }} />
            </Grid>
          </Grid>
          <Divider />
        </React.Fragment>
      }
      )}
    </Box>
  );
}


export default EditDialog;