import {
    joinInterestGroup,
    leaveInterestGroup,
    getOneInterestGroup,
    isMemberOfGroup,
} from "../../../../api";
import { SignedIn, SignedOut, useUser } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Toast from "../../../other/toast";

export default function InterestGroup() {
    const { id } = useParams();
    const { user, isLoaded } = useUser();
    const [interestGroup, setInterestGroup] = useState(null);
    const [loading, setLoading] = useState(true);
    const [joinLoading, setJoinLoading] = useState(false);
    const [isMember, setIsMember] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const [toast, setToast] = useState("");

    // Fetch group info
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

    // Check membership
    useEffect(() => {
        if (isLoaded && user) {
            isMemberOfGroup(id, user.id)
                .then(setIsMember)
                .catch(() => setIsMember(false));
        }
    }, [id, isLoaded, user]);

    const showToast = (msg) => {
        setToast(msg);
        setTimeout(() => setToast(""), 2000);
    };

    const handleJoin = async (groupId, e) => {
        e.stopPropagation();
        try {
            await joinInterestGroup(groupId, user.id);
            setMembershipMap((prev) => ({ ...prev, [groupId]: true }));
            showToast("Joined group!");
        } catch {
            showToast("Failed to join group.");
        }
    };

    const handleLeave = async (groupId, e) => {
        e.stopPropagation();
        try {
            await leaveInterestGroup(groupId, user.id);
            setMembershipMap((prev) => ({ ...prev, [groupId]: false }));
            showToast("Left group.");
        } catch {
            showToast("Failed to leave group.");
        }
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
        <>
            <Toast message={toast} onClose={() => setToast("")} />
            <div className="mx-auto flex min-h-screen max-w-md flex-col items-center px-4 py-8">
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
                    {isMember ? (
                        <button
                            onClick={handleLeave}
                            disabled={joinLoading}
                            className="w-full max-w-xs rounded-lg bg-blue-900 px-4 py-2 font-semibold text-white shadow transition hover:bg-blue-800"
                        >
                            {joinLoading
                                ? "Leaving..."
                                : "Leave Interest Group"}
                        </button>
                    ) : (
                        <button
                            onClick={handleJoin}
                            disabled={joinLoading}
                            className="w-full max-w-xs rounded-lg bg-blue-900 px-4 py-2 font-semibold text-white shadow transition hover:bg-blue-800"
                        >
                            {joinLoading ? "Joining..." : "Join Interest Group"}
                        </button>
                    )}
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
        </>
    );
}
