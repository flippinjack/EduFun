"use client";
import { useState, useEffect } from "react";

export default function Home() {
  const [openSection, setOpenSection] = useState(null);
  const [quizAnswers, setQuizAnswers] = useState({});
  const [points, setPoints] = useState(0);
  const [badges, setBadges] = useState([]);
  const [currentGame, setCurrentGame] = useState(null);
  const [gameProgress, setGameProgress] = useState({
    spotDanger: { completed: false, score: 0 },
    matching: { completed: false, score: 0 },
    sorting: { completed: false, score: 0 },
    quiz: { completed: false, score: 0 }
  });

  // Spot the Danger game state
  const [dangerGame, setDangerGame] = useState({
    currentScenario: 0,
    correct: 0,
    total: 0
  });

  // Matching game state
  const [matchingGame, setMatchingGame] = useState({
    selected: [],
    matched: [],
    attempts: 0
  });

  // Sorting game state
  const [sortingGame, setSortingGame] = useState({
    items: [],
    safe: [],
    unsafe: []
  });

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  const handleQuizAnswer = (question, answer, isCorrect) => {
    if (!quizAnswers[question]) {
      setQuizAnswers({ ...quizAnswers, [question]: answer });
      if (isCorrect) {
        addPoints(10);
      }

      // Check if all quiz questions answered
      const totalAnswered = Object.keys(quizAnswers).length + 1;
      if (totalAnswered === 3) {
        const correctCount = Object.values(quizAnswers).filter(a => a.correct).length + (isCorrect ? 1 : 0);
        updateGameProgress('quiz', true, correctCount * 10);
        if (correctCount === 3) {
          addBadge('quiz-master');
        }
      }
    }
  };

  const addPoints = (amount) => {
    setPoints(prev => prev + amount);
  };

  const addBadge = (badgeId) => {
    if (!badges.includes(badgeId)) {
      setBadges(prev => [...prev, badgeId]);
    }
  };

  const updateGameProgress = (game, completed, score) => {
    setGameProgress(prev => ({
      ...prev,
      [game]: { completed, score }
    }));
  };

  useEffect(() => {
    // Check for milestone badges
    if (points >= 100 && !badges.includes('century')) {
      addBadge('century');
    }
    if (points >= 200 && !badges.includes('expert')) {
      addBadge('expert');
    }
    const completedGames = Object.values(gameProgress).filter(g => g.completed).length;
    if (completedGames === 4 && !badges.includes('champion')) {
      addBadge('champion');
    }
  }, [points, gameProgress, badges]);

  // Game data
  const dangerScenarios = [
    {
      id: 1,
      image: "💬",
      scenario: "A person you just met in an online game asks for your home address to send you a gift.",
      options: ["Share my address - they seem nice!", "Politely decline and tell an adult"],
      correct: 1,
      explanation: "Never share personal information with strangers, even if they offer gifts!"
    },
    {
      id: 2,
      image: "📱",
      scenario: "Someone sends you a message with a link saying 'Click here to win a free phone!'",
      options: ["Click the link immediately!", "Ignore it and tell an adult"],
      correct: 1,
      explanation: "Suspicious links can be scams or viruses. Always ask an adult first!"
    },
    {
      id: 3,
      image: "🎮",
      scenario: "A player in your favorite game is being mean and calling you names.",
      options: ["Respond with mean messages back", "Block them and report to an adult"],
      correct: 1,
      explanation: "Don't engage with bullies. Block, report, and tell a trusted adult!"
    },
    {
      id: 4,
      image: "📸",
      scenario: "Your friend wants to post a photo of you both at school on social media.",
      options: ["Post it without asking parents", "Ask parents for permission first"],
      correct: 1,
      explanation: "Always get permission before posting photos, especially ones showing your location!"
    },
    {
      id: 5,
      image: "🔐",
      scenario: "Your best friend asks for your password to help set up your game account.",
      options: ["Share my password with them", "Keep my password private"],
      correct: 1,
      explanation: "Never share passwords, even with friends! Your password is for you only."
    }
  ];

  const matchingPairs = [
    { id: 1, term: "Cyberbullying", definition: "Being mean to someone online", category: "term" },
    { id: 2, term: "Password", definition: "Secret code only you should know", category: "term" },
    { id: 3, term: "Stranger Danger", definition: "Don't talk to unknown people online", category: "term" },
    { id: 4, term: "Privacy", definition: "Keeping personal information safe", category: "term" }
  ];

  const sortingItems = [
    { id: 1, text: "Sharing your full name with strangers", type: "unsafe" },
    { id: 2, text: "Playing games with parental controls on", type: "safe" },
    { id: 3, text: "Posting your school name online", type: "unsafe" },
    { id: 4, text: "Asking parents before downloading apps", type: "safe" },
    { id: 5, text: "Meeting online friends in person alone", type: "unsafe" },
    { id: 6, text: "Using kid-friendly websites", type: "safe" },
    { id: 7, text: "Clicking on pop-up ads", type: "unsafe" },
    { id: 8, text: "Telling an adult about uncomfortable messages", type: "safe" }
  ];

  const badgeInfo = {
    'quiz-master': { name: 'Quiz Master', icon: '🎓', color: 'bg-blue-500' },
    'danger-spotter': { name: 'Danger Spotter', icon: '🔍', color: 'bg-red-500' },
    'match-pro': { name: 'Match Pro', icon: '🎯', color: 'bg-green-500' },
    'sort-star': { name: 'Sort Star', icon: '⭐', color: 'bg-yellow-500' },
    'century': { name: '100 Points!', icon: '💯', color: 'bg-purple-500' },
    'expert': { name: 'Safety Expert', icon: '🏆', color: 'bg-orange-500' },
    'champion': { name: 'Safety Champion', icon: '👑', color: 'bg-pink-500' }
  };

  const safetyTopics = [
    {
      id: "strangers",
      title: "Talking to Strangers Online",
      icon: "👥",
      color: "bg-red-500",
      content: "Just like in real life, you shouldn't talk to strangers online without a trusted adult present. People online might not be who they say they are.",
      tips: [
        "Never share personal information with people you don't know",
        "Don't accept friend requests from strangers",
        "Tell a parent or teacher if someone makes you uncomfortable",
        "Remember: Online strangers are still strangers!"
      ]
    },
    {
      id: "cyberbullying",
      title: "Cyberbullying",
      icon: "😢",
      color: "bg-orange-500",
      content: "Cyberbullying is when someone is mean to you online. It's never okay, and you should always tell an adult.",
      tips: [
        "Don't respond to mean messages",
        "Save evidence (take screenshots)",
        "Block the bully",
        "Tell a trusted adult immediately",
        "Remember: Being kind online is important!"
      ]
    },
    {
      id: "privacy",
      title: "Protecting Your Privacy",
      icon: "🔒",
      color: "bg-blue-500",
      content: "Your personal information is precious! Things like your address, phone number, school name, and photos should be kept private.",
      tips: [
        "Never share your password with friends",
        "Don't post your location or address",
        "Think before you share photos",
        "Keep family information private",
        "Ask an adult before signing up for anything"
      ]
    },
    {
      id: "content",
      title: "Inappropriate Content",
      icon: "⚠️",
      color: "bg-purple-500",
      content: "Sometimes you might see things online that are scary, violent, or inappropriate for kids. Without adult supervision, you might accidentally see harmful content.",
      tips: [
        "Tell an adult if you see something that makes you uncomfortable",
        "Don't click on suspicious links or pop-ups",
        "Use kid-safe search engines",
        "Ask permission before visiting new websites",
        "Close the page and tell an adult if you see something bad"
      ]
    },
    {
      id: "screentime",
      title: "Healthy Screen Time",
      icon: "⏰",
      color: "bg-green-500",
      content: "Too much screen time without breaks can hurt your eyes, affect your sleep, and take time away from other fun activities!",
      tips: [
        "Follow the screen time rules your parents set",
        "Take breaks every 20-30 minutes",
        "Don't use screens before bedtime",
        "Balance online time with outdoor play",
        "Tell an adult if you can't stop using a device"
      ]
    },
    {
      id: "supervision",
      title: "Why Adult Supervision Matters",
      icon: "👨‍👩‍👧‍👦",
      color: "bg-pink-500",
      content: "Adults help keep you safe online! Without supervision, you're at higher risk of encountering dangers like scams, inappropriate content, or online predators.",
      tips: [
        "Use devices in common areas where adults can see",
        "Be honest with parents about your online activities",
        "Ask for help when something seems wrong",
        "Follow family rules about internet use",
        "Adults are there to protect you, not punish you!"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-8 px-4 shadow-lg">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-6">
            <h1 className="text-5xl font-bold mb-3">🌟 EduFun: Stay Safe Online! 🌟</h1>
            <p className="text-xl">Learn how to be smart and safe on the internet</p>
          </div>

          {/* Points and Progress Bar */}
          <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <span className="text-4xl">⭐</span>
                <div>
                  <p className="text-sm font-medium">Your Points</p>
                  <p className="text-3xl font-bold">{points}</p>
                </div>
              </div>
              <div className="flex gap-2">
                {badges.map(badge => (
                  <div key={badge} className={`${badgeInfo[badge].color} p-3 rounded-xl shadow-lg`} title={badgeInfo[badge].name}>
                    <span className="text-2xl">{badgeInfo[badge].icon}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white/30 rounded-full h-4 overflow-hidden">
              <div
                className="bg-yellow-400 h-full transition-all duration-500 rounded-full"
                style={{ width: `${Math.min((points / 200) * 100, 100)}%` }}
              ></div>
            </div>
            <p className="text-sm text-center mt-2">Complete all games to become a Safety Champion!</p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-12">
        {/* Introduction */}
        <div className="bg-white rounded-3xl shadow-xl p-8 mb-12 border-4 border-yellow-400">
          <h2 className="text-3xl font-bold text-gray-800 mb-4 text-center">
            🎓 Welcome, Internet Explorer!
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed text-center mb-4">
            The internet is an amazing place to learn, play, and connect with others! But just like crossing the street,
            you need to know the safety rules. <span className="font-bold text-red-600">Without adult supervision, the internet can be risky!</span>
          </p>
          <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded">
            <p className="text-gray-800 font-semibold">
              ⚡ Did you know? Kids without adult supervision online are more likely to encounter cyberbullying,
              inappropriate content, online predators, and scams. Let's learn how to stay safe!
            </p>
          </div>
        </div>

        {/* Game Selection */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
            🎮 Play Safety Games!
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <GameCard
              title="Spot the Danger"
              icon="🔍"
              color="bg-red-500"
              description="Can you spot dangerous situations online?"
              points={50}
              completed={gameProgress.spotDanger.completed}
              onClick={() => setCurrentGame('spotDanger')}
            />
            <GameCard
              title="Match the Safety Tips"
              icon="🎯"
              color="bg-green-500"
              description="Match safety terms with their meanings!"
              points={40}
              completed={gameProgress.matching.completed}
              onClick={() => setCurrentGame('matching')}
            />
            <GameCard
              title="Safe or Unsafe?"
              icon="⚖️"
              color="bg-blue-500"
              description="Sort actions into safe and unsafe!"
              points={40}
              completed={gameProgress.sorting.completed}
              onClick={() => setCurrentGame('sorting')}
            />
            <GameCard
              title="Safety Quiz"
              icon="📝"
              color="bg-purple-500"
              description="Test your internet safety knowledge!"
              points={30}
              completed={gameProgress.quiz.completed}
              onClick={() => setCurrentGame('quiz')}
            />
          </div>
        </div>

        {/* Game Modals */}
        {currentGame === 'spotDanger' && (
          <SpotTheDangerGame
            scenarios={dangerScenarios}
            onClose={() => setCurrentGame(null)}
            onComplete={(score) => {
              addPoints(score);
              updateGameProgress('spotDanger', true, score);
              if (score >= 40) addBadge('danger-spotter');
              setCurrentGame(null);
            }}
          />
        )}

        {currentGame === 'matching' && (
          <MatchingGame
            pairs={matchingPairs}
            onClose={() => setCurrentGame(null)}
            onComplete={(score) => {
              addPoints(score);
              updateGameProgress('matching', true, score);
              if (score >= 30) addBadge('match-pro');
              setCurrentGame(null);
            }}
          />
        )}

        {currentGame === 'sorting' && (
          <SortingGame
            items={sortingItems}
            onClose={() => setCurrentGame(null)}
            onComplete={(score) => {
              addPoints(score);
              updateGameProgress('sorting', true, score);
              if (score >= 30) addBadge('sort-star');
              setCurrentGame(null);
            }}
          />
        )}

        {currentGame === 'quiz' && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-3xl w-full max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold text-gray-800">🎯 Quick Safety Quiz!</h2>
                <button
                  onClick={() => setCurrentGame(null)}
                  className="text-gray-500 hover:text-gray-700 text-3xl"
                >
                  ×
                </button>
              </div>
              <div className="space-y-6">
                <QuizQuestion
                  question="q1"
                  text="Should you share your home address with someone you met in an online game?"
                  options={[
                    { text: "Yes, if they seem nice", correct: false },
                    { text: "No, never share personal information", correct: true },
                  ]}
                  answer={quizAnswers.q1}
                  onAnswer={handleQuizAnswer}
                />

                <QuizQuestion
                  question="q2"
                  text="What should you do if you see something online that makes you uncomfortable?"
                  options={[
                    { text: "Keep it to myself", correct: false },
                    { text: "Tell a trusted adult immediately", correct: true },
                  ]}
                  answer={quizAnswers.q2}
                  onAnswer={handleQuizAnswer}
                />

                <QuizQuestion
                  question="q3"
                  text="Is it okay to use the internet without any adult supervision?"
                  options={[
                    { text: "Yes, I can handle it myself", correct: false },
                    { text: "No, adult supervision helps keep me safe", correct: true },
                  ]}
                  answer={quizAnswers.q3}
                  onAnswer={handleQuizAnswer}
                />
              </div>
            </div>
          </div>
        )}

        {/* Safety Topics */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
            📚 Digital Safety Lessons
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {safetyTopics.map((topic) => (
              <div
                key={topic.id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden border-4 border-transparent hover:border-gray-300 transition-all duration-300"
              >
                <div
                  className={`${topic.color} text-white p-6 cursor-pointer`}
                  onClick={() => toggleSection(topic.id)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-4xl">{topic.icon}</span>
                      <h3 className="text-2xl font-bold">{topic.title}</h3>
                    </div>
                    <span className="text-3xl">
                      {openSection === topic.id ? "−" : "+"}
                    </span>
                  </div>
                </div>

                {openSection === topic.id && (
                  <div className="p-6 bg-gray-50">
                    <p className="text-gray-700 mb-4 text-lg leading-relaxed">
                      {topic.content}
                    </p>
                    <h4 className="font-bold text-gray-800 mb-3 text-lg">
                      🛡️ Safety Tips:
                    </h4>
                    <ul className="space-y-2">
                      {topic.tips.map((tip, index) => (
                        <li
                          key={index}
                          className="flex items-start gap-2 text-gray-700"
                        >
                          <span className="text-green-500 font-bold mt-1">✓</span>
                          <span>{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Emergency Contact */}
        <div className="bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-3xl shadow-xl p-8 text-center">
          <h2 className="text-3xl font-bold mb-4">🆘 Need Help Right Now?</h2>
          <p className="text-xl mb-6">
            If something online is making you feel unsafe, scared, or uncomfortable:
          </p>
          <div className="bg-white text-gray-800 rounded-2xl p-6 max-w-2xl mx-auto">
            <p className="text-2xl font-bold mb-4">Tell a Trusted Adult:</p>
            <ul className="text-left space-y-2 text-lg">
              <li>👨‍👩‍👧 Parents or guardians</li>
              <li>👨‍🏫 Teachers</li>
              <li>👮 School counselors</li>
              <li>📞 Call a help hotline in your country</li>
            </ul>
          </div>
          <p className="text-xl mt-6 font-semibold">
            Remember: You're NEVER in trouble for asking for help! 💙
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 px-4 mt-12">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-lg mb-2">
            🌈 Stay safe, be kind, and have fun online!
          </p>
          <p className="text-sm text-gray-400">
            Always remember: The internet is best enjoyed with adult supervision
          </p>
        </div>
      </footer>
    </div>
  );
}

// Game Card Component
function GameCard({ title, icon, color, description, points, completed, onClick }) {
  return (
    <div
      className={`${color} text-white rounded-2xl shadow-xl p-6 cursor-pointer transform transition-all duration-300 hover:scale-110 hover:shadow-2xl hover:-rotate-1 ${
        completed ? 'ring-4 ring-yellow-400' : ''
      }`}
      onClick={onClick}
    >
      <div className="flex items-center justify-between mb-4">
        <span className="text-6xl animate-bounce">{icon}</span>
        {completed && <span className="text-4xl animate-spin-slow">⭐</span>}
      </div>
      <h3 className="text-2xl font-bold mb-2">{title}</h3>
      <p className="text-white/90 mb-4 font-medium">{description}</p>
      <div className="flex items-center justify-between">
        <span className="text-lg font-bold flex items-center gap-1">
          <span className="text-2xl">🎯</span> {points} pts
        </span>
        <button className="bg-white/30 hover:bg-white/50 px-5 py-2 rounded-xl font-bold transition-all duration-300 transform hover:scale-110 shadow-lg">
          {completed ? '🔄 Replay' : '▶️ Play'}
        </button>
      </div>
    </div>
  );
}

// Spot the Danger Game Component
function SpotTheDangerGame({ scenarios, onClose, onComplete }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [celebrate, setCelebrate] = useState(false);
  const [shake, setShake] = useState(false);

  const currentScenario = scenarios[currentIndex];
  const isLastQuestion = currentIndex === scenarios.length - 1;

  const handleAnswer = (answerIndex) => {
    if (selectedAnswer !== null) return;

    setSelectedAnswer(answerIndex);
    setShowExplanation(true);

    if (answerIndex === currentScenario.correct) {
      setScore(score + 10);
      setCelebrate(true);
      setTimeout(() => setCelebrate(false), 1000);
    } else {
      setShake(true);
      setTimeout(() => setShake(false), 500);
    }
  };

  const handleNext = () => {
    if (isLastQuestion) {
      onComplete(score + (selectedAnswer === currentScenario.correct ? 10 : 0));
    } else {
      setCurrentIndex(currentIndex + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className={`bg-white rounded-3xl shadow-2xl p-8 max-w-2xl w-full transition-all duration-300 ${shake ? 'animate-shake' : ''}`}>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-gray-800">🔍 Spot the Danger</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 text-3xl hover:rotate-90 transition-transform">×</button>
        </div>

        {celebrate && (
          <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
            <div className="text-8xl animate-ping">🎉</div>
          </div>
        )}

        <div className="mb-6">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span className="font-semibold">Question {currentIndex + 1} of {scenarios.length}</span>
            <span className="font-bold text-blue-600 text-lg">⭐ Score: {score}</span>
          </div>
          <div className="bg-gray-200 rounded-full h-3 overflow-hidden">
            <div
              className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full transition-all duration-500 animate-pulse"
              style={{ width: `${((currentIndex + 1) / scenarios.length) * 100}%` }}
            ></div>
          </div>
        </div>

        <div className="text-center mb-6 bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl p-6">
          <span className="text-7xl mb-4 block animate-bounce">{currentScenario.image}</span>
          <p className="text-xl text-gray-800 leading-relaxed font-medium">{currentScenario.scenario}</p>
        </div>

        <div className="space-y-3 mb-6">
          {currentScenario.options.map((option, index) => {
            const isSelected = selectedAnswer === index;
            const isCorrect = index === currentScenario.correct;
            const showResult = showExplanation;

            let bgColor = "bg-gradient-to-r from-white to-gray-50 hover:from-blue-50 hover:to-purple-50 text-gray-800";
            let textColor = "text-gray-800";
            if (showResult && isSelected) {
              if (isCorrect) {
                bgColor = "bg-gradient-to-r from-green-400 to-green-600";
                textColor = "text-white";
              } else {
                bgColor = "bg-gradient-to-r from-red-400 to-red-600";
                textColor = "text-white";
              }
            } else if (showResult && isCorrect) {
              bgColor = "bg-green-100 border-green-500";
              textColor = "text-gray-800";
            }

            return (
              <button
                key={index}
                onClick={() => handleAnswer(index)}
                className={`w-full text-left p-5 rounded-xl border-2 transition-all duration-300 transform hover:scale-102 hover:shadow-lg ${bgColor} ${textColor} ${
                  isSelected && showResult ? 'border-gray-800 scale-105' : 'border-gray-300'
                }`}
                disabled={selectedAnswer !== null}
              >
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-lg">{option}</span>
                  {showResult && isSelected && (
                    <span className="text-3xl animate-bounce">{isCorrect ? '✓' : '✗'}</span>
                  )}
                  {!showResult && (
                    <span className="text-2xl opacity-50">👆</span>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {showExplanation && (
          <div className={`bg-gradient-to-r ${selectedAnswer === currentScenario.correct ? 'from-green-50 to-blue-50 border-green-500' : 'from-yellow-50 to-orange-50 border-yellow-500'} border-l-4 p-5 rounded-lg mb-6 animate-slideIn`}>
            <p className="text-gray-800 text-lg">
              <span className="font-bold text-xl">💡 Safety Tip: </span>
              {currentScenario.explanation}
            </p>
          </div>
        )}

        {showExplanation && (
          <button
            onClick={handleNext}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            {isLastQuestion ? '🎊 Finish Game 🎊' : 'Next Question →'}
          </button>
        )}
      </div>

      <style jsx>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-10px); }
          75% { transform: translateX(10px); }
        }
        .animate-shake {
          animation: shake 0.5s;
        }
        @keyframes slideIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-slideIn {
          animation: slideIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}

// Matching Game Component
function MatchingGame({ pairs, onClose, onComplete }) {
  const [shuffledTerms, setShuffledTerms] = useState([]);
  const [shuffledDefs, setShuffledDefs] = useState([]);
  const [selectedTerm, setSelectedTerm] = useState(null);
  const [selectedDef, setSelectedDef] = useState(null);
  const [matched, setMatched] = useState([]);
  const [attempts, setAttempts] = useState(0);
  const [shake, setShake] = useState(null);
  const [celebrate, setCelebrate] = useState(null);

  useState(() => {
    const terms = [...pairs].sort(() => Math.random() - 0.5);
    const defs = pairs.map(p => ({ id: p.id, definition: p.definition })).sort(() => Math.random() - 0.5);
    setShuffledTerms(terms);
    setShuffledDefs(defs);
  }, []);

  useEffect(() => {
    if (!shuffledTerms.length) {
      const terms = [...pairs].sort(() => Math.random() - 0.5);
      const defs = pairs.map(p => ({ id: p.id, definition: p.definition })).sort(() => Math.random() - 0.5);
      setShuffledTerms(terms);
      setShuffledDefs(defs);
    }
  }, [pairs, shuffledTerms.length]);

  const handleTermClick = (term) => {
    if (matched.includes(term.id)) return;
    setSelectedTerm(term);

    if (selectedDef) {
      checkMatch(term, selectedDef);
    }
  };

  const handleDefClick = (def) => {
    if (matched.includes(def.id)) return;
    setSelectedDef(def);

    if (selectedTerm) {
      checkMatch(selectedTerm, def);
    }
  };

  const checkMatch = (term, def) => {
    setAttempts(attempts + 1);

    if (term.id === def.id) {
      setMatched([...matched, term.id]);
      setCelebrate(term.id);
      setTimeout(() => setCelebrate(null), 800);
      setSelectedTerm(null);
      setSelectedDef(null);

      if (matched.length + 1 === pairs.length) {
        const score = Math.max(40 - (attempts * 2), 20);
        setTimeout(() => onComplete(score), 1000);
      }
    } else {
      setShake(term.id);
      setTimeout(() => {
        setShake(null);
        setSelectedTerm(null);
        setSelectedDef(null);
      }, 800);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-gray-800">🎯 Match the Safety Tips</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 text-3xl hover:rotate-90 transition-transform">×</button>
        </div>

        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-4 mb-6">
          <p className="text-gray-800 font-semibold text-center">
            👆 Click on a term and then its matching definition!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <h3 className="font-bold text-xl text-gray-700 mb-3 flex items-center gap-2">
              <span>📚</span> Terms
            </h3>
            {shuffledTerms.map((term) => {
              const isMatched = matched.includes(term.id);
              const isSelected = selectedTerm?.id === term.id;
              const isCelebrating = celebrate === term.id;
              const isShaking = shake === term.id;

              return (
                <button
                  key={term.id}
                  onClick={() => handleTermClick(term)}
                  disabled={isMatched}
                  className={`w-full p-5 rounded-xl border-3 transition-all duration-300 transform ${
                    isMatched
                      ? 'bg-gradient-to-r from-green-400 to-green-600 text-white border-green-700 scale-95'
                      : isSelected
                      ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white border-blue-700 scale-105 shadow-xl'
                      : 'bg-white text-gray-800 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 border-gray-300 hover:scale-105 hover:shadow-lg'
                  } ${isCelebrating ? 'animate-bounce' : ''} ${isShaking ? 'animate-shake' : ''}`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-lg">{term.term}</span>
                    {isMatched && <span className="text-2xl">✓</span>}
                    {isSelected && !isMatched && <span className="text-2xl animate-pulse">👈</span>}
                  </div>
                </button>
              );
            })}
          </div>

          <div className="space-y-3">
            <h3 className="font-bold text-xl text-gray-700 mb-3 flex items-center gap-2">
              <span>💡</span> Definitions
            </h3>
            {shuffledDefs.map((def) => {
              const isMatched = matched.includes(def.id);
              const isSelected = selectedDef?.id === def.id;
              const isCelebrating = celebrate === def.id;
              const isShaking = shake === def.id;

              return (
                <button
                  key={def.id}
                  onClick={() => handleDefClick(def)}
                  disabled={isMatched}
                  className={`w-full p-5 rounded-xl border-3 transition-all duration-300 transform ${
                    isMatched
                      ? 'bg-gradient-to-r from-green-400 to-green-600 text-white border-green-700 scale-95'
                      : isSelected
                      ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white border-blue-700 scale-105 shadow-xl'
                      : 'bg-white text-gray-800 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 border-gray-300 hover:scale-105 hover:shadow-lg'
                  } ${isCelebrating ? 'animate-bounce' : ''} ${isShaking ? 'animate-shake' : ''}`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-lg">{def.definition}</span>
                    {isMatched && <span className="text-2xl">✓</span>}
                    {isSelected && !isMatched && <span className="text-2xl animate-pulse">👈</span>}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-6 bg-gradient-to-r from-yellow-100 to-orange-100 rounded-2xl p-4">
          <div className="flex items-center justify-around text-center">
            <div>
              <p className="text-2xl font-bold text-gray-800">{matched.length} / {pairs.length}</p>
              <p className="text-sm text-gray-600">Matched</p>
            </div>
            <div className="text-4xl">🎯</div>
            <div>
              <p className="text-2xl font-bold text-gray-800">{attempts}</p>
              <p className="text-sm text-gray-600">Attempts</p>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0) rotate(0deg); }
          25% { transform: translateX(-10px) rotate(-5deg); }
          75% { transform: translateX(10px) rotate(5deg); }
        }
        .animate-shake {
          animation: shake 0.5s;
        }
      `}</style>
    </div>
  );
}

// Sorting Game Component
function SortingGame({ items, onClose, onComplete }) {
  const [availableItems, setAvailableItems] = useState([]);
  const [safeZone, setSafeZone] = useState([]);
  const [unsafeZone, setUnsafeZone] = useState([]);
  const [draggedItem, setDraggedItem] = useState(null);
  const [dropZoneActive, setDropZoneActive] = useState(null);

  useEffect(() => {
    setAvailableItems([...items].sort(() => Math.random() - 0.5));
  }, [items]);

  const handleDragStart = (item, source) => {
    setDraggedItem({ item, source });
  };

  const handleDragEnd = () => {
    setDropZoneActive(null);
  };

  const handleDragOver = (zone) => {
    setDropZoneActive(zone);
  };

  const handleDrop = (zone) => {
    if (!draggedItem) return;

    const { item, source } = draggedItem;

    if (source === 'available') {
      setAvailableItems(availableItems.filter(i => i.id !== item.id));
    } else if (source === 'safe') {
      setSafeZone(safeZone.filter(i => i.id !== item.id));
    } else if (source === 'unsafe') {
      setUnsafeZone(unsafeZone.filter(i => i.id !== item.id));
    }

    if (zone === 'safe') {
      setSafeZone([...safeZone, item]);
    } else if (zone === 'unsafe') {
      setUnsafeZone([...unsafeZone, item]);
    } else {
      setAvailableItems([...availableItems, item]);
    }

    setDraggedItem(null);
    setDropZoneActive(null);
  };

  const handleCheck = () => {
    let correct = 0;
    safeZone.forEach(item => {
      if (item.type === 'safe') correct++;
    });
    unsafeZone.forEach(item => {
      if (item.type === 'unsafe') correct++;
    });

    const score = (correct / items.length) * 40;
    onComplete(Math.round(score));
  };

  const allSorted = availableItems.length === 0;
  const progress = ((safeZone.length + unsafeZone.length) / items.length) * 100;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-5xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-gray-800">⚖️ Safe or Unsafe?</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 text-3xl hover:rotate-90 transition-transform">×</button>
        </div>

        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-4 mb-6">
          <p className="text-gray-800 font-semibold text-center mb-3">
            🎯 Drag each action to the correct zone: Safe or Unsafe!
          </p>
          <div className="bg-white/70 rounded-full h-3 overflow-hidden">
            <div
              className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <p className="text-center text-sm text-gray-600 mt-2">
            {safeZone.length + unsafeZone.length} / {items.length} sorted
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div
            className={`border-4 border-dashed rounded-2xl p-4 min-h-[350px] transition-all duration-300 ${
              dropZoneActive === 'available'
                ? 'border-blue-500 bg-blue-100 scale-105'
                : 'border-gray-300 bg-gradient-to-br from-gray-50 to-gray-100'
            }`}
            onDragOver={(e) => {
              e.preventDefault();
              handleDragOver('available');
            }}
            onDrop={() => handleDrop('available')}
            onDragLeave={() => setDropZoneActive(null)}
          >
            <h3 className="font-bold text-xl text-gray-700 mb-3 text-center flex items-center justify-center gap-2">
              <span className="text-2xl">📋</span> Actions to Sort
            </h3>
            <div className="space-y-2">
              {availableItems.map(item => (
                <div
                  key={item.id}
                  draggable
                  onDragStart={() => handleDragStart(item, 'available')}
                  onDragEnd={handleDragEnd}
                  className="bg-white text-gray-800 p-4 rounded-lg cursor-move hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all duration-300 transform hover:scale-105 hover:shadow-lg border-2 border-gray-200 font-semibold"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-xl">👆</span>
                    {item.text}
                  </div>
                </div>
              ))}
              {availableItems.length === 0 && (
                <div className="text-center text-gray-400 py-8">
                  <p className="text-4xl mb-2">🎉</p>
                  <p>All sorted!</p>
                </div>
              )}
            </div>
          </div>

          <div
            className={`border-4 border-dashed rounded-2xl p-4 min-h-[350px] transition-all duration-300 ${
              dropZoneActive === 'safe'
                ? 'border-green-600 bg-green-200 scale-105'
                : 'border-green-400 bg-gradient-to-br from-green-50 to-green-100'
            }`}
            onDragOver={(e) => {
              e.preventDefault();
              handleDragOver('safe');
            }}
            onDrop={() => handleDrop('safe')}
            onDragLeave={() => setDropZoneActive(null)}
          >
            <h3 className="font-bold text-xl text-green-700 mb-3 text-center flex items-center justify-center gap-2">
              <span className="text-2xl">✓</span> Safe Zone
            </h3>
            <div className="space-y-2">
              {safeZone.map(item => (
                <div
                  key={item.id}
                  draggable
                  onDragStart={() => handleDragStart(item, 'safe')}
                  onDragEnd={handleDragEnd}
                  className="bg-white text-gray-800 p-4 rounded-lg cursor-move hover:bg-green-100 transition-all duration-300 transform hover:scale-105 border-2 border-green-300 font-semibold shadow-md"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-xl">✅</span>
                    {item.text}
                  </div>
                </div>
              ))}
              {safeZone.length === 0 && (
                <div className="text-center text-green-400 py-8">
                  <p className="text-4xl mb-2">🛡️</p>
                  <p className="font-semibold">Drop safe actions here</p>
                </div>
              )}
            </div>
          </div>

          <div
            className={`border-4 border-dashed rounded-2xl p-4 min-h-[350px] transition-all duration-300 ${
              dropZoneActive === 'unsafe'
                ? 'border-red-600 bg-red-200 scale-105'
                : 'border-red-400 bg-gradient-to-br from-red-50 to-red-100'
            }`}
            onDragOver={(e) => {
              e.preventDefault();
              handleDragOver('unsafe');
            }}
            onDrop={() => handleDrop('unsafe')}
            onDragLeave={() => setDropZoneActive(null)}
          >
            <h3 className="font-bold text-xl text-red-700 mb-3 text-center flex items-center justify-center gap-2">
              <span className="text-2xl">✗</span> Unsafe Zone
            </h3>
            <div className="space-y-2">
              {unsafeZone.map(item => (
                <div
                  key={item.id}
                  draggable
                  onDragStart={() => handleDragStart(item, 'unsafe')}
                  onDragEnd={handleDragEnd}
                  className="bg-white text-gray-800 p-4 rounded-lg cursor-move hover:bg-red-100 transition-all duration-300 transform hover:scale-105 border-2 border-red-300 font-semibold shadow-md"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-xl">⚠️</span>
                    {item.text}
                  </div>
                </div>
              ))}
              {unsafeZone.length === 0 && (
                <div className="text-center text-red-400 py-8">
                  <p className="text-4xl mb-2">⛔</p>
                  <p className="font-semibold">Drop unsafe actions here</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {allSorted && (
          <button
            onClick={handleCheck}
            className="w-full mt-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg animate-pulse"
          >
            ✨ Check My Answers! ✨
          </button>
        )}
      </div>
    </div>
  );
}

// Quiz Question Component
function QuizQuestion({ question, text, options, answer, onAnswer }) {
  return (
    <div className="border-3 border-blue-200 rounded-2xl p-6 bg-gradient-to-br from-blue-50 to-purple-50 shadow-lg">
      <p className="text-xl font-bold text-gray-800 mb-5 flex items-start gap-2">
        <span className="text-2xl">❓</span>
        <span>{text}</span>
      </p>
      <div className="space-y-3">
        {options.map((option, index) => {
          const isSelected = answer === option.text;
          const showResult = isSelected;
          let bgColor = "bg-white text-gray-800 hover:bg-gradient-to-r hover:from-blue-100 hover:to-purple-100";
          let textColor = "text-gray-800";

          if (showResult) {
            if (option.correct) {
              bgColor = "bg-gradient-to-r from-green-400 to-green-600";
              textColor = "text-white";
            } else {
              bgColor = "bg-gradient-to-r from-red-400 to-red-600";
              textColor = "text-white";
            }
          }

          return (
            <button
              key={index}
              onClick={() => onAnswer(question, option.text, option.correct)}
              className={`w-full text-left p-5 rounded-xl border-2 transition-all duration-300 transform hover:scale-105 hover:shadow-xl ${bgColor} ${textColor} ${
                isSelected ? "border-gray-800 scale-105 shadow-xl" : "border-gray-300"
              }`}
              disabled={answer}
            >
              <div className="flex items-center justify-between">
                <span className="font-semibold text-lg">{option.text}</span>
                {showResult && (
                  <span className="text-3xl animate-bounce">
                    {option.correct ? "✓" : "✗"}
                  </span>
                )}
                {!showResult && (
                  <span className="text-2xl opacity-50">👆</span>
                )}
              </div>
              {showResult && option.correct && (
                <p className="mt-3 text-base font-medium flex items-center gap-2">
                  <span className="text-2xl">🎉</span>
                  Great job! That's the safe choice!
                </p>
              )}
              {showResult && !option.correct && (
                <p className="mt-3 text-base font-medium flex items-center gap-2">
                  <span className="text-2xl">💡</span>
                  Not quite. Remember to always prioritize safety!
                </p>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
