import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import {Providers} from "./providers";
import {Authprovider} from "./providerAuth"
import { ReactQueryProvider } from "./ReactQueryProvider";
import { ReduxProvider } from "./ReduxProvider";


const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "LocalHero",
  description: "LocalHero company",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ReactQueryProvider>
      <html lang="en">
            <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <Providers>
            <Authprovider>
              <ReduxProvider>
                {children}
              </ReduxProvider>
            </Authprovider>
          </Providers>
        </body>
      </html>
    </ReactQueryProvider>
  );
}
