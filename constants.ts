const PROD_URL = "https://supplynownodeapi.herokuapp.com";
const DEV_URL = "http://localhost:8000";

export const CURRENT_URL = PROD_URL;

export const SEND_MESSAGE_URL = `${CURRENT_URL}/api/v1/conversations/sendMessage`;
export const GET_CONVERSATIONS_URL = `${CURRENT_URL}/api/v1/conversations/getConversations`;
export const GET_MESSAGES_URL = `${CURRENT_URL}/api/v1/conversations/getConversationMessages?sid=`;
export const REMOVE_CONVERSATION_URL = `${CURRENT_URL}/api/v1/conversations/removeConversation?sid=`;
export const GET_CONVO_NAME_URL = `${CURRENT_URL}/api/v1/conversations/getConversationName?sid=`;
