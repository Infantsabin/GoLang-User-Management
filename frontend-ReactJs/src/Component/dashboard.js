import React, { Component } from 'react'
import axios from 'axios'    
import { Table, ButtonToggle, Modal, ModalHeader, ModalBody } from 'reactstrap'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
require('dotenv').config()

export default class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
          error: null,
          isLoaded: false,
          isOpen: false,
          username: '',
          email: '',
          password: '',
          file: '',
          profile: '',
          id: '',
          items: []
        };
        
        this.handleChangeUsername = this.handleChangeUsername.bind(this);
        this.handleChangeEmail = this.handleChangeEmail.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
        this.handleChangeProfile = this.handleChangeProfile.bind(this);
        this.showModal = this.showModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.editUser = this.editUser.bind(this);
        this.deleteUser = this.deleteUser.bind(this);
        this.downloadReport = this.downloadReport.bind(this);
    }

    // openModal = () => this.setState({ isOpen: true });
    // closeModal = () => this.setState({ isOpen: false });

    componentDidMount() {
        const token = localStorage.getItem('user')
        if (!token) {
            window.location='/sign-in'
        }

        toast.success("Login Successfull...!", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            });
 
        axios.get('http://localhost:8080/api/users', {auth: {
            // username: process.env.BASICAUTH_USERNAME,
            // password: process.env.BASICAUTH_PASSWORD
            username: 'test',
            password: 'test'
          }})
        .then(response => {
            this.setState({
                isLoaded: true,
                items: response.data.data.Value
            });
        })
        .catch(error => {
            this.setState({
                isLoaded: true,
                error
                });
            alert('Unauthorized...! Please Login and try again...')
            window.location='/logout'
        })
    // fetch("http://localhost:8080/api/users")
    //     .then(res => res.json())
    //     .then(
    //     (result) => {
    //         this.setState({
    //         isLoaded: true,
    //         items: result.data.Value
    //         });
    //     },
    //     // Note: it's important to handle errors here
    //     // instead of a catch() block so that we don't swallow
    //     // exceptions from actual bugs in components.
    //     (error) => {
    //         this.setState({
    //         isLoaded: true,
    //         error
    //         });
    //     }
    //     )
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

    handleChangeProfile(event) {
        this.setState({file: event.target.files[0]});
    }
    
    showModal(id) {
        const currentUser = this.state.items.find(({ ID }) => ID === id )
        this.setState({isOpen: true, id: currentUser.ID, username: currentUser.Username, email: currentUser.Email, password: currentUser.Password, profile: currentUser.Profile})
    }

    closeModal() {
        this.setState({isOpen: false})
    }

    editUser(event) {
        event.preventDefault();
        const form = new FormData();
        form.append("file", this.state.file);
        form.append("username", this.state.username);
        form.append("password", this.state.password);
        form.append("email", this.state.email);
        // form.append(userDetail)
        // const userDetail = {username: this.state.username, password: this.state.password, email: this.state.email , file: this.state.file}
       axios.put('http://localhost:8080/api/users/'+ this.state.id, form,{auth: {
        // username: process.env.BASICAUTH_USERNAME,
        // password: process.env.BASICAUTH_PASSWORD
            username: 'test',
            password: 'test'
        }})
        .then(response => {
            // alert(response)
            toast.success("Upadate Successfully...!", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });
            this.setState({username: '', email: '', password: '', id: '', isOpen: false});
            this.componentDidMount()
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

    deleteUser(id) {    
        axios.delete('http://localhost:8080/api/users/'+ id, {auth: {
            // username: process.env.BASICAUTH_USERNAME,
            // password: process.env.BASICAUTH_PASSWORD
            username: 'test',
            password: 'test'
        }})
        .then(response => {
            // alert(response)
            toast("Deleted Successfully...!", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });
        })
        .catch(error => {
            toast.dark("Oops! Wrong User", {
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
        this.componentDidMount()
        // window.location.reload(false);
    }

    downloadReport() {    
        // event.preventDefault();
        axios.post('http://localhost:8080/api/users/reports')
        .then(response => {
            // alert(response)
            toast("Report downloaded Successfully...!", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });

        console.log(response.data.data)   
        window.location.href = "http://localhost:8080/report/" + response.data.data
        })
        .catch(error => {
            toast.dark("Oops! Something Wrong in Download...", {
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
        this.componentDidMount()
        // window.location.reload(false);
    }
    
    render() {
        const { error, isLoaded, items } = this.state;
        const closeBtn = <button className="close" onClick={this.closeModal}>&times;</button>;

        if (error) {
        return <div>No data availble...</div>;
        } else if (!isLoaded) {
        return <div>Loading...</div>;
        } else {
        return (
        <>
            <ToastContainer />

            <Modal isOpen={this.state.isOpen}>
                <ModalHeader close={closeBtn} > User Detail </ModalHeader>
                <ModalBody>
                <form onSubmit={this.editUser}>
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

                    <div className="form-group">
                        <label>Profile</label>
                        {this.state.profile ? <img alt="profile" style={{width: '100px', height: '100px'}} src={`http://localhost:8080/profile/${this.state.profile}`} /> : 'No Profile' }
                        <input type="file" required onChange={this.handleChangeProfile} />
                    </div>

                    <button type="submit" className="btn btn-primary btn-block">Update</button>
                </form>
                </ModalBody>
            </Modal>
            <div>
                <ButtonToggle color="info" style={{float: 'right'}} onClick={() => this.downloadReport(this)}>Download Report</ButtonToggle>{' '}
            </div>
            <br />
            <br />
            <Table bordered>
            <thead>
                <tr>
                <th>#</th>
                <th>User Name</th>
                <th>Email</th>
                <th>Password</th>
                <th>Profile</th>
                <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {items.map((item, k) => (
                    <tr key={item.ID}>
                    <th >{k+1}</th>
                    <td>{item.Username}</td>
                    <td>{item.Email}</td>
                    <td>{item.Password}</td>
                    <td>{item.Profile ? <img alt="profile" style={{width: '100px', height: '100px'}} src={`http://localhost:8080/profile/${item.Profile}`} /> : 'No Profile' }</td>
                    <td>
                        <ButtonToggle color="warning" onClick={() => this.showModal(item.ID)}>Edit</ButtonToggle>{' '}
                        <ButtonToggle color="danger" onClick={() => this.deleteUser(item.ID)}>Delete</ButtonToggle>{' '}
                    </td>
                    </tr>
                ))}
            </tbody>
            </Table>
        </>
        )
    }
    }
}