import { useUser } from "@clerk/clerk-react";
import { useEffect } from "react";
import { onboardUser } from "../../api.jsx"; // <-- update this import

export default function OnboardUser() {
    const { isLoaded, user, isSignedIn } = useUser();

    const onboardUserIfNeeded = async () => {
        if (!isLoaded || !isSignedIn || !user) return;

        const clerkUserId = user.id;
        const userName =
            user.firstName && user.lastName
                ? `${user.firstName} ${user.lastName}`
                : user.fullName || "Unknown User";
        const userPhone =
            user.primaryPhoneNumber && user.primaryPhoneNumber.phoneNumber
                ? user.primaryPhoneNumber.phoneNumber
                : null;

        try {
            const { status, ok, data } = await onboardUser({
                clerk_user_id: clerkUserId,
                name: userName,
                phone: userPhone,
            });

            if (ok) {
                if (status === 200) {
                    // User already exists, do nothing or log if needed
                } else if (status === 201) {
                    console.log("New user added to DB:", data.message);
                } else {
                    console.warn(`Unexpected 2xx status: ${status}`, data);
                }
            } else {
                console.error(
                    `Backend onboarding error: Status ${status}`,
                    data.message || "Unknown error",
                    data.errors || "",
                );

                if (status === 400 || status === 422) {
                    alert(
                        `Onboarding failed: ${data.message}. Check console for details.`,
                    );
                } else if (status === 409) {
                    console.warn(
                        "User ID conflict during onboarding.",
                        data.message,
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
        if (isLoaded && isSignedIn && user) {
            onboardUserIfNeeded();
        }
    }, [isLoaded, isSignedIn, user]);

    return null;
}
