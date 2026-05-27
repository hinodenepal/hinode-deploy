import { createBrowserRouter, Outlet, ScrollRestoration } from "react-router";
import { Navigation } from "./components/Navigation";
import { Footer } from "./components/Footer";

// Pages
import { Home } from "./pages/Home";
import { TourListing } from "./pages/TourListing";
import { TourDetail } from "./pages/TourDetail";
import { DestinationListing } from "./pages/DestinationListing";
import { DestinationDetail } from "./pages/DestinationDetail";
import { BlogListing } from "./pages/BlogListing";
import { BlogDetail } from "./pages/BlogDetail";
import { About } from "./pages/About";
import { Testimonials } from "./pages/Testimonials";
import { Inquiry } from "./pages/Inquiry";
import { Contact } from "./pages/Contact";

function Root() {
  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#2C2C2C] font-sans antialiased selection:bg-[#8B2C24] selection:text-white flex flex-col">
      <ScrollRestoration />
      <Navigation />
      <main className="flex-grow pt-24">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: Home },
      { path: "tours", Component: TourListing },
      { path: "tours/:id", Component: TourDetail },
      { path: "destinations", Component: DestinationListing },
      { path: "destinations/:id", Component: DestinationDetail },
      { path: "guide", Component: BlogListing },
      { path: "guide/:id", Component: BlogDetail },
      { path: "about", Component: About },
      { path: "testimonials", Component: Testimonials },
      { path: "inquiry", Component: Inquiry },
      { path: "contact", Component: Contact },
    ],
  },
]);
