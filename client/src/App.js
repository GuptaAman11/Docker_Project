import AllUserPage from './component/Home/AllUserPage';
import GetFile from './component/Home/GetFile';
import UploadFile from './component/Home/UploadFile';
import Login from './component/LoginComp/Login';
import Signup from './component/LoginComp/Signup';
import logo from './logo.svg';
import { BrowserRouter as Router, Routes, Route, RouterProvider } from "react-router-dom";


function App() {
  return (
    <div className="">
      <Router>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/upload' element={<UploadFile />} />

          <Route path='/register' element={<Signup />} />
          <Route path='/get/:id' element={<GetFile />} />
          <Route path='/' element={<AllUserPage />} />




        </Routes>
      </Router>
    </div>
  );
}

export default App;
