import logo from './logo.svg';
import './App.css';
import Thought from './components/Thought';
import Task from './components/Task';

function App() {
  return (
    <div className='d-flex p-4 container'>
      <Thought />
      <Task />
    </div>
  );
}

export default App;
