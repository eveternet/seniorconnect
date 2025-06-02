import { Link } from "react-router-dom";

export default function Navbar() {
    // sidebar navbar
    return (
        <>
            <div className="fixed flex h-screen w-60 flex-col bg-blue-900">
                <Link
                    to="/admin"
                    className="mx-5 py-3 pt-5 text-left text-base text-blue-100 hover:cursor-pointer"
                >
                    {" "}
                    SeniorConnect{" "}
                </Link>
                <Link
                    to="/"
                    className="mx-5 border-t border-solid border-blue-100 py-3 text-left text-base text-blue-100 hover:cursor-pointer"
                >
                    {" "}
                    Return to users page{" "}
                </Link>
                <Link
                    to="/admin/users"
                    className="mx-5 border-t border-solid border-blue-100 py-3 text-left text-base text-blue-100 hover:cursor-pointer"
                >
                    {" "}
                    Users{" "}
                </Link>
                <Link
                    to="/admin/interest-groups"
                    className="mx-5 border-t border-solid border-blue-100 py-3 text-left text-base text-blue-100 hover:cursor-pointer"
                >
                    {" "}
                    Interest Groups{" "}
                </Link>
                <Link
                    to="/admin/events"
                    className="mx-5 border-t border-solid border-blue-100 py-3 text-left text-base text-blue-100 hover:cursor-pointer"
                >
                    {" "}
                    Events{" "}
                </Link>
                <Link
                    to="/admin/chat"
                    className="mx-5 border-t border-solid border-blue-100 py-3 text-left text-base text-blue-100 hover:cursor-pointer"
                >
                    {" "}
                    Chat{" "}
                </Link>
                <Link
                    to="/admin/notifications"
                    className="mx-5 border-t border-solid border-blue-100 py-3 text-left text-base text-blue-100 hover:cursor-pointer"
                >
                    {" "}
                    Notifications{" "}
                </Link>
            </div>
        </>
    );
}
