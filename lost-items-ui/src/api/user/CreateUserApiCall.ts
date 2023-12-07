import axios from "axios";

export type CreateUserApiCallBody = {
  firstName: string;
  lastName: string;
  phone: string;
  password: string;
};

export const CreateUserApiCall = async (data: CreateUserApiCallBody) => {
  try {
    const response = await axios
      .post(process.env.EXPO_PUBLIC_API_BASE_URL_USER + "/api/users", data, {
        headers: {
          "Content-Type": "application/json",
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
