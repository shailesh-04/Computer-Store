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
import { motion, AnimatePresence } from "framer-motion";

export default function UserPage() {
  const [users, setUsers] = useState<IUsers[]>([]);
  const [editingUser, setEditingUser] = useState<IUsers | null>(null);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await _getUsers();
      if (Array.isArray(res.user)) {
        setUsers(res.user);
      }
    } catch (error: any) {
      const message =
        error?.response?.data?.message || error.message || "Failed to load users.";
      toast.error(message);
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
      if (editingUser?.id) {
        const res = await _editProfile(editingUser.id, user);
        toast.success(res.message || "User updated successfully!");
      } else {
        const res = await _createUser(user);
        toast.success(res.message || "User created successfully!");
      }
      setEditingUser(null);
      setShowForm(false);
      fetchUsers();
    } catch (error: any) {
      const message =
        error?.data?.message || error.message || "Operation failed.";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (user: IUsers) => {
    setEditingUser(user);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    setLoading(true);
    try {
      const res = await _deleteUser(id);
      toast.success(res.message || "User deleted!");
      fetchUsers();
    } catch (error: any) {
      const message =
        error?.data?.message || error.message || "Delete failed.";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <NavBarAdmin />
      <div className="max-w-4xl mx-auto p-4 space-y-6">
        <h1 className="text-2xl font-bold text-center">User Management</h1>
        {loading && <p className="text-center">Loading...</p>}
        <div className="text-right">
          <button
            onClick={() => {
              setEditingUser(null);
              setShowForm(true);
            }}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Add New User
          </button>
        </div>
        <UserList users={users} onEdit={handleEdit} onDelete={handleDelete} />
      </div>

      {/* Modal Form */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center"
          >
            <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 relative">
              <button
                onClick={() => {
                  setShowForm(false);
                  setEditingUser(null);
                }}
                className="absolute top-2 right-3 text-red-600 text-2xl font-bold"
              >
                &times;
              </button>
              <UserForm
                onSubmit={handleAddOrUpdateUser}
                initialData={editingUser}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
