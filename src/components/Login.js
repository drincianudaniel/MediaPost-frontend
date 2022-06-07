import {Link} from "react-router-dom"
import "../css/register.css"
import React, { useState } from 'react';
import axios from "axios";
import { Navbar, Container, Nav } from "react-bootstrap"
import { useNavigate } from "react-router-dom";

function Login(props){

    const navigate = useNavigate();

    const[input, setInput] = useState({
        email:'',
        password: ''
    })

    const [error, setError] = useState({
        email:'',
        password: ''
    })

    const onInputChange = e => {
        const { name, value } = e.target;
        setInput(prev => ({
          ...prev,
          [name]: value
        }));
        validateInput(e);
    }
   
    const validateInput = e => {
        let { name, value } = e.target;
        setError(prev => {
          const stateObj = { ...prev, [name]: "" };
     
          switch (name) {
            case "email":
              if (!value) {
                  stateObj[name] = "Please enter an email.";
                }
                break;
     
            case "password":
              if (!value) {
                stateObj[name] = "Please enter Password.";
              }
              break;     

            default:
              break;
          }
          return stateObj;
        });
    }

    const handleSuccessfulAuth = (data) =>{
        props.handleLogin(data);
        navigate("../", {replace: true})
    }

    const login = () => {
        axios
        .post(`${process.env.REACT_APP_SERVERIP}/login`, 
        {
            user:{
                email: input.email,
                password: input.password
            }
        },
        { withCredentials: true })
        .then(response => {
            if (response.data.logged_in){
                handleSuccessfulAuth(response.data)
            }
            console.log("succes")
        })
        .catch(error => {
            console.log(error)
        })
    }
    
    return(
        <div>
            <Navbar fixed="top" collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand href="#home">MediaPost</Navbar.Brand>
                        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                            <Navbar.Collapse id="responsive-navbar-nav">
                            <Nav className="me-auto">
                                <Nav.Link href="#features">My posts</Nav.Link>
                                <Nav.Link href="#pricing">Upload</Nav.Link>
                            </Nav>
                            <Nav>
                                <Nav.Link href={"/login"}>Login</Nav.Link>
                                <Nav.Link href={"/register"}>Register</Nav.Link>
                            </Nav>
                        </Navbar.Collapse>
                </Container>
            </Navbar>
            <div class="container back">
            <form class="form-horizontal centered" role="form" onSubmit={e => {e.preventDefault(); login()}}>
                <h2>Login</h2>
                <div class="form-group">
                    <label for="email" class="col-sm-3 control-label">Email </label>
                    <div class="col-sm-9">
                        <input type="email" id="email" placeholder="Email" class="form-control" name= "email" value={input.email} onChange={onInputChange} onBlur={validateInput}/>
                        {error.email && <span className='err'>{error.email}</span>}
                    </div>
                </div>
                <div class="form-group">
                    <label for="password" class="col-sm-3 control-label">Password</label>
                    <div class="col-sm-9">
                        <input type="password"  placeholder="Password" class="form-control"  name="password" value={input.password} onChange={onInputChange} onBlur={validateInput}/>
                        {error.password && <span className='err'>{error.password}</span>}
                    </div>
                </div>
                <button type="submit" class="btn btn-primary btn-block">Register</button>
            </form> 
        </div>
    </div> 
    )
}

export default Login;