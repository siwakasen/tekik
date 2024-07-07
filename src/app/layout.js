import "./globals.css";
import Provider from "../components/provider/Provider"
import { Toaster } from 'sonner';
export const metadata = {
  title: "Padukuhan Tekik",
  description: "Website padukuhan Tekik, Nglindur, Girisubo",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Toaster richColors={true} />
        <Provider>
          {children}
        </Provider>
      </body>
    </html>
  );
}
