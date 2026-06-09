import { motion, AnimatePresence } from 'framer-motion';
import { getCardStyle } from './gameUtils';
import ComicBombExplosion from './ComicBombExplosion';

const GameBoard = ({ gameState, displayPlayerId, startNextRound, handleAction, sketchFont }) => {
  const activePlayer = gameState.players.find(p => p.id === (displayPlayerId || gameState.currentPlayerId)) || gameState.players[0];
  const isActuallyMyTurn = activePlayer.id === gameState.currentPlayerId;
  const totalPlayers = gameState.players.length;
  const tableRadius = 38;

  return (
    <div className="min-h-screen bg-[#f4f4f5] flex text-black" style={sketchFont}>
      
      {/* PANEL IZQUIERDO: SIDEBAR DE JUGADORES */}
      <div className="w-1/4 max-w-[280px] bg-white border-r-4 border-black z-50 flex flex-col shadow-[4px_0px_0px_#000000]">
        <div className="p-6 border-b-4 border-black flex items-center justify-center bg-yellow-100">
           <h1 className="text-5xl font-black tracking-tighter italic text-black drop-shadow-[2px_2px_0px_#ffffff]">FLIP<span className="text-yellow-500">7</span></h1>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[url('https://www.transparenttextures.com/patterns/notebook-dark.png')]">
          {gameState.players.map((player, i) => {
            const isActive = player.id === gameState.currentPlayerId && !gameState.isRoundFinished;
            const isBusted = player.roundState === 'BUSTED';
            
            return (
              <div key={player.id} className={`flex flex-col p-3 rounded-lg border-2 border-black transition-all ${isActive ? 'bg-blue-100 shadow-[4px_4px_0px_#000000] scale-105' : 'bg-white shadow-[2px_2px_0px_#000000]'} ${isBusted ? 'opacity-60 bg-gray-200' : ''}`}>
                <div className="flex items-center">
                  <div className="w-10 h-10 border-2 border-black rounded-full flex items-center justify-center font-black bg-yellow-300 text-lg mr-3">
                    {player.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex-1">
                    <p className={`font-black text-sm uppercase ${isBusted ? 'line-through text-red-600' : 'text-black'}`}>Jugador {i+1}</p>
                    <p className="text-xs font-bold">{player.name}</p>
                  </div>
                  <div className="text-xl font-black text-center">
                    {player.totalScore}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="p-5 border-t-4 border-black bg-white text-center rounded-br-3xl">
          <p className="text-xs font-black uppercase tracking-widest mb-1">META</p>
          <p className="text-2xl font-black bg-yellow-200 border-2 border-black inline-block px-4 py-1 rounded-full shadow-[2px_2px_0px_#000000]">200 pts</p>
        </div>
      </div>

      {/* PANEL CENTRAL: ÁREA DE MESA REDONDA */}
      <div className="flex-1 flex flex-col items-center justify-center p-4 relative overflow-hidden bg-[url('https://www.transparenttextures.com/patterns/skulls.png')]">
        
        <div className="relative w-[95vw] h-[95vh] max-w-[1000px] max-h-[1000px] bg-white rounded-full border-[6px] border-black shadow-[15px_15px_0px_rgba(0,0,0,0.1)] flex items-center justify-center">
          
          <div className="flex flex-col items-center justify-center z-10 w-[80%] h-[70%] bg-transparent rounded-full pointer-events-none mt-[-5%]">
            <div className="pointer-events-auto flex flex-col items-center w-full">
              
              <div className="bg-white border-4 border-black px-6 py-2 rounded-full shadow-[4px_4px_0px_#000000] mb-4 z-50">
                <h2 className="font-black tracking-widest uppercase text-md">
                  {gameState.isRoundFinished ? 'Ronda Finalizada' : 
                   activePlayer.roundState === 'BUSTED' ? `¡${activePlayer.name} EXPLOTÓ!` :
                   activePlayer.roundState === 'STANDING' ? `${activePlayer.name} SE PLANTÓ` :
                   `TURNO DE: ${activePlayer.name}`}
                </h2>
              </div>

              <div className="flex flex-wrap gap-2 justify-center min-h-[160px] perspective-1000 w-full mb-4">
                <AnimatePresence>
                  {activePlayer.currentHand && activePlayer.currentHand.map((card, idx) => {
                    const styleInfo = getCardStyle(card.value);
                    return (
                      <motion.div 
                        key={`${activePlayer.id}-${idx}-${card.value}`} 
                        initial={{ opacity: 0, scale: 0.5, y: 100, rotateZ: 180 }} 
                        animate={{ opacity: 1, scale: 1, y: 0, rotateZ: (Math.random() * 6 - 3) }}
                        transition={{ type: "spring", stiffness: 120, damping: 12 }}
                        className={`relative h-[150px] w-[100px] rounded-lg flex flex-col items-center justify-between p-2 ${styleInfo.style}`}
                      >
                        <div className="flex flex-col items-center justify-center flex-grow">
                          <span className={`text-6xl font-black drop-shadow-md leading-none ${styleInfo.text}`}>
                            {styleInfo.displayValue}
                          </span>
                        </div>
                        <span className={`text-[10px] font-black z-10 uppercase tracking-widest text-center leading-none ${styleInfo.text}`}>
                          {styleInfo.innerText}
                        </span>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </div>

              <div className="flex gap-10 items-center justify-center w-full">
                <div className="flex flex-col items-center opacity-80 -rotate-6">
                  <div className="w-24 h-32 bg-yellow-100 border-4 border-black rounded-lg shadow-[6px_6px_0px_#000000] flex items-center justify-center">
                    <span className="text-black font-black -rotate-45 text-2xl tracking-tighter">FLIP<span className="text-yellow-500">7</span></span>
                  </div>
                </div>

                <div className="flex flex-col items-center">
                  <span className="text-[10px] font-black uppercase mb-1">Puntaje Actual</span>
                  <div className="bg-white border-4 border-blue-400 rounded-full w-24 h-24 flex items-center justify-center shadow-[4px_4px_0px_#000000]">
                    <span className="text-4xl font-black text-blue-600">{activePlayer.totalScore}</span>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex gap-4 pointer-events-auto z-[200]">
                {gameState.isRoundFinished && (
                  <button onClick={startNextRound} className="bg-blue-300 border-4 border-black text-black font-black py-3 px-8 rounded-xl text-lg shadow-[6px_6px_0px_#000000] uppercase hover:translate-y-1 hover:shadow-[2px_2px_0px_#000000] transition-all">
                    Repartir Nueva Ronda
                  </button>
                )}

                {!gameState.isRoundFinished && activePlayer.roundState === 'PLAYING' && isActuallyMyTurn && (
                  <>
                    <button onClick={() => handleAction(activePlayer.id, 'HIT')} className="bg-[#bbf7d0] border-4 border-black text-black font-black py-3 px-6 rounded-xl shadow-[4px_4px_0px_#000000] uppercase tracking-wider hover:translate-y-1 hover:shadow-[0px_0px_0px_#000000] transition-all flex items-center gap-2">
                      📄 Voltear otra carta
                    </button>
                    <button onClick={() => handleAction(activePlayer.id, 'STAND')} className="bg-[#fecaca] border-4 border-black text-black font-black py-3 px-6 rounded-xl shadow-[4px_4px_0px_#000000] uppercase tracking-wider hover:translate-y-1 hover:shadow-[0px_0px_0px_#000000] transition-all flex items-center gap-2">
                      ✋ Plantarse
                    </button>
                  </>
                )}

                {!gameState.isRoundFinished && activePlayer.roundState === 'CHOOSING_TARGET' && isActuallyMyTurn && (
                  <div className="bg-[#fef08a] border-4 border-black p-4 rounded-xl shadow-[4px_4px_0px_#000000] flex flex-col items-center">
                    <span className="font-black uppercase mb-2 text-sm">⭐ Elegir Víctima ⭐</span>
                    <div className="flex gap-2">
                      {gameState.players.filter(p => p.id !== activePlayer.id && p.roundState !== 'BUSTED').map(target => (
                        <button key={target.id} onClick={() => handleAction(activePlayer.id, 'APPLY_ACTION', target.id)} className="bg-white border-2 border-black text-black font-bold py-1 px-3 rounded-lg shadow-[2px_2px_0px_#000000] uppercase hover:bg-yellow-200">
                          {target.name}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

            </div>
          </div>

          {/* Renderizado de jugadores satélite omitido en el diff por brevedad, está copiado de tu código original */}
          {gameState.players.map((player, index) => {
            const angle = (index / totalPlayers) * 2 * Math.PI - (Math.PI / 2);
            const leftPos = `calc(50% + ${tableRadius * Math.cos(angle)}%)`;
            const topPos = `calc(50% + ${tableRadius * Math.sin(angle)}%)`;
            const isMyTurn = gameState.currentPlayerId === player.id && !gameState.isRoundFinished;
            const isBusted = player.roundState === 'BUSTED';

            return (
              <div key={player.id} className="absolute flex flex-col items-center justify-center transition-all duration-700 pointer-events-auto" style={{ left: leftPos, top: topPos, transform: 'translate(-50%, -50%)', zIndex: isMyTurn ? 40 : 20 }}>
                <div className={`bg-white border-2 border-black rounded-xl p-2 shadow-[4px_4px_0px_#000000] w-32 text-center relative ${isMyTurn ? 'ring-4 ring-yellow-400 bg-yellow-50 scale-110' : ''} ${isBusted ? 'opacity-60 bg-gray-200' : ''}`}>
                  
                  <AnimatePresence>
                    {isBusted && <ComicBombExplosion key={`bomb-${player.id}`} />}
                  </AnimatePresence>
                  
                  <div className="flex items-center justify-center gap-2 border-b-2 border-gray-200 pb-1 mb-1">
                    <div className="w-6 h-6 bg-blue-200 border border-black rounded-full flex items-center justify-center text-xs font-black">{player.name.charAt(0).toUpperCase()}</div>
                    <h3 className={`font-black text-sm truncate uppercase ${isBusted ? 'line-through text-red-500' : 'text-black'}`}>{player.name}</h3>
                  </div>
                  <p className="text-[10px] font-bold text-gray-600">Total: {player.totalScore} pts</p>
                  <p className="text-[9px] font-black text-gray-400 uppercase mt-1">{player.roundState}</p>
                </div>

                <div className="flex flex-wrap gap-1 mt-2 justify-center max-w-[140px]">
                  {player.currentHand && player.currentHand.map((card, idx) => {
                    const styleInfo = getCardStyle(card.value);
                    return (
                      <div key={idx} className={`w-6 h-8 rounded-md flex items-center justify-center ${styleInfo.style}`}>
                        <span className={`text-[10px] font-black leading-none ${styleInfo.text}`}>{styleInfo.displayValue}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default GameBoard;