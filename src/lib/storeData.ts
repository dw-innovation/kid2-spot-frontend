import axios from "axios";
import { toast } from "react-toastify";

export const saveData = async (
  stores: { name: string; getState: () => Record<string, any> }[]
) => {
  const combinedStoreData: Record<string, any> = {};

  for (const store of stores) {
    const state = store.getState();
    const storeData: Record<string, any> = {};

    for (const key in state) {
      if (typeof state[key] !== "function") {
        storeData[key] = state[key];
      }
    }

    combinedStoreData[store.name] = storeData;
  }

  try {
    const response = await axios.post("/api/saveSession", {
      data: combinedStoreData,
    });
    navigator.clipboard.writeText(
      `${window.location.href}session/${response.data.id}`
    );
    toast.success("Share link copied to clipboard!");
  } catch (error) {
    toast.error("Error saving data");
  }
};
