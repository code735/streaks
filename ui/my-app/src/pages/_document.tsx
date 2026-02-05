import Document, {
  DocumentContext,
  Head,
  Html,
  Main,
  NextScript,
} from "next/document";
import { AppRegistry } from "react-native";

export default class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    AppRegistry.registerComponent("Main", () => Main);
    const { getStyleElement } = AppRegistry.getApplication("Main");
    const initialProps = await Document.getInitialProps(ctx);
    return {
      ...initialProps,
      styles: (
        <>
          {initialProps.styles}
          {getStyleElement()}
        </>
      ),
    };
  }

  render() {
    return (
      <Html lang="en">
        <Head />
        <body className="antialiased">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
