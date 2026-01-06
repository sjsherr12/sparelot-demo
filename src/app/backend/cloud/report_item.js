import { functions } from "../fb_cfg";

const { httpsCallable } = require("firebase/functions");

const report_item = httpsCallable(functions, 'report_item');
export default report_item;