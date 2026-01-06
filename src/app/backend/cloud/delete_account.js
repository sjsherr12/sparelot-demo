import { functions } from "../fb_cfg";

const { httpsCallable } = require("firebase/functions");

const delete_account = httpsCallable(functions, 'delete_account');
export default delete_account;