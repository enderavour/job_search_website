import { Link } from "react-router-dom";
import { useState } from "react";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="border-b border-gray-200">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex h-20 items-center justify-between">
          <Link
            to="/"
            className="text-xl font-bold text-gray-900"
          >
            VV Work
          </Link>

          <nav className="hidden items-center gap-6 md:flex">
            <Link to="/">Find a job</Link>
            <Link to="/find-worker">Find a worker</Link>
            <Link to="/about">About us</Link>
            <Link to="/partners/example">Partners</Link>
            <Link to="/contacts">Contacts</Link>
          </nav>

          <button
            type="button"
            className="md:hidden"
            onClick={() => setIsMenuOpen((open) => !open)}
            aria-label={isMenuOpen ? "Close menu" : "Open Menu"}
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? "✕" : "☰"}
          </button>
        </div>

        {isMenuOpen && (
          <nav className="border-t border-gray-100 py-4 md:hidden">
            <div className="flex flex-col gap-4">
              <Link to="/">Find a job</Link>
              <Link to="/contacts">Find a worker</Link>
              <Link to="/about">About us</Link>
              <Link to="/partners/example">Partners</Link>
              <Link to="/contacts">Contacts</Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};
