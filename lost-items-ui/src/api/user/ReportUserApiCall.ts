import axios from "axios";

export type ReportUserRequestDto = {
  title: string;
  comment: string;
};

// backend part to be done in 
export const ReportUserApiCall = async (
  token: string,
  dto: ReportUserRequestDto,
  userId: string
) => {
  return await axios
    .post(process.env.EXPO_PUBLIC_API_BASE_URL + "/api/reports/" + userId, dto, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
    .then((response) => response)
    .catch((err) => err.response);
};
