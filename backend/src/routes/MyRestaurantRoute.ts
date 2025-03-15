//restaurants belonging to the user who has logined in 
import express from "express";
import multer from "multer";
const router = express.Router();
import MyRestaurantController from "../controllers/MyRestaurantController"
import { jwtCheck, jwtParse } from "../middleware/auth";
import { validateMyRestaurantRequest } from "../middleware/validation";

const storage = multer.memoryStorage();
const upload = multer({
    storage: storage,
    limits:{
        fileSize: 5* 1024* 1024 //5mb
    },
});

router.get("/order", jwtCheck, jwtParse, MyRestaurantController.getMyRestaurantOrders);

router.patch("/order/:orderId/status", jwtCheck, jwtParse, MyRestaurantController.updateOrderStatus);

router.get("/", jwtCheck, jwtParse,MyRestaurantController.getMyRestaurant)

// any /api/my/restaurant
router.post("/", upload.single("imageFile"), jwtCheck, jwtParse, validateMyRestaurantRequest, MyRestaurantController.createMyRestaurant);

router.put("/", upload.single("imageFile"), validateMyRestaurantRequest, jwtCheck, jwtParse, MyRestaurantController.updateMyRestaurant);

export default router;
/*anytime we receive a post request to /api/my/restaurant, the middle "upload.single("imageFile")" is going to check a request body 
 for a property called imageFile and it should be in binary form.
 If image is over 5mb its automatically send a message to frontend that image is too large. 
 If image less than 5mb muter appens an image object that we can use.*/

/*Here as a multer middleware we define upload.single("imageFile").
whenver upload.single("imageFile") runs its going to take the imageFile from the request and store it in memory because that is what we have mentioned
const storage = multer.memoryStorage(); and then it's going to add the file as an object to the request 
and the request get forwarded on to MyRestaurantController.createMyRestaurant
*/