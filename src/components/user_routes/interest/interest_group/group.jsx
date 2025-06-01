import {
    joinInterestGroup,
    leaveInterestGroup,
    getOneInterestGroup,
    isMemberOfGroup,
    editInterestGroup,
    getGroupCreatorClerkId,
    getGroupMembers,
    transferGroupOwnership,
} from "../../../../api";
import { SignedIn, SignedOut, useUser } from "@clerk/clerk-react";
import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Toast from "../../../other/toast";

export default function InterestGroup() {
    const toastTimeout = useRef(null);
    const { id } = useParams();
    const { user, isLoaded } = useUser();
    const [interestGroup, setInterestGroup] = useState(null);
    const [loading, setLoading] = useState(true);
    const [joinLoading, setJoinLoading] = useState(false);
    const [isMember, setIsMember] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const [toast, setToast] = useState("");
    const [creatorClerkId, setCreatorClerkId] = useState(null);
    const [members, setMembers] = useState([]);
    const [transferTo, setTransferTo] = useState("");
    const [transferLoading, setTransferLoading] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [editName, setEditName] = useState(interestGroup?.name || "");

    const [editDescription, setEditDescription] = useState(
        interestGroup?.description || "",
    );
    const [editImageUrl, setEditImageUrl] = useState(
        interestGroup?.image_url || "",
    );
    const [editLoading, setEditLoading] = useState(false);

    const isCreator = user && creatorClerkId && user.id === creatorClerkId;

    document.title = "SeniorConnect - Interest Group";

    useEffect(() => {
        if (id) {
            getGroupCreatorClerkId(id)
                .then(setCreatorClerkId)
                .catch(() => setCreatorClerkId(null));
            getGroupMembers(id)
                .then(setMembers)
                .catch(() => setMembers([]));
        }
    }, [id]);

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
                navigate("../");
            });
    }, [id]);

    const handleTransfer = async (e) => {
        e.preventDefault();
        if (!transferTo) return;
        setTransferLoading(true);
        try {
            await transferGroupOwnership(id, user.id, transferTo);
            showToast("Ownership transferred!");
            // Optionally, refetch creatorClerkId and members
        } catch (err) {
            showToast(err.message || "Failed to transfer ownership.");
        }
        setTransferLoading(false);
    };
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
        if (toastTimeout.current) {
            clearTimeout(toastTimeout.current);
        }
        toastTimeout.current = setTimeout(() => {
            setToast("");
            toastTimeout.current = null;
        }, 2000);
    };

    const handleJoin = async (e) => {
        e.stopPropagation();
        try {
            await joinInterestGroup(id, user.id);
            setIsMember(true);
            showToast("Joined group!");
        } catch {
            showToast("Failed to join group.");
        }
    };

    const handleLeave = async (e) => {
        e.stopPropagation();
        try {
            await leaveInterestGroup(id, user.id);
            setIsMember(false);
            showToast("Left group.");
        } catch (err) {
            showToast(err.message || "Failed to leave group.");
        }
    };

    const handleEdit = async (e) => {
        e.preventDefault();
        setEditLoading(true);
        try {
            await editInterestGroup(interestGroup.id, user.id, {
                name: editName,
                description: editDescription,
                image_url: editImageUrl,
            });
            setEditMode(false);
            // Optionally, update local state:
            setInterestGroup((prev) => ({
                ...prev,
                name: editName,
                description: editDescription,
                image_url: editImageUrl,
            }));
            showToast("Group updated!");
        } catch (err) {
            showToast(err.message || "Failed to update group.");
        }
        setEditLoading(false);
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
                            className="w-full max-w-xs rounded-lg bg-blue-900 px-4 py-2 font-semibold text-white shadow transition hover:cursor-pointer hover:bg-blue-800"
                        >
                            {joinLoading
                                ? "Leaving..."
                                : "Leave Interest Group"}
                        </button>
                    ) : (
                        <button
                            onClick={handleJoin}
                            disabled={joinLoading}
                            className="w-full max-w-xs rounded-lg bg-blue-900 px-4 py-2 font-semibold text-white shadow transition hover:cursor-pointer hover:bg-blue-800"
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

                {isCreator && (
                    <div className="mt-6 w-full">
                        {!editMode ? (
                            <button
                                onClick={() => {
                                    setEditName(interestGroup.name);
                                    setEditDescription(
                                        interestGroup.description,
                                    );
                                    setEditImageUrl(
                                        interestGroup.image_url || "",
                                    );
                                    setEditMode(true);
                                }}
                                className="mx-auto w-full rounded bg-blue-900 px-4 py-2 text-center font-semibold text-white transition duration-300 ease-in-out hover:cursor-pointer hover:bg-blue-800"
                            >
                                Edit Group Info
                            </button>
                        ) : (
                            <form
                                onSubmit={handleEdit}
                                className="mt-4 flex flex-col gap-4 rounded-xl bg-blue-50 p-4"
                            >
                                <label>
                                    Name:
                                    <input
                                        className="mt-1 block w-full rounded border px-2 py-1"
                                        value={editName}
                                        onChange={(e) =>
                                            setEditName(e.target.value)
                                        }
                                        required
                                    />
                                </label>
                                <label>
                                    Description:
                                    <textarea
                                        className="mt-1 block w-full resize-none rounded border px-2 py-1"
                                        value={editDescription}
                                        onChange={(e) =>
                                            setEditDescription(e.target.value)
                                        }
                                        required
                                    />
                                </label>
                                <label>
                                    Image URL:
                                    <input
                                        className="mt-1 block w-full rounded border px-2 py-1"
                                        value={editImageUrl}
                                        onChange={(e) =>
                                            setEditImageUrl(e.target.value)
                                        }
                                    />
                                </label>
                                <div className="flex gap-2">
                                    <button
                                        type="submit"
                                        disabled={editLoading}
                                        className="rounded bg-blue-900 px-4 py-2 font-semibold text-white transition duration-300 ease-in-out hover:cursor-pointer hover:bg-blue-800"
                                    >
                                        {editLoading ? "Saving..." : "Save"}
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setEditMode(false)}
                                        className="rounded bg-gray-300 px-4 py-2 font-semibold text-gray-800 hover:bg-gray-400"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        )}
                    </div>
                )}
                {isCreator && (
                    <div className="mt-6 w-full">
                        <h3 className="mb-2 font-bold">
                            Transfer Group Ownership
                        </h3>
                        <form
                            onSubmit={handleTransfer}
                            className="flex flex-col gap-2"
                        >
                            <select
                                value={transferTo}
                                onChange={(e) => setTransferTo(e.target.value)}
                                className="rounded border px-2 py-1"
                                required
                            >
                                <option value="" className="bg-white">
                                    Select new owner
                                </option>
                                {members
                                    .filter((m) => m.clerk_user_id !== user.id) // can't transfer to self
                                    .map((m) => (
                                        <option
                                            key={m.user_id}
                                            value={m.user_id}
                                            className="bg-white"
                                        >
                                            {m.display_name}
                                        </option>
                                    ))}
                            </select>
                            <button
                                type="submit"
                                disabled={transferLoading || !transferTo}
                                className="rounded bg-blue-900 px-4 py-2 text-center font-semibold text-white transition duration-300 ease-in-out hover:cursor-pointer hover:bg-blue-800"
                            >
                                {transferLoading
                                    ? "Transferring..."
                                    : "Transfer Ownership"}
                            </button>
                        </form>
                    </div>
                )}
            </div>
        </>
    );
}
