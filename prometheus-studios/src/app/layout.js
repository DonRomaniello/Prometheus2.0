import "../styles/global.css";
import "../styles/user_agent_zero.css";
import "../styles/variables.css";
import "../styles/global.css";
import "../styles/components/footer.css";
import "../styles/components/navigation.css";
import "../styles/layouts/content-renderer.css";
import "../styles/layouts/people.css";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import { GoogleAnalytics } from './components/GoogleAnalytics';

export const metadata = {
  title: "Prometheus Studios",
  description: "World class improv in the Hudson Valley.",
  keywords: "improv, hudson valley, comedy, theater, acting, classes, workshops, instruction, fun, laughter, learning, community, performance, stage, theater, theatre, acting",
  openGraph: {
    title: "Prometheus Studios",
    type: "website",
    url: "https://prometheusstudios.org/",
    images: [
      {
        url: "https://prometheusstudios.org/logo512.png",
      },
    ],
    description: "World class improv in the Hudson Valley.",
  },
  icons: {
    apple: "https://prometheusstudios.org/logo192.png",
  },
  manifest: "https://prometheusstudios.org/manifest.json",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-primary">
        <GoogleAnalytics />
        <Navigation />
        <main>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
