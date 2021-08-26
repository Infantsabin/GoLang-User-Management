import React, { Component } from "react";
import axios from 'axios'
// import  { Redirect } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {username: '',password: '', redirect: false};
    
        this.handleChangeUsername = this.handleChangeUsername.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }
    
      handleChangeUsername(event) {
        this.setState({username: event.target.value});
      }

      handleChangePassword(event) {
        this.setState({password: event.target.value});
      }
    
      handleSubmit(event) {
        event.preventDefault();
        // alert('A name was submitted: ' + this.state.username + ' ' + this.state.password);

        // const userDetail = {username: this.state.username, password: this.state.password}
        const form = new FormData();
        form.append("username", this.state.username);
        form.append("password", this.state.password);

        axios.post('http://localhost:8080/api/auth/login', form)
        .then(response => {
            // alert(response)
            this.setState({username: '', password: '', redirect: true});
            localStorage.setItem('user', 'something');
            // this.props.history.push('/dashboard')
            window.location='/dashboard'
        })
        .catch(error => {
            toast.error("Oops...! Wrong Crendential...", {
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
      }

    render() {
        // if (this.state.redirect)
        //     return <Redirect to='/dashboard'  />
        // else 
        return (
            <>
             <ToastContainer />
            <form onSubmit={this.handleSubmit}>
                <h3>Sign In</h3>

                <div className="form-group">
                    <label>Username/Email </label>
                    <input type="text" className="form-control" required value={this.state.username} onChange={this.handleChangeUsername} placeholder="Enter Username/Email" />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" required value={this.state.password} onChange={this.handleChangePassword} placeholder="Enter password" />
                </div>

                <div className="form-group">
                    <div className="custom-control custom-checkbox">
                        <input type="checkbox" className="custom-control-input" id="customCheck1" />
                        <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                    </div>
                </div>

                <button type="submit" className="btn btn-primary btn-block">Submit</button>
                {/* <p className="forgot-password text-right">
                    Forgot <a href="/">password?</a>
                </p> */}
            </form>
            </>
        );
    }
}