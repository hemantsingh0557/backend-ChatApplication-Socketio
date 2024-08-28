import { individualChatController } from "../controllers/individualChatController.js";
import Joi from "joi";

export const individualChatRoutes = [
    {
        method: "get",
        path: "/selectedFriend/:friendId",
        schema: {
            params: Joi.object({
                friendId: Joi.string().length(24).hex().required(),
            }).required(),
        },
        auth: true,
        controller: individualChatController.selectedFriend,
    },
    {
        method: "get",
        path: "/getIndividualChat/:individualChatId",
        schema: {
            params: Joi.object({
                individualChatId: Joi.string().length(24).hex().required(),
            }).required(),
            query: Joi.object({
                limit: Joi.number().integer().min(1).default(20),
                skip: Joi.number().integer().min(0).default(0),
            }).required(),
        },
        auth: true,
        controller: individualChatController.getIndividualChat,
    },
    {
        method: "delete",
        path: "/deleteIndividualChat/:individualChatId",
        schema: {
            params: Joi.object({
                individualChatId: Joi.string().length(24).hex().required(),
            }).required(),
        },
        auth: true,
        controller: individualChatController.deleteIndividualChat,
    },
];


