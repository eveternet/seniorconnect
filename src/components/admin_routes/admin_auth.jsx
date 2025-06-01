import { useUser } from "@clerk/clerk-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { isUserAdmin } from "../../api";

export default function AdminAuth() {
    const { user, isLoaded, isSignedIn } = useUser();
    const navigate = useNavigate();

    useEffect(() => {
        if (isLoaded && !isSignedIn) {
            navigate("/");
        }
    }, [isLoaded, isSignedIn, navigate]);

    useEffect(() => {
        if (isLoaded && user) {
            isUserAdmin(user.id)
                .then((data) => {
                    if (data.status === 200 && data.data.is_admin) {
                        // User is admin, do nothing
                    } else {
                        navigate("/");
                    }
                })
                .catch(() => {
                    navigate("/");
                });
        }
    }, [isLoaded, user, navigate]);

    return null;
}
