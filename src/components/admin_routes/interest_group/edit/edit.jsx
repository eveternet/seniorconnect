import AdminEditGroupForm from "./AdminEditGroupForm";
import { useUser } from "@clerk/clerk-react";
import { useParams } from "react-router-dom";

function AdminGroupManagementPage() {
    const { user, isLoaded } = useUser();
    const { id: groupIdToEdit } = useParams(); // expects route like /admin/interest-groups/:id

    const handleGroupUpdated = () => {
        // Optionally, show a toast or refetch a list of groups
        console.log("Group updated successfully!");
    };

    const handleFormError = (errorMessage) => {
        // Optionally, show a toast or error message
        console.error("Form specific error:", errorMessage);
    };

    if (!isLoaded) return <div>Loading...</div>;
    if (!user) return <div>Not signed in.</div>;

    return (
        <div>
            <h1>Admin Group Editor</h1>
            <AdminEditGroupForm
                groupId={groupIdToEdit}
                adminClerkUserId={user.id}
                onGroupUpdated={handleGroupUpdated}
                onError={handleFormError}
            />
        </div>
    );
}

export default AdminGroupManagementPage;
