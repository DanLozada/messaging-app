const PROD_URL = "https://supplynownodeapi.herokuapp.com";
const DEV_URL = "http://localhost:8080";

export const CURRENT_URL = PROD_URL;

export const REMOVE_CONVERSATION_URL = `${CURRENT_URL}/api/v1/conversations/removeConversation?sid=`;
export const GET_DISPATCH_INFO_URL = `${CURRENT_URL}/api/v1/mongo/dispatch/getInfo?conversation_sid=`;
export const GET_ORDER_BY_ID_URL = `${CURRENT_URL}/api/v1/orders/fetch/`;
export const COMPLETE_ORDER_URL = `${CURRENT_URL}/api/v1/mongo/dispatch/update?sid=`;
export const ADD_DISPATCH_MODIFICATION_URL = `${CURRENT_URL}/api/v1/mongo/dispatch/modify?order=`;
export const GET_TWILIO_TOKEN_URL = `${CURRENT_URL}/api/v1/conversations/generateToken`;
export const GET_ALL_DISPATCHED_URL = `${CURRENT_URL}/api/v1/dispatch/getAll`;
