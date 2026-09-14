import { ApplicationForm } from "../components/ApplicationForm";

export const ContactsPage = () => {
  return (
    <main>
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="max-w-2xl">
          <h1 className="text-4xl font-bold">
            Contact us
          </h1>

          <p className="mt-4 text-gray-600">
            Have a question or want to learn more about VV work?
            Send us a message and we will get back to you.
          </p>
        </div>
        <ApplicationForm />
      </section>
    </main>
  );
};
