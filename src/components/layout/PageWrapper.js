import React from 'react';
import { SideAd, PopupAd } from '../ads/AdComponents';

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

export default PageWrapper;