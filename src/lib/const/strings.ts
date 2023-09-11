import { prefixKeys } from "../utils";
import { STRINGS as downloadDialogStrings } from "./strings/downloadDialog";
import { STRINGS as errorDialogStrings } from "./strings/errorDialog";
import { STRINGS as imrDialogStrings } from "./strings/imrDialog";
import { STRINGS as mapLegendStrings } from "./strings/map/mapLegend";
import { STRINGS as actionMenuStrings } from "./strings/menus/actions";
import { STRINGS as settingsMenuStrings } from "./strings/menus/settings";

export const STRINGS = {
  ...prefixKeys(downloadDialogStrings, "downloadDialog"),
  ...prefixKeys(errorDialogStrings, "errorDialog"),
  ...prefixKeys(imrDialogStrings, "imrDialog"),
  ...prefixKeys(settingsMenuStrings, "settingsMenu"),
  ...prefixKeys(mapLegendStrings, "mapLegend"),
  ...prefixKeys(actionMenuStrings, "actionMenu"),
};
