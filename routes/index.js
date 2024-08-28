import { fileRoutes } from "./fileRoutes.js";
import { groupRoutes } from "./groupRoutes.js";
import { individualChatRoutes } from "./individualChatRoutes.js";
import { otpRoutes } from "./otpRoutes.js";
import { userRoutes } from "./userRoutes.js" ;



export const allRoutes = [ ...userRoutes , ...individualChatRoutes , ...groupRoutes , ...otpRoutes , ...fileRoutes ] ;