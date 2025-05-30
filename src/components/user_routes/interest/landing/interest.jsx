import { SignedIn, SignedOut, useUser } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Toast from "../../../other/toast";

import {
    truncate,
    joinInterestGroup,
    handleScroll,
    createInterestGroup,
    getAllInterestGroups,
    isMemberOfGroup,
    leaveInterestGroup,
} from "../../../../api";

export default function InterestGroupsList() {
    const { user, isLoaded } = useUser();
    const [interestGroups, setInterestGroups] = useState([]);
    const [membershipMap, setMembershipMap] = useState({});
    const [interestGroupName, setInterestGroupName] = useState("");
    const [interestGroupDescription, setInterestGroupDescription] =
        useState("");
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const [toast, setToast] = useState("");

    // Fetch all interest groups
    useEffect(() => {
        setLoading(true);
        getAllInterestGroups()
            .then((data) => {
                setInterestGroups(data.groups);
                setLoading(false);
            })
            .catch((error) => {
                setLoading(false);
                console.error(
                    "An error occurred during fetch or processing:",
                    error,
                );
            });
    }, []);

    // Check membership for each group (when user or groups change)
    useEffect(() => {
        if (isLoaded && user && interestGroups.length > 0) {
            const checkAllMemberships = async () => {
                const map = {};
                await Promise.all(
                    interestGroups.map(async (group) => {
                        try {
                            map[group.id] = await isMemberOfGroup(
                                group.id,
                                user.id,
                            );
                        } catch {
                            map[group.id] = false;
                        }
                    }),
                );
                setMembershipMap(map);
            };
            checkAllMemberships();
        }
    }, [isLoaded, user, interestGroups]);

    const showToast = (msg) => {
        setToast(msg);
        setTimeout(() => setToast(""), 2000);
    };

    // Join handler
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

    return (
        <>
            <Toast message={toast} onClose={() => setToast("")} />
            {/* Big screen images */}
            <div className="h-screen">
                <div
                    className="flex h-1/2 w-screen flex-col"
                    style={{
                        backgroundImage:
                            "url(https://4mn50hplg9.ufs.sh/f/0pp0UyuwO4xWIAtf6GHm5lrZ98QWs3u0VtEUe4CPfDKG7J1i)",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                    }}
                >
                    <h1 className="relative top-1/4 left-15 w-10/12 text-5xl font-extrabold text-blue-100">
                        Join your favourite interest groups!
                    </h1>
                    <button
                        onClick={() => handleScroll("view-all-interest-groups")}
                        className="relative right-15 bottom-5 mt-auto ml-auto rounded-2xl border-blue-950 bg-blue-200 p-5 text-blue-900 transition duration-300 ease-in-out hover:cursor-pointer hover:bg-blue-100"
                    >
                        Join Now!
                    </button>
                </div>

                <div
                    className="flex h-1/2 w-screen flex-col"
                    style={{
                        backgroundImage:
                            "url(https://4mn50hplg9.ufs.sh/f/0pp0UyuwO4xWVRaXM6IHEwDAyduGvTsCFRr4lUZ62eagxmk3)",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                    }}
                >
                    <h1 className="relative top-2/8 left-15 w-10/12 text-5xl font-extrabold text-blue-950">
                        Nothing for you? Create your own group!
                    </h1>
                    <button
                        onClick={() => handleScroll("interest-group-creation")}
                        className="relative right-15 bottom-5 mt-auto ml-auto rounded-2xl border-blue-950 bg-blue-200 p-5 text-blue-900 transition duration-300 ease-in-out hover:cursor-pointer hover:bg-blue-100"
                    >
                        Create One Today!
                    </button>
                </div>
            </div>
            {/* View all interest groups */}
            <div className="min-h-screen" id="view-all-interest-groups">
                <div className="mx-auto mt-20">
                    <h1 className="w-screen text-center text-2xl font-extrabold">
                        View all interest groups
                    </h1>
                    <div className="mx-25 flex flex-row flex-wrap">
                        {loading ? (
                            <h2 className="w-full text-center">Loading...</h2>
                        ) : interestGroups.length > 0 ? (
                            interestGroups.map((item) => (
                                <div
                                    key={item.id}
                                    className="mx-auto my-5 w-full max-w-md cursor-pointer rounded-2xl bg-blue-900 p-5 text-blue-100 shadow-md transition hover:shadow-lg"
                                    onClick={() => navigate(`${item.id}`)}
                                    style={{ minWidth: "250px" }}
                                >
                                    <h1 className="mb-1 text-xl font-extrabold">
                                        {item.name}
                                    </h1>
                                    <h2 className="mb-2 pb-0.5 font-bold text-blue-200">
                                        {item.creator_name}
                                    </h2>
                                    <p className="mb-4 text-blue-100">
                                        {truncate(item.description, 200)}
                                    </p>
                                    <SignedIn>
                                        {membershipMap[item.id] ? (
                                            <button
                                                onClick={(e) =>
                                                    handleLeave(item.id, e)
                                                }
                                                className="block w-full rounded-2xl bg-blue-100 px-5 py-2 text-center font-semibold text-white transition duration-300 ease-in-out hover:bg-blue-200"
                                            >
                                                Leave Group
                                            </button>
                                        ) : (
                                            <button
                                                onClick={(e) =>
                                                    handleJoin(item.id, e)
                                                }
                                                className="block w-full rounded-2xl bg-blue-100 px-5 py-2 text-center font-semibold text-blue-900 transition duration-300 ease-in-out hover:bg-blue-200"
                                            >
                                                Join Now!
                                            </button>
                                        )}
                                    </SignedIn>
                                </div>
                            ))
                        ) : (
                            <h2 className="w-full text-center">
                                Sorry, there are no interest groups right now.
                                Try again later!
                            </h2>
                        )}
                    </div>
                </div>

                {/* Create an interest group */}
                <div
                    className="mx-auto mt-20 text-center"
                    id="interest-group-creation"
                >
                    <h1 className="w-screen text-center text-2xl font-extrabold">
                        Create your own interest group today!
                    </h1>
                    <SignedIn>
                        {/* Create an interest group form */}
                        <div className="mx-auto my-5 h-fit w-4/5 rounded-2xl bg-blue-50 p-5 text-left text-blue-900 md:w-2xl">
                            <div>
                                <label className="block">
                                    Interest Group Name
                                </label>
                                <input
                                    className="block w-full rounded-b-sm border-1 border-blue-500 px-2"
                                    type="text"
                                    placeholder="Interest Group Name"
                                    value={interestGroupName}
                                    onChange={(e) =>
                                        setInterestGroupName(e.target.value)
                                    }
                                />
                            </div>
                            <div className="mt-5">
                                <label className="block">Description</label>
                                <textarea
                                    className="block h-20 w-full resize-none rounded-b-sm border-1 border-blue-500 px-2"
                                    placeholder="Insert description here"
                                    value={interestGroupDescription}
                                    onChange={(e) =>
                                        setInterestGroupDescription(
                                            e.target.value,
                                        )
                                    }
                                ></textarea>
                            </div>
                            <button
                                onClick={() =>
                                    createInterestGroup(
                                        user.id,
                                        interestGroupName,
                                        interestGroupDescription,
                                    )
                                }
                                className="mx-auto mt-5 rounded-2xl bg-blue-900 px-5 py-1 text-center text-blue-100 transition duration-300 ease-in-out hover:cursor-pointer hover:bg-blue-950"
                            >
                                Create
                            </button>
                        </div>
                    </SignedIn>
                    <SignedOut>
                        <button
                            className="mx-auto my-5 w-50 rounded-2xl bg-blue-900 p-5 text-center text-blue-100 transition duration-300 ease-in-out hover:cursor-pointer hover:bg-blue-950"
                            onClick={() => navigate("/signin")}
                        >
                            Create one now!
                        </button>
                    </SignedOut>
                </div>
            </div>
        </>
    );
}
