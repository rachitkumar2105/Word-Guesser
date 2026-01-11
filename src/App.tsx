import { useState, useEffect } from 'react';
import { SpaceBackground } from './components/layout/SpaceBackground';
import { Header } from './components/layout/Header';
import { Keyboard } from './components/game/Keyboard';
import { Modal } from './components/modals/Modal';
import { HowToPlay } from './components/modals/HowToPlay';
import { StatsModal } from './components/modals/StatsModal';
import { LeaderboardModal } from './components/modals/LeaderboardModal';
import { ProfileModal } from './components/modals/ProfileModal';
import { WelcomeScreen } from './components/auth/WelcomeScreen';
import { AuthProvider, useAuth } from './context/AuthContext';
import { useWordle } from './hooks/useWordle';
import { getDailyWord, getRandomWord } from './data/words';
import { Grid } from './components/game/Grid';

function GameContent() {
  const [solution, setSolution] = useState<string>('');
  const [isDaily, setIsDaily] = useState(true);

  // Game State
  const { currentGuess, guesses, isCorrect, turn, handleKeyup, usedKeys } = useWordle(solution);
  const [showModal, setShowModal] = useState<'help' | 'stats' | 'leaderboard' | 'profile' | null>(null);
  const [showWinModal, setShowWinModal] = useState(false);
  const { user } = useAuth(); // Hooks must be inside component

  // Initialize Game
  useEffect(() => {
    if (isDaily) {
      setSolution(getDailyWord());
    } else {
      setSolution(getRandomWord());
    }
  }, [isDaily]);

  // Handle Win/Loss
  useEffect(() => {
    if (isCorrect) {
      setTimeout(() => setShowWinModal(true), 2000);
    }
    if (turn > 5 && !isCorrect) {
      setTimeout(() => setShowWinModal(true), 2000);
    }
  }, [isCorrect, turn]);

  // Event Listeners
  useEffect(() => {
    window.addEventListener('keyup', handleKeyup);
    return () => window.removeEventListener('keyup', handleKeyup);
  }, [handleKeyup]);

  if (!user) {
    return <WelcomeScreen />;
  }

  return (
    <div className="flex flex-col h-screen w-full relative overflow-hidden">
      <Header
        isDaily={isDaily}
        toggleMode={() => setIsDaily(!isDaily)}
        onOpenModal={setShowModal}
      />

      <main className="flex-grow flex flex-col items-center justify-center min-h-0 p-2 relative z-10">
        <div className="w-full max-w-[300px] sm:max-w-[350px] aspect-[5/6] max-h-[50vh]">
          <Grid currentGuess={currentGuess} guesses={guesses} turn={turn} />
        </div>
      </main>

      <div className="p-1 sm:p-2 pb-4 z-10 relative flex-shrink-0">
        <div className="w-full max-w-[600px] mx-auto">
          <Keyboard onChar={(key) => handleKeyup({ key })} onDelete={() => handleKeyup({ key: 'Backspace' })} onEnter={() => handleKeyup({ key: 'Enter' })} usedKeys={usedKeys} />
        </div>
      </div>

      {/* Modals */}
      <Modal isOpen={showModal === 'help'} onClose={() => setShowModal(null)} title="How to Play">
        <HowToPlay />
      </Modal>

      <StatsModal
        isOpen={showModal === 'stats' || showWinModal}
        onClose={() => { setShowModal(null); setShowWinModal(false); }}
        solution={solution}
        isCorrect={isCorrect}
        turn={turn}
        // Mock data - would come from context/storage
        gamesPlayed={12}
        winRate={42}
        currentStreak={3}
        maxStreak={5}
        distribution={[0, 2, 4, 3, 2, 1]}
        isDaily={isDaily}
        onNewGame={() => {
          setShowWinModal(false);
          setShowModal(null);
          setSolution(getRandomWord());
        }}
      />

      <LeaderboardModal
        isOpen={showModal === 'leaderboard'}
        onClose={() => setShowModal(null)}
      />

      <ProfileModal
        isOpen={showModal === 'profile'}
        onClose={() => setShowModal(null)}
      />
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <div className="bg-[#0a0a16] text-white min-h-screen font-sans selection:bg-cyan-500/30">
        <SpaceBackground />
        <GameContent />
      </div>
    </AuthProvider>
  );
}

export default App;
