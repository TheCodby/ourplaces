import axios from "axios";

export const getMyProviders = async () => {
  try {
    const data = await axios.get("/api/user/providers").then((r) => r.data);
    if (!data) {
      throw new Error("Failed to fetch user providers");
    }

    return data;
  } catch (e) {
    throw new Error("Failed to fetch providers");
  }
};
export const getMySettings = async () => {
  try {
    const data = await axios.get("/api/user/settings").then((r) => r.data);
    if (!data) {
      throw new Error("Failed to fetch user settings");
    }

    return data;
  } catch (e) {
    throw new Error("Failed to fetch settings");
  }
};
