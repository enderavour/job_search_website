import { Link } from "react-router-dom";
import { categories } from "../constants/categories";

export const PopularCategories = () => {
  const popularCategories = categories.filter((category) => category !== "All");

  return (
    <section className="mx-auto max-w-7xl px-6 py-20">
      <div className="max-w-2xl">
        <p className="text-sm font-medium text-gray-500">
          Find your next opportunity
        </p>

        <h2 className="mt-2 text-3xl font-bold text-gray-900">
          Popular categories
        </h2>
      </div>

      <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
        {popularCategories.map((category) => (
          <Link
            key={category}
            to={`/partners/example?category=${encodeURIComponent(category)}`}
            className="rounded-2xl border border-gray-200 bg-white p-5 transition hover:-translate-y-0.5 hover:border-gray-300 hover:shadow-sm"
          >
            <span className="font-medium text-gray-900">
              {category}
            </span>

            <span className="mt-2 block text-sm text-gray-500">
              View vacancies
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
};
