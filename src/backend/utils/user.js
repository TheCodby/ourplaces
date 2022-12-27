import prisma from "./prisma";
export const getUserSettings = async (userId) => {
  try {
    const response = await prisma.Settings.findMany({
      where: {
        userId: userId,
      },
      select: {
        key: true,
        value: true,
      },
    });
    const settings = {};
    response.map((setting) => {
      settings[setting.key] = setting.value;
    });
    return settings;
  } catch (e) {
    throw new Error("Failed to fetch settings");
  }
};
