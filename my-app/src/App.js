import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/pages/Home.js';
import AddStudent from './components/pages/AddStudent.js';

import NotFound from './components/pages/NotFound.js';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add-student" element={<AddStudent />} />
        <Route path="/edit-student/:id" element={<AddStudent />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}


export default App;
