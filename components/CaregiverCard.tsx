
import React from 'react';
import { Caregiver } from '../types';

interface Props {
  caregiver: Caregiver;
  onSelect: (caregiver: Caregiver) => void;
}

const CaregiverCard: React.FC<Props> = ({ caregiver, onSelect }) => {
  return (
    <div className="bg-white rounded-[32px] shadow-sm border border-[#D7CCC8] overflow-hidden hover:shadow-lg transition-all animate-fade-in group">
      <div className="relative">
        <img 
          src={caregiver.image} 
          alt={caregiver.name} 
          className="w-full h-52 object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute top-4 right-4 flex flex-col gap-2">
          {caregiver.available && (
            <span className="bg-green-600 text-white text-[10px] px-3 py-1 rounded-full font-bold uppercase tracking-wider shadow-sm">
              ว่างตอนนี้
            </span>
          )}
          <button 
            className={`p-2 rounded-full shadow-sm backdrop-blur ${caregiver.isFavorite ? 'bg-red-50 text-red-500' : 'bg-white/80 text-gray-400'}`}
            onClick={(e) => { e.stopPropagation(); /* Logic for heart */ }}
          >
            <i className={`${caregiver.isFavorite ? 'fas' : 'far'} fa-heart`}></i>
          </button>
        </div>
      </div>
      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="text-xl font-black text-[#4E342E]">{caregiver.name}</h3>
            <p className="text-xs text-[#8D6E63] font-bold">{caregiver.age} ปี • {caregiver.specialty}</p>
          </div>
          <div className="flex items-center text-yellow-600 bg-yellow-50 px-3 py-1 rounded-2xl border border-yellow-100">
            <i className="fas fa-star mr-1 text-xs"></i>
            <span className="text-sm font-bold">{caregiver.rating}</span>
          </div>
        </div>
        
        <p className="text-gray-500 text-xs mb-4 line-clamp-2 italic">"{caregiver.reviewComments[0]?.comment || 'ผู้ดูแลที่ใส่ใจและใจเย็นมากครับ'}"</p>
        
        <div className="border-t border-[#F5F5DC] pt-4 flex items-center justify-between">
          <div>
            <span className="text-2xl font-black text-[#4E342E]">฿{caregiver.hourlyRate}</span>
            <span className="text-gray-400 text-xs font-bold"> / ชม.</span>
          </div>
          <button 
            onClick={() => onSelect(caregiver)}
            className="bg-[#8D6E63] hover:bg-[#4E342E] text-white px-6 py-3 rounded-2xl font-black transition-all shadow-md shadow-brown-100 text-sm"
          >
            ดูประวัติ / จอง
          </button>
        </div>
      </div>
    </div>
  );
};

export default CaregiverCard;
