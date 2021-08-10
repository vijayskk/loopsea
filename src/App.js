import './App.css';
import CreatePost from './components/CreatePost';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Post from './components/Post';
import Home from './components/Home';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/createpost" component={CreatePost} />
          <Route path="/post" component={Post} />
          <Route exact path="/" component={Home} />
        </Switch>
      </Router>
    
    </div>
  );
}

export default App;
