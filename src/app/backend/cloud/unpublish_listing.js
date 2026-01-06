import { functions } from "../fb_cfg";

const { httpsCallable } = require("firebase/functions");

const unpublish_listing = httpsCallable(functions, 'unpublish_listing');
export default unpublish_listing;