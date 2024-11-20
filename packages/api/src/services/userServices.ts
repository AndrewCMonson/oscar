import { prismadb } from "../config/index.js";

export const getUserByRole = async (role: string) => {
  try {
    const user = await prismadb.user.findFirst({
      where: {
        role,
      },
    });

    if (!user) {
      throw new Error("An error occurred getting the user");
    }

    return user;
  } catch (error) {
    console.error(error);
    throw new Error("An error occurred getting the user");
  }
};

export const getUserById = async (userId: string) => {
  try {
    const user = await prismadb.user.findFirst({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new Error("An error occurred getting the user");
    }

    return user;
  } catch (error) {
    console.error(error);
    throw new Error("An error occurred getting the user");
  }
};


// export const updateUserPreferences = async (
//   userId: string,
//   preferences: UserPreferences,
// ) => {
//   try {
//     const existingUserPreferences = await prismadb.userPreferences.findFirst({
//       where: {
//         userId: userId,
//       },
//     });

//     // take the existing preferences and update them with the new preferences
//     const updatedPreferences = {
//       ...existingUserPreferences,
//       ...preferences,
//     }

//     // update the user preferences
//     const updatedUserPreferences = await prismadb.userPreferences.update({
//       where: {
//         id: existingUserPreferences?.id,
//       },
//       data: {
//         ...updatedPreferences,
//       },
//     });
      

//     console.log("ExistingPreferences", existingUserPreferences);


//     // console.log("UpdatedPreferences", updatedPreferences?.integrations);
//   } catch (error) {
//     console.error(error);
//     throw new Error("An error occurred updating the user preferences");
//   }
// };

// // updateUserPreferences("cm3necffw000011v7goo5ooab", {
// //   tone: Tone.CONCISE,
// //   id: "",
// //   createdAt: undefined,
// //   updatedAt: undefined,
// //   userId: "",
// //   responseStyle: "CONVERSATIONAL",
// //   preferredLanguage: "",
// //   timeZone: ""
// // });