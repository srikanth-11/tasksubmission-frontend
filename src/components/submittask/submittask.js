import React, { useState } from 'react';
import axios from 'axios';
import { username, token } from '../../context/usercontext';
import { Link, useHistory } from 'react-router-dom'
import auth from '../../service/auth'
import { useAlert } from "react-alert";
import Headroom from "react-headroom";
import '../../components/landingpage/Header.css'



function Submittask() {
  const [submittask, setSubmittask] = useState({ title: '', githuburl: '', deployedurl: ' ' });
  const history = useHistory();
  const alert = useAlert();
  const Logout = () => {
    auth.logoutUser();
    history.push("/");
  };
  const submitTask = async (e) => {
    e.preventDefault()
    const data = {
      title: submittask.title,
      githuburl: submittask.githuburl,
      deployedurl: submittask.deployedurl,
      username: username
    }
    const result = axios.post("https://sri-tasksubmission.herokuapp.com/task/submittask", data,
      {
        headers: {
          "Content-Type": "application/json",
          "authorization": token

        },
      }
    );
    console.log(result)
    if (result) {
      alert.success("Task submitted successfully")
      history.push("/app")
    } else {
      alert.error("Error occured")
    }
  }

  return <div className="container-fluid">

    <Headroom>
      <header className="header">
        <a href="#" className="logo">
          <span className="grey-color"> </span>
          <span className="logo-name">{username}</span>
          <span className="grey-color"></span>
        </a>
        <input className="menu-btn" type="checkbox" id="menu-btn" />
        <label className="menu-icon" htmlFor="menu-btn">
          <span className="navicon"></span>
        </label>
        <ul className="menu">

          <li>
            <a onClick={Logout}>logout </a>

          </li>

          <Link to="/app">
            <li>
              <a>SubmittedTasks</a>

            </li>
          </Link>
        </ul>
      </header>
    </Headroom>

    <form onSubmit={submitTask}>
      <div className="form-group">
        <label htmlFor="exampleInputEmail1">Title</label>
        <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
          value={submittask.title}
          onChange={(e) => setSubmittask({ ...submittask, title: e.target.value })}

        />

      </div>
      <div className="form-group">
        <label htmlFor="exampleInputPassword1">githuburl</label>
        <input type="text" className="form-control" id="exampleInputPassword1"
          value={submittask.githuburl}
          onChange={(e) => setSubmittask({ ...submittask, githuburl: e.target.value })}

        />
      </div>
      <div className="form-group">
        <label htmlFor="dep">deployedurl</label>
        <input type="text" className="form-control" id="dep"
          value={submittask.deployedurl}
          onChange={(e) => setSubmittask({ ...submittask, deployedurl: e.target.value })}
        />
      </div>
      <button type="submit" className="btn btn-primary float-right">submit</button>
    </form>
  </div>
}

export default Submittask;