import { functions } from "../fb_cfg";

const { httpsCallable } = require("firebase/functions");

const approve_reservation = httpsCallable(functions, 'approve_reservation');
export default approve_reservation;