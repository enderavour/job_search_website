import { useEffect, useMemo, useState } from "react";
import { categories } from "../constants/categories";
import { getVacancies } from "../api/mockFetch";
import type { Vacancy } from "../mocks/mockVacancies";
import { LoadSkeleton } from "../components/LoadSkeleton";
import { ErrorState } from "../components/ErrorState";
import { useDebouncedValue } from "../utils/useDebouncedValue";

export const PartnersPage = () => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const [vacancies, setVacancies] = useState<Vacancy[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const debouncedSearch = useDebouncedValue(search, 300);

  const filteredVacancies = useMemo(() => {
    return vacancies.filter((vacancy) => {
      const matchesSearch = vacancy.title
        .toLowerCase()
        .includes(debouncedSearch.toLowerCase());

      const matchesCategory =
        category === "All" || vacancy.category === category;

      return matchesSearch && matchesCategory;
    });
  }, [vacancies, debouncedSearch, category]);

  const loadVacancies = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const data = await getVacancies();

      setVacancies(data);
    } catch {
      setError("Failed to load vacancies");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadVacancies();
  }, []);

  return (
    <main>
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="max-w-2xl">
          <h1 className="text-4xl font-bold">
            Vacancies
          </h1>
        </div>

        <div className="mt-10 flex flex-col gap-4 md:flex-row">
          <input
            type="text"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search vacancies..."
            className="flex-1 rounded-xl border border-gray-300 px-4 py-3"
          />

          <select
            value={category}
            onChange={(event) => setCategory(event.target.value)}
            className="rounded-xl border border-gray-300 px-4 py-3"
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div className="mt-10 space-y-4">
          {isLoading ? (
            <LoadSkeleton />
          ) : error ? (
            <ErrorState
              message={error}
              onRetry={loadVacancies}
            />
          ) : filteredVacancies.map((vacancy) => (
            <article
              key={vacancy.id}
              className="rounded-2xl border border-gray-200 p-6"
            >
              <h3 className="text-xl font-semibold">
                {vacancy.title}
              </h3>

              <p className="mt-2 text-gray-600">
                {vacancy.location}
              </p>

              <p className="mt-1 text-gray-600">
                {vacancy.category}
              </p>

              <p className="mt-4 font-medium">
                {vacancy.salary}
              </p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
};
