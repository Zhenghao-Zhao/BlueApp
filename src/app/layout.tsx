import type { Metadata } from "next";
import SiteEntry from "./_components/siteEntry";
import { Data } from "./_server/data";
import "./globals.css";
import Providers from "./_contexts";

export const metadata: Metadata = {
  title: "TheBlueApp",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="font-roboto overflow-y-scroll h-full">
      <body className="overflow-y-visible absolute inset-0">
        <Data />
        <Providers>
          <SiteEntry>{children}</SiteEntry>
        </Providers>
      </body>
    </html>
  );
}
