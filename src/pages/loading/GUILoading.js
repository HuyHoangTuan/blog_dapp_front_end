import React, { Component } from 'react';
import "./css/GUILoading.css";
import Post from '../../Component/Post/Post';
import SingelPost from "../../Component/SingerPort/SingerPost"


class GUILoading extends Component {
    constructor(props) {
        super(props); 
        this.state = { 
            postArray:[]
         }
    }

    componentDidMount(){
        this.getPost();
    }

    getPost=()=>{
        let data=[
            {
                "postId":"123456",
                "userName":"anubhav",
                "postImageURL":"https://irixlens.com/new/wp-content/uploads/2018/11/IRX_5473.jpg",
                "timeStamp":"12345",
                "likes":"1234"
            },
            {
                "postId":"123456",
                "userName":"anuragini",
                "postImageURL":"https://irixlens.com/new/wp-content/uploads/2018/11/IRX_5473.jpg",
                "timeStamp":"12345",
                "likes":"1234"
            },
            {
                "postId":"123456",
                "userName":"anirudh",
                "postImageURL":"https://irixlens.com/new/wp-content/uploads/2018/11/IRX_5473.jpg",
                "timeStamp":"12345",
                "likes":"1234"
            }
        ];
                this.setState({postArray: data});
    }

    render() { 
        return ( 
   
            <div className="single">
                 <SingelPost />
            </div>
         );
    }
}
 
export default GUILoading;