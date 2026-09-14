import { categories } from "../constants/categories";

export const HomePage = () => {
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
              placeholder="Job title, e.g. Driver"
              className="flex-1 rounded-xl bg-white px-4 py-3 text-black"
            />

            <button className="rounded-xl bg-blue-600 px-6 py-3 font-semibold">
              Search jobs
            </button>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20">
        <h2 className="text-3xl font-bold">
          Popular categories
        </h2>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => (
            <button
              key={category}
              className="rounded-2xl border border-gray-200 p-6 text-left"
            >
              {category}
            </button>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="rounded-3xl bg-blue-50 p-10">
          <h2 className="text-3xl font-bold">
            Need employees?
          </h2>

          <p className="mt-4 max-w-xl text-gray-600">
            Find qualified workers for your business
            with VV work.
          </p>

          <button className="mt-6 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white">
            Find a worker
          </button>
        </div>
      </section>
    </main>
  );
};
