type PlaceholderPageProps = {
  title: string;
  description: string;
};

export const PlaceholderPage = ({
  title,
  description
}: PlaceholderPageProps) => {
  return (
    <section className="max-auto flex min-h-[60vh] max-w-7xl items-center px-6 py-20">
      <div className="max-w-2xl">
        <p className="text-sm font-medium text-gray-500">
          VV work
        </p>

        <h1 className="mt-3 text-4xl font-bold traking-light">
          {title}
        </h1>

        <p className="mt-4 text-gray-600">
          {description}
        </p>
      </div>
    </section>
  );
};
