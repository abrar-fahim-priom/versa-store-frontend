import CryptoJS from "crypto-js";
import Cookies from "js-cookie";

const setEncryptedCookie = (name, value, days) => {
  try {
    const encryptedValue = CryptoJS.AES.encrypt(
      value,
      import.meta.env.VITE_COOKIE_KEY
    ).toString();
    Cookies.set(name, encryptedValue, { expires: days });
  } catch (error) {
    console.error(`Error setting encrypted cookie ${name}:`, error);
  }
};

const getDecryptedCookie = (name) => {
  try {
    const encryptedValue = Cookies.get(name);
    if (!encryptedValue) return null;

    const bytes = CryptoJS.AES.decrypt(
      encryptedValue,
      import.meta.env.VITE_COOKIE_KEY
    );
    return bytes.toString(CryptoJS.enc.Utf8);
  } catch (error) {
    console.error(`Error getting/decrypting cookie ${name}:`, error);
    return null;
  }
};

export { getDecryptedCookie, setEncryptedCookie };
