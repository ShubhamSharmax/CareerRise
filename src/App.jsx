import { Route, Routes } from "react-router-dom";
import Navbar from "./components/common/Navbar";
import Login from "./components/pages/Login";
import Signup from "./components/pages/Signup";
import TestRadio from "./components/pages/TestRadio";
import { Toaster } from "./components/ui/sonner";

function App() {
  return (
    <>
    <header>
      <Navbar />
    </header>
    <main>
      <Routes>
        <Route path="/" element={<h1>Home</h1>} />
        <Route path="/jobs" element={<h1>Jobs</h1>} />
        <Route path="/browse" element={<h1>Browse</h1>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/test" element={<TestRadio/>} />
      </Routes>
      <Toaster/>
    </main>
    <footer>

    </footer>
    </>
  )
}

export default App
