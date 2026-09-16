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
import { ScrollToTop } from "./components/ScrollToTop";
import { AboutPage } from "./pages/AboutPage";
import { PrivacyPage } from "./pages/PrivacyPage";
import { TermsPage } from "./pages/TermsPage";
import { FindWorkerPage } from "./components/FindWorkerPage";

function App()
{
  return (
    <BrowserRouter>
      <Header/>
      <ScrollToTop />

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

        <Route path="/about" element={<AboutPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/terms" element={<TermsPage />} />
        <Route path="/find-worker" element={<FindWorkerPage />} />
      </Routes>

      <Footer/>
    </BrowserRouter>
  );
}

export default App;
