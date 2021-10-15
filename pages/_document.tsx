import Document, { Html, Head, Main, NextScript } from "next/document";
import React from "react";

interface IProps {
  css: any;
}

class MyDocument extends Document<IProps> {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    const { html, head } = ctx.renderPage();
    return { ...initialProps, html, head };
  }

  render() {
    const { ids }: any = this.props;

    return (
      <Html>
        <Head>
          <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta name="robots" content="index, follow" />
          <meta key="googlebot" name="googlebot" content="index,follow" />
          <meta name="google" content="notranslate" />
          <meta name="mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <link rel="stylesheet" href="https://use.typekit.net/luz1vpd.css" />

        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>

    );
  }
}

export default MyDocument;
