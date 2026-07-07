import "./globals.css";

export const metadata = {
  title: "Snowtooth Lift Status"
};

// TODO (Lesson 06): create app/providers.jsx with an ApolloClient +
// ApolloProvider, then wrap {children} with it here.
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
