import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";
import { Link, useLocation } from "react-router-dom";

export default function Header() {
  const LOCATION = useLocation();
  let title;
  switch (LOCATION.pathname) {
    case "/interest-groups":
      title = "Interest Groups";
      break;
    case "/":
      title = "Home";
      break;
    case "/chat":
      title = "Chat";
      break;
    case "/events":
      title = "Events";
      break;
    case "/notifications":
      title = "Notifications";
      break;
    default:
      title = "Page Not Found";
  }

  document.title = `SeniorConnect - ${title}`;
  return (
    <nav className="sticky top-0 z-50 hidden h-20 flex-row bg-blue-300 md:flex">
      <Link to="/" className="mx-5 my-auto text-2xl">
        SeniorConnect
      </Link>
      <Link to="/notifications" className="my-auto mr-3 ml-auto p-2">
        <img
          src="https://4mn50hplg9.ufs.sh/f/0pp0UyuwO4xWHPNPkvT4KM8x9F6kgruRBD3YTmSIcGbefXCA"
          className="h-6 w-6"
        />
      </Link>
      <Link to="/chat" className="mx-3 my-auto p-2">
        Chat
      </Link>
      <Link to="/events" className="mx-3 my-auto p-2">
        Events
      </Link>
      <Link to="/interest-groups" className="mx-3 my-auto p-2">
        Interest
      </Link>
      <SignedOut>
        <SignInButton className="my-auto mr-5 rounded-2xl px-2 py-2 transition duration-500 ease-in-out hover:bg-blue-400" />
      </SignedOut>
      <SignedIn>
        <div className="mx-3 my-auto h-7">
          <UserButton className="mr-10 h-6" />
        </div>
      </SignedIn>
    </nav>
  );
}
