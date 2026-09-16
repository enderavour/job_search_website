import { PopularCategories } from "../components/PopularCategories";
import { EmployerCta } from "../components/EmployerCta";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const HomePage = () => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    const query = search.trim();

    if (!query) {
      navigate("/partners/example");
      return;
    }

    navigate(
      `/partners/example?search=${encodeURIComponent(query)}`
    );
  }

  return (
    <main>
      <section className="bg-slate-950 px-6 py-24 text-white">
        <div className="mx-auto max-w-7xl">
          <h1 className="max-w-3xl text-5xl font-bold">
            Find your job in Europe
          </h1>

          <p className="mt-6 max-w-xl text-lg text-slate-300">
            Search vacancies and start working with trusted employers.
          </p>

          <div className="mt-10 flex max-w-2xl gap-3">
            <input
              type="text"
              value={search}
              onChange={(event) => {
                setSearch(event.target.value);
              }}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  handleSearch();
                }
              }}
              placeholder="Job title, e.g. Driver"
              className="flex-1 rounded-xl bg-white px-4 py-3 text-black"
            />

            <button
              type="button"
              onClick={handleSearch}
              className="rounded-xl bg-blue-600 px-6 py-3 font-semibold"
            >
              Search jobs
            </button>
          </div>
        </div>
      </section>

      <PopularCategories />

      <EmployerCta />
    </main>
  );
};
