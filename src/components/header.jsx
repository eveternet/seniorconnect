import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <nav className="sticky top-0 z-50 flex h-10 flex-row flex-wrap space-x-10 bg-blue-400">
      <Link to="/" className="mx-5 my-auto">
        SeniorConnect
      </Link>
      <Link to="/interest-groups" className="my-auto mr-5 ml-auto">
        Interest Groups
      </Link>
      <div className="mx-5 my-auto h-7">
        <SignedOut>
          <SignInButton className="h-7 rounded-2xl bg-cyan-300 px-5 transition duration-500 ease-in-out hover:bg-cyan-400" />
        </SignedOut>
        <SignedIn>
          <UserButton className="h-5" />
        </SignedIn>
      </div>
    </nav>
  );
}
