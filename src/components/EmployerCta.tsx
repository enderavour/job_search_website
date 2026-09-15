import { Link } from "react-router-dom"

export const EmployerCta = () => {
  return (
    <section className="mx-auto max-w-7xl px-6 py-20">
      <div className="overflow-hidden rounded-3xl bg-gray-900 px-8 py-12 text-white md:px-12 md:py-16">
        <div className="max-w-2xl">
          <p className="text-sm font-medium text-gray-400">
            For employers
          </p>

          <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
            Need employees?
          </h2>

          <p className="mt-4 text-base leading-7 text-gray-300 md:text-lg">
            Find reliable employees for your business
            and faster close vacancies together with VV work.
          </p>

          <Link
            to="/contacts"
            className="mt-8 inline-flex rounded-xl bg-white px-6 py-3 font-medium text-gray-900 transition hover:bg-gray-100"
          >
            Find employee
          </Link>
        </div>
      </div>
    </section>
  );
};
