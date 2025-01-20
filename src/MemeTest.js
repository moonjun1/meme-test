import React, { useState, useEffect, useCallback } from 'react';
import { logAnalyticsEvent } from './firebase';
import PageWrapper from './components/layout/PageWrapper';
import { StartScreen, TestScreen, ResultScreen, LoadingScreen } from './components/screens/TestScreens';

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

  // 선택지 데이터 가져오기
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

  // 타이머
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

  // 랭킹 데이터
  useEffect(() => {
    const fetchRanking = async () => {
      try {
        const response = await fetch('https://api.mzstudio.site/users');
        const data = await response.json();
        setRanking(data.slice(0, 1000));
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

          logAnalyticsEvent('test_started', {
            user_id: data.id,
            user_name: userName
          });
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
      const isCorrect = index === correctAnswerIndex;
      
      if (isCorrect) {
        setUserScore(prev => prev + 1);
      }

      logAnalyticsEvent('question_answered', {
        question_id: questions[currentQuestion].id,
        question_number: currentQuestion + 1,
        is_correct: isCorrect,
        time_left: timeLeft
      });
    }

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(curr => curr + 1);
      setTimeLeft(10);
    } else {
      setCurrentScreen('result');
      logAnalyticsEvent('test_completed', {
        user_id: userId,
        final_score: userScore,
        total_questions: questions.length
      });
    }
  }, [currentQuestion, questions, userId, userScore, timeLeft]);

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
        
        logAnalyticsEvent('result_viewed', {
          user_id: userId,
          user_level: updateData.level,
          final_score: userScore
        });
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

  const renderCurrentScreen = () => {
    switch (currentScreen) {
      case 'start':
        return (
          <StartScreen
            userName={userName}
            userScore={userScore}
            userLevel={userLevel}
            ranking={ranking}
            isLoading={isLoading}
            handleInputChange={handleInputChange}
            handleStart={handleStart}
          />
        );
      case 'test':
        return (
          <TestScreen
            userName={userName}
            timeLeft={timeLeft}
            currentQuestion={currentQuestion}
            questions={questions}
            choices={choices}
            handleAnswer={handleAnswer}
          />
        );
      case 'result':
        return (
          <ResultScreen
            userName={userName}
            userScore={userScore}
            questions={questions}
            userLevel={userLevel}
            handleReset={handleReset}
            handleGoToMain={handleGoToMain}
          />
        );
      default:
        return <LoadingScreen />;
    }
  };

  return (
    <PageWrapper showPopup={showPopup} onClosePopup={() => setShowPopup(false)}>
      {renderCurrentScreen()}
    </PageWrapper>
  );
};

export default MemeTest;