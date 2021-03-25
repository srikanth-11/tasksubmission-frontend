
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AlertTemplate from "react-alert-template-basic";
import { positions, Provider } from "react-alert";
import Signup from './components/signup/signup';
import Login from './components/login/login';
import Landingpage from './components/landingpage/landingpage'
import Forgotpassword from './components/forgotpassword/forgotpassword'
import Resetpassword from './components/resetpassword/resetpassword'
import ProtectedRoute from './components/protected-route/protectedroute'
import Tasktable from './components/tasktable/tasktable';
import Submittask from './components/submittask/submittask';
import Updatebutton from './components/updatebutton/updatebutton';

function App() {
  const options = { 
    timeout: 3000,
    position: positions.TOP_RIGHT
  };

  return <Provider template={AlertTemplate} {...options}><Router>
    <Switch>
    <ProtectedRoute exact path="/app" component={Tasktable}></ProtectedRoute>
    <ProtectedRoute exact path="/submittask" component={Submittask}></ProtectedRoute>
    <ProtectedRoute exact path="/update/:taskId" component={Updatebutton}></ProtectedRoute>
    <Route exact path="/signup" component={Signup} />
    <Route exact path="/login" component={Login} />
    <Route exact path="/forgotpassword" component={Forgotpassword} />
    <Route exact path="/reset-password/:resetToken" component={Resetpassword} />
    <Route exact path="/" component={Landingpage} />
    </Switch>
    </Router>
    </Provider>
}

export default App;

