import {
  render,
  screen,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { ErrorState } from "../../src/components/ErrorState";

describe("ErrorState", () => {
  it("renders the error message", () => {
    render(
      <ErrorState
        message="Failed to load vacancies"
        onRetry={() => {}}
      />
    );

    expect(
      screen.getByText("Failed to load vacancies")
    ).toBeInTheDocument();
  });

  it("calls onRetry when the user clicks Try again", async () => {
    const user = userEvent.setup();
    const onRetry = vi.fn();

    render(
      <ErrorState
        message="Failed to load vacancies"
        onRetry={onRetry}
      />
    );

    await user.click(
      screen.getByRole("button", {
        name: "Try again",
      })
    );

    expect(onRetry).toHaveBeenCalledTimes(1);
  });

  it("uses the default error message", () => {
    render(
      <ErrorState
        onRetry={() => {}}
      />
    );

    expect(
      screen.getByText(
        "We couldn't load the vacancies."
      )
    ).toBeInTheDocument();
  });
});
