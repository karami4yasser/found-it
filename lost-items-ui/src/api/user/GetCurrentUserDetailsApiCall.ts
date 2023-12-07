import axios from "axios";

export const GetCurrentUserDetailsApiCall = async (token: string) => {
  try {
    const response = await axios
      .get(process.env.EXPO_PUBLIC_API_BASE_URL_USER + "/api/users/profile", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => response)
      .catch((err) => err.response);
    return response;
  } catch (error) {
    console.error("API request error:", error);
    return null;
  }
};
