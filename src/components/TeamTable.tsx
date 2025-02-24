import { Team } from "../types";
import TeamRow from "./TeamRow";

interface TeamTableProps {
  teams: Team[];
  onRemove: (id: number | string,name:string) => void;
}

export default function TeamTable({ teams, onRemove }: TeamTableProps) {
  return (
    <table className="w-full mt-4 border-collapse border">
      <thead>
        <tr className="bg-gray-200">
          <th className="border p-2">#</th>
          <th className="border p-2">Nombre del Equipo</th>
          <th className="border p-2">Acción</th>
        </tr>
      </thead>
      <tbody>
        {teams.length > 0 ? (
          teams.map((team, index) => (
            <TeamRow key={team.id} index={index + 1} team={team} onRemove={() => onRemove(team.id,team.name)} />
          ))
        ) : (
          <tr>
            <td colSpan={3} className="text-center p-4 text-gray-500">No hay equipos registrados</td>
          </tr>
        )}
      </tbody>
    </table>
  );
}
