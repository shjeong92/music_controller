import React, { Component } from 'react';
import { TextField, Button, Grid, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}
const csrftoken = getCookie('csrftoken');

export default class RoomJoinPage extends Component {
    constructor(props){
        super(props);
        this.state = {
            roomCode : "",
            error: "",
        }
        this._handleTextFieldChange = this._handleTextFieldChange.bind(this);
        this._roomButtonPressed = this._roomButtonPressed.bind(this)
    }
    render() {
        return (
            <Grid container spacing={1}>
                <Grid item xs={12} align="center">
                    <Typography variant="h4" component="h4">Join a Room</Typography>
                </Grid>
                <Grid item xs={12} align="center">
                    <TextField 
                        error={this.state.error}
                        label="code"
                        placeholder="Enter a Room Code"
                        value={this.state.roomCode}
                        helperText={this.state.error}
                        variant = "outlined"
                        onChange={this._handleTextFieldChange}
                    />
                </Grid>
                <Grid item xs={12} align="center">
                <Button variant="contained" color="primary" component={Link} onClick={this._roomButtonPressed}>Enter a Room</Button>
                </Grid>
                <Grid item xs={12} align="center">
                    <Button variant="contained" color="secondary" to="/" component={Link}>Back</Button>
                </Grid>
            </Grid>
        );
    }
    _handleTextFieldChange(e) {
        this.setState({
            roomCode: e.target.value
        })
    }
    _roomButtonPressed(){
        const requestOptions = {
            method : "POST",
            headers: { "Content-Type": "application/json" , "X-CSRFToken": csrftoken},
            body: JSON.stringify({
                code: this.state.roomCode
            })
        };
        fetch('/api/join-room', requestOptions)
        .then((response) => {
            if(response.ok) {
                this.props.history.push(`/room/${this.state.roomCode}`)
            } else {
                this.setState({error: "Room not found."})
            }
        }).catch((error) => console.log(error));
    }
    
}