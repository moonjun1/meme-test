import React, { useEffect } from 'react';

export const StartScreen = ({ 
    userName, 
    userScore, 
    userLevel, 
    ranking, 
    isLoading, 
    handleInputChange, 
    handleStart 
  }) => {
    return (
      <div className="grid grid-cols-1 gap-8 relative">
        {/* 배경 데코레이션 */}
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-indigo-100 rounded-full blur-3xl opacity-30"></div>
        <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-purple-100 rounded-full blur-3xl opacity-30"></div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="text-center space-y-8">
            {/* Title Section */}
            <div className="relative transform hover:scale-105 transition-all duration-300">
              <div className="absolute -top-6 right-0 text-4xl animate-bounce">✨</div>
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/20 to-purple-600/20 blur-xl"></div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4 relative">
                밈 테스트 챌린지
              </h1>
              <p className="text-xl text-gray-600 relative">당신의 밈 레벨을 테스트해보세요! 🤔</p>
            </div>
  
            {/* Score and Level cards */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/80 backdrop-blur-lg p-6 rounded-xl hover:shadow-lg transition-all duration-300 border border-indigo-100/50">
                <div className="text-3xl mb-2 animate-pulse">🏆</div>
                <p className="font-medium mb-2">랭킹 도전</p>
                {userScore > 0 && (
                  <p className="text-sm font-medium text-indigo-600">현재 점수: {userScore}점</p>
                )}
              </div>
              <div className="bg-white/80 backdrop-blur-lg p-6 rounded-xl hover:shadow-lg transition-all duration-300 border border-indigo-100/50">
                <div className="text-3xl mb-2 animate-pulse">👑</div>
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
  
            {/* Input Section */}
            <div className="space-y-6">
              <div className="relative">
                <input
                  type="text"
                  value={userName}
                  onChange={handleInputChange}
                  className="peer w-full px-6 py-4 rounded-xl border-2 border-indigo-200 focus:border-indigo-500 text-lg transition-all duration-300 hover:shadow-md placeholder-transparent"
                  placeholder="닉네임을 입력하세요"
                  id="floating-nickname"
                />
                <label 
                  htmlFor="floating-nickname"
                  className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-4"
                >
                  닉네임을 입력하세요
                </label>
                {userName && (
                  <div className="absolute top-4 right-4 text-green-500 animate-pulse">✓</div>
                )}
              </div>
  
              <button
                onClick={handleStart}
                disabled={!userName.trim() || isLoading}
                className="group w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold py-4 rounded-xl hover:from-indigo-700 hover:to-purple-700 disabled:opacity-50 transform transition-all hover:scale-[1.02] hover:shadow-lg"
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
  
          {/* Ranking Section */}
          <div className="bg-gradient-to-br from-white to-indigo-50 p-6 rounded-xl shadow-lg">
            <div className="flex items-center justify-center gap-2 mb-6">
              <span className="text-3xl animate-bounce">🏆</span>
              <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 text-center">
                실시간 랭킹
              </h2>
            </div>
  
            <div className="h-[400px] overflow-y-auto space-y-2 pr-2">
              {ranking.map((user, index) => (
                <div 
                  key={user.id} 
                  className={`relative bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 w-full 
                    ${index < 3 ? 'hover:scale-[1.02]' : 'hover:bg-gray-50'} 
                    ${index === 0 ? 'bg-gradient-to-r from-yellow-50 to-white ring-2 ring-yellow-200' : ''}
                    ${index === 1 ? 'bg-gradient-to-r from-gray-50 to-white' : ''}
                    ${index === 2 ? 'bg-gradient-to-r from-orange-50 to-white' : ''}`}
                >
                  {index < 3 && (
                    <div className="absolute -left-2 top-1/2 transform -translate-y-1/2">
                      <div className={`w-1 h-12 rounded-full ${
                        index === 0 ? 'bg-yellow-400' :
                        index === 1 ? 'bg-gray-400' :
                        'bg-orange-400'
                      }`}/>
                    </div>
                  )}
                  
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="flex flex-col items-center justify-center w-10">
                        <span className={`text-3xl transform transition-transform duration-300 hover:scale-110 ${
                          index < 3 ? 'animate-bounce' : ''
                        }`}>
                          {user.score >= 20 ? '🥇' : 
                           user.score >= 19 ? '🥈' :
                           user.score >= 18 ? '🥉' :
                           `${index + 1}`}
                        </span>
                      </div>
                      <div>
                        <p className="font-bold text-gray-800">{user.nickname}</p>
                        <div className="flex items-center gap-1">
                          <span className="text-xs">👑</span>
                          <p className="text-sm text-indigo-600 font-medium">{user.level}</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-end">
                      <p className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
                        {user.score}점
                      </p>
                      <p className="text-xs text-gray-400">
                        TOP {((index + 1) / ranking.length * 100).toFixed(1)}%
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
  
            <div className="mt-4 text-center">
              <p className="text-sm text-gray-500">
                새로운 1위에 도전해보세요
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  };
export const TestScreen = ({ 
  userName, 
  timeLeft, 
  currentQuestion, 
  questions, 
  choices, 
  handleAnswer 
}) => (
  <div className="max-w-3xl mx-auto space-y-8 relative">
    {/* Progress 물방울 */}
    <div className="absolute top-0 right-0 w-2 h-full">
      {questions.map((_, idx) => (
        <div
          key={idx}
          className={`w-2 h-2 rounded-full mb-2 transition-all duration-300 ${
            idx <= currentQuestion ? 'bg-indigo-600' : 'bg-indigo-200'
          }`}
        />
      ))}
    </div>

    <div className="flex justify-between items-center">
      <h2 className="text-2xl font-bold text-indigo-600">{userName}님의 밈 테스트</h2>
      <div className={`bg-indigo-50 px-4 py-2 rounded-full flex items-center gap-2 ${
        timeLeft <= 10 ? 'animate-pulse ring-2 ring-red-400' : ''
      }`}>
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
          className="group w-full p-6 bg-white border-2 border-indigo-100 text-indigo-600 rounded-xl hover:bg-indigo-50 hover:border-indigo-200 text-left text-lg font-medium transform transition-all hover:scale-[1.02] active:scale-[0.98] relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-50 to-purple-50 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
          <span className="relative">
            {index + 1}. {choice.choice}
          </span>
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
);

export const ResultScreen = ({ 
    userName, 
    userScore, 
    questions, 
    userLevel, 
    handleReset, 
    handleGoToMain 
  }) => {
    const percentage = ((userScore / questions.length) * 100).toFixed(1);
    
    return (
      <div className="max-w-2xl mx-auto text-center p-4 space-y-6 relative">
        {/* 폭죽 효과 */}
        <div className="absolute top-0 left-1/4 animate-float">🎉</div>
        <div className="absolute top-10 right-1/4 animate-float-delayed">✨</div>
        <div className="absolute bottom-1/4 left-1/3 animate-float-slow">🎊</div>
  
        <div className="space-y-4">
          <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            {userName}님의 테스트 결과
          </h1>
          <div className="text-6xl md:text-8xl animate-bounce">🎉</div>
        </div>
  
        <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-4 md:p-8 space-y-4 md:space-y-6 relative">
          
  
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
            <div className="bg-white/80 backdrop-blur-lg p-3 md:p-4 rounded-xl hover:shadow-lg transition-all duration-300">
              <p className="text-sm md:text-base text-gray-600">총 문제</p>
              <p className="text-xl md:text-2xl font-bold text-indigo-600">{questions.length}개</p>
            </div>
            <div className="bg-white/80 backdrop-blur-lg p-3 md:p-4 rounded-xl hover:shadow-lg transition-all duration-300">
              <p className="text-sm md:text-base text-gray-600">정답</p>
              <p className="text-xl md:text-2xl font-bold text-green-600">{userScore}개</p>
            </div>
            <div className="bg-white/80 backdrop-blur-lg p-3 md:p-4 rounded-xl hover:shadow-lg transition-all duration-300">
              <p className="text-sm md:text-base text-gray-600">정답률</p>
              <p className="text-xl md:text-2xl font-bold text-purple-600">{percentage}%</p>
            </div>
          </div>
  
          {userLevel && (
            <div className="bg-white/80 backdrop-blur-lg p-4 md:p-6 rounded-xl hover:shadow-lg transition-all duration-300">
              <h3 className="text-lg md:text-xl font-bold text-gray-700 mb-2">🎖 획득한 칭호</h3>
              <p className="text-xl md:text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                {userLevel}
              </p>
            </div>
          )}
  
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
            <button
              onClick={handleReset}
              className="group w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold py-3 md:py-4 rounded-xl hover:from-indigo-700 hover:to-purple-700 transform transition-all hover:scale-[1.02] relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-white/10 rounded-xl transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
              <span className="relative">결과 보기</span>
            </button>
            <button
              onClick={handleGoToMain}
              className="group w-full bg-white text-indigo-600 font-bold py-3 md:py-4 rounded-xl border-2 border-indigo-100 hover:bg-indigo-50 hover:border-indigo-200 transform transition-all hover:scale-[1.02]"
            >
              <span className="flex items-center justify-center">
                메인으로
                <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
              </span>
            </button>
          </div>
        </div>
      </div>
    );
  };
  
  export const LoadingScreen = () => (
    <div className="flex flex-col justify-center items-center h-[60vh] space-y-6">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
        <div className="absolute inset-0 blur-xl bg-indigo-400/20 rounded-full"></div>
      </div>
      <p className="text-lg text-gray-600 animate-pulse">밈 테스트 준비중...</p>
    </div>
  );
  
 