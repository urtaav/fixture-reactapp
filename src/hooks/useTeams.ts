import { useState, useEffect } from "react";
import { Team } from "../types";

export function useTeams() {
  const [teams, setTeams] = useState<Team[]>(() => {
    const localData = localStorage.getItem("teams");
    return localData ? JSON.parse(localData) as Team[] : [];
  });

  useEffect(() => {
    localStorage.setItem("teams", JSON.stringify(teams));
  }, [teams]);

  const addTeam = (teamName: string): void => {
    if (!teamName.trim()) return;
    // Validar que no se agreguen nombres duplicados
    if (teams.some(team => team.name.toLowerCase() === teamName.toLowerCase())) return;
    setTeams([...teams, { id: Date.now(), name: teamName }]);
  };

  const removeTeam = (id: number | string): void => {
    setTeams(teams.filter(team => team.id !== id));
  };

  return { teams, addTeam, removeTeam };
}
