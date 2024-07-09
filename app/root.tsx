import {
  json,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";

import "./root.css";

export const loader = () => {
  return json({
    firebaseConfig: {
      apiKey: process.env.FIREBASE_API_KEY,
      authDomain: process.env.FIREBASE_AUTH_DOMAIN,
      projectId: process.env.FIREBASE_PROJECT_ID,
      storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
      messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
      appId: process.env.FIREBASE_APP_ID,
    },
  });
};

export function Layout({ children }: { children: React.ReactNode }) {
  const { firebaseConfig } = useLoaderData<typeof loader>();

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.process = ${JSON.stringify({
              env: {
                firebaseApiKey: firebaseConfig.apiKey,
                firebaseAuthDomain: firebaseConfig.authDomain,
                firebaseProjectId: firebaseConfig.projectId,
                firebaseStorageBucket: firebaseConfig.storageBucket,
                firebaseMessagingSenderId: firebaseConfig.messagingSenderId,
                firebaseAppId: firebaseConfig.appId,
              },
            })}`,
          }}
        ></script>
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}
