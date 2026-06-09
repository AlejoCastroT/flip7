import { motion } from 'framer-motion';

const SetupScreen = ({ playerNames, error, handleNameChange, addPlayer, removePlayer, startGame, sketchFont }) => {
  return (
    <div className="min-h-screen bg-[#f8f9fa] flex flex-col items-center justify-center p-4 bg-[url('https://www.transparenttextures.com/patterns/notebook-dark.png')]" style={sketchFont}>
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="bg-white border-4 border-black p-10 rounded-2xl shadow-[10px_10px_0px_#000000] max-w-md w-full relative">
        <h1 className="text-6xl font-black text-center mb-2 italic tracking-tighter drop-shadow-[2px_2px_0px_#facc15]">FLIP<span className="text-yellow-400">7</span></h1>
        
        {error && <div className="bg-red-200 border-2 border-black text-red-800 p-3 rounded-lg text-center text-sm font-bold mb-6 shadow-[2px_2px_0px_#000000]">{error}</div>}
        
        <form onSubmit={startGame} className="space-y-4">
          <div className="max-h-64 overflow-y-auto pr-2 space-y-3">
            {playerNames.map((name, index) => (
              <div key={index} className="flex items-end gap-3">
                <div className="flex-1">
                  <label className="block text-black text-xs font-black mb-1 uppercase tracking-wide">Jugador {index + 1}</label>
                  <input type="text" value={name} onChange={(e) => handleNameChange(index, e.target.value)} className="w-full px-4 py-3 rounded-xl bg-white text-black border-4 border-black focus:bg-yellow-50 outline-none font-bold transition-all shadow-[4px_4px_0px_#000000]" placeholder={`Nombre ${index + 1}`} />
                </div>
                {playerNames.length > 2 && <button type="button" onClick={() => removePlayer(index)} className="bg-red-300 hover:bg-red-400 border-2 border-black font-black w-12 h-[56px] rounded-xl shadow-[2px_2px_0px_#000000] flex items-center justify-center transition-transform hover:translate-y-1 hover:shadow-none">X</button>}
              </div>
            ))}
          </div>
          <button type="button" onClick={addPlayer} className="w-full bg-blue-100 hover:bg-blue-200 text-black border-4 border-dashed border-black font-black py-3 rounded-xl uppercase tracking-wider text-xs transition-colors">+ Añadir Jugador</button>
          <button type="submit" className="w-full mt-6 bg-yellow-300 hover:bg-yellow-400 text-black border-4 border-black font-black py-4 rounded-xl uppercase tracking-widest shadow-[6px_6px_0px_#000000] transition-transform hover:translate-y-1 hover:shadow-[2px_2px_0px_#000000]">Iniciar Partida</button>
        </form>
      </motion.div>
    </div>
  );
};
export default SetupScreen;