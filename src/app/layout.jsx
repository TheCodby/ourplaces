import "@/app/styles/globals.css";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import Context from "./context";
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>OurPlaces</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
        <Context>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </Context>
      </body>
    </html>
  );
}
