import { createContext, useState,useEffect } from "react";
import { jobsData } from "../assets/assets"; // Ensure this path is correct



//jobData={internships}
export const AppContext = createContext();import { createContext, useState, useEffect } from "react";
import { internships as mockInternships } from "../assets/assets"; // Use consistent naming

export const AppContext = createContext();

export const AppContextProvider = (props) => {
    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    const [searchFilter, setSearchFilter] = useState({
        title: ''
    });

    const [isSearched, setIsSearched] = useState(false);
    const [internships, setInternships] = useState([]);
    const [showRecruitersLogin, setShowRecruitersLogin] = useState(false);
    const [companyToken, setCompanyToken] = useState(null);
    const [companyData, setCompanyData] = useState(null);

    useEffect(() => {
        // Load mock internships initially
        setInternships(mockInternships);
    }, []);

    const value = {
        setSearchFilter,
        searchFilter,
        isSearched,
        setIsSearched,
        internships,
        setInternships,
        showRecruitersLogin,
        setShowRecruitersLogin,
        companyToken,
        setCompanyToken,
        companyData,
        setCompanyData,
        backendUrl
    };

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    );
};


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

    useEffect(() => {
        setInternships(jobsData);

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
};