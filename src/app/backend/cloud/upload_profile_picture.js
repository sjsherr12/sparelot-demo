import { functions } from "../fb_cfg";

const { httpsCallable } = require("firebase/functions");

const upload_profile_picture = httpsCallable(functions, 'upload_profile_picture');
export default upload_profile_picture;