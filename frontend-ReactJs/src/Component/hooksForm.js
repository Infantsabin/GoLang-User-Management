import React, { useEffect, useState } from 'react';
import { Table, ButtonToggle } from 'reactstrap'


function App() {
  const [list, setList] = useState([]);

  useEffect(() => {
    let mounted = true;
    fetch("http://localhost:8080/api/users")
        .then(res => res.json())
        .then(
        (result) => {
            if(mounted) {
                setList(result.data.Value)
              }
        },
        (error) => {
            this.setState({
            isLoaded: true,
            error
            });
        }
        )
    return () => mounted = false;
  }, [])

  return(
    <div className="wrapper">
     <h1>Users List</h1>
     <Table bordered>
            <thead>
                <tr>
                <th>#</th>
                <th>User Name</th>
                <th>Email</th>
                <th>Password</th>
                <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {list.map((item, k) => (
                    <tr key={item.ID}>
                    <th >{k+1}</th>
                    <td>{item.Username}</td>
                    <td>{item.Email}</td>
                    <td>{item.Password}</td>
                    <td>
                        <ButtonToggle color="warning" onClick={() => this.showModal(item.ID)}>Edit</ButtonToggle>{' '}
                        <ButtonToggle color="danger" onClick={() => this.deleteUser(item.ID)}>Delete</ButtonToggle>{' '}
                    </td>
                    </tr>
                ))}
            </tbody>
            </Table>
   </div>
  )
}

export default App;