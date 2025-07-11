import { useState, useEffect } from "react";
import { IUsers } from "@/types/User";

interface UserFormProps {
  onSubmit: (user: IUsers) => void;
  initialData?: IUsers | null;
}

export default function UserForm({ onSubmit, initialData }: UserFormProps) {
  const [form, setForm] = useState<IUsers>({
    name: "",
    email: "",
    password: "",
    image: "",
  });

  useEffect(() => {
    if (initialData) {
      setForm(initialData);
    }
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(form);
    setForm({ name: "", email: "", password: "", image: "" });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h2 className="text-xl font-semibold text-center">
        {initialData ? "Update User" : "Add New User"}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          required
          className="border p-2 rounded w-full"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
          className="border p-2 rounded w-full"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
          className="border p-2 rounded w-full"
        />
        <input
          type="text"
          name="image"
          placeholder="Image URL"
          value={form.image}
          onChange={handleChange}
          required
          className="border p-2 rounded w-full"
        />
      </div>
      <div className="text-center">
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          {initialData ? "Update User" : "Add User"}
        </button>
      </div>
    </form>
  );
}
