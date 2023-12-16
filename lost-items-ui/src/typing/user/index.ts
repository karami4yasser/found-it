export type FeedbackStatisticsDto = {
  averageRating: number;
  ratingCount: number;
};

export type GetUserDetailsResponseDto = {
  firstName: string;
  lastName: string;
  phone: string;
  feedbackStatistics: FeedbackStatisticsDto;
  numberOfPosts: number;
};
export type CreateUserApiCallBody = {
  firstName: string;
  lastName: string;
  phone: string;
  password: string;
};

export type UpdateUserApiCallBody = {
  firstName: string;
  lastName: string;
  phone: string;
};
