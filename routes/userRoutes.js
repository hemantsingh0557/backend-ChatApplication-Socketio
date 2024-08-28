import { userController } from "../controllers/userController.js";


export const userRoutes = [
    {
        method: "post", 
        path : "/user/singUp" ,
        auth : false ,
        controller : userController.userSignup ,
    } ,
] ;
