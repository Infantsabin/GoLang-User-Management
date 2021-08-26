import React, { Component } from "react";
import axios from 'axios'
import  { Redirect } from 'react-router-dom'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {username: '', password: '', email: '', redirect: false};
    
        this.handleChangeUsername = this.handleChangeUsername.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
        this.handleChangeEmail = this.handleChangeEmail.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }
    
      handleChangeUsername(event) {
        this.setState({username: event.target.value});
      }

      handleChangePassword(event) {
        this.setState({password: event.target.value});
      }

      handleChangeEmail(event) {
        this.setState({email: event.target.value});
      }
    
      handleSubmit(event) {
        // const userDetail = {username: this.state.username, password: this.state.password, email: this.state.email }

        const form = new FormData();
        form.append("username", this.state.username);
        form.append("password", this.state.password);
        form.append("email", this.state.email);

        axios.post('http://localhost:8080/api/auth/register', form)
        .then(response => {
            toast.success(response.data.message, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });
            this.setState({username: '', password: '', email: '', redirect: true});
        })
        .catch(error => {
            toast.error("Oops...! Something wrong...", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });
            console.error('There was an error!', error);
        });
        event.preventDefault();
      }

    render() {
        if (this.state.redirect)
            return <Redirect to='/sign-in'  />
        else 
        return (
            <>
            <ToastContainer />
            <form onSubmit={this.handleSubmit}>
                <h3>Sign Up</h3>

                <div className="form-group">
                    <label>User Name</label>
                    <input type="text" className="form-control" required value={this.state.username} onChange={this.handleChangeUsername} placeholder="User name" />
                </div>

                <div className="form-group">
                    <label>Email address</label>
                    <input type="email" className="form-control" required value={this.state.email} onChange={this.handleChangeEmail} placeholder="Enter email" />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" required value={this.state.password} onChange={this.handleChangePassword} placeholder="Enter password" />
                </div>

                <button type="submit" className="btn btn-primary btn-block">Sign Up</button>
                <p className="forgot-password text-right">
                    Already registered <a href="/sign-in">sign in?</a>
                </p>
            </form>
            </>
        );
    }
}