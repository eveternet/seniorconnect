import { SignedIn, SignedOut, UserButton, useUser } from "@clerk/clerk-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { isUserAdmin } from "../../../api";

export default function Header() {
    const [isSidebarHidden, setIsSidebarHidden] = useState(true);
    const [sidebarClass, setSidebarClass] = useState("hidden");
    const [displayAdminButton, setDisplayAdminButton] = useState(false);
    const { user, isLoaded } = useUser();
    function toggleSidebar() {
        setIsSidebarHidden(!isSidebarHidden);
        if (isSidebarHidden) {
            setSidebarClass("hidden");
        } else {
            setSidebarClass("fixed");
        }
    }

    useEffect(() => {
        if (isLoaded && user) {
            isUserAdmin(user.id)
                .then((data) => {
                    if (data.status === 200) {
                        if (data.data.is_admin) {
                            setDisplayAdminButton(true);
                        } else {
                        }
                    } else {
                        console.log("Error checking admin status");
                    }
                })
                .catch((error) => {
                    console.log("Error checking admin status");
                });
        }
    }, [isLoaded, user]);

    return (
        <>
            {/* Header for desktop */}
            <nav className="sticky top-0 z-50 hidden h-20 flex-row bg-blue-300 md:flex">
                <Link to="/" className="mx-5 my-auto text-2xl">
                    SeniorConnect
                </Link>
                {(displayAdminButton && (
                    <>
                        <Link to="/admin" className="my-auto mr-3 ml-auto p-2">
                            Admin
                        </Link>
                        <Link to="/notifications" className="mx-3 my-auto p-2">
                            <img
                                src="https://4mn50hplg9.ufs.sh/f/0pp0UyuwO4xWHPNPkvT4KM8x9F6kgruRBD3YTmSIcGbefXCA"
                                className="h-6 w-6"
                            />
                        </Link>
                    </>
                )) || (
                    <Link
                        to="/notifications"
                        className="my-auto mr-3 ml-auto p-2"
                    >
                        <img
                            src="https://4mn50hplg9.ufs.sh/f/0pp0UyuwO4xWHPNPkvT4KM8x9F6kgruRBD3YTmSIcGbefXCA"
                            className="h-6 w-6"
                        />
                    </Link>
                )}

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
                    <Link
                        to="/signin"
                        className="my-auto mr-5 rounded-2xl px-2 py-2"
                    >
                        {" "}
                        Sign In{" "}
                    </Link>
                </SignedOut>
                <SignedIn>
                    <div className="mx-3 my-auto h-7">
                        <UserButton className="mr-10 h-6" />
                    </div>
                </SignedIn>
            </nav>
            {/* Header for mobile */}
            <nav className="sticky top-0 z-50 flex h-20 flex-row bg-blue-300 md:hidden">
                <button
                    className="mx-5 my-auto h-6 w-6"
                    onClick={toggleSidebar}
                >
                    <img src="https://4mn50hplg9.ufs.sh/f/0pp0UyuwO4xWeu2oSWyNjRgpcGYmaA9ni8KVuCSUZW0O4Jz5" />
                </button>
                <Link to="/" className="my-auto text-2xl">
                    {" "}
                    SeniorConnect{" "}
                </Link>
            </nav>
            {/* Mobile sidebar menu */}
            <nav
                className={`top-20 z-50 flex h-screen flex-col bg-blue-300 md:hidden ${sidebarClass} w-screen border-t-1 border-t-blue-950`}
            >
                <div className="flex h-10 cursor-pointer flex-col border-b-1 border-blue-950 text-lg">
                    <Link to="/notifications" className="pr-auto my-auto pl-5">
                        Notifcations
                    </Link>
                </div>
                <div className="flex h-10 cursor-pointer flex-col border-b-1 border-blue-950 text-lg">
                    <Link to="/chat" className="pr-auto my-auto pl-5">
                        Chat
                    </Link>
                </div>
                <div className="flex h-10 cursor-pointer flex-col border-b-1 border-blue-950 text-lg">
                    <Link to="/events" className="pr-auto my-auto pl-5">
                        Events
                    </Link>
                </div>
                <div className="flex h-10 cursor-pointer flex-col border-b-1 border-blue-950 text-lg">
                    <Link
                        to="/interest-groups"
                        className="pr-auto my-auto pl-5"
                    >
                        Interest Groups
                    </Link>
                </div>
                <div className="flex h-10 cursor-pointer flex-col border-b-1 border-blue-950 text-left text-lg">
                    <SignedOut>
                        <Link
                            to="/signin"
                            className="pr-auto my-auto w-fit pl-5"
                        >
                            {" "}
                            Sign In{" "}
                        </Link>
                    </SignedOut>
                    <SignedIn>
                        <div className="pt-1.5 pl-5">
                            <UserButton className="pr-auto w-fit pl-5" />
                        </div>
                    </SignedIn>
                </div>
            </nav>
        </>
    );
}
