import { renderHook } from "@testing-library/react";
import { act } from "react";
import { beforeEach, afterEach, describe, expect, it, vi } from "vitest";
import { useDebouncedValue } from "../../src/utils/useDebouncedValue";

describe("useDebouncedValue", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("does not update immediately", () => {
    const { result, rerender } = renderHook(
      ({ value }) => useDebouncedValue(value, 300),
      {
        initialProps: {
          value: "",
        },
      }
    );

    rerender({ value: "logistics" });

    expect(result.current).toBe("");
  });

  it("updates after the debounce delay", () => {
    const { result, rerender } = renderHook(
      ({ value }) => useDebouncedValue(value, 300),
      {
        initialProps: {
          value: "",
        },
      }
    );

    rerender({ value: "logistics" });

    act(() => {
      vi.advanceTimersByTime(300);
    });

    expect(result.current).toBe("logistics");
  });

  it("uses only the latest value during rapid changes", () => {
    const { result, rerender } = renderHook(
      ({ value }) => useDebouncedValue(value, 300),
      {
        initialProps: {
          value: "",
        },
      }
    );

    rerender({ value: "log" });

    act(() => {
      vi.advanceTimersByTime(100);
    });

    rerender({ value: "logistics" });

    act(() => {
      vi.advanceTimersByTime(299);
    });

    expect(result.current).toBe("");

    act(() => {
      vi.advanceTimersByTime(1);
    });

    expect(result.current).toBe("logistics");
  });
});
