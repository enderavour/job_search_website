import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { debounce } from "../../src/utils/debounce";

describe("debounce", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("does not call the function immediately", () => {
    const callback = vi.fn();

    const debounced = debounce(callback, 300);

    debounced("hello");

    expect(callback).not.toHaveBeenCalled();
  });

  it("calls the function after the delay", () => {
    const callback = vi.fn();

    const debounced = debounce(callback, 300);

    debounced("hello");

    vi.advanceTimersByTime(300);

    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledWith("hello");
  });

  it("uses only the latest call", () => {
    const callback = vi.fn();

    const debounced = debounce(callback, 300);

    debounced("first");

    vi.advanceTimersByTime(100);

    debounced("second");

    vi.advanceTimersByTime(100);

    debounced("third");

    vi.advanceTimersByTime(299);

    expect(callback).not.toHaveBeenCalled();

    vi.advanceTimersByTime(1);

    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledWith("third");
  });

  it("resets the timer after every call", () => {
    const callback = vi.fn();

    const debounced = debounce(callback, 300);

    debounced("first");

    vi.advanceTimersByTime(250);

    debounced("second");

    vi.advanceTimersByTime(250);

    expect(callback).not.toHaveBeenCalled();

    vi.advanceTimersByTime(50);

    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledWith("second");
  });
});
