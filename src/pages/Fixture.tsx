import { useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import { useTeams } from "../hooks/useTeams";
import { generateRoundRobinFixture } from "../utils/Fixture";
import TeamForm from "../components/TeamForm";
import TeamTable from "../components/TeamTable";
import FixtureCard from "../components/FixtureCard";
import { FaFutbol } from "react-icons/fa";
import toast from "react-hot-toast";

const Fixture = () => {
  const { teams, addTeam, removeTeam } = useTeams();
  const [jornadas, setJornadas] = useState<
    { jornada: number; matches: { match: string }[] }[]
  >([]);

  const [isLoading, setIsLoading] = useState(false);

  const handleGenerateFixture = () => {
    setIsLoading(true); // Activamos el loading antes de generar

    setTimeout(() => {
      // Realizamos el sort sobre el arreglo de equipos
      const teamsShuffled = [...teams]
        .sort(() => Math.random() - 0.5)
        .reverse();
      // Generamos el fixture
      const generatedJornadas = generateRoundRobinFixture(teamsShuffled);
      setJornadas(generatedJornadas);
      toast.success(`Jornadas generadas con Éxito`);
      setIsLoading(false); // Desactivamos el loading después de generar
    }, 1500); // Simulación de 1.5 segundos
  };


  
  const contentRef = useRef<HTMLDivElement>(null);
  const reactToPrintFn = useReactToPrint({ contentRef });
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-3xl mx-auto p-4">
        <h1 className="text-3xl font-bold text-center mb-6">Fixture App</h1>
        <TeamForm
          onAddTeam={(team) => {
            addTeam(team);
            toast.success(`Equipo ${team} agregado con éxito`);
          }}
        />
        <TeamTable teams={teams} onRemove={(id,name) => {
            toast.error(`Equipo ${name} eliminado con éxito`);
            removeTeam(id);
        }} />
        {teams.length > 0 && (
          <div className="mt-6 text-center">
            <button
              onClick={handleGenerateFixture}
              disabled={isLoading}
              className="border w-full text-sm flex items-center justify-center gap-2 py-2 rounded-md bg-white font-semibold hover:bg-gray-100 hoverEffect disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <FaFutbol className="animate-spin" /> Generando...
                </>
              ) : (
                <>
                  <FaFutbol /> Generar Fixture
                </>
              )}
            </button>
          </div>
        )}
      </div>
      {isLoading && (
        <div className="fixed inset-0 bg-white bg-opacity-75 flex items-center justify-center z-50">
          <FaFutbol className="animate-spin text-4xl" />
          <span className="ml-4 text-xl">Generando fixture, por favor espera...</span>
        </div>
      )}
      {/* Contenedor de cards a pantalla completa */}
      {jornadas.length > 0 && (
        <div className="w-full px-2 py-2 print-container" ref={contentRef}>
          <h2 className="text-xl font-bold mb-4 text-center">
            Torneo de Fútbol 7 "Barrio La Cantera" {new Date().getFullYear()}
          </h2>

          {/* Agrupar jornadas en bloques de 8 */}
          {Array.from(
            { length: Math.ceil(jornadas.length / 8) },
            (_, index) => (
              <div key={index} className="print-page grid grid-cols-4 gap-2">
                {jornadas.slice(index * 8, index * 8 + 8).map((jornadaData) => (
                  <div key={jornadaData.jornada} className="fixture-card">
                    <FixtureCard
                      jornada={jornadaData.jornada}
                      matches={jornadaData.matches}
                    />
                  </div>
                ))}
              </div>
            )
          )}
        </div>
      )}

      {jornadas.length > 0 && (
        <div className="flex flex-col items-center my-6">
          <button
            onClick={() => reactToPrintFn()}
            className="bg-stone-800  text-white px-6 py-3 rounded cursor-pointer"
          >
            Print
          </button>
        </div>
      )}
    </div>
  );
};

export default Fixture;
