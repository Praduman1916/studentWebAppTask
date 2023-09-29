import './App.css';
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import StudentList from './components/StudentList';

function App() {
  return (
    <div className="App">
      <Router>      <Routes>
        <Route path="/" element={<StudentList />} />
      </Routes>
      </Router>

    </div>
  );
}

export default App;

// <Router>
// <Routes>
// <Route path="/" element={<HomePage/>}/>
// <Route path='/chats' element={<ChatPage/>}/>     
// </Routes>
// </Router> 