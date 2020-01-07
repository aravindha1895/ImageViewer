import React, { Component } from 'react';
import './Header.css';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import FilledInput from '@material-ui/core/FilledInput';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import Visibility from '@material-ui/icons/Visibility';
import { Input } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import Avatar from '@material-ui/core/Avatar';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

// class Header extends Component {

  
   /* constructor() {
        super();
    }
*/

const Header = function (props){
    const [anchorEl, setAnchorEl] = React.useState(null);
  
    const handleClick = event => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
    };
   // render() {   
        return (
            <div>
                <header className="app-header" >
                    <p id="appName"> Image Viewer </p>
                    {(props.parentPage =="home" || props.parentPage =="profile")?
                        <span className="home-group" >
                            { props.parentPage =="home" &&
                            <FilledInput id="outlined-basic" placeholder="Search..." variant="outlined"
                                onChange={(e) => props.onSearchTextChanged(e)}
                                startAdornment={(
                                    <InputAdornment variant="standard" position="start" id="searchBoxIcon" >
                                        <SearchOutlinedIcon />

                                    </InputAdornment>
                                )}

                            />
                                }
                            <Avatar aria-label="recipe" src={props.profileUrl} style={{ float: "right", marginLeft: "10px", cursor: "pointer" }} onClick={handleClick} >
                                
                                </Avatar>
                            <Menu
                                id="simple-menu"
                                anchorEl={anchorEl}
                                keepMounted
                                open={Boolean(anchorEl)}
                                
                            >
                                <MenuItem onClick={handleClose}>My account</MenuItem>
                                <MenuItem onClick={handleClose}>Logout</MenuItem>
                            </Menu>
                        </span>
                        : ""}
                </header>
            </div>
        )
   // }
}

export default Header;