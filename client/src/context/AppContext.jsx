import { createContext, useState } from "react";
import { internships } from "../assets/assets"; // Ensure this path is correct
//jobData={internships}
export const AppContext = createContext();

export const AppContextProvider = (props) => {
    const [searchFilter, setSearchFilter] = useState({
        title: ''
    });

    const [isSearched, setIsSearched] = useState(false);
   // const[internships,setInternships] = useState([])

    const [showRecruitersLogin, setShowRecruitersLogin] = useState(false);

    

    // Provide internships in the context value
    const value = {
        setSearchFilter,searchFilter,
        isSearched,setIsSearched,
        internships,
        showRecruitersLogin,setSearchFilter,
        setShowRecruitersLogin
         // Make sure internships is included here
    };

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    );
};