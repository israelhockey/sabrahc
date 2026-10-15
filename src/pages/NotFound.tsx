import { Link } from "react-router-dom";
import ContourField from "@/components/ContourField";

const NotFound = () => (
  <section className="relative flex min-h-[80vh] items-center overflow-hidden bg-night pt-[100px]">
    <ContourField variant="ice" />
    <div className="container-site relative text-center">
      <p className="eyebrow">404</p>
      <h1 className="mt-2 text-[22vw] font-black leading-none text-ice-white sm:text-[180px]">Offside.</h1>
      <p className="mt-4 text-lg text-muted-text">This page doesn't exist, or it's been moved.</p>
      <Link to="/" className="btn-primary mt-8">
        Back to home
      </Link>
    </div>
  </section>
);

export default NotFound;
