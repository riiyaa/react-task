import './App.css'
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from './Components/Login';
import ListView from './Components/ListView';
import Result from './Components/Result';
import NoMatch from './Components/NoMatch';

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace={true} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/list" element={<ListView />} />
          <Route path="/result" element={<Result />} />
          <Route path="*" element={<NoMatch />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
