import { Route, Routes } from "react-router-dom";
import Navbar from "./components/common/Navbar";
import Login from "./components/pages/Login";
import Signup from "./components/pages/Signup";
import { Toaster } from "./components/ui/sonner";
import HomePage from "./components/pages/HomePage";
import Footer from "./components/common/Footer";
import JobsPage from "./components/pages/JobsPage";
import BrowsePage from "./components/pages/BrowsePage";
import UserProfile from "./components/pages/UserProfile";
import JobDescription from "./components/pages/JobDescription";
import AdminHome from "./components/pages/admin/AdminHome";
import RegisterCompany from "./components/pages/admin/RegisterCompany";
import CompanyDescription from "./components/pages/admin/CompanyDescription";
import UpdateCompany from "./components/pages/admin/UpdateCompany";
import AdminJobs from "./components/pages/admin/AdminJobs";
import CreateJob from "./components/pages/admin/CreateJob";
import ViewJobDetails from "./components/pages/admin/ViewJobDetails";
function App() {
  return (
    <>
      <header>
        <Navbar />
      </header>
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/jobs" element={<JobsPage />} />
          <Route path="/jobs/description/:id" element={<JobDescription />} />
          <Route path="/browse" element={<BrowsePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/admin" element={<AdminHome />} />
          <Route path="/admin/companies/register" element={<RegisterCompany />} />
          <Route path="/admin/companies/:id" element={<CompanyDescription />} />
          <Route path="/admin/companies/:id/update" element={<UpdateCompany />} />
          <Route path="/admin/jobs" element={<AdminJobs />} />
          <Route path="/admin/jobs/create" element={<CreateJob />} />
          <Route path="/admin/jobs/:id" element={<ViewJobDetails />} />
        </Routes>
        <Toaster />
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  )
}

export default App
