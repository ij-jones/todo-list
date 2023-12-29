import './App.css';
import PomodoroTimer from './components/PomodoroTimer';
import { TodoWrapper } from './components/TodoWrapper';

function App() {
  return (
    <div className="App">
      <TodoWrapper></TodoWrapper>
      <PomodoroTimer></PomodoroTimer>
    </div>
  );
}

export default App;
