
export const chatCompletionValidator = [
    body("message").notEmpty().withMessage("Message  is required"),
  ];