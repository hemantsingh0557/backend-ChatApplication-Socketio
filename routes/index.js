import { groupRoutes } from "./groupRoutes.js";
import { individualChatRoutes } from "./individualChatRoutes.js";
import { userRoutes } from "./userRoutes.js" ;



export const allRoutes = [ ...userRoutes , ...individualChatRoutes , ...groupRoutes ] ;