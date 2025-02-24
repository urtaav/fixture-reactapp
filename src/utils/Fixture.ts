import { Team } from "../types";
import { getRandomTeamName } from "./RandomTeam";

// Genera fixture round-robin para equipos pares.
// Si la cantidad de equipos es impar, se añade un equipo "bye".
export function generateRoundRobinFixture(teams: Team[]): { jornada: number; matches: { match: string }[] }[] {
  // const totalTeams = teams.length % 2 === 0 ? teams.length : teams.length + 1;
  // Clonar equipos para no modificar el original
  const teamsList: Team[] = [...teams];

  if (teamsList.length % 2 !== 0) {
    teamsList.push({ id: "bye", name: getRandomTeamName() });
  }

  const jornadas = [];
  const n = teamsList.length;
  // Número de jornadas para un torneo round-robin
  const totalJornadas = n - 1;

  // Generar fixture
  for (let jornada = 0; jornada < totalJornadas; jornada++) {
    const matches = [];
    for (let i = 0; i < n / 2; i++) {
      const home = teamsList[i];
      const away = teamsList[n - 1 - i];
      // Si se enfrenta a "bye", puede interpretarse como jornada libre
      matches.push({
        match: home.name === "bye" || away.name === "bye"
          ? `${home.name === "bye" ? away.name : home.name} descansa`
          : `${home.name} vs ${away.name}`
      });
    }
    jornadas.push({ jornada: jornada + 1, matches });
    // Rotar equipos manteniendo al primero fijo
    teamsList.splice(1, 0, teamsList.pop()!);
  }
  return jornadas;
}
