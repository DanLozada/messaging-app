const PROD_URL = "https://supplynownodeapi.herokuapp.com";
const DEV_URL = "http://localhost:3000";

export const CURRENT_URL = DEV_URL;

export const SEND_MESSAGE_URL = `${CURRENT_URL}/api/v1/conversations/sendMessage`;
export const GET_CONVERSATIONS_URL = `${CURRENT_URL}/api/v1/conversations/getConversations`;
export const GET_MESSAGES_URL = `${CURRENT_URL}/api/v1/conversations/getConversationMessages?sid=`;
export const REMOVE_CONVERSATION_URL = `${CURRENT_URL}/api/v1/conversations/removeConversation?sid=`;
export const GET_CONVO_NAME_URL = `${CURRENT_URL}/api/v1/conversations/getConversationName?sid=`;
export const GET_TOKEN_URL = `${CURRENT_URL}/api/v1/conversations/generateToken`;
export const GET_DISPATCH_INFO_URL = `${CURRENT_URL}/api/v1/mongo/dispatch/getInfo?conversation_sid=`;
export const CREATE_CONVERSATION_URL = `${CURRENT_URL}/api/v1/conversations/createConversation?client=`;
