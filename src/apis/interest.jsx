import { API_BASE_URL } from "../api";

export async function joinInterestGroup(clerk_id, interestGroupId) {
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
            alert("Interest group joined successfully!");
            console.log(data);
        })
        .catch((error) => {
            alert("An error occurred during fetch or processing.");
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
                alert("Interest group applied successfully!");
                console.log(data);
            })
            .catch((error) => {
                alert("An error occurred during fetch or processing.");
                console.error(
                    "An error occurred during fetch or processing:",
                    error,
                );
            });
    } else {
        alert("Please sign in to apply for an interest group.");
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
