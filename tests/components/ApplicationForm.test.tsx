import {
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { ApplicationForm } from "../../src/components/ApplicationForm";
import { submitApplication } from "../../src/api/mockFetch";

vi.mock("../../src/api/mockFetch", () => ({
  submitApplication: vi.fn(),
}));

const mockedSubmitApplication = vi.mocked(submitApplication);

describe("ApplicationForm", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders the form fields and submit button", () => {
    render(<ApplicationForm />);

    expect(
      screen.getByRole("heading", {
        name: "Apply for a job",
      })
    ).toBeInTheDocument();

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
        name: "Send application",
      })
    ).toBeInTheDocument();
  });

  it("shows validation error for a name shorter than 2 characters", async () => {
    const user = userEvent.setup();

    render(<ApplicationForm />);

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
        name: "Send application",
      })
    );

    expect(
      screen.getByText(
        "Name must contain at least 2 characters."
      )
    ).toBeInTheDocument();

    expect(
      mockedSubmitApplication
    ).not.toHaveBeenCalled();
  });

  it("shows validation error for an invalid contact", async () => {
    const user = userEvent.setup();

    render(<ApplicationForm />);

    await user.type(
      screen.getByLabelText("Name"),
      "John"
    );

    await user.type(
      screen.getByLabelText("Phone or Telegram"),
      "invalid contact"
    );

    await user.click(
      screen.getByRole("button", {
        name: "Send application",
      })
    );

    expect(
      screen.getByText(
        "Enter a valid phone number or Telegram username."
      )
    ).toBeInTheDocument();

    expect(
      mockedSubmitApplication
    ).not.toHaveBeenCalled();
  });

  it("does not submit when required fields are invalid", async () => {
    const user = userEvent.setup();

    render(<ApplicationForm />);

    await user.click(
      screen.getByRole("button", {
        name: "Send application",
      })
    );

    expect(
      screen.getByText(
        "Name must contain at least 2 characters."
      )
    ).toBeInTheDocument();

    expect(
      screen.getByText(
        "Enter a valid phone number or Telegram username."
      )
    ).toBeInTheDocument();

    expect(
      mockedSubmitApplication
    ).not.toHaveBeenCalled();
  });

  it("allows a message up to 500 characters", async () => {
    const user = userEvent.setup();

    render(<ApplicationForm />);

    const message = screen.getByLabelText("Message");

    await user.type(message, "a".repeat(500));

    expect(message).toHaveValue("a".repeat(500));

    expect(
      screen.getByText("500/500")
    ).toBeInTheDocument();
  });

  it("does not allow more than 500 characters in the message", async () => {
    const user = userEvent.setup();

    render(<ApplicationForm />);

    const message = screen.getByLabelText("Message");

    await user.type(message, "a".repeat(501));

    expect(message).toHaveValue("a".repeat(500));

    expect(
      screen.getByText("500/500")
    ).toBeInTheDocument();
  });

  it("submits valid form data", async () => {
    const user = userEvent.setup();

    mockedSubmitApplication.mockResolvedValue(undefined);

    render(<ApplicationForm />);

    await user.type(
      screen.getByLabelText("Name"),
      "John"
    );

    await user.type(
      screen.getByLabelText("Phone or Telegram"),
      "+371 20000000"
    );

    await user.type(
      screen.getByLabelText("Message"),
      "I am interested in the vacancy."
    );

    await user.click(
      screen.getByRole("button", {
        name: "Send application",
      })
    );

    await waitFor(() => {
      expect(mockedSubmitApplication).toHaveBeenCalledWith({
        name: "John",
        contact: "+371 20000000",
        message: "I am interested in the vacancy.",
      });
    });
  });

  it("shows Sending while the request is in progress", async () => {
    const user = userEvent.setup();

    let resolveRequest:
      | (() => void)
      | undefined;

    mockedSubmitApplication.mockImplementation(
      () =>
        new Promise<void>((resolve) => {
          resolveRequest = resolve;
        })
    );

    render(<ApplicationForm />);

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
        name: "Send application",
      })
    );

    expect(
      screen.getByRole("button", {
        name: "Sending...",
      })
    ).toBeDisabled();

    resolveRequest?.();

    await waitFor(() => {
      expect(
        screen.getByText("Application sent")
      ).toBeInTheDocument();
    });
  });

  it("shows success state after successful submission", async () => {
    const user = userEvent.setup();

    mockedSubmitApplication.mockResolvedValue(undefined);

    render(<ApplicationForm />);

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
        name: "Send application",
      })
    );

    expect(
      await screen.findByText("Application sent")
    ).toBeInTheDocument();

    expect(
      screen.getByText(
        "Thank you! We will contact you soon."
      )
    ).toBeInTheDocument();

    expect(
      screen.queryByRole("button", {
        name: "Send application",
      })
    ).not.toBeInTheDocument();
  });

  it("shows an error when submission fails", async () => {
    const user = userEvent.setup();

    mockedSubmitApplication.mockRejectedValue(
      new Error("Failed to submit application")
    );

    render(<ApplicationForm />);

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
        name: "Send application",
      })
    );

    expect(
      await screen.findByText(
        "Something went wrong. Please try again."
      )
    ).toBeInTheDocument();

    expect(
      screen.getByRole("button", {
        name: "Send application",
      })
    ).toBeInTheDocument();
  });

  it("clears a field error when the user changes that field", async () => {
    const user = userEvent.setup();

    render(<ApplicationForm />);

    await user.click(
      screen.getByRole("button", {
        name: "Send application",
      })
    );

    expect(
      screen.getByText(
        "Name must contain at least 2 characters."
      )
    ).toBeInTheDocument();

    await user.type(
      screen.getByLabelText("Name"),
      "John"
    );

    expect(
      screen.queryByText(
        "Name must contain at least 2 characters."
      )
    ).not.toBeInTheDocument();
  });
});
