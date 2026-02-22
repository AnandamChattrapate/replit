// App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import Login from './pages/Login.jsx';
import ChatPage from './pages/ChatPage.jsx';
import Register from './pages/Register.jsx';
// Import socket functions
//import { initializeSocket, disconnectSocket } from './services/socket.js';

function App() {
 

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/chat' element={<ChatPage />} />
        <Route path='/register' element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;