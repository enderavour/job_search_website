import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { PartnersPage } from "./pages/PartnersPage";
import { ContactsPage } from "./pages/ContactsPage";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";

function App()
{
  return (
    <BrowserRouter>
      <Header/>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/partners/:slug"
          element={<PartnersPage />}
        />
        <Route
          path="/contacts"
          element={<ContactsPage />}
        />
      </Routes>

      <Footer/>
    </BrowserRouter>
  );
}

export default App;
