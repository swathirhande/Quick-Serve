{/* API Call to Backend to Create User (Frontend to Backend Communication):
useCreateMyUser called in AuthCallbackPage.tsx. The value of {API_BASE_URL} is the url where the backend is hosted.
{API_BASE_URL}/api/my/user in backend creates a new user to the database.

1)createMyUserRequest is an async function that sends an HTTP POST request to the backend to create a new user. 
It includes the user’s auth0Id and email in the request body.
2)The request also includes an access token (retrieved using getAccessTokenSilently) in the Authorization header. 
This is used to verify that the user making the request is authenticated.
3)The useMutation hook from react-query is used to handle the API request.
It provides states like isLoading, isError, and isSuccess to help manage the request’s lifecycle.

*/}


import { User } from "@/types";
import { useAuth0 } from "@auth0/auth0-react";
import { useMutation, useQuery } from "react-query";
import { toast } from "sonner";


const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useGetMyUser = () =>{
  const {getAccessTokenSilently} = useAuth0();

  const getMyUserRequest = async() : Promise<User> =>{
    const accessToken = await getAccessTokenSilently();

    const response = await fetch (`${API_BASE_URL}/api/my/user`,{
      method : "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });
    if(!response.ok){
     throw new Error("Failed to fetch user");
    }
    
    return response.json();
  };
//whenever we want to fetch some data, we use useQuery hook, once it finsihes it returns the json from that response body
  const {data: currentUser, isLoading, error} = useQuery("fetchCurrentUser",getMyUserRequest);

  if(error){
    toast.error(error.toString());
  }

  return { currentUser, isLoading};
};
/*const getMyUserRequest = async() : Promise<User> =>{ }
here Promise<User> is used beacuse we tell typescript, that whenever we make a get request from getMyUserRequest, it returns a Promise that has a type of User from types.ts
*/

/*
The useQuery hook is used to fetch, cache the data and manage server state efficiently. 
useQuery("fetchCurrentUser", getMyUserRequest); 
i)"fetchCurrentUser" → Query Key.
"fetchCurrentUser" is a unique identifier (query key) that React Query uses to cache and track this query. 
If the same query key is used elsewhere in the application, React Query will reuse cached data instead of refetching from the server. 
If the backend data changes, React Query can automatically re-fetch to keep the UI updated.
ii)getMyUserRequest → Query Function
This is the function that actually fetches data from the backend. 
When useQuery runs, it calls getMyUserRequest() to make a GET request and retrieve the current user’s data. 

*/

type CreateUserRequest = {
    auth0Id: string;
    email: string;
  };

{/* This custom hook (useCreateMyUser) is designed to be easily reusable whenever the frontend needs to create a new user.
     Instead of manually calling fetch() every time, this hook abstracts the API call logic. */}

  export const useCreateMyUser = () => {
    const { getAccessTokenSilently } = useAuth0();
  
    const createMyUserRequest = async (user: CreateUserRequest) => {
      const accessToken = await getAccessTokenSilently();
      const response = await fetch(`${API_BASE_URL}/api/my/user`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
  
      if (!response.ok) {
        throw new Error("Failed to create user");
      }
    };

    const {
        mutateAsync: createUser,
        isLoading,
        isError,
        isSuccess,
      } = useMutation(createMyUserRequest);
    
      return {
        createUser,
        isLoading,
        isError,
        isSuccess,
      };
    };

  type updateMyUserRequest = { //here we don't define the email because we are not sending the email, its just for display purpose in the form
    name :string;
    addressLine1: string;
    city: string;
    country: string;
  }
  export const useUpdateMyUser = () =>{
    const {getAccessTokenSilently} = useAuth0();

// this function updateMyUserRequest will accept the form data that we will get from the form we have created to update the user profile(adding city,country,addressLine and name) 
    const updateMyUserRequest = async(formData: updateMyUserRequest) => {
      const accessToken = await getAccessTokenSilently();
     const response = await fetch(`${API_BASE_URL}/api/my/user`,{
      method: "PUT",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),

     });
    
     if(!response.ok){
      throw new Error("Failed to update user");
     }
     return response.json();

    };

    //we send it to mutation hook, so that react query can handke the request for us 
    const {mutateAsync: updateUser, isLoading, isSuccess, error, reset }= useMutation(updateMyUserRequest);

    if(isSuccess){
      toast.success("User profile updated");
    }
    if(error){
      toast.error(error.toString());
      reset();
    }

    
    return { updateUser, isLoading };
  }

 


{
  /*createUser is a function that, when called, sends the API request (createMyUserRequest).
isLoading -> true when the request is in progress (useful for showing a loading spinner).
isError -> true if the request fails (useful for showing an error message).
isSuccess -> true if the request is successful (useful for showing a success message). 
*/
}