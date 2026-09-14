import { useState, type FormEvent } from "react";
import {
  submitApplication,
  type ContactFormData
} from "../api/mockFetch";
import { contactRegex } from "../constants/regex";

type FormErrors = {
  name?: string;
  contact?: string;
  message?: string;
  submit?: string;
};

export const ApplicationForm = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    contact: "",
    message: ""
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validateForm = (data: ContactFormData): FormErrors => {
    const errors: FormErrors = {};

    if (data.name.trim().length < 2) {
      errors.name = "Name must contain atleast 2 characters";
    }

    if (!contactRegex.test(data.contact.trim())) {
      errors.contact = "Enter a valid phone number or Telegram username.";
    }

    if (data.message.length > 500) {
      errors.message = "Message must be no more than 500 characters.";
    }

    return errors;
  }

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value
    }));

    setErrors((previous) => ({
      ...previous,
      [name]: undefined,
      submit: undefined
    }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const validationErrors = validateForm(formData);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitted(true);
    setIsSubmitting(true);

    try {
      await submitApplication(formData);
    } catch {
      setIsSubmitted(false);

      setErrors({
        submit: "Something went wrong. Please try again."
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="mx-auto max-w-2xl px-6 py-20">
      <h2 className="text-3xl font-bold">
        Apply for a job
      </h2>

      <p className="mt-3 text-gray-600">
        Leave your contact details and we will get back to you.
      </p>

      {isSubmitted ? (
        <div className="mt-8 rounded-2xl border border-gray-200 bg-gray-50 p-8">
          <h3 className="text-xl font-semibold">
            Application sent
          </h3>

          <p className="mt-2 text-gray-600">
            Thank you! We will contact you soon.
          </p>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          noValidate
          className="mt-8 space-y-5"
        >
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium"
            >
              Name
            </label>

            <input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your name"
              className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-3"
            />

            {errors.name && (
              <p className="mt-2 text-sm text-red-600">
                {errors.name}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="contact"
              className="block text-sm font-medium"
            >
              Phone or Telegram
            </label>

            <input
              id="contact"
              name="contact"
              value={formData.contact}
              onChange={handleChange}
              placeholder="+371 20000000 or @username"
              className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-3"
            />

            {errors.contact && (
              <p className="mt-2 text-sm text-red-600">
                {errors.contact}
              </p>
            )}
          </div>

          <div>
            <div className="flex justify-between">
              <label
                htmlFor="message"
                className="block text-sm font-medium"
              >
                Message
              </label>

              <span className="text-sm text-gray-400">
                {formData.message.length}/500
              </span>
            </div>

            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={5}
              maxLength={500}
              placeholder="Your message..."
              className="mt-2 w-full resize-none rounded-xl border border-gray-300 px-4 py-3"
            />

            {errors.message && (
              <p className="mt-2 text-sm text-red-600">
                {errors.message}
              </p>
            )}
          </div>

          {errors.submit && (
            <div className="rounded-xl border border-red-200 bg-red-50 p-4">
              <p className="text-sm text-red-700">
                {errors.submit}
              </p>
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-xl bg-black px-5 py-3 font-medium text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isSubmitting ? "Sending..." : "Send application"}
          </button>
        </form>
      )}
    </section>
  );
};
