import React, { useState, useEffect, useCallback } from "react";
// Import the actual API functions from your utility file
import {
    editInterestGroup,
    getOneInterestGroupInfo,
    getAllMembersOfGroup,
} from "../../../../api";

function AdminEditGroupForm({
    groupId,
    adminClerkUserId,
    onGroupUpdated,
    onError,
}) {
    const [groupName, setGroupName] = useState("");
    const [groupDescription, setGroupDescription] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [members, setMembers] = useState([]);
    const [creatorId, setCreatorId] = useState(null); // Store the UUID of the group creator
    const [selectedMemberToRemove, setSelectedMemberToRemove] = useState(null); // UUID
    const [selectedNewOwner, setSelectedNewOwner] = useState(null); // UUID of new owner
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
            setCreatorId(groupInfo.creator_id); // This is now directly from the API response

            // Set original values for comparison
            setOriginalGroupName(groupInfo.name);
            setOriginalGroupDescription(groupInfo.description);
            setOriginalImageUrl(groupInfo.image_url || "");

            const groupMembers = await getAllMembersOfGroup(groupId);
            setMembers(groupMembers);
        } catch (err) {
            console.error("Failed to fetch group data:", err);
            onError?.(err.message);
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

        // Compare current state with original fetched values for basic group info
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

        // Add member removal action if selected
        if (selectedMemberToRemove) {
            if (selectedMemberToRemove === creatorId) {
                setMessage("Error: Cannot remove the group creator.");
                setSubmitting(false);
                return;
            }
            updates.remove_member_id = selectedMemberToRemove;
            hasChanges = true;
        }

        // Add ownership transfer action if selected
        if (selectedNewOwner) {
            if (selectedNewOwner === creatorId) {
                setMessage(
                    "Error: Cannot transfer ownership to the current owner.",
                );
                setSubmitting(false);
                return;
            }
            updates.new_owner_id = selectedNewOwner; // Use new_owner_id (UUID)
            hasChanges = true;
        }

        // Only send if there are actual updates to group fields or actions
        if (!hasChanges) {
            // Use the 'hasChanges' flag
            setMessage("No changes to submit.");
            setSubmitting(false);
            return;
        }

        try {
            await editInterestGroup(groupId, adminClerkUserId, updates);
            setMessage("Group updated successfully!");
            // Refresh data after successful update
            await fetchGroupData();
            // Clear selections after successful operation
            setSelectedMemberToRemove(null);
            setSelectedNewOwner(null);
            onGroupUpdated?.(); // Callback for parent component
        } catch (err) {
            console.error("Failed to update group:", err);
            setMessage(`Error: ${err.message}`);
            onError?.(err.message);
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) {
        return <div>Loading group data...</div>;
    }

    return (
        <div
            style={{
                maxWidth: "600px",
                margin: "auto",
                padding: "20px",
                border: "1px solid #ccc",
                borderRadius: "8px",
            }}
        >
            <h2>Edit Interest Group: {groupName}</h2>
            {message && (
                <p
                    style={{
                        color: message.startsWith("Error") ? "red" : "green",
                    }}
                >
                    {message}
                </p>
            )}

            <form onSubmit={handleSubmit}>
                {/* Section 1: Basic Group Details */}
                <fieldset
                    style={{
                        marginBottom: "20px",
                        padding: "15px",
                        border: "1px solid #eee",
                        borderRadius: "5px",
                    }}
                >
                    <legend>Group Information</legend>
                    <div style={{ marginBottom: "10px" }}>
                        <label
                            htmlFor="groupName"
                            style={{ display: "block", marginBottom: "5px" }}
                        >
                            Group Name:
                        </label>
                        <input
                            type="text"
                            id="groupName"
                            value={groupName}
                            onChange={(e) => setGroupName(e.target.value)}
                            style={{
                                width: "100%",
                                padding: "8px",
                                boxSizing: "border-box",
                            }}
                        />
                    </div>
                    <div style={{ marginBottom: "10px" }}>
                        <label
                            htmlFor="groupDescription"
                            style={{ display: "block", marginBottom: "5px" }}
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
                            style={{
                                width: "100%",
                                padding: "8px",
                                boxSizing: "border-box",
                            }}
                        ></textarea>
                    </div>
                    <div style={{ marginBottom: "10px" }}>
                        <label
                            htmlFor="imageUrl"
                            style={{ display: "block", marginBottom: "5px" }}
                        >
                            Image URL:
                        </label>
                        <input
                            type="text"
                            id="imageUrl"
                            value={imageUrl}
                            onChange={(e) => setImageUrl(e.target.value)}
                            style={{
                                width: "100%",
                                padding: "8px",
                                boxSizing: "border-box",
                            }}
                        />
                        {imageUrl && (
                            <img
                                src={imageUrl}
                                alt="Group Preview"
                                style={{
                                    maxWidth: "100px",
                                    height: "auto",
                                    marginTop: "10px",
                                    border: "1px solid #ddd",
                                    borderRadius: "4px",
                                }}
                            />
                        )}
                    </div>
                </fieldset>

                {/* Section 2: Remove Members */}
                <fieldset
                    style={{
                        marginBottom: "20px",
                        padding: "15px",
                        border: "1px solid #eee",
                        borderRadius: "5px",
                    }}
                >
                    <legend>Remove Members</legend>
                    <p>Select a member to remove (cannot remove creator):</p>
                    {members.length > 0 ? (
                        <select
                            value={selectedMemberToRemove || ""}
                            onChange={(e) =>
                                setSelectedMemberToRemove(
                                    e.target.value || null,
                                )
                            }
                            style={{
                                width: "100%",
                                padding: "8px",
                                marginBottom: "10px",
                                boxSizing: "border-box",
                            }}
                        >
                            <option value="">-- Select Member --</option>
                            {members.map((member) => (
                                <option
                                    key={member.user_id}
                                    value={member.user_id}
                                    disabled={member.user_id === creatorId} // Disable if it's the creator
                                >
                                    {member.display_name}{" "}
                                    {member.user_id === creatorId &&
                                        "(Creator)"}
                                </option>
                            ))}
                        </select>
                    ) : (
                        <p>No members to remove.</p>
                    )}
                </fieldset>

                {/* Section 3: Transfer Ownership */}
                <fieldset
                    style={{
                        marginBottom: "20px",
                        padding: "15px",
                        border: "1px solid #eee",
                        borderRadius: "5px",
                    }}
                >
                    <legend>Transfer Ownership</legend>
                    <p>Select a new owner from existing members:</p>
                    {members.length > 0 ? (
                        <select
                            value={selectedNewOwner || ""}
                            onChange={(e) =>
                                setSelectedNewOwner(e.target.value || null)
                            }
                            style={{
                                width: "100%",
                                padding: "8px",
                                marginBottom: "10px",
                                boxSizing: "border-box",
                            }}
                        >
                            <option value="">-- Select New Owner --</option>
                            {members.map((member) => (
                                <option
                                    key={member.user_id}
                                    value={member.user_id}
                                    disabled={member.user_id === creatorId} // Disable if it's the current creator
                                >
                                    {member.display_name}{" "}
                                    {member.user_id === creatorId &&
                                        "(Current Creator)"}
                                </option>
                            ))}
                        </select>
                    ) : (
                        <p>No other members to transfer ownership to.</p>
                    )}
                </fieldset>

                <button
                    type="submit"
                    disabled={submitting}
                    style={{
                        padding: "10px 20px",
                        backgroundColor: "#007bff",
                        color: "white",
                        border: "none",
                        borderRadius: "5px",
                        cursor: submitting ? "not-allowed" : "pointer",
                    }}
                >
                    {submitting ? "Updating..." : "Save Changes"}
                </button>
            </form>
        </div>
    );
}

export default AdminEditGroupForm;
