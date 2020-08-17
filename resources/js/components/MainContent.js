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
import Container from '@material-ui/core/Container';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import SimpleTableWithRef from './DoiTuongTable.js';
import SearchInput from './SearchInput.js';
import SimpleBackDrop from './SimpleBackDrop.js';
import CreateButton from './CreateButton.js';
import CustomizedSnackbars from './SnackBars.js';
import UtilComponentsWithRef from './UtilComponent.js';




class MainContent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            doituongs: [],
            isLoaded: false,
            error: null,
            searchKey: '',
            isCreateDialogOpen: false,
            isEditDialogOpen: false,
            isSuccessSnackBarOpen: false,
            successSnackBarContent : '',
            chosingDoiTuongId : 0
        }
        this.UtilRef = React.createRef();
        this.TableRef = React.createRef();
        this.handleTimKiemInputChange = this.handleTimKiemInputChange.bind(this);
        this.showEditDialog = this.showEditDialog.bind(this);
        this.showSuccessSnackBar = this.showSuccessSnackBar.bind(this);
        this.getAllDoituongs = this.getAllDoituongs.bind(this);
        this.getDoituong = this.getDoituong.bind(this);
        this.prependDoituong = this.prependDoituong.bind(this);
        this.changeEditedDoituong = this.changeEditedDoituong.bind(this);
        this.showDeleteDialog = this.showDeleteDialog.bind(this);
        this.removeDoituong = this.removeDoituong.bind(this);
        this.setToFirstPage = this.setToFirstPage.bind(this);
        this.showDetailsDialog = this.showDetailsDialog.bind(this);
        this.showLoader = this.showLoader.bind(this);
        this.hideLoader = this.hideLoader.bind(this);
        this.prepenDoituongs = this.prepenDoituongs.bind(this);
      }

      componentDidMount() {
        this.getAllDoituongs();
      }

      getAllDoituongs() {
        const { history } = this.props;
        fetch("/api/doituong", {
          headers: {
            'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
            'Authorization' : 'Bearer ' + localStorage.getItem("token")
          }
        })
          .then(res => {
            if(!res.ok) return Promise.reject(res);
           return res.json();
          })
          .then(
            (result) => {
              this.setState({
                doituongs : result.doituong,
                isLoaded: true
              });
              console.log(result.doituong);
            },
            // Note: it's important to handle errors here
            // instead of a catch() block so that we don't swallow
            // exceptions from actual bugs in components.
            (error) => {
              this.setState({
                isLoaded: true
              });
            if(error.status == 401) {
              localStorage.removeItem("token");
              history.push('/dangnhap');
            }
            }
          )
      }
      
      handleTimKiemInputChange(value) {
            this.setState({
              searchKey: value
            })
            this.setToFirstPage();
        }


      showEditDialog(e, id) {
        e.preventDefault();
        this.UtilRef.current.showEditDialog(id);
      }
      
      showDeleteDialog(e, id, hovaten) {
        e.preventDefault();
        this.UtilRef.current.showDeleteDialog(id, hovaten);
      }

      showDetailsDialog(e, id) {
        e.preventDefault();
        this.UtilRef.current.showDetailsDialog(id);
      }

      showSuccessSnackBar(message) {
        this.UtilRef.current.showSuccessSnackBar(message);
      }

      getDoituong(id) {
        return this.state.doituongs.find(i => i.id == id);
      }

      prependDoituong(doituong) {
        let { doituongs } = this.state;
        this.setState({
          doituongs : [doituong, ...doituongs]
        })
      }
      
      changeEditedDoituong(updatedDoituong){
        let { doituongs } = this.state;
        let doituongToBeUpdated = doituongs.find(i => i.id == updatedDoituong.id);
        Object.keys(doituongToBeUpdated).forEach(i => {
          doituongToBeUpdated[i] = Array.isArray(updatedDoituong[i]) ? [...updatedDoituong[i]] : updatedDoituong[i];
        })
        this.setState({
          doituongs : [...doituongs]
        })
      }
      
      removeDoituong(id) {
        let { doituongs } = this.state;
        doituongs = doituongs.filter(i => i.id !== id);
        this.setState({
          doituongs : [...doituongs]
        })
      }

      setToFirstPage() {
        this.TableRef.current.setToFirstPage();
      }

      showLoader() {
        this.setState({
          isLoaded: true
        })
      }

      hideLoader() {
        this.setState({
          isLoaded: false
        })
      }

      prepenDoituongs(doituongsArr) {
        let { doituongs } = this.state;
        this.setState({
          doituongs: [...doituongsArr.reverse(), ...doituongs]
        })
      }

    render() {
    let { doituongs, searchKey, isLoaded } = this.state;
    doituongs = doituongs.filter(d => d.hovaten.toLowerCase().includes(searchKey.toLowerCase()) || (!!d.tenthuonggoi && d.tenthuonggoi.toLowerCase().includes(searchKey.toLowerCase())));
      return (
        <Box mt={1}>
        <Container maxWidth="lg" component={Paper}>
            <SimpleBackDrop isLoaded={isLoaded}/>
            <UtilComponentsWithRef ref={this.UtilRef} getDoituong={this.getDoituong} changeEditedDoituong={this.changeEditedDoituong} removeDoituong={this.removeDoituong}/>
            <CustomizedSnackbars />
            {/* <CreateDialog isOpen={isCreateDialogOpen} hideCreateModal={this.hideCreateModal} showSuccessSnackBar={this.showSuccessSnackBar} getAllDoituongs={this.getAllDoituongs}/>  */}
            <Grid container justify="space-between">
              <Grid item sm={3}> 
              <SearchInput handleTimKiemInputChange={this.handleTimKiemInputChange}/>
              </Grid>
              <Grid container sm={3} justify="flex-end">
                <CreateButton showCreateModal={this.showCreateModal} showSuccessSnackBar={this.showSuccessSnackBar} prependDoituong={this.prependDoituong} showSuccessSnackBar={this.showSuccessSnackBar} prepenDoituongs={this.prepenDoituongs}/> 
              </Grid>
            </Grid>
            {<SimpleTableWithRef ref={this.TableRef} doituongs={doituongs} showEditDialog={this.showEditDialog} showDeleteDialog={this.showDeleteDialog} showDetailsDialog={this.showDetailsDialog} />}
        </Container>
        </Box>
      );
    }
  }

export default MainContent;