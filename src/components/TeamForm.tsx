import { useState, FormEvent } from "react";
import toast from "react-hot-toast";

interface TeamFormProps {
  onAddTeam: (teamName: string) => void;
}

export default function TeamForm({ onAddTeam }: TeamFormProps) {
  const [teamName, setTeamName] = useState("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!teamName.trim()) {
      
      toast.error(`Debes proporcionar un nombre de equipo`);
      return
    };
    onAddTeam(teamName);
    setTeamName("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input 
        type="text"
        value={teamName}
        onChange={(e) => setTeamName(e.target.value)}
        placeholder="Nombre del equipo"
        className="border p-2 rounded w-full"
      />
      <button type="submit" className="bg-stone-800 text-white px-4 py-2 rounded cursor-pointer">
        Agregar
      </button>
    </form>
  );
}
