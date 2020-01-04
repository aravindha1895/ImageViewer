import React, { Component } from 'react';
import Header from '../../common/header/Header';
import './Home.css';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';

class Home extends Component {

constructor(){
    super();
    this.state = {
        postDetails: []
    }
}

    componentWillMount() {
        let data = null;
        let xhr = new XMLHttpRequest();
        let that = this;
        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                that.setState({
                    postDetails: JSON.parse(this.responseText).data
                });
                console.log(that.state.postDetails);
            }
        });

        xhr.open("GET", "https://api.instagram.com/v1/users/self/media/recent?access_token=8661035776.d0fcd39.39f63ab2f88d4f9c92b0862729ee2784");
       // xhr.setRequestHeader("Cache-Control", "no-cache");
    //    xhr.setRequestHeader("cor");
        xhr.send(data);

    }

    render() {
        return (
           <div><Header/>Home</div>
        )
    }
}

export default Home;