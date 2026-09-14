import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <header className="border-b border-gray-200">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link to="/" className="text-xl font-bold">
          VV work
        </Link>

        <nav className="flex gap-6">
          <Link to="/">Find a job</Link>
          <Link to="/">Find a worker</Link>
          <Link to="/">About us</Link>
          <Link to="/partners/example">Partners</Link>
          <Link to="/contacts">Contacts</Link>
        </nav>
      </div>
    </header>
  );
};
