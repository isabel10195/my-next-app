import { Toaster } from "sonner";

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Toaster 
          position="top-right"
          richColors
          expand={true}
          visibleToasts={3}
          offset="16px"
        />
      </body>
    </html>
  );
}