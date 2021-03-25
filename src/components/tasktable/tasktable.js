import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { username, token } from '../../context/usercontext'
import { Link, useHistory } from 'react-router-dom'
import auth from '../../service/auth'
import { useAlert } from "react-alert";
import Loader from "react-loader-spinner";
import Headroom from "react-headroom";
import '../../components/landingpage/Header.css'
import moment from 'moment'


function Tasktable() {
  const [task, setTask] = useState([]);
  const [loader, setloader] = useState("false");
  const history = useHistory();
  const alert = useAlert();
  const Logout = () => {
    auth.logoutUser();
    history.push("/");
  };
  useEffect(() => {
    const fetchData = async () => {
      setloader("true")
      const data = {
        username: username
      }
      const result = await axios.post(
        "https://sri-tasksubmission.herokuapp.com/task/getusertasks", data,
        {
          headers: {
            "Content-Type": "application/json",
            'authorization': token,
          },
        }
      );
      if (result) {
        setloader("false");
        setTask(result.data.tasks);
      } else {
        setloader("false");
        alert.error("Error occured")

      }
    };

    fetchData();
  }, []);

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

          <li >
            <a onClick={Logout}>logout </a>

          </li>

          <Link to="/submittask" >
            <li  >
              <a>SubmitTask</a>

            </li>
          </Link>

        </ul>
      </header>
    </Headroom>
    <div style={{ zIndex: -1 }}>
      {" "}
      <Loader
        type="BallTriangle"
        color="#00BFFF"
        height={160}
        width={160}
        visible={loader}
      />
    </div>

    <table className="table">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">title</th>
          <th scope="col">username</th>
          <th scope="col">submitted</th>
          <th scope="col">githuburl</th>
          <th scope="col">deployedurl</th>
          <th scope="col">updatetask</th>
        </tr>
      </thead>
      <tbody>
        {
          task.map((item, index) => (
            <tr key={item._id}>
              <th scope="row">{index + 1}</th>
              <td>{item.title}</td>
              <td>{item.username}</td>
              <td>{moment(item.createdAt).fromNow()}</td>
              <td><a href={item.githubUrl} target="_blank" rel="noreferrer" >{item.githubUrl}</a></td>
              <td><a href={item.deployedUrl} target="_blank" rel="noreferrer" >{item.deployedUrl}</a></td>
              <td><Link to={`/update/${item._id}`}><button className="btn btn-primary">Update</button></Link></td>
            </tr>
          ))
        }
      </tbody>
    </table>
  </div>
}

export default Tasktable;