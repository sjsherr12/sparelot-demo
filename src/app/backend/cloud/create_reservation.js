import { functions } from "../fb_cfg";

const { httpsCallable } = require("firebase/functions");

const create_reservation = httpsCallable(functions, 'create_reservation');
export default create_reservation;