import CryptoJS from "crypto-js";
import Cookies from "js-cookie";

const setEncryptedCookie = (name, value, days) => {
  const encryptedValue = CryptoJS.AES.encrypt(
    value,
    import.meta.env.VITE_COOKIE_KEY
  ).toString();
  Cookies.set(name, encryptedValue, { expires: days });
};

const getDecryptedCookie = (name) => {
  const encryptedValue = Cookies.get(name);
  if (!encryptedValue) return null;

  const bytes = CryptoJS.AES.decrypt(
    encryptedValue,
    import.meta.env.VITE_COOKIE_KEY
  );
  const decryptedValue = bytes.toString(CryptoJS.enc.Utf8);
  return decryptedValue;
};

export { getDecryptedCookie, setEncryptedCookie };
