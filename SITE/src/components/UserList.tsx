// src/components/UserList.tsx
import { IUsers } from "@/types/User";

interface UserListProps {
  users: IUsers[];
  onEdit: (user: IUsers) => void;
  onDelete: (id: string) => void;
}

export default function UserList({ users, onEdit, onDelete }: UserListProps) {
  return (
    <div className="grid gap-4">
      {users.map((user) => (
        <div key={user.id} className="flex items-center justify-between border p-4 rounded">
          <div className="flex items-center gap-4">
            <img src={user.image} alt={user.name} className="w-12 h-12 rounded-full" />
            <div>
              <h3 className="font-bold">{user.name}</h3>
              <p className="text-sm">{user.email}</p>
            </div>
          </div>
          <div className="flex gap-2">
            <button onClick={() => onEdit(user)} className="bg-yellow-400 px-3 py-1 text-white rounded">
              Edit
            </button>
            <button onClick={() => user.id && onDelete(user.id)} className="bg-red-500 px-3 py-1 text-white rounded">
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
