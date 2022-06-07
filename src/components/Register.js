import {Link} from "react-router-dom"
import "../css/register.css"
import React, { useState } from 'react';
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register(){
  
    const navigate = useNavigate();

    const[input, setInput] = useState({
        username: '',
        email:'',
        password: '',
        confirmPassword:''
    })

    const [error, setError] = useState({
        username: '',
        email:'',
        password: '',
        confirmPassword: ''
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
            case "username":
              if (!value) {
                stateObj[name] = "Please enter an username.";
              }
              break;

            case "email":
              if (!value) {
                  stateObj[name] = "Please enter an email.";
                }
                break;
     
            case "password":
              if (!value) {
                stateObj[name] = "Please enter Password.";
              } else if (input.confirmPassword && value !== input.confirmPassword) {
                stateObj["confirmPassword"] = "Password and Confirm Password does not match.";
              } else {
                stateObj["confirmPassword"] = input.confirmPassword ? "" : error.confirmPassword;
              }
              break;
     
            case "confirmPassword":
              if (!value) {
                stateObj[name] = "Please enter Confirm Password.";
              } else if (input.password && value !== input.password) {
                stateObj[name] = "Password and Confirm Password does not match.";
              }
              break;
     
            default:
              break;
          }
          return stateObj;
        });
    }

    const register = () => {
        axios
        .post(`${process.env.REACT_APP_SERVERIP}/users`, 
        {
            user:{
                name: input.username,
                email: input.email,
                password: input.password
            }
            
        },
        { withCredentials: true })
        .then(response => {
            console.log("succes")
        })
        .catch(error => {
            console.log(error)
        })
    }
    
    return(
        <div class="container back">
        <form class="form-horizontal centered" role="form" onSubmit={e => {e.preventDefault(); register()}}>
            <h2>Registration</h2>
            <div class="form-group">
                <label for="firstName" class="col-sm-3 control-label">Name</label><br/>
                <div class="col-sm-9">
                    <input type="text" id="firstName" placeholder="Name" class="form-control" name= "username" value={input.name} onChange={onInputChange} onBlur={validateInput}/>
                    {error.username && <span className='err'>{error.username}</span>}
                </div>
            </div>
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
            <div class="form-group">
                <label for="password" class="col-sm-3 control-label">Confirm Password</label>
                <div class="col-sm-9">
                    <input type="password" placeholder="Confirm Password" class="form-control"  name="confirmPassword" value={input.confirmPassword} onChange={onInputChange} onBlur={validateInput}/>
                    {error.confirmPassword && <span className='err'>{error.confirmPassword}</span>}
                </div>
            </div>
            <button type="submit" class="btn btn-primary btn-block">Login</button>
        </form> 
    </div> 
    )
}

export default Register;