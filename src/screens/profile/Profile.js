import React, { Component } from 'react';
import Header from '../../common/header/Header';
import './Profile.css';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Avatar from '@material-ui/core/Avatar';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';

import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
import FavoriteIcon from '@material-ui/icons/Favorite';

import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import { green } from '@material-ui/core/colors';
import { red } from '@material-ui/core/colors';

import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import Modal from 'react-modal';
import FormHelperText from '@material-ui/core/FormHelperText';

class Profile extends Component {

    constructor() {
        super();
        this.state = {
            postDetails: [],
            postDetailsSnapshot: [],
            commentTextField: [],
            comments: [],
            profileDetails: {},
            profileStats: {},
            modalIsOpen: false,
            fullnameRequired: "dispNone",
            fullNameField: ""
        }
    }

    componentWillMount() {
        let data = null;
        let xhr = new XMLHttpRequest();
        let that = this;
        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                const commentInit = [];
                const commentTextFieldInit = [];
                JSON.parse(this.responseText).data.forEach(element => {
                    commentInit.push([]);
                    commentTextFieldInit.push("");
                });
                that.setState({ comments: commentInit });
                that.setState({ commentTextField: commentTextFieldInit });
                that.setState({
                    postDetailsSnapshot: JSON.parse(this.responseText).data
                });
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




        let dataProfile = null;
        let xhrReleased = new XMLHttpRequest();
        xhrReleased.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                that.setState({
                    profileDetails: JSON.parse(this.responseText).data
                });
                that.setState({
                    profileStats: JSON.parse(this.responseText).data.counts

                });
                console.log(that.state.profileDetails);
                console.log(that.state.profileStats);
            }

        });

        xhrReleased.open("GET", "https://api.instagram.com/v1/users/self/?access_token=8661035776.d0fcd39.39f63ab2f88d4f9c92b0862729ee2784");
        // xhrReleased.setRequestHeader("Cache-Control", "no-cache");
        xhrReleased.send(dataProfile);

    }
    closeModalHandler = () => {
        this.setState({ modalIsOpen: false });
    }
    openModelHandler = () => {
        this.setState({ modalIsOpen: true });
    }
    inputNameChangeHandler = (e) => {
        //const profDetails = this.state.profileDetails
        this.setState({ fullNameField: e.target.value });
    }
    onUpdateButtonClickHandler = (e) => {
        this.state.fullNameField === "" ? this.setState({ fullnameRequired: "dispBlock" }) : this.setState({ fullnameRequired: "dispNone" });
        if(this.state.fullNameField === "") return;
        const profDetails = this.state.profileDetails;
        profDetails.full_name=this.state.fullNameField;
        this.setState({ profileDetails: profDetails });
        this.setState({ modalIsOpen: false });
    }
    render() {
        return (
            <div>
                <Header />
                <div className="profile_info">
                    Profile page
                    <Avatar aria-label="recipe" src={this.state.profileDetails.profile_picture}>
                    </Avatar>
                    <div>
                        {this.state.profileDetails.username}
                    </div>
                    <div>
                        <span> {this.state.profileStats.media}</span>
                        <span> {this.state.profileStats.follows}</span>
                        <span> {this.state.profileStats.followed_by}</span>
                    </div>
                    <div>
                        {this.state.profileDetails.full_name}
                    </div>
                    <div className="edit_button">
                        <Fab color="secondary" aria-label="edit" onClick={this.openModelHandler}>
                            <EditIcon  />
                        </Fab>
                        <Modal
                            ariaHideApp={false}
                            isOpen={this.state.modalIsOpen}
                            contentLabel="Login"
                            onRequestClose={this.closeModalHandler}

                        >
                            <FormControl required>
                                <InputLabel htmlFor="fullname">Full Name</InputLabel>
                                <Input id="fullname" type="text" fullname= {this.state.fullNameField} onChange={this.inputNameChangeHandler} />
                                <FormHelperText className={this.state.fullnameRequired}>
                                    <span className="red">required</span>
                                </FormHelperText>
                            </FormControl>
                            <Button className="login-button" variant="contained" color="primary" onClick={this.onUpdateButtonClickHandler}>Update</Button>
                        </Modal>
                    </div>
                </div>

            </div>
        )
    }
}

export default Profile;