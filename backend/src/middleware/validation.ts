//All the validation logic for our requests. We are using package called express-validator
/*
Whenever we receive a request to update user profile, express validator is going to check the request based on the things we define in validateMyUserRequest.
 body("name").isString().notEmpty().withMessage("Name must be a string"),
    body("addressLine1").isString().notEmpty().withMessage("AddressLine1 must be a string"),
    body("city").isString().notEmpty().withMessage("City must be a string"),
    body("country").isString().notEmpty().withMessage("Country must be a string") and after this it calls handleValidationErrors.
    handleValidationErrors checks if there is any errors in validationResult, and if there is any error then it send a 400 response to the frontend, with all the missing fields or wrong types.
    If there is no error then it calls the next() and the controller, the logic runs to update user profile
*/


import { Request, Response, NextFunction } from "express"
import {body, validationResult} from "express-validator"


//adding middleware that will apply the logic of validateMyUserRequest to the request. Middleware function has (req: Request, res: Response, next: NextFunction)
const handleValidationErrors = async(req: Request, res: Response, next: NextFunction) => {
   const errors = validationResult(req);
   if(!errors.isEmpty()){
      res.status(400).json({errors: errors.array()})
      return;
   }
   next();
}

//validation logic
export const validateMyUserRequest = [
    body("name").isString().notEmpty().withMessage("Name must be a string"),
    body("addressLine1").isString().notEmpty().withMessage("AddressLine1 must be a string"),
    body("city").isString().notEmpty().withMessage("City must be a string"),
    body("country").isString().notEmpty().withMessage("Country must be a string"),
    handleValidationErrors

]

export const validateMyRestaurantRequest = [
   body("restaurantName").isString().notEmpty().withMessage("Restaurant Name is required"),
   body("city").isString().notEmpty().withMessage("City is required"),
   body("country").isString().notEmpty().withMessage("Country is required"),
   body("deliveryPrice").isFloat({ min:0 }).withMessage("Delivery Price must be a positive number"),
   body("estimatedDeliveryTime").isInt({ min:0 }).withMessage("Estimated Delivery Time must be a positive integer"),
   body("cuisines").isArray().withMessage("Cuisines must be an array").not().isEmpty().withMessage("Cuisines array can not be empty"),
   body("menuItems").isArray().withMessage("Menu Items must be an array"),
   body("menuItems.*.name").notEmpty().withMessage("Menu Item name is required"),
   body("menuItems.*.price").isFloat({ min:0 }).withMessage("Menu Item price is required and must be a positive number"), 
   handleValidationErrors

]