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

class Header extends Component {

    constructor() {
        super();
    }



    render() {
        return (
            <div>
                <header className="app-header" >
                    <p id="appName"> Image Viewer </p>
                    {"true" === "true" ?
                        <span className="home-group" >
                           
                                <FilledInput id="outlined-basic"  placeholder="Search..." variant="outlined"
                                   onChange={(e)=>this.props.onSearchTextChanged(e)}
                                        startAdornment = {(
                                            <InputAdornment variant="standard" position="start" id="searchBoxIcon" >
                                                <SearchOutlinedIcon />
                                                
                                        </InputAdornment>
                                        )}
                                    
                                />
                            
                        </span>
                        : ""}
                </header>
            </div>
        )
    }
}

export default Header;