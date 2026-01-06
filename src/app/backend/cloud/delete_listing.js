import { functions } from "../fb_cfg";

const { httpsCallable } = require("firebase/functions");

const delete_listing = httpsCallable(functions, 'delete_listing');
export default delete_listing;