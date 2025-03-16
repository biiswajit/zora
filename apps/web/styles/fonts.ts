import localFont from "next/font/local";

export const Inter = localFont({
  src: [
    { path: "../node_modules/@zora/tailwind-config/fonts/Inter-Italic-VariableFont_opsz,wght.ttf", style: "italic" },
    { path: "../node_modules/@zora/tailwind-config/fonts/Inter-VariableFont_opsz,wght.ttf", style: "normal" },
  ],
  variable: "--font-inter",
  display: "swap",
});
