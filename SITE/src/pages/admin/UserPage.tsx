// src/pages/UserPage.tsx
import { useEffect, useState } from "react";
import {
    _getUsers,
    _editProfile,
    _deleteUser,
    _createUser,
} from "@/services/User";
import UserForm from "@/components/UserForm";
import UserList from "@/components/UserList";
import { IUsers } from "@/types/User";
import toast from "react-hot-toast";
import NavBarAdmin from "@/components/NavBarAdmin";

export default function UserPage() {
    const [users, setUsers] = useState<IUsers[]>([]);
    const [editingUser, setEditingUser] = useState<IUsers | null>(null);
    const [loading, setLoading] = useState(false);

    const fetchUsers = async () => {
        setLoading(true);
        try {
            const res = await _getUsers();
            if (Array.isArray(res.user)) {
                setUsers(res.user);
            }
        } catch (error) {
            toast.error("Failed to load users.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleAddOrUpdateUser = async (user: IUsers) => {
        setLoading(true);
        try {
            if (editingUser && editingUser.id) {
                const res = await _editProfile(editingUser.id, user);
                toast.success(res.message || "User updated successfully!");
                setEditingUser(null);
            } else {
                const res = await _createUser(user);
                toast.success(res.message || "User created successfully!");
            }
            fetchUsers();
        } catch (error) {
            toast.error("Operation failed.");
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (user: IUsers) => {
        setEditingUser(user);
    };

    const handleDelete = async (id: string) => {
        setLoading(true);
        try {
            const res = await _deleteUser(id);
            toast.success(res.message || "User deleted!");
            fetchUsers();
        } catch (error) {
            toast.error("Delete failed.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <NavBarAdmin />
            <div className="max-w-4xl mx-auto p-4 space-y-6">
            <h1 className="text-2xl font-bold text-center">
                    User Management
                </h1>
                {loading && <p className="text-center">Loading...</p>}
                <UserForm
                    onSubmit={handleAddOrUpdateUser}
                    initialData={editingUser}
                />
                <UserList
                    users={users}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                />
            </div>
        </>
    );
}
