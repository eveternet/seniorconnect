import { joinInterestGroup, getOneInterestGroup } from "../../../../api";
import { SignedIn, SignedOut, useUser, SignInButton } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function InterestGroup() {
    const { id } = useParams();
    const { user, isLoaded } = useUser();
    const [interestGroup, setInterestGroup] = useState(null);
    const [loading, setLoading] = useState(true);
    const [joinLoading, setJoinLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        setLoading(true);
        getOneInterestGroup(id)
            .then((data) => {
                setInterestGroup(data);
                setLoading(false);
            })
            .catch((error) => {
                setError("Could not load interest group.");
                setLoading(false);
            });
    }, [id]);

    const handleJoin = async () => {
        if (!isLoaded || !user) return;
        setJoinLoading(true);
        try {
            await joinInterestGroup(id, user.id); // assumes joinInterestGroup takes (groupId, clerkUserId)
            alert("Successfully joined the group!");
        } catch (err) {
            alert("Failed to join the group.");
        }
        setJoinLoading(false);
    };

    if (loading) {
        return (
            <div className="flex h-screen items-center justify-center">
                <span className="text-lg">Loading...</span>
            </div>
        );
    }

    if (error || !interestGroup) {
        return (
            <div className="flex h-screen items-center justify-center">
                <span className="text-red-600">
                    {error || "Group not found."}
                </span>
            </div>
        );
    }

    return (
        <div className="mx-auto flex min-h-screen max-w-md flex-col items-center bg-blue-50 px-4 py-8">
            <div className="mb-6 w-full rounded-xl bg-white p-6 shadow-md">
                <h1 className="mb-2 text-2xl font-bold text-blue-900">
                    {interestGroup.name}
                </h1>
                <h2 className="text-md mb-2 font-semibold text-blue-700">
                    Created by: {interestGroup.creator_name}
                </h2>
                <p className="mb-4 text-gray-700">
                    {interestGroup.description}
                </p>
            </div>
            <SignedIn>
                <button
                    onClick={handleJoin}
                    disabled={joinLoading}
                    className="w-full max-w-xs rounded-lg bg-blue-900 px-4 py-2 font-semibold text-white shadow transition hover:bg-blue-800"
                >
                    {joinLoading ? "Joining..." : "Join Interest Group"}
                </button>
            </SignedIn>
            <SignedOut>
                <button
                    onClick={() => navigate("/signin")}
                    className="w-full max-w-xs rounded-lg bg-blue-900 px-4 py-2 font-semibold text-white shadow transition hover:bg-blue-800"
                >
                    Sign in to join
                </button>
            </SignedOut>
        </div>
    );
}
