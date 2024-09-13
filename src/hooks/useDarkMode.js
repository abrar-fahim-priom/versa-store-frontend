import { useContext } from "react";
import { DarkModeContext } from "../contexts";

export const useDarkMode = () => useContext(DarkModeContext);
