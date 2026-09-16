type ErrorStateProps = {
  message?: string;
  onRetry: () => void;
};

export const ErrorState = ({
  message = "We couldn't load the vacancies.",
  onRetry
}: ErrorStateProps) => {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white px-6 py-12 text-center shadow-sm">
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
        <span className="text-lg font-semibold text-gray-500">!</span>
      </div>

      <h3 className="mt-4 text-lg font-semibold text-gray-900">
        Something went wrong
      </h3>

      <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-gray-500">
        {message}
      </p>

      <button
        type="button"
        onClick={onRetry}
        className="mt-6 rounded-xl bg-gray-900 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-gray-700"
      >
        Try again
      </button>
   </div>
  );
};
