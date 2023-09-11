import { prefixKeys } from "../utils";
import { STRINGS as downloadDialogStrings } from "./strings/downloadDialog";
import { STRINGS as errorDialogStrings } from "./strings/errorDialog";
import { STRINGS as imrDialogStrings } from "./strings/imrDialog";
import { STRINGS as settingsMenuStrings } from "./strings/menus/settings";

export const STRINGS = {
  ...downloadDialogStrings,
  ...errorDialogStrings,
  ...imrDialogStrings,
  ...prefixKeys(settingsMenuStrings, "settingsMenu"),
};
