import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="border-t border-gray-200 bg-gray-50">
      <div className="mx-auto max-w-7xl px-6 py-12 md:py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <Link
              to="/"
              className="text-xl font-bold text-gray-900"
            >
              VV Work
            </Link>

            <p className="mt-4 max-w-xs text-sm leading-6 text-gray-500">
              Find work in Europe or connect with reliable
              workers for your business.
            </p>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900">
              Company
            </h3>

            <ul className="mt-4 space-y-3 text-sm text-gray-600">
              <li>
                <Link
                  to="/about"
                  className="transition hover:text-gray-900"
                >
                  About us
                </Link>
              </li>

              <li>
                <Link
                  to="/contacts"
                  className="transition hover:text-gray-900"
                >
                  Contacts
                </Link>
              </li>

              <li>
                <Link
                  to="/partners/example"
                  className="transition hover:text-gray-900"
                >
                  Partners
                </Link>
              </li>
            </ul>
          </div>

          {/* For users */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900">
              For you
            </h3>

            <ul className="mt-4 space-y-3 text-sm text-gray-600">
              <li>
                <Link
                  to="/"
                  className="transition hover:text-gray-900"
                >
                  Find a job
                </Link>
              </li>

              <li>
                <Link
                  to="/contacts"
                  className="transition hover:text-gray-900"
                >
                  Find a worker
                </Link>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900">
              Follow us
            </h3>

            <div className="mt-4 flex gap-4 text-sm text-gray-600">
              <a
                href="#"
                className="transition hover:text-gray-900"
              >
                Instagram
              </a>

              <a
                href="#"
                className="transition hover:text-gray-900"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-gray-200 pt-6 text-sm text-gray-500 md:flex-row md:items-center md:justify-between">
          <p>
            © 2026 VV Work. All rights reserved.
          </p>

          <div className="flex gap-5">
            <Link
              to="/privacy"
              className="transition hover:text-gray-900"
            >
              Privacy policy
            </Link>

            <Link
              to="/terms"
              className="transition hover:text-gray-900"
            >
              Terms of use
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
