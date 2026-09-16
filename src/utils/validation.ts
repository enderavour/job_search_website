import { contactRegex } from "../constants/regex";

export type FormData = {
  name: string;
  contact: string;
  message: string;
};

export type FormErrors = {
  name?: string;
  contact?: string;
  message?: string;
};

export const validateForm = (
  data: FormData
): FormErrors => {
  const errors: FormErrors = {};

  if (data.name.trim().length < 2) {
    errors.name =
      "Name must contain at least 2 characters.";
  }


  if (!contactRegex.test(data.contact.trim())) {
    errors.contact =
      "Enter a valid phone number or Telegram username.";
  }

  if (data.message.length > 500) {
    errors.message =
      "Message must contain no more than 500 characters.";
  }

  return errors;
};
