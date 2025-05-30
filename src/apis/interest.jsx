import { API_BASE_URL } from "../api";

export async function joinInterestGroup(interestGroupId, clerk_id) {
    let request_message = {
        clerk_user_id: clerk_id,
    };
    fetch(API_BASE_URL + `/interest_groups/join/${interestGroupId}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(request_message),
    })
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
        })
        .catch((error) => {
            console.error(
                "An error occurred during fetch or processing:",
                error,
            );
        });
}

export async function createInterestGroup(
    clerk_id,
    interestGroupName,
    description,
) {
    if (isLoaded) {
        let request_message = {
            clerk_user_id: user.id,
            name: interestGroupName,
            description: interestGroupDescription,
        };
        fetch(API_BASE_URL + "/interest_groups/apply", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(request_message),
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
            })
            .catch((error) => {
                console.error(
                    "An error occurred during fetch or processing:",
                    error,
                );
            });
    } else {
    }
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
