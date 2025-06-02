import { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-react";
import {
    getPendingApplications,
    approveApplication,
    rejectApplication,
} from "../../../../api";

export default function InterestGroupApplicationsAdmin() {
    const { user, isLoaded } = useUser();
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [actionLoading, setActionLoading] = useState({});
    const [toast, setToast] = useState("");

    const showToast = (msg) => {
        setToast(msg);
        setTimeout(() => setToast(""), 2000);
    };

    useEffect(() => {
        setLoading(true);
        getPendingApplications()
            .then(setApplications)
            .catch(() => setApplications([]))
            .finally(() => setLoading(false));
    }, []);

    const handleAction = async (applicationId, action) => {
        if (!isLoaded || !user) return;
        setActionLoading((prev) => ({ ...prev, [applicationId]: true }));
        try {
            if (action === "approve") {
                await approveApplication(applicationId, user.id);
                showToast("Application approved!");
            } else {
                await rejectApplication(applicationId, user.id);
                showToast("Application rejected!");
            }
            // Remove the application from the list
            setApplications((prev) =>
                prev.filter((app) => app.id !== applicationId),
            );
        } catch (err) {
            showToast(err.message || "Action failed.");
        }
        setActionLoading((prev) => ({ ...prev, [applicationId]: false }));
    };

    return (
        <div className="mx-auto max-w-2xl px-4 py-8">
            {toast && (
                <div className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-lg bg-blue-900 px-6 py-3 text-white shadow-lg transition-all duration-300">
                    {toast}
                </div>
            )}
            <h1 className="mb-6 text-2xl font-bold text-blue-900">
                Interest Group Applications
            </h1>
            {loading ? (
                <div className="text-center text-gray-500">Loading...</div>
            ) : applications.length === 0 ? (
                <div className="text-center text-gray-500">
                    No pending applications.
                </div>
            ) : (
                <div className="flex flex-col gap-4">
                    {applications.map((app) => (
                        <div
                            key={app.id}
                            className="rounded-xl bg-blue-100 p-4 shadow"
                        >
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                                <div>
                                    <h2 className="text-lg font-bold text-blue-900">
                                        {app.name}
                                    </h2>
                                    <p className="text-sm text-blue-700">
                                        Applicant: {app.applicant_name}
                                    </p>
                                    <p className="text-gray-700">
                                        {app.description}
                                    </p>
                                </div>
                                <div className="mt-4 flex flex-col gap-2 sm:mt-0 sm:ml-4">
                                    <button
                                        onClick={() =>
                                            handleAction(app.id, "approve")
                                        }
                                        disabled={actionLoading[app.id]}
                                        className="rounded bg-green-600 px-4 py-2 font-semibold text-white hover:bg-green-700"
                                    >
                                        {actionLoading[app.id]
                                            ? "Processing..."
                                            : "Approve"}
                                    </button>
                                    <button
                                        onClick={() =>
                                            handleAction(app.id, "reject")
                                        }
                                        disabled={actionLoading[app.id]}
                                        className="rounded bg-red-600 px-4 py-2 font-semibold text-white hover:bg-red-700"
                                    >
                                        {actionLoading[app.id]
                                            ? "Processing..."
                                            : "Reject"}
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
