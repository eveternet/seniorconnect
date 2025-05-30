export async function onboardUser({ clerk_user_id, name, phone }) {
    const response = await fetch(API_BASE_URL + "/auth", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ clerk_user_id, name, phone }),
    });

    // Parse response JSON
    const responseData = await response.json().catch(() => ({}));

    // Return both status and data for handling in the component
    return { status: response.status, ok: response.ok, data: responseData };
}
