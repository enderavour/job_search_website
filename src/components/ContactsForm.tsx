import { type FormEvent, useState } from "react";
import { submitContactForm } from "../api/mockFetch";
import { validateForm } from "../utils/validation";

type ContactFormData = {
  name: string;
  contact: string;
  message: string;
};

type FormErrors = {
  name?: string;
  contact?: string;
  message?: string;
  submit?: string;
};

export const ContactsForm = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    contact: "",
    message: ""
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (
    field: keyof ContactFormData,
    value: string
  ) => {
    setFormData((current) => ({
      ...current,
      [field]: value
    }));

    setErrors((current) => ({
      ...current,
      [field]: undefined,
      submit: undefined
    }));
  };

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    const validationErrors = validateForm(formData);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setIsSubmitted(true);
    setIsSubmitting(false);

    try {
      await submitContactForm(formData);
    } catch {
      setIsSubmitted(false);
      setErrors({
        submit: "Something went wrong. Please try again."
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="rounded-2xl border border-gray-900 bg-white p-8">
        <h2 className="text-2xl fontt-semibold text-gray-900">
          Message sent
        </h2>

        <p className="mt-3 text-gray-600">
          Thank You for contacting VV work. We will get back to you soon.
        </p>

        <button
          type="button"
          onClick={() => {
            setFormData({
              name: "",
              contact: "",
              message: ""
            });
            setIsSubmitted(false);
          }}
          className="mt-6 rounded-xl bg-gray-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-gray-700"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm md:p-8"
    >
      <div>
        <label
          htmlFor="contact-name"
          className="text-sm font-medium text-gray-900"
        >
          Name
        </label>

        <input
          id="contact-name"
          name="name"
          type="text"
          value={formData.name}
          onChange={(event) =>
            handleChange("name", event.target.value)
          }
          aria-invalid={Boolean(errors.name)}
          aria-describedby={
            errors.name ? "contact-name-error" : undefined
          }
          className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-gray-900"
          placeholder="Your name"
        />

        {errors.name && (
          <p
            id="contact-name-error"
            className="mt-2 text-sm text-red-600"
          >
            {errors.name}
          </p>
        )}
      </div>

      <div className="mt-5">
        <label
          htmlFor="contact-contact"
          className="text-sm font-medium text-gray-900"
        >
          Phone or Telegram
        </label>

        <input
          id="contact-contact"
          name="contact"
          type="text"
          value={formData.contact}
          onChange={(event) =>
            handleChange("contact", event.target.value)
          }
          aria-invalid={Boolean(errors.contact)}
          aria-describedby={
            errors.contact ? "contact-contact-error" : undefined
          }
          className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-gray-900"
          placeholder="+371 20000000 or @username"
        />

        {errors.contact && (
          <p
            id="contact-contact-error"
            className="mt-2 text-sm text-red-600"
          >
            {errors.contact}
          </p>
        )}
      </div>

      <div className="mt-5">
        <div className="flex items-center justify-between">
          <label
            htmlFor="contact-message"
            className="text-sm font-medium text-gray-900"
          >
            Message
          </label>

          <span className="text-xs text-gray-500">
            {formData.message.length}/500
          </span>
        </div>

        <textarea
          id="contact-message"
          name="message"
          rows={5}
          value={formData.message}
          onChange={(event) =>
            handleChange("message", event.target.value)
          }
          aria-invalid={Boolean(errors.message)}
          aria-describedby={
            errors.message ? "contact-message-error" : undefined
          }
          className="mt-2 w-full resize-none rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-gray-900"
          placeholder="Tell us how we can help"
        />

        {errors.message && (
          <p
            id="contact-message-error"
            className="mt-2 text-sm text-red-600"
          >
            {errors.message}
          </p>
        )}
      </div>

      {errors.submit && (
        <p className="mt-5 text-sm text-red-600">
          {errors.submit}
        </p>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-6 w-full rounded-xl bg-gray-900 px-5 py-3 font-medium text-white transition hover:bg-gray-700 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSubmitting ? "Sending..." : "Send message"}
      </button>
    </form>
  );
};
