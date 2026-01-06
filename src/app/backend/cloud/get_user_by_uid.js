const { httpsCallable } = require("firebase/functions");
const { functions } = require("../fb_cfg");

const get_user_by_uid = async (uid) => {
  try {
    const get_user_by_uid_backend = httpsCallable(functions, 'get_user_by_uid');
    const result = await get_user_by_uid_backend({ uid });
    return result.data;
  } catch (error) {
    alert(`error!${error}`)
    return null;
  }
};

export default get_user_by_uid;