import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import AccountCircle from '@material-ui/icons/AccountCircle';
import SearchIcon from '@material-ui/icons/Search';
import { debounce } from '../Utilities/utils'

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
}));

function SearchInput({handleTimKiemInputChange}) {
    const classes = useStyles();
    const handleChange = (value) => {
        console.log(value);
      };
    const debouncedHandleTimKiemInputChange = debounce(handleTimKiemInputChange, 300);
    return (
      <div>
        {/* <FormControl className={classes.margin}>
          <InputLabel htmlFor="input-with-icon-adornment">With a start adornment</InputLabel>
          <Input
            id="input-with-icon-adornment"
            startAdornment={
              <InputAdornment position="start">
                <AccountCircle />
              </InputAdornment>
            }
          />
        </FormControl> */}
        <TextField
          className={classes.margin}
          id="input-with-icon-textfield"
          type="search"
          label="Tìm kiếm"
          variant="outlined"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          size="small"
          onChange={(e) => {
           let val = e.target.value;
           debouncedHandleTimKiemInputChange(val);
          }}
        />
        {/* <div className={classes.margin}>
          <Grid container spacing={1} alignItems="flex-end">
            <Grid item>
              <AccountCircle />
            </Grid>
            <Grid item>
              <TextField id="input-with-icon-grid" label="With a grid" />
            </Grid>
          </Grid>
        </div> */}
      </div>
    );
  }


export default SearchInput;
