import { describe, expect, it } from "vitest";
import {
  validateForm,
  type FormData,
} from "../../src/utils/validation";

describe("validateForm", () => {
  it("accepts valid form data", () => {
    const data: FormData = {
      name: "John",
      contact: "+371 20000000",
      message: "I am interested in the vacancy.",
    };

    expect(validateForm(data)).toEqual({});
  });

  it("rejects a name shorter than 2 characters", () => {
    const data: FormData = {
      name: "A",
      contact: "+371 20000000",
      message: "",
    };

    const errors = validateForm(data);

    expect(errors.name).toBe(
      "Name must contain at least 2 characters."
    );
  });

  it("rejects an invalid contact", () => {
    const data: FormData = {
      name: "John",
      contact: "hello",
      message: "",
    };

    const errors = validateForm(data);

    expect(errors.contact).toBe(
      "Enter a valid phone number or Telegram username."
    );
  });

  it("accepts a Telegram username", () => {
    const data: FormData = {
      name: "John",
      contact: "@john_work",
      message: "",
    };

    expect(validateForm(data)).toEqual({});
  });

  it("rejects a message longer than 500 characters", () => {
    const data: FormData = {
      name: "John",
      contact: "@john_work",
      message: "a".repeat(501),
    };

    const errors = validateForm(data);

    expect(errors.message).toBe(
      "Message must contain no more than 500 characters."
    );
  });

  it("accepts a message with exactly 500 characters", () => {
    const data: FormData = {
      name: "John",
      contact: "@john_work",
      message: "a".repeat(500),
    };

    expect(validateForm(data)).toEqual({});
  });

  it("trims the name and contact before validation", () => {
    const data: FormData = {
      name: " John ",
      contact: " @john_work ",
      message: "",
    };

    expect(validateForm(data)).toEqual({});
  });
});
