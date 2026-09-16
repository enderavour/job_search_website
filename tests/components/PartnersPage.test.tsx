import {
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { PartnersPage } from "../../src/pages/PartnersPage";
import { getVacancies } from "../../src/api/mockFetch";
import type { Vacancy } from "../../src/mocks/mockVacancies";

vi.mock("../../src/api/mockFetch", () => ({
  getVacancies: vi.fn(),
}));

const mockedGetVacancies = vi.mocked(getVacancies);

const mockVacancies: Vacancy[] = [
  {
    id: 1,
    title: "Construction Worker",
    location: "Berlin",
    category: "Construction",
    salary: "€2500",
  },
  {
    id: 2,
    title: "Warehouse Worker",
    location: "Riga",
    category: "Logistics",
    salary: "€1800",
  },
  {
    id: 3,
    title: "Frontend Developer",
    location: "Amsterdam",
    category: "IT",
    salary: "€4000",
  },
];

describe("PartnersPage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("shows loading skeleton while vacancies are loading", () => {
    mockedGetVacancies.mockReturnValue(
      new Promise(() => {})
    );

    render(<PartnersPage />);

    expect(
      screen.getByTestId("loading-skeleton")
    ).toBeInTheDocument();
  });

  it("renders vacancies after successful loading", async () => {
    mockedGetVacancies.mockResolvedValue(
      mockVacancies
    );

    render(<PartnersPage />);

    expect(
      await screen.findByText("Construction Worker")
    ).toBeInTheDocument();

    expect(
      screen.getByText("Warehouse Worker")
    ).toBeInTheDocument();

    expect(
      screen.getByText("Frontend Developer")
    ).toBeInTheDocument();
  });

  it("shows an error state when loading fails", async () => {
    mockedGetVacancies.mockRejectedValue(
      new Error("Network error")
    );

    render(<PartnersPage />);

    expect(
      await screen.findByText(
        "Failed to load vacancies"
      )
    ).toBeInTheDocument();

    expect(
      screen.getByRole("button", {
        name: "Try again",
      })
    ).toBeInTheDocument();
  });

  it("retries loading vacancies after clicking Try again", async () => {
    const user = userEvent.setup();

    mockedGetVacancies
      .mockRejectedValueOnce(
        new Error("Network error")
      )
      .mockResolvedValueOnce(mockVacancies);

    render(<PartnersPage />);

    expect(
      await screen.findByText(
        "Failed to load vacancies"
      )
    ).toBeInTheDocument();

    await user.click(
      screen.getByRole("button", {
        name: "Try again",
      })
    );

    expect(
      await screen.findByText("Construction Worker")
    ).toBeInTheDocument();

    expect(mockedGetVacancies).toHaveBeenCalledTimes(2);
  });

  it("filters vacancies by search after debounce", async () => {
    const user = userEvent.setup();

    mockedGetVacancies.mockResolvedValue(
      mockVacancies
    );

    render(<PartnersPage />);

    await screen.findByText("Construction Worker");

    const searchInput = screen.getByPlaceholderText(
      "Search vacancies..."
    );

    await user.type(searchInput, "frontend");

    expect(
      screen.getByText("Construction Worker")
    ).toBeInTheDocument();

    await waitFor(
      () => {
        expect(
          screen.getByText("Frontend Developer")
        ).toBeInTheDocument();

        expect(
          screen.queryByText("Construction Worker")
        ).not.toBeInTheDocument();

        expect(
          screen.queryByText("Warehouse Worker")
        ).not.toBeInTheDocument();
      },
      {
        timeout: 500,
      }
    );
  });

  it("filters vacancies by category", async () => {
    const user = userEvent.setup();

    mockedGetVacancies.mockResolvedValue(
      mockVacancies
    );

    render(<PartnersPage />);

    await screen.findByText("Construction Worker");

    const categorySelect =
      screen.getByRole("combobox");

    await user.selectOptions(
      categorySelect,
      "Logistics"
    );

    expect(
      screen.getByText("Warehouse Worker")
    ).toBeInTheDocument();

    expect(
      screen.queryByText("Construction Worker")
    ).not.toBeInTheDocument();

    expect(
      screen.queryByText("Frontend Developer")
    ).not.toBeInTheDocument();
  });

  it("applies search and category filters together", async () => {
    const user = userEvent.setup();

    mockedGetVacancies.mockResolvedValue(
      [
        ...mockVacancies,
        {
          id: 4,
          title: "Logistics Manager",
          location: "Berlin",
          category: "Logistics",
          salary: "€2800",
        },
      ]
    );

    render(<PartnersPage />);

    await screen.findByText("Construction Worker");

    await user.selectOptions(
      screen.getByRole("combobox"),
      "Logistics"
    );

    const searchInput = screen.getByPlaceholderText(
      "Search vacancies..."
    );

    await user.type(
      searchInput,
      "manager"
    );

    await waitFor(
      () => {
        expect(
          screen.getByText("Logistics Manager")
        ).toBeInTheDocument();

        expect(
          screen.queryByText("Warehouse Worker")
        ).not.toBeInTheDocument();

        expect(
          screen.queryByText("Construction Worker")
        ).not.toBeInTheDocument();
      },
      {
        timeout: 500,
      }
    );
  });

  it("shows no vacancies when filters match nothing", async () => {
    const user = userEvent.setup();

    mockedGetVacancies.mockResolvedValue(
      mockVacancies
    );

    render(<PartnersPage />);

    await screen.findByText("Construction Worker");

    await user.type(
      screen.getByPlaceholderText(
        "Search vacancies..."
      ),
      "pilot"
    );

    await waitFor(
      () => {
        expect(
          screen.queryByText("Construction Worker")
        ).not.toBeInTheDocument();

        expect(
          screen.queryByText("Warehouse Worker")
        ).not.toBeInTheDocument();

        expect(
          screen.queryByText("Frontend Developer")
        ).not.toBeInTheDocument();
      },
      {
        timeout: 500,
      }
    );
  });
});
