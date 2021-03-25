import React, { useState } from 'react';
import axios from 'axios';
import { token, username } from '../../context/usercontext'
import { useAlert } from "react-alert";
import { useHistory, Link } from "react-router-dom";
import Headroom from "react-headroom";
import '../../components/landingpage/Header.css'
import auth from '../../service/auth'



function Updatebutton(props) {
  const [updatetask, setUpdatetask] = useState({ title: '', githuburl: '', deployedurl: ' ' });
  const alert = useAlert()
  const history = useHistory()
  const Logout = () => {
    auth.logoutUser();
    history.push("/");
  };
  const taskid = props.match.params.taskId
  const submitTask = async (e) => {
    e.preventDefault()
    const data = {
      id: taskid,
      title: updatetask.title,
      githuburl: updatetask.githuburl,
      deployedurl: updatetask.deployedurl
    }
    const result = axios.put("https://sri-tasksubmission.herokuapp.com/task/updatetask", data,
      {
        headers: {
          "Content-Type": "application/json",
          'authorization': token,

        },
      }
    );
    console.log(result)
    if (result) {
      alert.success("Task updated")
      history.push('/app')


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
              <a>Alltasks</a>

            </li>
          </Link>
        </ul>
      </header>
    </Headroom>

    <form onSubmit={submitTask}>
      <div className="form-group">
        <label htmlFor="exampleInputEmail1">Title</label>
        <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
          value={updatetask.title}
          onChange={(e) => setUpdatetask({ ...updatetask, title: e.target.value })}

        />

      </div>
      <div className="form-group">
        <label htmlFor="exampleInputPassword1">githuburl</label>
        <input type="text" className="form-control" id="exampleInputPassword1"
          value={updatetask.githuburl}
          onChange={(e) => setUpdatetask({ ...updatetask, githuburl: e.target.value })}

        />
      </div>
      <div className="form-group">
        <label htmlFor="dep">deployedurl</label>
        <input type="text" className="form-control" id="dep"
          value={updatetask.deployedurl}
          onChange={(e) => setUpdatetask({ ...updatetask, deployedurl: e.target.value })}
        />
      </div>


      <button type="submit" className="btn btn-primary float-right">Update</button>
    </form>
  </div>

}
export default Updatebutton;

