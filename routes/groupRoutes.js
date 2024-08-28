import Joi from "joi";
import { groupController } from "../controllers/groupController.js";

export const groupRoutes = [
    {
        method: "post",
        path: "/createGruop",
        schema: {
            body: Joi.object({
                groupName: Joi.string().length(5).required(),
                groupImage: Joi.string(),
                groupMembersIds: Joi.array().items(Joi.string().length(24).hex().required()),
            }).required(),
        },
        auth: true,
        controller: groupController.createGroup,
    },
    {
        method: "get",
        path: "/getGruopChat/:groupChatId",
        schema: {
            params: Joi.object({
                groupChatId: Joi.string().length(24).hex().required(),
            }).required(),
            query: Joi.object({
                limit: Joi.number().integer().min(1).default(20),
                skip: Joi.number().integer().min(0).default(0),
            }).required(),
        },
        auth: true,
        controller: groupController.getGruopChat,
    },
    {
        method: "delete",
        path: "/deleteGroup/:groupId",
        schema: {
            params: Joi.object({
                groupId: Joi.string().length(24).hex().required(),
            }).required(),
        },
        auth: true,
        controller: groupController.deleteGroup,
    },
    {
        method: "get",
        path: "/getGroupMembers/:groupId",
        schema: {
            params: Joi.object({
                groupId: Joi.string().length(24).hex().required(),
            }).required(),
        },
        auth: true,
        controller: groupController.getGroupMembers,
    },
];


