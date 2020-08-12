import React, { useState, useEffect, useImperativeHandle, forwardRef } from 'react';
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
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import viLocale from "date-fns/locale/vi";
import { createMuiTheme } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import EditDialog from './EditDialog.js';
import DeleteDialog from './DeleteDialog.js';
import CustomizedSnackbars from './Snackbars.js';

const defaultMaterialTheme = createMuiTheme({
  spacing: 2,
});

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1)
  }
}));


function UtilComponents({ getDoituong, changeEditedDoituong, removeDoituong }, ref) {
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [chosingDoituong, setChosingDoituong] = useState(null);
    const [isSuccessSnackBarOpen, setIsSuccessSnackBarOpen] = useState(false);
    const [successSnackBarContent, setSuccessSnackBarContent] = useState('');
    const [hovaten, setHovaten] = useState('');
    const [id, setId] = useState('');

    function hideEditDialog() {
        setIsEditDialogOpen(false);
    }

    function showEditDialog(id) {
        setIsEditDialogOpen(true);
        setChosingDoituong(getDoituong(id));
    }

    function hideDeleteDialog() {
        setIsDeleteDialogOpen(false);
    }

    function showDeleteDialog(id, hovaten) {
        setIsDeleteDialogOpen(true);
        setHovaten(hovaten);
        setId(id);
    }

    function showSuccessSnackBar(message) {
        setSuccessSnackBarContent(message);
        setIsSuccessSnackBarOpen(true);
    }

    function hideSuccessSnackBar() {
        setIsSuccessSnackBarOpen(false);
    }

    useImperativeHandle(ref, () => ({
        showEditDialog,
        showSuccessSnackBar,
        showDeleteDialog
    }));
    return(
        <div>
        <EditDialog isOpen={isEditDialogOpen} hideEditDialog={hideEditDialog} chosingDoituong={chosingDoituong} showSuccessSnackBar={showSuccessSnackBar} changeEditedDoituong={changeEditedDoituong}/>
        <DeleteDialog isOpen={isDeleteDialogOpen} hideDeleteDialog={hideDeleteDialog} showSuccessSnackBar={showSuccessSnackBar} hovaten={hovaten} id={id} removeDoituong={removeDoituong}/>
        <CustomizedSnackbars isOpen={isSuccessSnackBarOpen} hideSuccessSnackBar={hideSuccessSnackBar} successSnackBarContent={successSnackBarContent}/>
        </div>
    )
}

const UtilComponentsWithRef = forwardRef(UtilComponents);
export default UtilComponentsWithRef;