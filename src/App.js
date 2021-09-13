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
import Darkmode from 'darkmode-js';


function App() {
  const options = {
    bottom: '64px', // default: '32px'
    right: 'unset', // default: '32px'
    left: '32px', // default: 'unset'
    time: '0.5s', // default: '0.3s'
    mixColor: '#fff', // default: '#fff'
    backgroundColor: '#fff',  // default: '#fff'
    buttonColorDark: '#000000',  // default: '#000000'
    buttonColorLight: '#fff', // default: '#fff'
    saveInCookies: false, // default: true,
    label: '🌙', // default: ''
    autoMatchOsTheme: true // default: true
  }
  
  const darkmode = new Darkmode(options);
  darkmode.showWidget();
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
