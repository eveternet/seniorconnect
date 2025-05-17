import { SignedIn, SignedOut } from "@clerk/clerk-react";
import { Link } from "react-router-dom";
export default function () {
  return (
    <>
      <div className="mx-auto min-h-screen pt-5 text-center">
        <h1 className="text-xl font-extrabold text-red-500">
          Error 404: Page not found
        </h1>
        <p className="">
          You seem to have wandered to the wrong place. Please, click{" "}
          <Link to="/">here</Link> to go back home
        </p>
      </div>
    </>
  );
}
