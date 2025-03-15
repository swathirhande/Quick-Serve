{/* The AuthCallbackPage.tsx page is where you handle the response from Auth0. 
    Auth0 sends back the user details (like sub(the user's unique ID), email, and the JWT) to this page, 
    and you use this data to process the user’s login and, in this case, create a new user in your database. 
    Why is this important? We need this data (especially user.sub and user.email) to create the user in our backend.*/}


import { useAuth0 } from "@auth0/auth0-react"
import { useCreateMyUser } from "@/api/MyUserApi";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const AuthCallbackPage = () => {
    const navigate = useNavigate();
const { user } = useAuth0();
const { createUser } = useCreateMyUser();
{/*This line gets the createUser function from your custom useCreateMyUser hook.
This function is responsible for making an API call to your backend, specifically to create the user in the database. */}

const hasCreatedUser = useRef(false);

useEffect (()=>{
    if(user?.sub && user?.email && !hasCreatedUser.current)  { 
        createUser({auth0Id:user.sub, email:user.email});
        hasCreatedUser.current = true;
      }
      navigate("/");
},[createUser, navigate, user]);
 return <>Loading....</>;

}

export default AuthCallbackPage

{/* if(user?.sub && user?.email && !hasCreatedUser.current)
    The first time the component runs, user might be undefined or null because the data has not been populated yet by Auth0. 
    So, we need to check that user is valid (user?.sub && user?.email) before trying to use the values.
    useCreateMyUser() is called that is present in /api/MyUserApi.tsx
    After the user creation is attempted, navigate("/") redirects the user to the homepage (or another route you specify).
     This is done so the user can continue using your app seamlessly.
    
*/}
       