import { allRoutes } from "../routes/index.js";
import express from "express" ; 
import cors from "cors" ; 
import { authenticateToken } from "../services/authService.js";
import { fileFilter, validateSchema } from "../utils/helperFunctions.js";
import multer from "multer";
import { UPLOAD_FILES_DESTINATION } from "../utils/constants.js";
import path from "path";


const storage = multer.diskStorage({
    destination: UPLOAD_FILES_DESTINATION,
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
    },
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 10000000 }, 
    fileFilter: fileFilter,
}).single("imageFile"); 



const handler = (controller) =>{
    return (req , res) => {
        const payload = {
            ...(res.body || {}) ,
            ...(res.params || {}) ,
            ...(res.query || {}) ,
            userId : req.userId ,
            files : req.files ,
        } ;
        controller(payload)
            .then(async(result) => {
                res.status(result.statusCode).json(result.data) ;
            })
            .catch(async(error) => {
                res.status(error.statusCode || 500 ).json({ message : error.message }) ;
            }) ;
    } ;
} ;


export async function expressStartup(app) {
    app.use(express.json()) ;
    app.use(cors());
    app.get( "/" , (req, res) => {
        res.send("This is the chat apllicaiton using node js and socket io") ;
    } );
    allRoutes.forEach((route) => {
        const { method, path, schema = {}, auth = false, controller , uploadFile } = route;
        const middleware = [] ;
        if( schema ) { middleware.push(validateSchema(schema)) ; }
        if( auth ) { middleware.push(authenticateToken) ; }
        if( uploadFile ) { middleware.push(upload) ; } 
        app[method](path , ...middleware , handler(controller) ) ;
    });
}







