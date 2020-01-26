import React, { Component } from 'react';
import Header from '../../common/header/Header';
import './Login.css';

// import Modal from 'react-modal';
import Card from '@material-ui/core/Card';
// import { makeStyles } from '@material-ui/core/styles';
import CardContent from '@material-ui/core/CardContent';

import Typography from '@material-ui/core/Typography';

import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import FormHelperText from '@material-ui/core/FormHelperText';
import Button from '@material-ui/core/Button';


/*const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    }
};*/
const useStyles = {
    card: {
        margin: 'auto',
        width: '25%',
        padding: 50,
        
    }
  };
class Login extends Component {

    constructor() {
        super();
        this.state = {
            loginFormInvalid: "dispNone",
            usernameRequired: "dispNone",
            username: "",
            loginPasswordRequired: "dispNone",
            loginPassword: ""
        }
    }

    loginClickHandler = () => {
        const userName = 'user';
        const pwd = 'password';
        const accessToken = '8661035776.d0fcd39.39f63ab2f88d4f9c92b0862729ee2784';
        this.state.username === "" ? this.setState({ usernameRequired: "dispBlock" }) : this.setState({ usernameRequired: "dispNone" });
        this.state.loginPassword === "" ? this.setState({ loginPasswordRequired: "dispBlock" }) : this.setState({ loginPasswordRequired: "dispNone" });
        if( this.state.username === "" ||  this.state.loginPassword === ""){
            this.setState({ loginFormInvalid: "dispNone" });
            return;
        };
        if(this.state.username !== userName || this.state.loginPassword !== pwd) {
            this.setState({ loginFormInvalid: "dispBlock" });
            return;
        } else {
            this.setState({ loginFormInvalid: "dispNone" });
            sessionStorage.setItem('access-token',accessToken);
            this.props.history.push('/home');
        }
    }

    inputUsernameChangeHandler = (e) => {
        this.setState({ username: e.target.value });
    }

    inputLoginPasswordChangeHandler = (e) => {
        this.setState({ loginPassword: e.target.value });
    }

    render() {
       // const classes = useStyles;
        return (
            <div>
                <Header parent="login" history={this.props.history} />
                <div>&nbsp;</div>
                 <Card style={useStyles.card} variant="outlined">
                 <CardContent >
                <Typography variant="headline" component="h6" >
                  LOGIN
                </Typography>
                    <FormControl required style={{width: "100%"}}>
                        <InputLabel htmlFor="username">Username</InputLabel>
                        <Input id="username" type="text" username={this.state.username} onChange={this.inputUsernameChangeHandler} />
                        <FormHelperText className={this.state.usernameRequired}>
                            <span className="red">required</span>
                        </FormHelperText>
                    </FormControl>
                    <br /><br />
                    <FormControl required style={{width: "100%"}}>
                        <InputLabel htmlFor="loginPassword">Password</InputLabel>
                        <Input id="loginPassword" type="password" loginpassword={this.state.loginPassword} onChange={this.inputLoginPasswordChangeHandler} />
                        <FormHelperText className={this.state.loginPasswordRequired}>
                            <span className="red">required</span>
                        </FormHelperText>
                    </FormControl>
                    <br />
                    <FormHelperText className={this.state.loginFormInvalid}>
                    <span className="red">  Incorrect username and/or password</span>
                        </FormHelperText>
                    <br />
                    <Button className="login-button" variant="contained" color="primary" onClick={this.loginClickHandler}>LOGIN</Button>
                    </CardContent>
                </Card>
            </div>
        )
    }
}

export default Login;