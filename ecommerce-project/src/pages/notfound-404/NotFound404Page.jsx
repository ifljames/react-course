import { Header } from "../../components/Header";
import "./NotFound404Page.css";

export function NotFound404Page() {
  return (
    <>
      <title>Page Not Found</title>

      <Header />
      <main className="container">
        <h1>404</h1>
        <h2>Page Not Found</h2>
      </main>
    </>
  );
}
