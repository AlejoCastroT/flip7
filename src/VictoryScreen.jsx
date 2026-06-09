import { motion } from 'framer-motion';

const VictoryScreen = ({ gameState, sketchFont }) => {
  const sortedPlayers = [...gameState.players].sort((a, b) => b.totalScore - a.totalScore);
  
  return (
    <div className="min-h-screen bg-[#f8f9fa] flex flex-col items-center justify-center p-4" style={sketchFont}>
      <motion.div initial={{ scale: 0, y: 50 }} animate={{ scale: 1, y: 0 }} className="bg-white p-10 rounded-xl border-4 border-black shadow-[8px_8px_0px_#000000] max-w-xl w-full">
        <h1 className="text-4xl font-black mb-6 text-center uppercase tracking-widest text-black underline decoration-4 decoration-yellow-400">FIN DEL JUEGO</h1>
        <div className="space-y-4 mb-8">
          {sortedPlayers.map((player, index) => {
            let podioColor = "bg-white border-2 border-black";
            let medalla = `${index + 1}º`;
            if (index === 0) { podioColor = "bg-yellow-200 border-4 border-black font-black text-xl shadow-[4px_4px_0px_#000000] transform scale-105 z-10 relative"; medalla = "🥇 1º"; }
            else if (index === 1) { podioColor = "bg-gray-200 border-2 border-black font-bold"; medalla = "🥈 2º"; }
            else if (index === 2) { podioColor = "bg-orange-200 border-2 border-black font-bold"; medalla = "🥉 3º"; }
            return (
              <div key={player.id} className={`flex justify-between items-center p-4 rounded-lg ${podioColor}`}>
                <div className="flex items-center gap-4"><span>{medalla}</span><span className="uppercase tracking-wider">{player.name}</span></div>
                <span className="text-2xl font-black">{player.totalScore} <span className="text-xs font-normal">pts</span></span>
              </div>
            );
          })}
        </div>
        <button onClick={() => window.location.reload()} className="w-full bg-blue-400 border-4 border-black text-black font-black py-4 rounded-xl uppercase tracking-widest shadow-[6px_6px_0px_#000000] hover:translate-y-1 hover:shadow-[2px_2px_0px_#000000] transition-all">Nueva Partida</button>
      </motion.div>
    </div>
  );
};
export default VictoryScreen;