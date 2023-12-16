import axios from "axios";
import {
  CreateUserApiCallBody,
  UpdateUserApiCallBody,
} from "../../typing/user";

export const UpdateUserApiCall = async (
  data: UpdateUserApiCallBody,
  token: string
) => {
  try {
    const response = await axios
      .put(process.env.EXPO_PUBLIC_API_BASE_URL + "/api/users", data, {
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
