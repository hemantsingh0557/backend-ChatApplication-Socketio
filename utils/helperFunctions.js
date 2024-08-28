


import jwt from "jsonwebtoken" ; 
import config from "../config/index.js";
import nodeMailer from "nodemailer" ;
import { allowedFileExtensions, FILE_ERROR_MESSAGE } from "./constants.js";
import path from "path";


export const generateJWTAccessToken = (jwtPayloadObject) => {
    return jwt.sign(jwtPayloadObject, config.auth.jwtSecret , { algorithm: "HS256" , expiresIn: "600s" });
};



export const validateSchema = (schema) => {
    return (req , res , next) => {
        if (schema.params) {
            const { error } = schema.params.validate(req.params);
            if (error) {
                return res.status(400).json({
                    error: error.details.map((err) => err.message),
                });
            }
        }
        if (schema.body) {
            const { error } = schema.body.validate(req.body );
            if (error) {
                return res.status(400).json({
                    error: error.details.map((err) => err.message),
                });
            }
        }
        if (schema.query) {
            const { error } = schema.query.validate(req.query);
            if (error) {
                return res.status(400).json({
                    error: error.details.map((err) => err.message),
                });
            }
        }
        if (schema.headers) {
            const { error } = schema.headers.validate(req.headers );
            if (error) {
                return res.status(400).json({
                    error: error.details.map((err) => err.message),
                });
            }
        }
        next();
    } ;
} ;







export const generateOtp = () => {
    return Math.floor( 100000 + Math.random() * 900000 ).toString() ;
};


export const sendEmail = async(options) => {

    const transporter = nodeMailer.createTransport({
        host: process.env.SMPT_HOST,
        port: process.env.SMPT_PORT,
        secure: true, // Use SSL for port 465
        auth: {
            user: process.env.SMPT_MAIL,
            pass: process.env.SMPT_APP_PASS,
        },
        authMethod: "LOGIN", // Specify the authentication method
    });

    const mailOptions = {
        from: process.env.SMPT_MAIL,
        to: options.to,
        subject: options.subject,
        html: options.message,
    };

    await transporter.sendMail(mailOptions);
   
};






const validateFileExtension = (filename) => {
    const fileExtension = path.extname(filename).toLowerCase();
    return allowedFileExtensions.includes(fileExtension);
};

export const fileFilter = (req, file, cb) => {
    if (validateFileExtension(file.originalname)) {
        cb(null, true); 
    } 
    else {
        cb(new Error(FILE_ERROR_MESSAGE), false); 
    }
};


