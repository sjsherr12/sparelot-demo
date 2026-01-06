import { httpsCallable } from "firebase/functions";
import { functions } from "../fb_cfg";

const create_chat_for_users = httpsCallable(functions, 'create_chat_for_users');
export default create_chat_for_users;