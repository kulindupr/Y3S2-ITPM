import React, { useContext, useState } from 'react';
import {Route,Routes} from 'react-router-dom'
import Home from './pages/Home';
import ApplyJob from './pages/ApplyJob';
import Applications from './pages/Applications';
import RecruiterLogin from './components/RecruiterLogin';
import { AppContext } from './context/AppContext';
import CVForm from './components/CVForm';
import CVPreview from './components/CVPreview';
import AiAsistant from './pages/AiAsistant';
import InternshipForm from './pages/InternshipForm';
import Dashboard from './pages/Dashboard';
import AddJobs from './pages/AddJobs';
import ManageJobs from './pages/ManageJobs';
import ViewApplications from './pages/ViewApplications';
import 'quill/dist/quill.snow.css';
import { ToastContainer, toast } from 'react-toastify';


const App = () => {
  const { showRecruitersLogin ,companyToken} = useContext(AppContext);
  const [cvData, setCvData] = useState(null);

  return (
    <div>
      {showRecruitersLogin && <RecruiterLogin />}
      <ToastContainer/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/apply-job/:id' element={<ApplyJob/>}/>

        <Route path='/applications' element={<Applications/>}/>
        <Route path='/internshipForm' element={<InternshipForm/>}/>
        

        <Route path='applications' element={<Applications/>}/>
        <Route path='aiAsistant' element={<AiAsistant/>}/>
        <Route path='/' element={<Home />} />
        <Route path='/apply-job/:id' element={<ApplyJob />} />
        <Route path='/applications' element={<Applications />} />
        <Route path='/cv-form' element={<CVForm setCvData={setCvData} />} />
        <Route path='/cv-preview' element={<CVPreview data={cvData} />} />

        {/* //asela */}
        {companyToken ? <>
          <Route path='/dashboard' element={<Dashboard />} >
            <Route path='add-job' element={<AddJobs />} />
            <Route path='manage-jobs' element={<ManageJobs />} />
            <Route path='view-applications' element={<ViewApplications />} />
        </Route>
        
        </>:null
        
        }
        



      </Routes>
    </div>
  );
};

export default App;
