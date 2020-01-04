import React, { Component } from 'react';
import './Header.css';


class Header extends Component {

    constructor() {
        super();
    }



    render() {
        return (
            <div>
                <header className="app-header" >
                   <p id="appName"> Image Viewer </p>
                </header>
            </div>
        )
    }
}

export default Header;