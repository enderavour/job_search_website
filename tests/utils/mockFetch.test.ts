import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";

import {
  mockFetch,
  getVacancies,
  submitApplication,
} from "../../src/api/mockFetch";

beforeEach(() => {
  vi.useFakeTimers();
});

afterEach(() => {
  vi.useRealTimers();
  vi.restoreAllMocks();
});

describe("mockFetch", () => {
  it("resolves with the provided data", async () => {
    vi.spyOn(Math, "random")
      .mockReturnValueOnce(0.5)
      .mockReturnValueOnce(0.5);

    const promise = mockFetch("test data");

    await vi.advanceTimersByTimeAsync(550);

    await expect(promise).resolves.toBe("test data");
  });

  it("uses a delay between 300 and 800 milliseconds", async () => {
    const randomSpy = vi
      .spyOn(Math, "random")
      .mockReturnValueOnce(0)
      .mockReturnValueOnce(0.5);

    const promise = mockFetch("test");

    await vi.advanceTimersByTimeAsync(299);

    expect(randomSpy).toHaveBeenCalledTimes(1);

    await vi.advanceTimersByTimeAsync(1);

    await expect(promise).resolves.toBe("test");
  });

  it("rejects with an error when the random failure occurs", async () => {
    vi.spyOn(Math, "random")
      .mockReturnValueOnce(0.5)
      .mockReturnValueOnce(0.1);

    const promise = expect(
      mockFetch("test")
    ).rejects.toThrow();

    await vi.advanceTimersByTimeAsync(550);

    await promise;
  });
});

describe("getVacancies", () => {
  it("returns vacancies from the mock API", async () => {
    vi.spyOn(Math, "random")
      .mockReturnValueOnce(0.5)
      .mockReturnValueOnce(0.5);

    const promise = getVacancies();

    await vi.advanceTimersByTimeAsync(550);

    const result = await promise;

    expect(result).toBeDefined();
    expect(Array.isArray(result)).toBe(true);
  });
});

describe("submitApplication", () => {
  it("resolves when the mock request succeeds", async () => {
    vi.spyOn(Math, "random")
      .mockReturnValueOnce(0.5)
      .mockReturnValueOnce(0.5);

    const promise = submitApplication({
      name: "John",
      contact: "+371 20000000",
      message: "Hello",
    });

    await vi.advanceTimersByTimeAsync(550);

    await expect(promise).resolves.toBeUndefined();
  });

  it("rejects when the mock request fails", async () => {
    vi.spyOn(Math, "random")
      .mockReturnValueOnce(0.5)
      .mockReturnValueOnce(0.1);

    const promise = expect(
      submitApplication({
        name: "John",
        contact: "+371 20000000",
        message: "",
      })
    ).rejects.toThrow("Something went wrong");

    await vi.advanceTimersByTimeAsync(550);

    await promise;
  });
});
