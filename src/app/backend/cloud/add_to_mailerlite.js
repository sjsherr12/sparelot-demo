import { functions } from "../fb_cfg";

const { httpsCallable } = require("firebase/functions");

const add_to_mailerlite = httpsCallable(functions, 'add_to_mailerlite');
export default add_to_mailerlite;