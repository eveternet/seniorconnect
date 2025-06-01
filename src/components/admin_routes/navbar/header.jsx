import { Link } from "react-router-dom";

export default function Navbar() {
    // sidebar navbar
    return (
        <>
            <div className="flex h-screen w-60 flex-col bg-blue-900">
                <Link
                    to="/admin"
                    className="mx-5 cursor-pointer border-t border-solid border-blue-100 pt-5 text-left text-base text-blue-100"
                >
                    {" "}
                    SeniorConnect{" "}
                </Link>
                <Link
                    to="/"
                    className="mx-5 cursor-pointer border-t border-solid border-blue-100 text-left text-base text-blue-100"
                >
                    {" "}
                    Return to users page{" "}
                </Link>
                <Link
                    to="/admin/users"
                    className="mx-5 cursor-pointer border-t border-solid border-blue-100 text-left text-base text-blue-100"
                >
                    {" "}
                    Users{" "}
                </Link>
                <Link
                    to="/admin/interest-groups"
                    className="mx-5 cursor-pointer border-t border-solid border-blue-100 text-left text-base text-blue-100"
                >
                    {" "}
                    Interest Groups{" "}
                </Link>
                <Link
                    to="/admin/events"
                    className="mx-5 cursor-pointer border-t border-solid border-blue-100 text-left text-base text-blue-100"
                >
                    {" "}
                    Events{" "}
                </Link>
                <Link
                    to="/admin/chat"
                    className="mx-5 cursor-pointer border-t border-solid border-blue-100 text-left text-base text-blue-100"
                >
                    {" "}
                    Chat{" "}
                </Link>
                <Link
                    to="/admin/notifications"
                    className="mx-5 cursor-pointer border-t border-solid border-blue-100 text-left text-base text-blue-100"
                >
                    {" "}
                    Notifications{" "}
                </Link>
            </div>
        </>
    );
}
