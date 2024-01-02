import axios from "axios";

export const GetFeedbacksRequestApiCall = async (
  token: string | null,
  userId: string | null,
  offset: number 
) => {
  if (!userId) {
    return (await axios
      .get(process.env.EXPO_PUBLIC_API_BASE_URL + "/api/feedbacks?limit=10&offset=" + offset, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })).data;
  } else {
    return (await axios
      .get(process.env.EXPO_PUBLIC_API_BASE_URL + "/api/feedbacks/" + userId + "?limit=10&offset=" + offset, {
        headers: {
          "Content-Type": "application/json",
        },
      })).data;
  }
};
