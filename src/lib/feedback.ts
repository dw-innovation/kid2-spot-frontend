export const saveFeedback = async (
  sessionLink: string,
  feedback?: boolean,
  text?: string,
  feedbackId?: string
): Promise<string> => {
  const response = await fetch("/api/saveFeedback", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      data: {
        sessionLink,
        feedback,
        text,
        feedbackId,
      },
    }),
  });

  const result = await response.json();
  return result.id;
};
