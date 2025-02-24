interface FixtureCardProps {
    jornada: number;
    matches: { match: string }[];
  }
  
  export default function FixtureCard({ jornada, matches }: FixtureCardProps) {
    return (
      <div className="bg-white px-1 rounded-md shadow-lg flex flex-col gap-1 md:flex-row max-w-xs md:max-w-sm lg:max-w-md mx-auto">
      <div className="flex flex-col gap-1 flex-1">
        <h3 className="font-semibold text-xs text-center">Jornada {jornada}</h3>
        <div className="flex flex-col gap-1">
            {matches.map((m, idx) => {
            const [local, visitante] = m.match.split(" vs ");
            return (
              <div 
              key={idx} 
              className={`grid grid-cols-3 items-center text-center py-1 rounded-md ${idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}
              >
              <span className="text-xs">{local.trim()}</span>
              <span className="text-stone-500 text-sm font-medium">vs</span>
              <span className="text-xs">{visitante.trim()}</span>
              </div>
            );
            })}
        </div>
      </div>
    </div>
    );
  }
  