import { httpsCallable } from "firebase/functions";
import { functions } from "../fb_cfg";

const create_user_account = httpsCallable(functions, 'create_user_account');
export default create_user_account;