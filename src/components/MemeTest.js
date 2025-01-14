import React, { useState, useEffect, useCallback } from 'react';

// SideAd Component
const SideAd = ({ title, items, images }) => (
  <div className="bg-white rounded-lg p-4 w-40 space-y-4">
    <h3 className="text-gray-600 text-center font-medium">{title}</h3>
    {items.map((item, index) => (
      <div key={index} className="space-y-2">
        <div className="bg-gray-200 h-24 rounded-md flex items-center justify-center overflow-hidden">
          {images && images[index] ? (
            <img 
              src={`./${images[index]}`}
              alt={item}
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-gray-500 text-sm">{item}</span>
          )}
        </div>
      </div>
    ))}
  </div>
);

// PopupAd Component
const PopupAd = ({ onClose }) => (
  <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-xl p-6 z-50 w-64">
    <button onClick={onClose} className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6">
      X
    </button>
    <h3 className="text-lg font-bold mb-4">⛔️ 팝업 광고</h3>
    {/* 이미지 추가 및 크기 조절 */}
    <img 
      src="age.png" 
      alt="광고 이미지" 
      className="w-full h-32 object-cover rounded-md mb-4"
    />
    <p className="text-gray-600">"확실히 나이 든 것 같습니다"</p>
  </div>
);


const PageWrapper = ({ children, showPopup, onClosePopup }) => (
  <div className="min-h-screen bg-indigo-900 p-4">
    <div className="max-w-6xl mx-auto">
      <div className="bg-red-500 text-white p-3 rounded-lg mb-4 text-center">
        ⚡️ 특별 이벤트 진행중! 지금 참여하세요! ⚡️
      </div>

      <div className="flex gap-4">
        <div className="hidden lg:block">
          <SideAd 
            title="HOT DEAL" 
            items={["SALE 30%", "NEW ITEM", "BEST"]} 
          />
        </div>

        <div className="flex-1 bg-white rounded-3xl shadow-xl p-8">
          {children}
        </div>

        <div className="hidden lg:block">
          <div className="bg-white rounded-lg p-4 w-40 space-y-4">
            <h3 className="text-gray-600 text-center font-medium">아무 사진</h3>
            <div className="space-y-4">
              <div className="bg-gray-200 h-24 rounded-md overflow-hidden">
                <img 
                  src="jerry.png"
                  alt="상품1" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="bg-gray-200 h-24 rounded-md overflow-hidden">
                <img 
                  src="kid.png"
                  alt="상품2" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="bg-gray-200 h-24 rounded-md overflow-hidden">
                <img 
                  src="good.png"
                  alt="상품3" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-purple-900 text-white p-2 rounded-lg mt-4 text-center text-sm">
        광고 배너가 여기에 표시됩니다
      </div>
    </div>

    <button className="fixed bottom-4 right-4 bg-red-500 text-white rounded-full w-12 h-12 flex items-center justify-center text-2xl shadow-lg">
      🔥
    </button>

    {showPopup && <PopupAd onClose={onClosePopup} />}
  </div>
);

