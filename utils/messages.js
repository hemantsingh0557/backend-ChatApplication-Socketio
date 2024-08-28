


export const RESPONSE_MESSAGE = {

    // // user realted messages
    USER_EXIST : "Email or mobile number already exists" ,
    SIGNED_UP : "New user signed up successfully. Now please verify your OTP" ,
    USER_NOT_EXIST : "User does not exist " ,
    PASSWORD_MISMATCH : "Unauthorized access" ,
    VARIFY_OTP : "Please verify your OTP" ,
    SIGNED_IN : "User signed in successfully" ,
    PASSWORD_RESET_FAILED : "Failed to reset password ." ,
    PASSWORD_RESET : "Password has been reset successfully." ,
   
   
    // // otp realted messages
    FAILED_SAVE_OTP : "Otp can't be saved in DB" ,
    OTP_SENT_SUCCESSFULLY : "Otp sent successfully" ,
    FAILED_TO_SEND_OTP : "Failed to send OTP via email" ,
    FAILED_MOBILE_NUMBER_OTP : "Failed to send OTP via mobile number" ,
    EXPIRED_OTP : "OTP is expired or not found. Please try to resend the OTP" ,
    INVALID_OTP : "Invalid OTP. Please enter the correct OTP" ,
    OTP_VERIFIED_SUCCESSFULLY : "OTP is verified successfully" ,
    VERIFY_OTP : "Please varify your otp" ,
    

    // Authentication related messages
    AUTHENTICATION_ERROR: "Authentication error",
    TOKEN_MISSING: "Token is missing",
    TOKEN_INVALID: "Token is invalid",



    // chat related message
    CHAT_NOT_FOUND: "Chat not found",
    CHAT_FOUND: "Chat found",
    CHAT_ALREADY_EXISTS: "Chat already exists",
    CHAT_MESSAGE_FOUND: "Chat message found",
    CHAT_MESSAGE_NOT_FOUND: "Chat message not found",
    CHAT_MESSAGE_SENT: "Chat message sent",
    CHAT_MESSAGE_NOT_SENT: "Chat message is not sent",
    CHAT_NOT_CREATED: "Chat can not be created ",
    CHAT_NOT_DELETED: "Chat not deleted ",
    CHAT_DELETED: "Chat deleted ",

    GROUP_NOT_FOUND : "Group not found" ,
    GROUP_FOUND : "Group found" ,
    GROUP_NOT_DELETED : "Group not deletd" ,
    GROUP_DELETED : "Group deleted" ,
    GROUP_NOT_CREATED : "Group not creaded" ,
    GROUP_CREATED : "Group created" ,
    GROUP_MEMBERS_NOT_FOUND : "Group members not found " ,
    GROUP_MEMBERS_FETCHED : "Group members fetched " ,


    // // files realted messages
    FILE_UPLOADED_SUCCESSFULLY : "Files uploaded successfully" ,
    FAILED_TO_UPLOAD_FILE : "Failed to upload some files" ,
    NO_FILES_PROVIDED : "No files provided" ,
    ERROR_DURING_FILE_SAVE : "Error during file save" ,

    // User status messages
    USER_ONLINE: "User is online",
    USER_OFFLINE: "User is offline",
    LAST_SEEN_UPDATED: "User's last seen status updated",



    // Socket related error messages
    ERROR_UPDATING_STATUS: "Error updating user status",
    ERROR_JOINING_ROOM: "Error joining room",
    ERROR_SENDING_MESSAGE: "Error sending message",
    ERROR_JOINING_GROUP: "Error joining group",
    ERROR_SENDING_GROUP_MESSAGE: "Error sending group message",
    ERROR_UPDATING_STATUS_ON_DISCONNECT: "Error updating user status on disconnect",




} ;   



