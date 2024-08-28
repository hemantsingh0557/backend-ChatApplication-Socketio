import { userController } from "../controllers/userController.js";
import Joi from "joi" ;

export const userRoutes = [
    {
        method: "post",
        path : "/user/signUp",
        schema : {
            body : Joi.object({
                name: Joi.string().required() ,   
                age : Joi.number().min(10).max(100) ,
                email: Joi.string().email().required() , 
                mobileNumber : Joi.string().length(10).pattern(/[6-9]{1}[0-9]{9}/).required() ,
                statusMessage: Joi.string() ,
                password: Joi.string().min(4).required() , // // match: [/(?=.*[a-zA-Z])(?=.*\d)(?=.*\W)/, 'Password must contain at least one letter, one number, and one special character']
                confirmPassword : Joi.ref("password") ,
            }).required(),
        },
        auth : false ,
        controller : userController.userSignUp,
    },
    {
        method : "post" ,
        path : "/user/signIn",
        schema : {
            body: Joi.alternatives().try(
                Joi.object({
                    email: Joi.string().email().required(),
                    password: Joi.string().min(4).required(),
                }),
                Joi.object({
                    mobileNumber: Joi.string().length(10).pattern(/[6-9]{1}[0-9]{9}/).required(),
                }),
            ).required(),
        } ,
        auth : false ,
        controller : userController.userSignIn,
    } ,
] ;
