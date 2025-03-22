
import React, { useContext, useState } from 'react';
import {Route,Routes} from 'react-router-dom'
import ApplyInternship from './pages/ApplyInternship'
import Home from './pages/Home';
import ApplyJob from './pages/ApplyJob';
import Applications from './pages/Applications';
import RecruiterLogin from './components/RecruiterLogin';
import { AppContext } from './context/AppContext';
import CVForm from './components/CVForm';
import CVPreview from './components/CVPreview';
import AiAsistant from './pages/AiAsistant';
import InternshipForm from './pages/InternshipForm';



const App = () => {
  const { showRecruitersLogin } = useContext(AppContext);
  const [cvData, setCvData] = useState(null);

  return (
    <div>
      {showRecruitersLogin && <RecruiterLogin />}
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/apply-job/:id' element={<ApplyJob/>}/>
        <Route path='/applicationForm/:id' element={<ApplyInternship/>}/>
        <Route path='/internshipForm' element={<InternshipForm/>}/>
        <Route path='applications' element={<Applications/>}/>
        <Route path='aiAsistant' element={<AiAsistant/>}/>
        <Route path='/' element={<Home />} />
        <Route path='/apply-job/:id' element={<ApplyJob />} />
        <Route path='/applications' element={<Applications />} />
        <Route path='/cv-form' element={<CVForm setCvData={setCvData} />} />
        <Route path='/cv-preview' element={<CVPreview data={cvData} />} />

      </Routes>
    </div>
  );
};

export default App;
