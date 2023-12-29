import axios from "axios";

export const GetCurrentUserDetailsApiCall = async (
  token: string,
  userId?: string
): Promise<any> => {
  try {
    if (!userId) {
      return await axios
      .get(process.env.EXPO_PUBLIC_API_BASE_URL + "/api/users/profile", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => response)
      .catch((err) => err.response);
    } else {
      return await axios
      .get(process.env.EXPO_PUBLIC_API_BASE_URL + `/api/users/profile/${userId}`, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => response)
      .catch((err) => err.response);
    }
  } catch (error) {
    console.error("API request error:", error);
    return null;
  }
};
