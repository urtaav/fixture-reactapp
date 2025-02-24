const randomNames = ["Libre", "La liga", "Sin Rival"];

export function getRandomTeamName(): string {
  const index = Math.floor(Math.random() * randomNames.length);
  return randomNames[index];
}
