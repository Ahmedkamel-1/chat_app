import { Route ,Routes } from "react-router-dom";
import { Home } from "./Home/Home.jsx";
import { Login } from "./Login/Login.jsx"
import { Register } from "./Register/Register.jsx";
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { VerifyUser } from "./utils/VerifyUser.jsx";


function App() {
  return (
    <>
      <div className="p-2 w-screen h-screen flex items-center justify-center">
        <Routes>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route element={<VerifyUser/>}/>
          <Route path="/" element={<Home/>}/>
        </Routes>
        <ToastContainer/>
      </div>
    </>
  )
}

export default App
