import React, { useState, useEffect, useCallback } from "react";
import {
    editInterestGroup,
    getOneInterestGroupInfo,
    getAllMembersOfGroup,
} from "../../../../api";

export default function AdminEditGroupForm({
    groupId,
    adminClerkUserId,
    onGroupUpdated,
    onError,
}) {
    const [groupName, setGroupName] = useState("");
    const [groupDescription, setGroupDescription] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [members, setMembers] = useState([]);
    const [creatorId, setCreatorId] = useState(null);
    const [selectedMemberToRemove, setSelectedMemberToRemove] = useState(null);
    const [selectedNewOwner, setSelectedNewOwner] = useState(null);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [message, setMessage] = useState("");

    // State to hold original group details to compare against for partial updates
    const [originalGroupName, setOriginalGroupName] = useState("");
    const [originalGroupDescription, setOriginalGroupDescription] =
        useState("");
    const [originalImageUrl, setOriginalImageUrl] = useState("");

    const fetchGroupData = useCallback(async () => {
        setLoading(true);
        setMessage("");
        try {
            const groupInfo = await getOneInterestGroupInfo(groupId);
            setGroupName(groupInfo.name);
            setGroupDescription(groupInfo.description);
            setImageUrl(groupInfo.image_url || "");
            setCreatorId(groupInfo.creator_id);

            setOriginalGroupName(groupInfo.name);
            setOriginalGroupDescription(groupInfo.description);
            setOriginalImageUrl(groupInfo.image_url || "");

            const groupMembers = await getAllMembersOfGroup(groupId);
            setMembers(groupMembers);
        } catch (err) {
            onError?.(err.message);
            setMessage("Error loading group data.");
        } finally {
            setLoading(false);
        }
    }, [groupId, onError]);

    useEffect(() => {
        fetchGroupData();
    }, [fetchGroupData]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        setMessage("");

        const updates = {};
        let hasChanges = false;

        if (groupName !== originalGroupName) {
            updates.name = groupName;
            hasChanges = true;
        }
        if (groupDescription !== originalGroupDescription) {
            updates.description = groupDescription;
            hasChanges = true;
        }
        if (imageUrl !== originalImageUrl) {
            updates.image_url = imageUrl;
            hasChanges = true;
        }
        if (selectedMemberToRemove) {
            if (selectedMemberToRemove === creatorId) {
                setMessage("Error: Cannot remove the group creator.");
                setSubmitting(false);
                return;
            }
            updates.remove_member_id = selectedMemberToRemove;
            hasChanges = true;
        }
        if (selectedNewOwner) {
            if (selectedNewOwner === creatorId) {
                setMessage(
                    "Error: Cannot transfer ownership to the current owner.",
                );
                setSubmitting(false);
                return;
            }
            updates.new_owner_id = selectedNewOwner;
            hasChanges = true;
        }
        if (!hasChanges) {
            setMessage("No changes to submit.");
            setSubmitting(false);
            return;
        }

        try {
            await editInterestGroup(groupId, adminClerkUserId, updates);
            setMessage("Group updated successfully!");
            await fetchGroupData();
            setSelectedMemberToRemove(null);
            setSelectedNewOwner(null);
            onGroupUpdated?.();
        } catch (err) {
            setMessage(`Error: ${err.message}`);
            onError?.(err.message);
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) {
        return (
            <div className="flex h-40 items-center justify-center">
                <span className="font-semibold text-blue-700">
                    Loading group data...
                </span>
            </div>
        );
    }

    return (
        <div className="mx-auto mt-10 max-w-xl rounded-xl bg-white p-6 shadow-lg">
            <h2 className="mb-4 text-2xl font-bold text-blue-900">
                Edit Interest Group:{" "}
                <span className="text-blue-700">{groupName}</span>
            </h2>
            {message && (
                <div
                    className={`mb-4 rounded px-4 py-2 ${
                        message.startsWith("Error")
                            ? "bg-red-100 text-red-700"
                            : "bg-green-100 text-green-700"
                    }`}
                >
                    {message}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Group Info */}
                <fieldset className="rounded border border-blue-200 p-4">
                    <legend className="font-semibold text-blue-800">
                        Group Information
                    </legend>
                    <div className="mb-4">
                        <label
                            htmlFor="groupName"
                            className="mb-1 block font-medium"
                        >
                            Group Name:
                        </label>
                        <input
                            type="text"
                            id="groupName"
                            value={groupName}
                            onChange={(e) => setGroupName(e.target.value)}
                            className="w-full rounded border border-blue-300 px-3 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                        />
                    </div>
                    <div className="mb-4">
                        <label
                            htmlFor="groupDescription"
                            className="mb-1 block font-medium"
                        >
                            Description:
                        </label>
                        <textarea
                            id="groupDescription"
                            value={groupDescription}
                            onChange={(e) =>
                                setGroupDescription(e.target.value)
                            }
                            rows="4"
                            className="w-full rounded border border-blue-300 px-3 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                        ></textarea>
                    </div>
                    <div>
                        <label
                            htmlFor="imageUrl"
                            className="mb-1 block font-medium"
                        >
                            Image URL:
                        </label>
                        <input
                            type="text"
                            id="imageUrl"
                            value={imageUrl}
                            onChange={(e) => setImageUrl(e.target.value)}
                            className="w-full rounded border border-blue-300 px-3 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                        />
                        {imageUrl && (
                            <img
                                src={imageUrl}
                                alt="Group Preview"
                                className="mt-3 max-w-xs rounded border border-gray-200"
                            />
                        )}
                    </div>
                </fieldset>

                {/* Remove Members */}
                <fieldset className="rounded border border-blue-200 p-4">
                    <legend className="font-semibold text-blue-800">
                        Remove Members
                    </legend>
                    <p className="mb-2 text-sm text-blue-700">
                        Select a member to remove (cannot remove creator):
                    </p>
                    {members.length > 0 ? (
                        <select
                            value={selectedMemberToRemove || ""}
                            onChange={(e) =>
                                setSelectedMemberToRemove(
                                    e.target.value || null,
                                )
                            }
                            className="w-full rounded border border-blue-300 px-3 py-2"
                        >
                            <option value="">-- Select Member --</option>
                            {members.map((member) => (
                                <option
                                    key={member.user_id}
                                    value={member.user_id}
                                    disabled={member.user_id === creatorId}
                                >
                                    {member.display_name}
                                    {member.user_id === creatorId &&
                                        " (Creator)"}
                                </option>
                            ))}
                        </select>
                    ) : (
                        <p className="text-gray-500">No members to remove.</p>
                    )}
                </fieldset>

                {/* Transfer Ownership */}
                <fieldset className="rounded border border-blue-200 p-4">
                    <legend className="font-semibold text-blue-800">
                        Transfer Ownership
                    </legend>
                    <p className="mb-2 text-sm text-blue-700">
                        Select a new owner from existing members:
                    </p>
                    {members.length > 0 ? (
                        <select
                            value={selectedNewOwner || ""}
                            onChange={(e) =>
                                setSelectedNewOwner(e.target.value || null)
                            }
                            className="w-full rounded border border-blue-300 px-3 py-2"
                        >
                            <option value="">-- Select New Owner --</option>
                            {members.map((member) => (
                                <option
                                    key={member.user_id}
                                    value={member.user_id}
                                    disabled={member.user_id === creatorId}
                                >
                                    {member.display_name}
                                    {member.user_id === creatorId &&
                                        " (Current Creator)"}
                                </option>
                            ))}
                        </select>
                    ) : (
                        <p className="text-gray-500">
                            No other members to transfer ownership to.
                        </p>
                    )}
                </fieldset>

                <button
                    type="submit"
                    disabled={submitting}
                    className={`w-full rounded py-2 font-semibold transition ${
                        submitting
                            ? "cursor-not-allowed bg-blue-300"
                            : "bg-blue-700 text-white hover:bg-blue-800"
                    }`}
                >
                    {submitting ? "Updating..." : "Save Changes"}
                </button>
            </form>
        </div>
    );
}
