import { Route, Routes } from "react-router-dom";
import Navbar from "./components/common/Navbar";

function App() {
  return (
    <>
    <header>
      <Navbar />
    </header>
    <main>
      <Routes>
        <Route path="/" element={<h1>Home</h1>}/>
        <Route path="/jobs" element={<h1>Jobs</h1>}/>
        <Route path="/browse" element={<h1>Browse</h1>}/>
        <Route path="/login" element={<h1>Login</h1>}/>
        <Route path="/signup" element={<h1>SignUp</h1>}/>
      </Routes>
    </main>
    <footer>

    </footer>
    </>
  )
}

export default App
