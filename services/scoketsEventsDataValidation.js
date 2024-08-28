import Joi from "joi";


// // individual chat events schema

const joinRoomSchema = Joi.string().length(24).hex().required();

const sendMessageSchema = Joi.object({
    roomId: Joi.string().length(24).hex().required(),
    message: Joi.object({
        senderId: Joi.string().length(24).hex().required(),
        recipientId: Joi.string().length(24).hex().required(),
        textMessage: Joi.string().optional(),
        images: Joi.array().items(Joi.string()).optional() ,
    }).required() ,
});



// // group events schema

const joinGroupSchema = Joi.object({
    groupId: Joi.string().length(24).hex().required(),
});

const sendMessageInGroupSchema = Joi.object({
    groupId: Joi.string().length(24).hex().required(),
    message: Joi.object({
        senderId: Joi.string().length(24).hex().required(),
        textMessage: Joi.string().allow(" "),
        images: Joi.array().items(Joi.string().uri()),
        taggedGroupMemberId: Joi.string().length(24).hex(),
        parentMessageId: Joi.string().length(24).hex(),
    }).required(),
});










export const scoketsEventsDataValidation = {} ;


// // //   validaiton for individual chat events validation
scoketsEventsDataValidation.validateJoinRoom = async(roomId, next) => {
    const { error } = joinRoomSchema.validate(roomId);
    if (error) {
        console.error("Join room validation error:", error.details);
        return false; 
    }
    next(); 
};

scoketsEventsDataValidation.validateSendMessage = async(data, next) => {
    const { error } = sendMessageSchema.validate(data);
    if (error) {
        console.error("Send message validation error:", error.details);
        return false; // Validation failed
    }
    next(); 
};



// // //   validaiton for group events validation
scoketsEventsDataValidation.validateJoinGroupRoom = async(data, next) => {
    const { error } = joinGroupSchema.validate(data);
    if (error) {
        console.error("Invalid JOIN_ROOM data:", error.details);
        return ;
    }
    next();
} ;
scoketsEventsDataValidation.validateSendMessageInGroup = async(data, next) => {
    const { error } = sendMessageInGroupSchema.validate(data);
    if (error) {
        console.error("Invalid SEND_MESSAGE data:", error.details);
        return ; 
    }
    next();
} ;





