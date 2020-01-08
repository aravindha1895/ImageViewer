import React, { Component } from 'react';
import Header from '../../common/header/Header';
import './Home.css';
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


const styles = theme => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper
    },
    upcomingMoviesHeading: {
        textAlign: 'center',
        background: '#ff9999',
        padding: '8px',
        fontSize: '1rem'
    },
    gridListUpcomingMovies: {
        flexWrap: 'nowrap',
        transform: 'translateZ(0)',
        width: '100%'
    },
    gridListMain: {
        transform: 'translateZ(0)',
        cursor: 'pointer'
    },
    formControl: {
        margin: theme.spacing.unit,
        minWidth: 240,
        maxWidth: 240
    },
    title: {
        color: theme.palette.primary.light,
    }
});
const stylings ={
    tagStyle: {
        display: 'inline',
        paddingRight: '2px',
        fontSize: '15px',
        color: 'blue'
    },
    headingStyle:{
        fontSize: '20px',
    }
}
const cardStyle = {
    // margin: 'auto',
    width: '100%',
    height: '100%',
    padding: 50,
}

const mediaStyle = {
    height: 0,
    paddingTop: '56.25%', // 16:9
}
class Home extends Component {

    currentIndex =0;
    constructor() {
        super();
        this.state = {
            postDetails: [],
            postDetailsSnapshot: [],
            commentTextField: [],
            comments: [],
            profileDetails: {}
        }
    }

    componentWillMount() {
        let data = null;
        let xhr = new XMLHttpRequest();
        let that = this;
        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                const commentInit= [];
                const commentTextFieldInit = [];
                JSON.parse(this.responseText).data.forEach(element => {
                    commentInit.push([]);
                    commentTextFieldInit.push("");
                });
                that.setState({comments: commentInit});
                that.setState({commentTextField: commentTextFieldInit});
                that.setState({
                    postDetailsSnapshot: JSON.parse(this.responseText).data
                });
                that.setState({
                    postDetails: JSON.parse(this.responseText).data
                });
                console.log(that.state.postDetailsSnapshot);
                console.log(that.state.coments);
                console.log(that.state.commentTextField);
            }
        });

        xhr.open("GET", "https://api.instagram.com/v1/users/self/media/recent?access_token=8661035776.d0fcd39.39f63ab2f88d4f9c92b0862729ee2784");
        // xhr.setRequestHeader("Cache-Control", "no-cache");
        //    xhr.setRequestHeader("cor");
        xhr.send(data);


        // Profile detail
        
        let dataProfile = null;
        let xhrReleased = new XMLHttpRequest();
        xhrReleased.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                that.setState({
                    profileDetails: JSON.parse(this.responseText).data
                });
            }

        });

        xhrReleased.open("GET", "https://api.instagram.com/v1/users/self/?access_token=8661035776.d0fcd39.39f63ab2f88d4f9c92b0862729ee2784");
        // xhrReleased.setRequestHeader("Cache-Control", "no-cache");
        xhrReleased.send(dataProfile);


    }
    likeIconClicked = (index) =>{
        let postDetails=this.state.postDetails;
        if(postDetails[index].likes.count===this.state.postDetailsSnapshot[index].likes.count)
             postDetails[index].likes.count++;
        else 
             postDetails[index].likes.count--;
        this.setState({postDetails: postDetails});
    }
    onCommentValueChanged = (e,index) => {
        const commentSnapshot = this.state.commentTextField;
        commentSnapshot[index]=e.target.value;
        this.setState({commentTextField: commentSnapshot});
        
        console.log(this.state.commentTextField);
    }
    onAddCommentClicked =(index) => {
        let comentInfoState= this.state.comments;
        console.log(index);
        comentInfoState[index].push({
            'author': this.state.postDetails[index].user.username,
            'comment': this.state.commentTextField[index]
        });
        this.setState({comments: comentInfoState});
        console.log(this.state.comments);
    }
    onSearchTextChangedHandler = (e) => {
        console.log(e.target.value);
        console.log(this.state.postDetailsSnapshot[0].caption.text.indexOf("join"));
        let cardsToDisplay = this.state.postDetailsSnapshot.filter((post)=>{
           return post.caption.text.toUpperCase().indexOf(""+e.target.value.toUpperCase())!=-1
        });
        this.setState({postDetails: cardsToDisplay});
    }
    render() {
        const { classes } = this.props;
       // let index=0;
        return (
            <div>
                <Header history={this.props.history} onSearchTextChanged={this.onSearchTextChangedHandler} profileUrl={this.state.profileDetails.profile_picture} parentPage="home" />
                <GridList cols={2} cellHeight={750} cols={2} className={classes.gridListMain}>
                    {this.state.postDetails.map((post, index) => (
                        <GridListTile key={"title" + post.id} style={{height:'100%'}}>
                            <CardHeader
                                avatar={
                                    <Avatar aria-label="recipe" src={post.user.profile_picture}>
                                    </Avatar>
                                }
                                title={post.user.username}
                                subheader={post.created_time}
                            >
                            </CardHeader>
                            <Card style={{ cardStyle }} variant="outlined">
                                <CardContent>
                                    <img src={post.images.standard_resolution.url} alt={post.caption.text} className="postImage" />

                                    <Divider />
                                    <Typography variant="h5" style={stylings.headingStyle} >
                                    {post.caption.text}
                                    </Typography>       
                                   
                                    <div>
                                        {post.tags.map(tag => (
                                            <span key={"tags" + tag}>
                                            <Typography display="inline" variant="caption" style={stylings.tagStyle} >#{tag}</Typography>
                                            </span>
                                        ))}
                                    </div>
                                    <br/>
                                    <div>
                                        <span> 
                                        {this.state.postDetailsSnapshot[index].likes.count==post.likes.count?
                                        <FavoriteBorderOutlinedIcon onClick={()=>this.likeIconClicked(index)}  />
                                        :
                                        <FavoriteIcon onClick={()=>this.likeIconClicked(index)}  style={{ color: red[500] }}/>}
                                        </span>
                                        <span>{post.likes.count} Likes</span>
                                    </div>
                                    <br/>
                                    {this.state.comments[index].length!==0 &&
                                    this.state.comments[index].map((ele,i)=>(
                                    <div className="postedComments" key={index+"postedComment"+i}>
                                        <span className="commentAuthor">{ele.author}:</span>
                                        <span className="actualComment">{ele.comment}</span>
                                    </div>
                                    ))}
                                    <br/>
                                    <div>
                                        <FormControl style={{ width: "100%", display:"flex", flexDirection: "row"}}>
                                            <InputLabel htmlFor={"commentTextField"+index}>Add a comment</InputLabel>
                                            <Input type="text" id={"commentTextField"+index} style={{ width: "80%"}}  onChange={(e)=>this.onCommentValueChanged(e,index)} />
                                            <Button  style={{ width: "10%", marginLeft:"15px"}} className="login-button" variant="contained" color="primary" onClick={()=>this.onAddCommentClicked(index)}>Add</Button>
                                        </FormControl>
                                       
                                    </div>
                                </CardContent>
                            </Card>
                        </GridListTile>
                       
                    ))}

                </GridList>
            </div>
        )
    }
}

export default withStyles(styles)(Home);