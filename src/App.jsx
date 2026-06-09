import { useState, useEffect, useRef } from 'react';
import SetupScreen from './SetupScreen';
import GameBoard from './GameBoard';
import VictoryScreen from './VictoryScreen';

function App() {
  const [playerNames, setPlayerNames] = useState(['', '']);
  const [gameId, setGameId] = useState(null);
  const [gameState, setGameState] = useState(null);
  const [error, setError] = useState('');
  const [displayPlayerId, setDisplayPlayerId] = useState(null);
  const previousCardCount = useRef(0);

  const playCardSound = () => {
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gainNode = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(50, ctx.currentTime + 0.1);
      gainNode.gain.setValueAtTime(0.5, ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);
      osc.connect(gainNode); gainNode.connect(ctx.destination);
      osc.start(); osc.stop(ctx.currentTime + 0.1);
    } catch (e) { console.log('Audio no soportado'); }
  };

  const handleNameChange = (index, value) => {
    const newNames = [...playerNames]; newNames[index] = value; setPlayerNames(newNames);
  };
  const addPlayer = () => setPlayerNames([...playerNames, '']);
  const removePlayer = (index) => { if (playerNames.length > 2) setPlayerNames(playerNames.filter((_, i) => i !== index)); };

  const startGame = async (e) => {
    e.preventDefault();
    if (playerNames.length < 2) return setError('Mínimo 2 jugadores.');
    if (playerNames.some(name => name.trim() === '')) return setError('Llena todos los nombres.');
    try {
      const response = await fetch('http://localhost:8080/api/games', {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ playerNames })
      });
      if (!response.ok) throw new Error('Error al conectar con el servidor.');
      const data = await response.json();
      setGameId(data.gameId); setError('');
    } catch (err) { setError(err.message); }
  };

  const fetchGameState = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/api/games/${id}`);
      if (response.ok) {
        const data = await response.json();
        setGameState(data);
        const currentTotalCards = data.players.reduce((total, p) => total + (p.currentHand ? p.currentHand.length : 0), 0);
        if (currentTotalCards > previousCardCount.current && previousCardCount.current !== 0) playCardSound();
        previousCardCount.current = currentTotalCards;
      }
    } catch (err) { console.error('Error:', err); }
  };

  useEffect(() => { if (gameId) fetchGameState(gameId); }, [gameId]);

  useEffect(() => {
    if (gameState) {
      if (!displayPlayerId) {
        setDisplayPlayerId(gameState.currentPlayerId);
      } else if (gameState.currentPlayerId !== displayPlayerId) {
        const timer = setTimeout(() => {
          setDisplayPlayerId(gameState.currentPlayerId);
        }, 1000); 
        return () => clearTimeout(timer);
      }
    }
  }, [gameState?.currentPlayerId]);

  const handleAction = async (playerId, action, targetId = null) => {
    try {
      await fetch(`http://localhost:8080/api/games/${gameId}/action`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ playerId, action, targetId })
      });
      fetchGameState(gameId);
    } catch (err) { console.error('Error:', err); }
  };

  const startNextRound = async () => {
    try {
      await fetch(`http://localhost:8080/api/games/${gameId}/next-round`, { method: 'POST' });
      previousCardCount.current = 0; fetchGameState(gameId);
    } catch (err) { console.error('Error:', err); }
  };

  const sketchFont = { fontFamily: '"Comic Sans MS", "Chalkboard SE", "Marker Felt", cursive, sans-serif' };

  if (gameId && gameState && gameState.status === 'FINISHED') {
    return <VictoryScreen gameState={gameState} sketchFont={sketchFont} />;
  }

  if (gameId && gameState) {
    return (
      <GameBoard
        gameState={gameState}
        displayPlayerId={displayPlayerId}
        startNextRound={startNextRound}
        handleAction={handleAction}
        sketchFont={sketchFont}
      />
    );
  }

  return (
    <SetupScreen
      playerNames={playerNames}
      error={error}
      handleNameChange={handleNameChange}
      addPlayer={addPlayer}
      removePlayer={removePlayer}
      startGame={startGame}
      sketchFont={sketchFont}
    />
  );
}
export default App;