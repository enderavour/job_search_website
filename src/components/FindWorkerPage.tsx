import { ApplicationForm } from "./ApplicationForm"

export const FindWorkerPage = () => {
  return (
    <main>
      <section className="mx-auto max-w-7xl px-6 py-16 md:py-24">
        <div className="max-w-2xl">
          <p className="text-sm font-medium text-gray-500">
            For employers
          </p>

          <h1 className="mt-3 tet-4xl font-bold tracking-tight">
            Find workers for your business
          </h1>

          <p className="mt-4 text-gray-600">
            Tell us who you are looking for and our team will
            help you find suitable candidates.
          </p>
        </div>

        <div className="mt-10 max-w-2xl">
          <ApplicationForm />
        </div>
      </section>
    </main>
  );
};
