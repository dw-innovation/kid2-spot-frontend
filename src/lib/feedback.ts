import axios from "axios";

export const saveFeedback = async (
  sessionLink: string,
  feedback?: boolean,
  text?: string,
  feedbackId?: string
): Promise<string> => {
  const response = await axios.post("/api/saveFeedback", {
    data: {
      sessionLink,
      feedback,
      text,
      feedbackId,
    },
  });

  return response.data.id;
};
