import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import KeyboardVoiceIcon from '@material-ui/icons/KeyboardVoice';
import Icon from '@material-ui/core/Icon';
import SaveIcon from '@material-ui/icons/Save';
import AddIcon from '@material-ui/icons/Add';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import CreateDialog from './CreateDialog.js';
const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
    backgroundColor: 'green',
    color: 'white',
    borderColor: 'green',
    '&:hover': {
      backgroundColor: '#004d00',
    },
  },
}));

function CreateButton({ showCreateModal, showSuccessSnackBar, prependDoituong }) {
    const classes = useStyles();
    const [isOpen, setIsOpen] = useState(false);

    function showCreateDialog(e) {
        e.preventDefault();
        setIsOpen(true);
    }

    function hideCreateDialog() {
      setIsOpen(false);
    }
    return (
      <div>
        <Button
          variant="outlined"
          className={classes.button}
          startIcon={<AddCircleIcon />}
          onClick={showCreateDialog}
        >
          Tạo Mới
        </Button>
        <CreateDialog isOpen={isOpen} hideCreateDialog={hideCreateDialog} showSuccessSnackBar={showSuccessSnackBar} prependDoituong={prependDoituong}/> 
      </div>
    );
  }

export default CreateButton;