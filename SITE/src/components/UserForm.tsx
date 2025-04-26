// src/components/UserForm.tsx
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
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        name="name"
        placeholder="Name"
        value={form.name}
        onChange={handleChange}
        required
        className="border p-2 w-full"
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
        required
        className="border p-2 w-full"
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={form.password}
        onChange={handleChange}
        required
        className="border p-2 w-full"
      />
      <input
        type="text"
        name="image"
        placeholder="Image URL"
        value={form.image}
        onChange={handleChange}
        required
        className="border p-2 w-full"
      />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2">
        {initialData ? "Update User" : "Add User"}
      </button>
    </form>
  );
}
