// src/components/Ads.js
import React from 'react';

// 배너 광고 컴포넌트
export const BannerAd = () => {
  return (
    <div className="w-full flex justify-center my-4">
      {/* AdMob 배너 광고 */}
      <ins className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
        data-ad-slot="XXXXXXXXXX"
        data-ad-format="auto"
        data-full-width-responsive="true">
      </ins>
    </div>
  );
};

// 전면 광고 컴포넌트
export const InterstitialAd = ({ onClose }) => {
  React.useEffect(() => {
    // AdMob 전면 광고 초기화
    (window.adsbygoogle = window.adsbygoogle || []).push({});
    
    // 광고 로드 완료 후 콜백
    window.addEventListener('admob.ad.loaded', () => {
      console.log('Ad loaded');
    });

    // 광고 닫힘 콜백
    window.addEventListener('admob.ad.closed', () => {
      onClose && onClose();
    });
  }, [onClose]);

  return null;
};

// 보상형 광고 컴포넌트
export const RewardedAd = ({ onReward, onClose }) => {
  React.useEffect(() => {
    // AdMob 보상형 광고 초기화
    (window.adsbygoogle = window.adsbygoogle || []).push({});
    
    // 보상 지급 콜백
    window.addEventListener('admob.ad.reward', (reward) => {
      onReward && onReward(reward);
    });

    // 광고 닫힘 콜백
    window.addEventListener('admob.ad.closed', () => {
      onClose && onClose();
    });
  }, [onReward, onClose]);

  return null;
};