import axios from "axios";

const RefreshAccessTokenApiCall = async (refreshToken: string) => {
  const response = await axios
    .post(
      process.env.EXPO_PUBLIC_API_BASE_URL_USER + "/api/auth/refreshToken",
      {},
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${refreshToken}`,
        },
      }
    )
    .then((response) => response)
    .catch((err) => err.response);
  return response;
};

export default RefreshAccessTokenApiCall;
