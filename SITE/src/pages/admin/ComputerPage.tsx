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

export default function ComputerPage() {
    const [computers, setComputers] = useState<IComputers[]>([]);
    const [editingComputer, setEditingComputer] = useState<IComputers | null>(
        null
    );
    const [loading, setLoading] = useState(false);

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

    return (
        <>
        <Navbar/>
            <div className="max-w-4xl mx-auto p-4 space-y-6">
                <h1 className="text-2xl font-bold text-center">
                    Computer Management
                </h1>
                {loading && <p className="text-center">Loading...</p>}
                <ComputerForm
                    onSubmit={handleAddOrUpdate}
                    initialData={editingComputer}
                />
                <ComputerList
                    computers={computers}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                />
            </div>
        </>
    );
}
