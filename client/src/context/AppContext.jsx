import { createContext, useState,useEffect } from "react";
import { jobsData } from "../assets/assets"; // Ensure this path is correct


//jobData={internships}
export const AppContext = createContext();

export const AppContextProvider = (props) => {

    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    const [searchFilter, setSearchFilter] = useState({
        title: ''
    });

    const [isSearched, setIsSearched] = useState(false);
    const[internships,setInternships] = useState([])
    const [showRecruitersLogin, setShowRecruitersLogin] = useState(false);

    const[companyToken,setCompanyToken] = useState(null)
    const[companyData,setCompanyData] = useState(null)

    const fetchJobs = async () => {
        setInternships(jobsData);

    }

    //fetch company data
    const fetchCompanyData = async () => {
        try {
            const {data} = await axios.get(backendUrl+'/api/company/getCompanyData', {})
            
        } catch (error) {
            
        }
  

    useEffect(() => {
        fetchJobs(jobsData);

        const storedCompanyToken = localStorage.getItem('companyToken');
        if(storedCompanyToken){
            setCompanyToken(storedCompanyToken)
        }
    }, []);



    // Provide internships in the context value
    const value = {
        setSearchFilter,searchFilter,
        isSearched,setIsSearched,
        internships,setInternships,
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
};}