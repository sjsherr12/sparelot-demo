import { functions } from "../fb_cfg";

const { httpsCallable } = require("firebase/functions");

const cancel_reservation = httpsCallable(functions, 'cancel_reservation');
export default cancel_reservation;