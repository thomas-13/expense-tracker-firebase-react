import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Auth } from './pages/auth/index';
import { ExpenseTracker } from './pages/expense-tracker/index';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes path>
          <Route path="/" exact element={<Auth />} />
          <Route path="/expense" exact element={<ExpenseTracker />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
