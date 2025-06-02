import { API_BASE_URL } from "../api";

export async function joinInterestGroup(interestGroupId, clerk_id) {
    let request_message = {
        clerk_user_id: clerk_id,
    };
    const res = await fetch(
        `${API_BASE_URL}/interest_groups/join/${interestGroupId}`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(request_message),
        },
    );
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Failed to join group.");
    return data;
}

export async function createInterestGroup(
    clerk_id,
    interestGroupName,
    description,
) {
    let request_message = {
        clerk_user_id: clerk_id,
        name: interestGroupName,
        description: description,
    };
    const res = await fetch(`${API_BASE_URL}/interest_groups/apply`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(request_message),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Failed to create group.");
    return data;
}

export async function getAllInterestGroups() {
    const res = await fetch(`${API_BASE_URL}/interest_groups/info/all`);
    if (!res.ok) throw new Error("Failed to fetch interest groups");
    return res.json();
}

export async function getOneInterestGroup(id) {
    const res = await fetch(`${API_BASE_URL}/interest_groups/info/${id}`);
    if (!res.ok) throw new Error("Failed to fetch interest groups");
    return res.json();
}

export async function leaveInterestGroup(groupId, clerkUserId) {
    const res = await fetch(
        `${API_BASE_URL}/interest_groups/leave/${groupId}`,
        {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ clerk_user_id: clerkUserId }),
        },
    );
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
        // Throw the error message from backend if available
        throw new Error(data.error || data.message || "Failed to leave group.");
    }
    return data;
}

export async function isMemberOfGroup(groupId, clerkUserId) {
    const res = await fetch(
        `${API_BASE_URL}/interest_groups/members/${groupId}`,
    );
    if (!res.ok) throw new Error("Failed to fetch group members");
    const data = await res.json();
    return data.members.some((member) => member.clerk_user_id === clerkUserId);
}

// Get the creator's Clerk ID for a group
export async function getGroupCreatorClerkId(groupId) {
    const res = await fetch(
        `${API_BASE_URL}/interest_groups/creator/${groupId}`,
    );
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Failed to get creator.");
    return data.creator_clerk_user_id;
}

// Get all members of a group
export async function getGroupMembers(groupId) {
    const res = await fetch(
        `${API_BASE_URL}/interest_groups/members/${groupId}`,
    );
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Failed to get members.");
    return data.members; // Array of { clerk_user_id, display_name, user_id }
}

// Transfer group ownership
export async function transferGroupOwnership(
    groupId,
    clerkUserId,
    transferUserUuid,
) {
    const res = await fetch(
        `${API_BASE_URL}/interest_groups/transfer_owner/${groupId}`,
        {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                clerk_user_id: clerkUserId,
                transfer_user_uuid: transferUserUuid,
            }),
        },
    );
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Failed to transfer ownership.");
    return data;
}

export async function getPendingApplications() {
    const res = await fetch(`${API_BASE_URL}/interest_groups/applications`);
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Failed to fetch applications.");
    return data.applications;
}

export async function approveApplication(applicationId, clerkUserId) {
    const res = await fetch(
        `${API_BASE_URL}/interest_groups/application/${applicationId}/approve`,
        {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ clerk_user_id: clerkUserId }),
        },
    );
    const data = await res.json();
    if (!res.ok)
        throw new Error(data.error || "Failed to approve application.");
    return data;
}

export async function rejectApplication(applicationId, clerkUserId) {
    const res = await fetch(
        `${API_BASE_URL}/interest_groups/application/${applicationId}/reject`,
        {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ clerk_user_id: clerkUserId }),
        },
    );
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Failed to reject application.");
    return data;
}

export async function editInterestGroup(groupId, clerkUserId, updates) {
    const res = await fetch(`${API_BASE_URL}/interest_groups/edit/${groupId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            clerk_user_id: clerkUserId,
            ...updates, // e.g. { name, description, image_url, remove_member_id, new_owner_id }
        }),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
        throw new Error(
            data.error || data.message || "Failed to update group.",
        );
    }
    return data;
}

export async function getOneInterestGroupInfo(groupId) {
    const res = await fetch(`${API_BASE_URL}/interest_groups/info/${groupId}`);
    if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to fetch group info");
    }
    const data = await res.json();
    // Assuming backend returns creator_id directly. If not, you need another call or modify backend.
    if (!data.creator_id) {
        console.warn(
            "Backend /interest_groups/info/<id> did not return creator_id. This is required for AdminEditGroupForm.",
        );
    }
    return data;
}
export async function getAllMembersOfGroup(groupId) {
    const res = await fetch(
        `${API_BASE_URL}/interest_groups/members/${groupId}`,
    );
    if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to fetch group members");
    }
    const data = await res.json();
    return data.members;
}
