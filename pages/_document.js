import Document, { Html, Head, Main, NextScript } from 'next/document';
import { ServerStyleSheet } from 'styled-components';
import { I18nextProvider } from 'react-i18next';
import { appWithTranslation } from 'next-i18next';
import { i18n } from '../next-i18next.config'; // Import the i18n object from next-i18next.config.js
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Script from "next/script";

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    const initialLocale = ctx.locale || ctx.req.language || i18n.defaultLocale;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            sheet.collectStyles(
              <I18nextProvider i18n={ctx.i18n}>
                <App {...props} />
              </I18nextProvider>
            ),
        });

      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        ...(await serverSideTranslations(initialLocale, ['common'])),
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      };
    } finally {
      sheet.seal();
    }
  }


  render() {
    return (
      <Html lang={this.props.locale}>
        <Head>
          <link rel="icon" href="https://d1irpg7po1rqdm.cloudfront.net/images/favicon.ico" />
          <link rel="shortcut icon" href="https://d1irpg7po1rqdm.cloudfront.net/images/favicon.ico" />
          <span hidden class="hk_hidden_ele"></span>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default appWithTranslation(MyDocument);
