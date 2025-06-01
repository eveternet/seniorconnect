import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllInterestGroups } from "../../../../api"; // adjust path as needed

export default function Listing() {
    const [groups, setGroups] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        setLoading(true);
        getAllInterestGroups()
            .then((data) => {
                setGroups(data.groups);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    return (
        <div className="mx-auto max-w-2xl px-4 py-8">
            <h1 className="mb-6 text-2xl font-bold text-blue-900">
                Interest Groups (Admin)
            </h1>
            <button
                onClick={() => navigate("/admin/interest-groups/applications")}
                className="mb-6 rounded bg-blue-700 px-4 py-2 font-semibold text-white hover:bg-blue-800"
            >
                View Groups Requiring Approval
            </button>
            {loading ? (
                <div className="text-center text-gray-500">Loading...</div>
            ) : groups.length === 0 ? (
                <div className="text-center text-gray-500">
                    No interest groups found.
                </div>
            ) : (
                <div className="flex flex-col gap-4">
                    {groups.map((group) => (
                        <div
                            key={group.id}
                            className="cursor-pointer rounded-xl bg-blue-100 p-4 shadow transition hover:bg-blue-200"
                            onClick={() =>
                                navigate(`/admin/interest-groups/${group.id}`)
                            }
                        >
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                                <div>
                                    <h2 className="text-lg font-bold text-blue-900">
                                        {group.name}
                                    </h2>
                                    <p className="text-sm text-blue-700">
                                        {group.creator_name}
                                    </p>
                                </div>
                                <p className="mt-2 text-gray-700 sm:mt-0">
                                    {group.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
