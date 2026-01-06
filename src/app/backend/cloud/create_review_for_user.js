import { functions } from "../fb_cfg";

const { httpsCallable } = require("firebase/functions");

const create_review_for_user = httpsCallable(functions, 'create_review_for_user');
export default create_review_for_user;