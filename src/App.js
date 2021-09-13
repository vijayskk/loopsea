import './App.css';
import CreatePost from './components/CreatePost';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Post from './components/Post';
import Home from './components/Home';
import Login from './components/Login';
import Profile from './components/Profile';


function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/createpost" component={CreatePost} />
          <Route path="/post" component={Post} />
          <Route exact path="/" component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/profile" component={Profile} />
        </Switch>
      </Router>
    
    </div>
  );
}

export default App;
