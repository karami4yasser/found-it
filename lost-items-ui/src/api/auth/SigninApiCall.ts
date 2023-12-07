import axios from "axios";

export type SigninApiCallBody = {
  emailOrPhone: string;
  password: string;
};

export const SigninApiCall = async (data: SigninApiCallBody) => {
  try {
    const response = await axios
      .post(
        process.env.EXPO_PUBLIC_API_BASE_URL_USER + "/api/auth/signIn",
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => response)
      .catch((err) => err.response);
    return response;
  } catch (error) {
    console.error("API request error:", error);
    return null;
  }
};
