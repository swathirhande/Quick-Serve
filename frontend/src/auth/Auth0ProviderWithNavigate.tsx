//import { useCreateMyUser } from "@/api/MyUserApi";
import { AppState, Auth0Provider} from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
type Props = {
    children: React.ReactNode;
}

const Auth0ProviderWithNavigate = ({ children }: Props) => {
    const navigate = useNavigate();
    
    const domain = import.meta.env.VITE_AUTH0_DOMAIN;
    const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID;
    const redirectUri = import.meta.env.VITE_AUTH0_CALLBACK_URL;
    const audience = import.meta.env.VITE_AUTH0_AUDIENCE;

    if (!domain || !clientId || !redirectUri || !audience) {
        throw new Error("unable to initialise auth");
      }
    
      const onRedirectCallback = (appState?: AppState) => {
       navigate(appState?.returnTo || "/auth-callback"); //this is done to return to the same page that user was at before login
      };  {/* Auth0 performs the authentication process. 
        If authentication is successful, Auth0 will create a JSON Web Token and send it back to the app. 
        The redirect is to the callback URL specified in Auth0 Settings.
        In our case its URL the frontend end is running and then we redirect it to /auth-callback which goes to the routes to check the element*/}
      return (
        <Auth0Provider 
        domain={domain} 
        clientId={clientId} 
        authorizationParams={{
            redirect_uri : redirectUri,
            audience,
        }}
        onRedirectCallback= {onRedirectCallback}
        >
        {children}
        </Auth0Provider>
      )
}

export default Auth0ProviderWithNavigate;
