import { functions } from "../fb_cfg";

const { httpsCallable } = require("firebase/functions");

const checkIfUserExists = httpsCallable(functions, 'checkIfUserExists');
export default checkIfUserExists;