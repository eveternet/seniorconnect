import { Link } from "react-router-dom";

export default function Navbar() {
    // sidebar navbar
    return (
        <>
            <div className="flex h-screen w-40 flex-col bg-blue-900">
                <Link to="/admin" className="">
                    {" "}
                    SeniorConnect{" "}
                </Link>
                <Link
                    to="/"
                    className="mx-auto my-5 cursor-pointer py-5 text-left text-base text-blue-300"
                >
                    {" "}
                    Return to users page{" "}
                </Link>
                <Link
                    to="/admin/users"
                    className="mx-auto my-5 cursor-pointer py-5 text-left text-base text-blue-300"
                >
                    {" "}
                    Users{" "}
                </Link>
                <Link
                    to="/admin/interest-groups"
                    className="mx-auto my-5 cursor-pointer py-5 text-left text-base text-blue-300"
                >
                    {" "}
                    Interest Groups{" "}
                </Link>
                <Link
                    to="/admin/events"
                    className="mx-auto my-5 cursor-pointer py-5 text-left text-base text-blue-300"
                >
                    {" "}
                    Events{" "}
                </Link>
                <Link
                    to="/admin/chat"
                    className="mx-auto my-5 cursor-pointer py-5 text-left text-base text-blue-300"
                >
                    {" "}
                    Chat{" "}
                </Link>
                <Link
                    to="/admin/notifications"
                    className="mx-auto my-5 cursor-pointer py-5 text-left text-base text-blue-300"
                >
                    {" "}
                    Notifications{" "}
                </Link>
            </div>
        </>
    );
}
