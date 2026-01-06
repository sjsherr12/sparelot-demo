import { functions } from "../fb_cfg";

const { httpsCallable } = require("firebase/functions");

const get_all_stripe_transactions = httpsCallable(functions, 'get_all_stripe_transactions');
export default get_all_stripe_transactions;