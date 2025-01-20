import React from 'react';

export const SideAd = ({ title, items, images }) => (
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

export const PopupAd = ({ onClose }) => (
  <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-xl p-6 z-50 w-64">
    <button onClick={onClose} className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6">
      X
    </button>
    <h3 className="text-lg font-bold mb-4">⛔️ 팝업 광고</h3>
    <img 
      src="age.png" 
      alt="광고 이미지" 
      className="w-full h-32 object-cover rounded-md mb-4"
    />
    <p className="text-gray-600">"확실히 나이 든 것 같습니다"</p>
  </div>
);