import { prefixKeys } from "../utils";
import { STRINGS as commonStrings } from "./strings/common";
import { STRINGS as downloadDialogStrings } from "./strings/downloadDialog";
import { STRINGS as errorDialogStrings } from "./strings/errorDialog";
import { STRINGS as filtersDialogStrings } from "./strings/filtersDialog";
import { STRINGS as loadSessionDialogStrings } from "./strings/loadSessionDialog";
import { STRINGS as mapLegendStrings } from "./strings/map/mapLegend";
import { STRINGS as actionMenuStrings } from "./strings/menus/actions";
import { STRINGS as settingsMenuStrings } from "./strings/menus/settings";
import { STRINGS as queryOSMDialogStrings } from "./strings/queryOSMDialog";
import { STRINGS as saveSessionDialogStrings } from "./strings/saveSessionDialog";
import { STRINGS as spotQueryDialogStrings } from "./strings/spotQueryDialog";

export const STRINGS = {
  ...prefixKeys(actionMenuStrings, "actionMenu"),
  ...prefixKeys(commonStrings, "common"),
  ...prefixKeys(downloadDialogStrings, "downloadDialog"),
  ...prefixKeys(errorDialogStrings, "errorDialog"),
  ...prefixKeys(filtersDialogStrings, "filtersDialog"),
  ...prefixKeys(spotQueryDialogStrings, "spotQueryDialog"),
  ...prefixKeys(loadSessionDialogStrings, "loadSessionDialog"),
  ...prefixKeys(mapLegendStrings, "mapLegend"),
  ...prefixKeys(queryOSMDialogStrings, "queryOSMDialog"),
  ...prefixKeys(saveSessionDialogStrings, "saveSessionDialog"),
  ...prefixKeys(settingsMenuStrings, "settingsMenu"),
};
