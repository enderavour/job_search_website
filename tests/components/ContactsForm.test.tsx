import {
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { ContactsForm } from "../../src/components/ContactsForm";
import { submitContactForm } from "../../src/api/mockFetch";

vi.mock("../../src/api/mockFetch", () => ({
  submitContactForm: vi.fn(),
}));

const mockedSubmitContactForm =
  vi.mocked(submitContactForm);

describe("ContactForm", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders all form fields and submit button", () => {
    render(<ContactsForm />);

    expect(
      screen.getByLabelText("Name")
    ).toBeInTheDocument();

    expect(
      screen.getByLabelText("Phone or Telegram")
    ).toBeInTheDocument();

    expect(
      screen.getByLabelText("Message")
    ).toBeInTheDocument();

    expect(
      screen.getByRole("button", {
        name: "Send message",
      })
    ).toBeInTheDocument();
  });

  it("shows validation error for invalid name", async () => {
    const user = userEvent.setup();

    render(<ContactsForm />);

    await user.type(
      screen.getByLabelText("Name"),
      "A"
    );

    await user.type(
      screen.getByLabelText("Phone or Telegram"),
      "+371 20000000"
    );

    await user.click(
      screen.getByRole("button", {
        name: "Send message",
      })
    );

    expect(
      screen.getByText(
        "Name must contain at least 2 characters."
      )
    ).toBeInTheDocument();

    expect(
      mockedSubmitContactForm
    ).not.toHaveBeenCalled();
  });

  it("shows validation error for invalid contact", async () => {
    const user = userEvent.setup();

    render(<ContactsForm />);

    await user.type(
      screen.getByLabelText("Name"),
      "John"
    );

    await user.type(
      screen.getByLabelText("Phone or Telegram"),
      "invalid"
    );

    await user.click(
      screen.getByRole("button", {
        name: "Send message",
      })
    );

    expect(
      screen.getByText(
        "Enter a valid phone number or Telegram username."
      )
    ).toBeInTheDocument();

    expect(
      mockedSubmitContactForm
    ).not.toHaveBeenCalled();
  });

  it("submits valid contact form data", async () => {
    const user = userEvent.setup();

    mockedSubmitContactForm.mockResolvedValue(undefined);

    render(<ContactsForm />);

    await user.type(
      screen.getByLabelText("Name"),
      "John"
    );

    await user.type(
      screen.getByLabelText("Phone or Telegram"),
      "@john_work"
    );

    await user.type(
      screen.getByLabelText("Message"),
      "I would like to find a worker."
    );

    await user.click(
      screen.getByRole("button", {
        name: "Send message",
      })
    );

    await waitFor(() => {
      expect(
        mockedSubmitContactForm
      ).toHaveBeenCalledWith({
        name: "John",
        contact: "@john_work",
        message: "I would like to find a worker.",
      });
    });
  });

  it("shows success state after submitting the form", async () => {
    const user = userEvent.setup();

    mockedSubmitContactForm.mockResolvedValue(undefined);

    render(<ContactsForm />);

    await user.type(
      screen.getByLabelText("Name"),
      "John"
    );

    await user.type(
      screen.getByLabelText("Phone or Telegram"),
      "+371 20000000"
    );

    await user.click(
      screen.getByRole("button", {
        name: "Send message",
      })
    );

    expect(
      await screen.findByRole("heading", {
        name: "Message sent",
      })
    ).toBeInTheDocument();

    expect(
      screen.getByText(
        "Thank You for contacting VV work. We will get back to you soon."
      )
    ).toBeInTheDocument();
  });

  it("allows the user to send another message", async () => {
    const user = userEvent.setup();

    mockedSubmitContactForm.mockResolvedValue(undefined);

    render(<ContactsForm />);

    await user.type(
      screen.getByLabelText("Name"),
      "John"
    );

    await user.type(
      screen.getByLabelText("Phone or Telegram"),
      "@john_work"
    );

    await user.click(
      screen.getByRole("button", {
        name: "Send message",
      })
    );

    await screen.findByRole("heading", {
      name: "Message sent",
    });

    await user.click(
      screen.getByRole("button", {
        name: "Send another message",
      })
    );

    expect(
      screen.getByLabelText("Name")
    ).toHaveValue("");

    expect(
      screen.getByLabelText("Phone or Telegram")
    ).toHaveValue("");

    expect(
      screen.getByLabelText("Message")
    ).toHaveValue("");

    expect(
      screen.getByRole("button", {
        name: "Send message",
      })
    ).toBeInTheDocument();
  });

  it("shows an error when submission fails", async () => {
    const user = userEvent.setup();

    mockedSubmitContactForm.mockRejectedValue(
      new Error("Failed to submit")
    );

    render(<ContactsForm />);

    await user.type(
      screen.getByLabelText("Name"),
      "John"
    );

    await user.type(
      screen.getByLabelText("Phone or Telegram"),
      "+371 20000000"
    );

    await user.click(
      screen.getByRole("button", {
        name: "Send message",
      })
    );

    expect(
      await screen.findByText(
        "Something went wrong. Please try again."
      )
    ).toBeInTheDocument();

    expect(
      screen.getByRole("button", {
        name: "Send message",
      })
    ).toBeInTheDocument();
  });

  it("updates the message character counter", async () => {
    const user = userEvent.setup();

    render(<ContactsForm />);

    const message =
      screen.getByLabelText("Message");

    expect(
      screen.getByText("0/500")
    ).toBeInTheDocument();

    await user.type(message, "Hello");

    expect(
      screen.getByText("5/500")
    ).toBeInTheDocument();
  });

  it("clears the submit error when the user changes a field", async () => {
    const user = userEvent.setup();

    mockedSubmitContactForm.mockRejectedValue(
      new Error("Failed to submit")
    );

    render(<ContactsForm />);

    await user.type(
      screen.getByLabelText("Name"),
      "John"
    );

    await user.type(
      screen.getByLabelText("Phone or Telegram"),
      "+371 20000000"
    );

    await user.click(
      screen.getByRole("button", {
        name: "Send message",
      })
    );

    expect(
      await screen.findByText(
        "Something went wrong. Please try again."
      )
    ).toBeInTheDocument();

    await user.type(
      screen.getByLabelText("Name"),
      "n"
    );

    expect(
      screen.queryByText(
        "Something went wrong. Please try again."
      )
    ).not.toBeInTheDocument();
  });
});
