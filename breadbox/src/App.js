import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <div className="App">
      <Router>
        <div className="app-container">
          <div className="content">
            <Routes>
              <Route path="/" element={<Navigate to="/Dashboard" />} /> {/* dashboard redirect*/}
              <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
          </div>
        </div>
      </Router>
    </div>
  );
}

export default App;