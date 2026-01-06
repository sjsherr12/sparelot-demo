import { functions } from "../fb_cfg";

const { httpsCallable } = require("firebase/functions");

const decline_reservation = httpsCallable(functions, 'decline_reservation');
export default decline_reservation;