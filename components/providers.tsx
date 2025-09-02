"use client";

import { Toaster } from "react-hot-toast";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#FAF7F2',
            color: '#3A3330',
            border: '1px solid #E8DCC4',
            borderRadius: '24px',
            padding: '12px 20px',
            fontSize: '14px',
          },
          success: {
            iconTheme: {
              primary: '#8B7355',
              secondary: '#FAF7F2',
            },
          },
          error: {
            iconTheme: {
              primary: '#ef4444',
              secondary: '#FAF7F2',
            },
          },
        }}
      />
    </>
  );
}