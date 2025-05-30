import { useUser } from "@clerk/clerk-react";
import { useEffect } from "react";
import API_BASE_URL from "../../api";

export default function () {
    const { isLoaded, user, isSignedIn } = useUser();

    const onboardUserIfNeeded = async () => {
        if (!isLoaded || !isSignedIn || !user) {
            return;
        }

        const clerkUserId = user.id;
        const userName =
            user.firstName && user.LastName
                ? `${user.firstName} ${user.lastName}`
                : user.fullName || "Unknown User";
        const userPhone =
            user.primaryPhoneNumber && user.primaryPhoneNumber.phoneNumber
                ? user.primaryPhoneNumber.phoneNumber
                : null;

        try {
            const response = await fetch(API_BASE_URL + "/auth", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    clerk_user_id: clerkUserId,
                    name: userName,
                    phone: userPhone,
                }),
            });

            const responseData = await response.json().catch(() => ({}));

            if (response.ok) {
                if (response.status === 200) {
                } else if (response.status === 201) {
                    console.log("New user added to DB:", responseData.message);
                } else {
                    console.warn(
                        `Unexpected 2xx status: ${response.status}`,
                        responseData,
                    );
                }
            } else {
                console.error(
                    `Backend onboarding error: Status ${response.status}`,
                    responseData.message || "Unknown error",
                    responseData.errors || "",
                );

                if (response.status === 400 || response.status === 422) {
                    alert(
                        `Onboarding failed: ${responseData.message}. Check console for details.`,
                    );
                } else if (response.status === 409) {
                    console.warn(
                        "User ID conflict during onboarding.",
                        responseData.message,
                    );
                } else {
                    alert(
                        "An unexpected server error occurred during onboarding.",
                    );
                }
            }
        } catch (error) {
            console.error(
                "Network or unhandled error during user onboarding:",
                error,
            );
            alert(
                "Could not connect to the backend. Please check your internet connection.",
            );
        }
    };

    useEffect(() => {
        // Ensure function is memoized if it's not defined within useEffect itself,
        // or add to dependency array if you understand the implications.
        // For simplicity and typical use case with stable dependencies:
        if (isLoaded && isSignedIn && user) {
            onboardUserIfNeeded();
        }
    }, [isLoaded, isSignedIn, user]); // onboardUserIfNeeded is not in deps if it's stable and always based on these.

    return <></>;
}