// MemeTest Component
const MemeTest = () => {
  const [currentScreen, setCurrentScreen] = useState('start');
  const [userName, setUserName] = useState('');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [choices, setChoices] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(10);
  const [showPopup, setShowPopup] = useState(true);
  const [userScore, setUserScore] = useState(0);
  const [userId, setUserId] = useState(null);
  const [userLevel, setUserLevel] = useState('');
  const [ranking, setRanking] = useState([]);

  // 문제 데이터 가져오기
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch('https://api.mzstudio.site/memes');
        const data = await response.json();
        setQuestions(data);
      } catch (error) {
        console.error('질문 데이터 로딩 실패:', error);
      }
    };
    fetchQuestions();
  }, []);

  // 현재 문제의 선택지 가져오기
  useEffect(() => {
    const fetchChoices = async () => {
      if (questions.length > 0 && currentScreen === 'test') {
        try {
          const currentMemeId = questions[currentQuestion].id;
          const response = await fetch(`https://api.mzstudio.site/memes/choice/${currentMemeId}`);
          const data = await response.json();
          setChoices(data.slice(0, 3));
        } catch (error) {
          console.error('선택지 데이터 로딩 실패:', error);
        }
      }
    };
    fetchChoices();
  }, [currentQuestion, questions, currentScreen]);

  // 타이머 로직
  useEffect(() => {
    if (currentScreen === 'test') {
      const timer = setTimeout(() => {
        if (timeLeft > 0) {
          setTimeLeft(timeLeft - 1);
        } else {
          handleAnswer(null);
        }
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft, currentScreen]);

  // 랭킹 데이터 가져오기
  useEffect(() => {
    const fetchRanking = async () => {
      try {
        const response = await fetch('https://api.mzstudio.site/users');
        const data = await response.json();
        setRanking(data.slice(0, 10));
      } catch (error) {
        console.error('랭킹 데이터 로딩 실패:', error);
      }
    };
    fetchRanking();
  }, [currentScreen]);

  const handleStart = useCallback(async () => {
    if (userName.trim()) {
      setIsLoading(true);
      try {
        const response = await fetch('https://api.mzstudio.site/users/create', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            nickname: userName,
            score: userScore,
          }),
        });
        
        if (response.ok) {
          const data = await response.json();
          setUserId(data.id);
          setCurrentScreen('test');
          setTimeLeft(10);
          setShowPopup(false);
        }
      } catch (error) {
        console.error('API 호출 실패:', error);
      } finally {
        setIsLoading(false);
      }
    }
  }, [userName, userScore]);

  const handleAnswer = useCallback((selectedChoice, index) => {
    if (selectedChoice && questions[currentQuestion]) {
      const correctAnswerIndex = questions[currentQuestion].answer;
      if (index === correctAnswerIndex) {
        setUserScore(prev => prev + 1);
      }
    }

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(curr => curr + 1);
      setTimeLeft(10);
    } else {
      setCurrentScreen('result');
    }
  }, [currentQuestion, questions]);

  const handleReset = useCallback(async () => {
    try {
      const updateResponse = await fetch('https://api.mzstudio.site/users/update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: userId,
          nickname: userName,
          score: userScore,
        }),
      });

      if (updateResponse.ok) {
        const updateData = await updateResponse.json();
        setUserLevel(updateData.level);
      }
    } catch (error) {
      console.error('결과 전송 실패:', error);
    }
  }, [userId, userName, userScore]);

  const handleGoToMain = useCallback(() => {
    window.location.reload();
  }, []);

  const handleInputChange = useCallback((e) => {
    const newValue = e.target.value;
    setUserName(newValue);
  }, []);

  // 시작 화면 렌더링
  if (currentScreen === 'start') {
    return (
      <PageWrapper showPopup={showPopup} onClosePopup={() => setShowPopup(false)}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="text-center space-y-8">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">
                밈 테스트 첼린지
              </h1>
              <p className="text-xl text-gray-600">당신의 밈 레벨을 테스트해보세요! 🤔</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gradient-to-br from-indigo-50 to-purple-50 p-6 rounded-xl">
                <div className="text-3xl mb-2">🏆</div>
                <p className="font-medium mb-2">랭킹 도전</p>
                {userScore > 0 && (
                  <p className="text-sm font-medium text-indigo-600">현재 점수: {userScore}점</p>
                )}
              </div>
              <div className="bg-gradient-to-br from-indigo-50 to-purple-50 p-6 rounded-xl">
                <div className="text-3xl mb-2">👑</div>
                <p className="font-medium mb-2">특별 칭호</p>
                {userLevel ? (
                  <p className="text-sm font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                    {userLevel}
                  </p>
                ) : (
                  <p className="text-sm text-gray-500">테스트 후 획득 가능</p>
                )}
              </div>
            </div>

            <div className="space-y-6">
              <div className="relative">
                <input
                  type="text"
                  value={userName}
                  onChange={handleInputChange}
                  className="w-full px-6 py-4 rounded-xl border-2 border-indigo-200 focus:border-indigo-500 text-lg"
                  placeholder="닉네임을 입력하세요"
                />
                {userName && (
                  <div className="absolute top-4 right-4 text-green-500">✓</div>
                )}
              </div>

              <button
                onClick={handleStart}
                disabled={!userName.trim() || isLoading}
                className="group w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold py-4 rounded-xl hover:from-indigo-700 hover:to-purple-700 disabled:opacity-50 transform transition-all hover:scale-[1.02]"
              >
                {isLoading ? (
                  <span className="flex items-center justify-center">
                    <div className="animate-spin h-5 w-5 mr-2 border-2 border-white border-t-transparent rounded-full"></div>
                    로딩중...
                  </span>
                ) : (
                  <span className="flex items-center justify-center">
                    시작하기
                    <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                  </span>
                )}
              </button>
            </div>
          </div>

          <div className="bg-gradient-to-br from-white to-indigo-50 p-6 rounded-xl shadow-lg">
            <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 mb-6 text-center">
              실시간 랭킹
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {ranking.map((user, index) => (
                <div 
                  key={user.id} 
                  className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex flex-col items-center gap-2">
                    <span className="text-3xl">
                      {index === 0 ? '🥇' : 
                      index === 1 ? '🥈' : 
                      index === 2 ? '🥉' : 
                      `${index + 1}`}
                    </span>
                    <div className="text-center">
                      <p className="font-bold truncate w-full">{user.nickname}</p>
                      <p className="text-sm text-gray-600">{user.level}</p>
                    </div>
                    <p className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
                      {user.score}점
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          </div>
      </PageWrapper>
    );
  }

  // 테스트 화면 렌더링
  if (currentScreen === 'test') {
    return (
      <PageWrapper showPopup={showPopup} onClosePopup={() => setShowPopup(false)}>
        <div className="max-w-3xl mx-auto space-y-8">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-indigo-600">{userName}님의 밈 테스트</h2>
            <div className="bg-indigo-50 px-4 py-2 rounded-full flex items-center gap-2">
              <span className="text-indigo-600">⏱</span>
              <span className="text-lg font-medium text-indigo-600">{timeLeft}초</span>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-8">
            <p className="text-xl text-center text-gray-700">
              {questions[currentQuestion].question}
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="bg-indigo-100 text-indigo-600 px-4 py-2 rounded-full font-medium">
                {currentQuestion + 1} / {questions.length}
              </span>
            </div>

            {choices.map((choice, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(choice.choice, index + 1)}
                className="w-full p-6 bg-white border-2 border-indigo-100 text-indigo-600 rounded-xl hover:bg-indigo-50 hover:border-indigo-200 text-left text-lg font-medium transform transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                {index + 1}. {choice.choice}
              </button>
            ))}

            <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full transition-all duration-300"
                style={{width: `${((currentQuestion + 1) / questions.length) * 100}%`}}
              ></div>
            </div>
          </div>
        </div>
      </PageWrapper>
    );
  }

  if (currentScreen === 'result') {
    const percentage = ((userScore / questions.length) * 100).toFixed(1);
  
    return (
      <PageWrapper showPopup={showPopup} onClosePopup={() => setShowPopup(false)}>
        <div className="max-w-2xl mx-auto text-center p-4 space-y-6"> {/* padding 추가 */}
          <div className="space-y-4">
            <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              {userName}님의 테스트 결과
            </h1>
            <div className="text-6xl md:text-8xl animate-bounce">🎉</div>
          </div>
  
          <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-4 md:p-8 space-y-4 md:space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
              <div className="bg-white p-3 md:p-4 rounded-xl">
                <p className="text-sm md:text-base text-gray-600">총 문제</p>
                <p className="text-xl md:text-2xl font-bold text-indigo-600">{questions.length}개</p>
              </div>
              <div className="bg-white p-3 md:p-4 rounded-xl">
                <p className="text-sm md:text-base text-gray-600">정답</p>
                <p className="text-xl md:text-2xl font-bold text-green-600">{userScore}개</p>
              </div>
              <div className="bg-white p-3 md:p-4 rounded-xl">
                <p className="text-sm md:text-base text-gray-600">정답률</p>
                <p className="text-xl md:text-2xl font-bold text-purple-600">{percentage}%</p>
              </div>
            </div>
  
            {userLevel && (
              <div className="bg-white p-4 md:p-6 rounded-xl">
                <h3 className="text-lg md:text-xl font-bold text-gray-700 mb-2">🎖 획득한 칭호</h3>
                <p className="text-xl md:text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  {userLevel}
                </p>
              </div>
            )}
  
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
              <button
                onClick={handleReset}
                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold py-3 md:py-4 rounded-xl hover:from-indigo-700 hover:to-purple-700 transform transition-all hover:scale-[1.02]"
              >
                결과 보기
              </button>
              <button
                onClick={handleGoToMain}
                className="w-full bg-white text-indigo-600 font-bold py-3 md:py-4 rounded-xl border-2 border-indigo-100 hover:bg-indigo-50 hover:border-indigo-200 transform transition-all hover:scale-[1.02]"
              >
                메인으로
              </button>
            </div>
          </div>
        </div>
      </PageWrapper>
    );
  }
  // 로딩 화면 렌더링
  return (
    <PageWrapper showPopup={showPopup} onClosePopup={() => setShowPopup(false)}>
      <div className="flex flex-col justify-center items-center h-[60vh] space-y-6">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
        </div>
        <p className="text-lg text-gray-600 animate-pulse">밈 테스트 준비중...</p>
      </div>
    </PageWrapper>
  );
};

export default MemeTest;