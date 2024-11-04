import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
    return (
        <Html>
            <Head>
                <meta httpEquiv="Content-Security-Policy" content="upgrade-insecure-requests" />
                <link rel="stylesheet" href="/styles/fontawesome.css" />
                <link rel="icon" href="/images/logo.svg" type="image/svg+xml" />
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    )
}