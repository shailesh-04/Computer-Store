// src/pages/ComputerPage.tsx
import { useEffect, useState } from "react";
import {
    getComputers,
    createComputer,
    editComputer,
    deleteComputer,
} from "@/services/Computer";
import { IComputers } from "@/types/Computer";
import ComputerForm from "@/components/ComputerForm";
import ComputerList from "@/components/ComputerList";
import toast from "react-hot-toast";
import Navbar from "@/components/NavBarAdmin";
import { AnimatePresence, motion } from "framer-motion";

export default function ComputerPage() {
    const [computers, setComputers] = useState<IComputers[]>([]);
    const [editingComputer, setEditingComputer] = useState<IComputers | null>(
        null
    );
    const [loading, setLoading] = useState(false);
    const [showForm, setShowForm] = useState(false);

    const fetchComputers = async () => {
        setLoading(true);
        try {
            const res = await getComputers();
            if (Array.isArray(res.computer)) {
                setComputers(res.computer);
            }
        } catch (error) {
            toast.error("Failed to fetch computers.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchComputers();
    }, []);

    useEffect(() => {
        if (editingComputer) {
            setShowForm(true);
        }
    }, [editingComputer]);

    const handleAddOrUpdate = async (data: IComputers) => {
        setLoading(true);
        try {
            if (editingComputer && editingComputer.id) {
                const res = await editComputer(editingComputer.id, data);
                toast.success(res.message || "Computer updated!");
                setEditingComputer(null);
            } else {
                const res = await createComputer(data);
                toast.success(res.message || "Computer created!");
            }
            fetchComputers();
            setShowForm(false);
        } catch (error) {
            toast.error("Operation failed.");
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (computer: IComputers) => {
        setEditingComputer(computer);
    };

    const handleDelete = async (id: string) => {
        setLoading(true);
        try {
            const res = await deleteComputer(id);
            toast.success(res.message || "Computer deleted!");
            fetchComputers();
        } catch (error) {
            toast.error("Delete failed.");
        } finally {
            setLoading(false);
        }
    };

    const handleAddNewClick = () => {
        setEditingComputer(null);
        setShowForm((prev) => !prev);
    };

    return (
        <>
            <Navbar />
            <div className="max-w-4xl mx-auto p-4 space-y-6">
                <h1 className="text-2xl font-bold text-center">
                    Computer Management
                </h1>
                {loading && <p className="text-center">Loading...</p>}

                <div className="text-right">
                    <button
                        className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
                        onClick={handleAddNewClick}
                    >
                        {showForm ? "Close Form" : "Add New Computer"}
                    </button>
                </div>

                <AnimatePresence>
                    {showForm && (
                        <motion.div
                            key="overlay"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
                        >
                            <motion.div
                                initial={{ y: -50, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                exit={{ y: -50, opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                className="bg-white max-w-2xl w-full p-6 rounded shadow-lg relative"
                            >
                                <button
                                    onClick={() => {
                                        setShowForm(false);
                                        setEditingComputer(null);
                                    }}
                                    className="absolute top-2 right-2 text-gray-500 hover:text-black text-xl"
                                >
                                    &times;
                                </button>

                                <ComputerForm
                                    onSubmit={handleAddOrUpdate}
                                    initialData={editingComputer}
                                />
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
                    
                <ComputerList
                    computers={computers}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                />
            </div>
        </>
    );
}
