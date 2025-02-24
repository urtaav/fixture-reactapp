import { Team } from "../types";

interface TeamRowProps {
  index: number;
  team: Team;
  onRemove: (id: number | string,name:string) => void;
}

export default function TeamRow({ index, team, onRemove }: TeamRowProps) {
  return (
    <tr className="border">
      <td className="border p-2 text-center">{index}</td>
      <td className="border p-2">{team.name}</td>
      <td className="border p-2 text-center">
        <button onClick={() => onRemove(team.id,team.name)} className="bg-red-500 text-white px-2 py-1 rounded">
          Eliminar
        </button>
      </td>
    </tr>
  );
}
