import express from "express";
import MyUserController from "../controllers/MyUserController";
import { jwtCheck, jwtParse } from "../middleware/auth"
const router = express.Router();
import {validateMyUserRequest} from "../middleware/validation"

router.get("/",jwtCheck, jwtParse, MyUserController.getCurrentuser)
router.post("/", jwtCheck, MyUserController.createCurrentUser);
router.put("/", jwtCheck, jwtParse, validateMyUserRequest, MyUserController.updateCurrentUser);

// get request to get the details of current login user
//the end point will be /api/my/user, check the access token and parse the token so that we can get the id's and other details


export default router;


{/*
    After successful authentication, the frontend (the AuthCallbackPage component) will send a POST request to your backend to create the user.
    The jwtCheck middleware verifies the user's JWT token.
    If the user doesn't already exist, the MyUserController.createCurrentUser function will be executed to create a new user in your database. 
   
    If the user logs in for the second time and you want to update their profile (e.g., adding or changing their profile picture), the PUT request would be used.
    jwtParse middleware might be used here to parse and extract data from the token for further actions.

    In router.post("/", jwtCheck, MyUserController.createCurrentUser);
    It will first pass through the jwtCheck middleware before reaching the createCurrentUser method in MyUserController.
    The jwtCheck middleware is responsible for validating the JWT token that is included in the request.
    In this case, it will typically check:
    1)If a valid JWT token is present in the Authorization header (usually something like Bearer <token>).
    2)If the token is valid, i.e., not expired and properly signed by Auth0.
    3)If the token is valid, it allows the request to continue. 
    If the token is invalid, the middleware will reject the request (usually with a 401 Unauthorized status).
*/}