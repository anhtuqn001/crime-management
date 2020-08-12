import React , { useState } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Tooltip from '@material-ui/core/Tooltip';
import BlockIcon from '@material-ui/icons/Block';
import LinearProgress from '@material-ui/core/LinearProgress';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Button from '@material-ui/core/Button';

const MAX_LENGTH = 10;

const useStyles = makeStyles({
    imageStyle: {
        width: '100%'
    },
    progressStyle: {
        width: '100%'
    },
    noDisplay : {
        display: 'none'
    },
    blockDisplay : {
        display: 'block'
    }
});

const LightTooltip = withStyles((theme) => ({
    tooltip: {
        // backgroundColor: theme.palette.common.white,
        backgroundColor: '#eaeae1',
        color: 'rgba(0, 0, 0, 0.87)',
        boxShadow: theme.shadows[1],
        fontSize: 13,
        maxWidth: 300,
        fontWeight: 'normal',
        whiteSpace: 'pre-wrap'
    },
}))(Tooltip);

const BootstrapButton = withStyles({
    root: {
      boxShadow: 'none',
      textTransform: 'none',
      fontSize: '0.875rem',
      padding: 0,
      lineHeight: 1.5,
      fontFamily: [
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
      ].join(','),
      fontWeight: 'normal',
      justifyContent: 'flex-start'
    },
  })(Button);

function GcnthanItem({gcnthan}) {
    // const classes = useStyles();
    const [open, setOpen] = useState(false);

    function handleOpen() {
        setOpen(true);
    }

    function handleClose() {
        setOpen(false);
    }

    return(
        <ClickAwayListener onClickAway={handleClose}>
        <LightTooltip 
        open={open}
        onClose={handleClose}
        title={gcnthan}
        placement="bottom"
        disableFocusListener
        disableHoverListener
        disableTouchListener
        PopperProps={{
            disablePortal: true,
        }}
        arrow
        >
             <BootstrapButton onClick={handleOpen}>{gcnthan != null ? (gcnthan.length > MAX_LENGTH ? gcnthan.substring(0, MAX_LENGTH) + "..." : gcnthan) : ""}</BootstrapButton>
        </LightTooltip>
        </ClickAwayListener>
    )
}

export default GcnthanItem;



