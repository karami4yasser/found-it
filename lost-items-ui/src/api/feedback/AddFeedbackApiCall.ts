import axios from "axios";

export type AddFeedbackRequestDto = {
  rating: number;
  comment: string;
};

export const AddFeedbackApiCall = async (
  token: string,
  dto: AddFeedbackRequestDto,
  userId: string
) => {
  return await axios
    .post(process.env.EXPO_PUBLIC_API_BASE_URL + "/api/feedbacks/" + userId, dto, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
    .then((response) => response)
    .catch((err) => err.response);
};
