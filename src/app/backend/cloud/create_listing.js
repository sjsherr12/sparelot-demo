import { functions } from "../fb_cfg";

const { httpsCallable } = require("firebase/functions");

const create_listing = httpsCallable(functions, 'create_listing');
export default create_listing;