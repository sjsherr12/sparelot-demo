import { functions } from "../fb_cfg";

const { httpsCallable } = require("firebase/functions");

const publish_draft = httpsCallable(functions, 'publish_draft');
export default publish_draft;