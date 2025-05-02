import { createContext, useState, useEffect } from "react";
import { jobsData } from "../assets/assets"; // Ensure this path is correct
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

//jobData={internships}
export const AppContext = createContext();

export const AppContextProvider = (props) => {

    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    const [searchFilter, setSearchFilter] = useState({
        title: ''
    });

    const [isSearched, setIsSearched] = useState(false);
    const[jobs,setJobs] = useState([])
    const [showRecruitersLogin, setShowRecruitersLogin] = useState(false);

    const[companyToken,setCompanyToken] = useState(null)
    const[companyData,setCompanyData] = useState(null)

    const fetchJobs = async () => {
        setJobs(jobsData);
    }

      //fetch company data
      const fetchCompanyData = async () => {
        try {
            const {data} = await axios.get(backendUrl+'/api/company/company',{headers:{token:companyToken}})

            if(data.success){
                setCompanyData(data.company)
                console.log(data.company)
        }else{
            toast.error(data.message)        }
        } catch (error) {
            toast.error(error.message)
        }  
    }

    useEffect(() => {
        fetchJobs();

        const storedCompanyToken = localStorage.getItem('companyToken');

        if (storedCompanyToken) {
            setCompanyToken(storedCompanyToken);
        }
    }, []);


    useEffect(() => {
        if (companyToken) {
            fetchCompanyData();
        }
    },[companyToken])
  

    // Provide internships in the context value
    const value = {
        setSearchFilter,searchFilter,
        isSearched,setIsSearched,
    
        jobs,setJobs,
        showRecruitersLogin,
        setShowRecruitersLogin,
        companyToken,setCompanyToken,
        companyData,setCompanyData,
        backendUrl
         // Make sure internships is included here
    };

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    );
};