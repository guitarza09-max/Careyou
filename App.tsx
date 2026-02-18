
import React, { useState, useMemo } from 'react';
import { 
  Caregiver, 
  AppSection, 
  HealthRecord, 
  EmergencyContact, 
  Hospital, 
  ServiceType,
  Booking,
  Review
} from './types';
import CaregiverCard from './components/CaregiverCard';
import TTSButton from './components/TTSButton';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Mock Data
const CAREGIVERS: Caregiver[] = [
  {
    id: '1',
    name: 'คุณสมใจ รักดี',
    age: 45,
    specialty: 'ดูแลผู้ป่วยติดเตียง',
    rating: 4.9,
    reviews: 120,
    hourlyRate: 350,
    experience: '8 ปี',
    image: 'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?w=400&h=400&fit=crop',
    bio: 'พยาบาลเกษียณ มีความใจเย็นและเข้าใจจิตวิทยาผู้สูงอายุเป็นอย่างดี เชี่ยวชาญการทำแผลและกายภาพเบื้องต้น',
    available: true,
    certifications: ['ดูแลผู้สูงอายุขั้นพื้นฐาน', 'ใบรับรอง CPR ประจำปี 2567', 'จิตวิทยาผู้สูงอายุ'],
    certImages: [
      'https://images.unsplash.com/photo-1589330694653-ded6df03f754?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1606326666490-457579d4be97?w=400&h=300&fit=crop'
    ],
    reviewComments: [
      { user: 'มานะ', comment: 'ดูแลดีมากครับ ตรงเวลาและใส่ใจคุณพ่อมาก', rating: 5, date: '12 ต.ค. 67' },
      { user: 'วิภา', comment: 'ใจเย็น พูดจาเพราะ คุณยายชอบมากค่ะ', rating: 5, date: '5 ต.ค. 67' },
      { user: 'สมชาย', comment: 'มีความรู้เรื่องยาดีมาก ช่วยจัดยาได้ถูกต้อง', rating: 4, date: '28 ก.ย. 67' }
    ],
    isFavorite: true
  },
  {
    id: '2',
    name: 'คุณวิชัย มานะ',
    age: 38,
    specialty: 'ดูแลกายภาพบำบัด',
    rating: 4.8,
    reviews: 85,
    hourlyRate: 400,
    experience: '5 ปี',
    image: 'https://images.unsplash.com/photo-1584467735815-f778f274e296?w=400&h=400&fit=crop',
    bio: 'อดีตผู้ช่วยนักกายภาพบำบัด ช่วยฟื้นฟูกล้ามเนื้อและพาออกกำลังกายเบาๆ อย่างถูกวิธี',
    available: true,
    certifications: ['นักกายภาพบำบัดพื้นฐาน', 'การเคลื่อนย้ายผู้ป่วย'],
    certImages: ['https://images.unsplash.com/photo-1589330694653-ded6df03f754?w=400&h=300&fit=crop'],
    reviewComments: [
      { user: 'สมบัติ', comment: 'ช่วยให้คุณแม่เดินได้ดีขึ้นมากครับ', rating: 5, date: '10 ต.ค. 67' },
      { user: 'พรประภา', comment: 'มือเบามากค่ะ สอนท่าบริหารเข้าใจง่าย', rating: 5, date: '2 ต.ค. 67' }
    ]
  },
  {
    id: '3',
    name: 'คุณรัตนา เอื้อเฟื้อ',
    age: 52,
    specialty: 'ดูแลทั่วไป / เพื่อนคุย',
    rating: 5.0,
    reviews: 210,
    hourlyRate: 300,
    experience: '12 ปี',
    image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=400&h=400&fit=crop',
    bio: 'เน้นการดูแลด้านจิตใจ เป็นเพื่อนคุย อ่านหนังสือพาไปทำกิจกรรมที่ชอบ เช่น งานฝีมือ หรือฟังธรรมะ',
    available: true,
    certifications: ['จิตวิทยาผู้สูงอายุ', 'การประกอบอาหารสุขภาพ', 'การดูแลเบื้องต้น'],
    certImages: ['https://images.unsplash.com/photo-1589330694653-ded6df03f754?w=400&h=300&fit=crop'],
    reviewComments: [
      { user: 'รินทร์', comment: 'คุณยายชอบมาก คุยเก่ง อารมณ์ดีขึ้นเยอะเลย', rating: 5, date: '15 ต.ค. 67' },
      { user: 'ปรีชา', comment: 'ทำกับข้าวอร่อยและถูกหลักโภชนาการครับ', rating: 5, date: '8 ต.ค. 67' }
    ]
  },
  {
    id: '4',
    name: 'คุณมาลี มีสุข',
    age: 41,
    specialty: 'ดูแลผู้ป่วยอัลไซเมอร์',
    rating: 4.7,
    reviews: 64,
    hourlyRate: 380,
    experience: '7 ปี',
    image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&h=400&fit=crop',
    bio: 'มีความอดทนสูง เข้าใจพฤติกรรมผู้ป่วยสมองเสื่อม สามารถจัดกิจกรรมกระตุ้นสมองได้ดี',
    available: true,
    certifications: ['ดูแลผู้ป่วยสมองเสื่อมขั้นสูง', 'กิจกรรมบำบัดเบื้องต้น'],
    certImages: ['https://images.unsplash.com/photo-1589330694653-ded6df03f754?w=400&h=300&fit=crop'],
    reviewComments: [
      { user: 'กมล', comment: 'ดูแลคุณป้าได้ดีมาก ใจเย็นสุดๆ ครับ', rating: 5, date: '20 ต.ค. 67' }
    ]
  }
];

const HOSPITALS: Hospital[] = [
  {
    name: 'โรงพยาบาลศิริราช',
    location: 'กรุงเทพฯ',
    image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=400&h=200&fit=crop',
    specialties: ['ศูนย์เวชศาสตร์ผู้สูงอายุ', 'อายุรกรรม']
  },
  {
    name: 'โรงพยาบาลกรุงเทพ',
    location: 'กรุงเทพฯ',
    image: 'https://images.unsplash.com/photo-1586773860418-d319663dd55c?w=400&h=200&fit=crop',
    specialties: ['ศูนย์เชี่ยวชาญเฉพาะทาง', 'กายภาพบำบัด']
  }
];

const POPULATION_DATA = [
  { year: '2010', count: 7.5 },
  { year: '2015', count: 9.8 },
  { year: '2020', count: 12.0 },
  { year: '2025', count: 14.5 },
  { year: '2030', count: 18.2 },
];

const App: React.FC = () => {
  const [section, setSection] = useState<AppSection>(AppSection.LANDING);
  const [user, setUser] = useState({ name: 'คุณมานพ', age: 72, id: 'U001', isPremium: false });
  const [healthRecords, setHealthRecords] = useState<HealthRecord[]>([
    { id: '1', date: '24 ต.ค. 2567', bloodPressure: '120/80', sugarLevel: '95', weight: '65', heartRate: '72', notes: 'ปกติ' }
  ]);
  const [emergencyContacts, setEmergencyContacts] = useState<EmergencyContact[]>([
    { id: '1', name: 'คุณสมศักดิ์ (ลูกชาย)', relation: 'ลูกชาย', phone: '081-234-5678' }
  ]);
  const [bookings, setBookings] = useState<Booking[]>([
    { id: 'B001', caregiverId: '1', caregiverName: 'คุณสมใจ รักดี', date: '20 ต.ค. 2567', time: '09:00', status: 'completed', total: 350, serviceType: 'โรงพยาบาล' }
  ]);
  const [selectedCaregiver, setSelectedCaregiver] = useState<Caregiver | null>(null);
  const [bookingState, setBookingState] = useState<{
    type: 'NOW' | 'ADVANCE',
    step: 'options' | 'location' | 'date' | 'caregiver' | 'payment' | 'done',
    serviceType?: ServiceType,
    startLoc?: string,
    endLoc?: string,
    date?: string,
    time?: string,
    caregiver?: Caregiver
  }>({ type: 'NOW', step: 'options' });

  const LOGO_URL = "https://i.ibb.co/3Y8Nf6H/Careyou-Logo.png";

  const nav = (s: AppSection) => {
    window.scrollTo(0, 0);
    setSection(s);
  };

  const openCaregiverDetail = (c: Caregiver) => {
    setSelectedCaregiver(c);
    nav(AppSection.CAREGIVER_DETAIL);
  };

  const Header = () => (
    <header className="bg-white/80 backdrop-blur px-6 py-4 flex items-center justify-between shadow-sm sticky top-0 z-50 border-b border-[#D7CCC8]">
      <div className="flex items-center gap-2 cursor-pointer" onClick={() => nav(AppSection.DASHBOARD)}>
        <img src={LOGO_URL} alt="Careyou Logo" className="w-10 h-10 object-contain rounded-xl" />
        <span className="text-xl font-black text-[#4E342E]">Careyou</span>
      </div>
      <button 
        onClick={() => nav(AppSection.PROFILE)}
        className="w-12 h-12 rounded-2xl bg-[#FDF6E3] border-2 border-[#D7CCC8] overflow-hidden shadow-inner"
      >
        <img src="https://picsum.photos/seed/man/100" alt="Profile" />
      </button>
    </header>
  );

  const renderLanding = () => (
    <div className="h-screen bg-[#FFFBF2] flex flex-col items-center justify-center p-8 text-center animate-fade-in">
      <div className="mb-10 transform scale-125">
         <img src={LOGO_URL} alt="Careyou Logo" className="w-48 h-48 object-contain drop-shadow-2xl" />
      </div>
      <h2 className="text-4xl font-black text-[#4E342E] mb-2 leading-tight">Careyou</h2>
      <p className="text-xl font-bold text-[#8D6E63] mb-12 italic">“ถ้าห่วงใย ให้ไว้ใจ Careyou”</p>
      <button 
        onClick={() => nav(AppSection.LOGIN)}
        className="bg-[#5D4037] text-white px-12 py-5 rounded-[32px] font-black text-xl shadow-xl hover:scale-105 active:scale-95 transition-all"
      >
        เริ่มต้นการดูแล <i className="fas fa-arrow-right ml-2"></i>
      </button>
    </div>
  );

  const renderLogin = () => (
    <div className="h-screen bg-white flex flex-col p-8 justify-center animate-fade-in">
      <div className="mb-12">
        <h2 className="text-4xl font-black text-[#4E342E] mb-2">เข้าสู่ระบบ</h2>
        <p className="text-[#8D6E63] font-medium">ยินดีต้อนรับกลับมาสู่ Careyou ครับ</p>
      </div>
      <div className="space-y-6">
        <input type="text" placeholder="เบอร์โทรศัพท์" className="w-full px-6 py-4 bg-[#FDF6E3] border-0 rounded-2xl focus:ring-2 focus:ring-[#8D6E63] font-bold" />
        <input type="password" placeholder="รหัสผ่าน" className="w-full px-6 py-4 bg-[#FDF6E3] border-0 rounded-2xl focus:ring-2 focus:ring-[#8D6E63] font-bold" />
        <button onClick={() => nav(AppSection.DASHBOARD)} className="w-full py-5 bg-[#8D6E63] text-white rounded-[28px] font-black text-lg shadow-lg active:bg-[#5D4037]">เข้าสู่ระบบ</button>
      </div>
    </div>
  );

  const renderDashboard = () => (
    <div className="min-h-screen bg-[#FFFBF2] pb-32 animate-fade-in">
      <Header />
      <div className="p-6 space-y-6">
        <button className="w-full bg-gradient-to-r from-[#8D6E63] to-[#5D4037] rounded-[32px] p-6 text-white flex items-center justify-between shadow-xl">
          <div className="flex items-center gap-5">
            <div className="text-4xl"><i className="fas fa-cloud-sun"></i></div>
            <div className="text-left border-l border-white/20 pl-5">
              <p className="text-[10px] opacity-70 uppercase font-bold tracking-widest text-white">สภาพอากาศวันนี้</p>
              <p className="text-xl font-bold">32°C แจ่มใส | ฝุ่นดี | จราจรคล่องตัว</p>
            </div>
          </div>
        </button>

        <div className="grid grid-cols-1 gap-4">
          <button 
            onClick={() => nav(AppSection.CARE_SERVICE_MENU)}
            className="group bg-white p-8 rounded-[40px] border border-[#D7CCC8] shadow-sm hover:shadow-md flex items-center justify-between transition-all"
          >
            <div className="flex items-center gap-6">
              <div className="w-20 h-20 bg-[#F5F5DC] rounded-[30px] flex items-center justify-center text-[#8D6E63]">
                <i className="fas fa-user-nurse text-4xl"></i>
              </div>
              <div className="text-left">
                <h3 className="text-2xl font-black text-[#4E342E]">บริการ Careyou</h3>
                <p className="text-[#8D6E63] font-medium">หาหมอ ท่องเที่ยว ทำธุระ เราดูแลให้</p>
              </div>
            </div>
            <i className="fas fa-chevron-right text-gray-300 group-hover:text-[#8D6E63]"></i>
          </button>

          <div className="grid grid-cols-2 gap-4">
            <button onClick={() => nav(AppSection.HEALTH_RECORDS)} className="bg-white p-6 rounded-[32px] border border-[#D7CCC8] flex flex-col items-center gap-3 shadow-sm active:bg-red-50">
              <div className="w-14 h-14 bg-red-50 rounded-2xl flex items-center justify-center text-red-500">
                <i className="fas fa-file-medical-alt text-2xl"></i>
              </div>
              <p className="font-bold text-[#4E342E]">ข้อมูลสุขภาพ</p>
            </button>
            <button onClick={() => nav(AppSection.EMERGENCY_CONTACTS)} className="bg-white p-6 rounded-[32px] border border-[#D7CCC8] flex flex-col items-center gap-3 shadow-sm active:bg-orange-50">
              <div className="w-14 h-14 bg-orange-50 rounded-2xl flex items-center justify-center text-orange-500">
                <i className="fas fa-phone-alt text-2xl"></i>
              </div>
              <p className="font-bold text-[#4E342E]">ติดต่อฉุกเฉิน</p>
            </button>
          </div>

          <button onClick={() => nav(AppSection.PARTNER_HOSPITALS)} className="bg-white p-6 rounded-[32px] border border-[#D7CCC8] flex items-center gap-6 shadow-sm active:bg-blue-50">
            <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-500">
              <i className="fas fa-hospital-user text-2xl"></i>
            </div>
            <div className="text-left">
              <p className="font-bold text-[#4E342E]">โรงพยาบาลคู่ใจ</p>
              <p className="text-xs text-gray-400 font-medium">พันธมิตรที่ผ่านการรับรองคุณภาพ</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );

  const renderCaregiverDetail = () => {
    if (!selectedCaregiver) return null;
    return (
      <div className="min-h-screen bg-[#FFFBF2] animate-fade-in pb-20">
        <div className="relative h-72">
          <img src={selectedCaregiver.image} className="w-full h-full object-cover" alt="" />
          <button 
            onClick={() => nav(AppSection.CALL_NOW_FLOW)} 
            className="absolute top-6 left-6 w-12 h-12 bg-white/80 backdrop-blur rounded-2xl flex items-center justify-center text-[#8D6E63]"
          >
            <i className="fas fa-arrow-left"></i>
          </button>
          <div className="absolute bottom-[-30px] left-6 right-6 bg-white p-6 rounded-[32px] shadow-lg border border-[#D7CCC8] flex justify-between items-center">
             <div>
                <h3 className="text-2xl font-black text-[#4E342E]">{selectedCaregiver.name}</h3>
                <p className="text-[#8D6E63] font-bold">{selectedCaregiver.age} ปี • {selectedCaregiver.specialty}</p>
             </div>
             <div className="bg-yellow-50 text-yellow-600 px-4 py-2 rounded-2xl font-black border border-yellow-100 flex items-center gap-2">
                <i className="fas fa-star text-sm"></i> {selectedCaregiver.rating}
             </div>
          </div>
        </div>

        <div className="mt-12 p-6 space-y-8">
          <div className="bg-white p-6 rounded-[32px] border border-[#D7CCC8] shadow-sm">
            <h4 className="font-black text-[#4E342E] text-lg mb-3">ประวัติการดูแล</h4>
            <p className="text-gray-600 text-sm leading-relaxed">{selectedCaregiver.bio}</p>
          </div>

          <div>
             <h4 className="font-black text-[#4E342E] text-lg mb-4 flex items-center gap-2">
                <i className="fas fa-certificate text-[#8D6E63]"></i> ใบรับรองการอบรม
             </h4>
             <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
                {selectedCaregiver.certImages.map((img, i) => (
                  <div key={i} className="min-w-[240px] h-40 rounded-3xl overflow-hidden border border-[#D7CCC8] shadow-sm flex-shrink-0 cursor-zoom-in">
                    <img src={img} className="w-full h-full object-cover" alt="Certification" />
                  </div>
                ))}
             </div>
          </div>

          <div>
             <h4 className="font-black text-[#4E342E] text-lg mb-4">รีวิวจากลูกค้า ({selectedCaregiver.reviewComments.length})</h4>
             <div className="space-y-4">
                {selectedCaregiver.reviewComments.map((r, i) => (
                  <div key={i} className="bg-white p-5 rounded-3xl border border-[#F5F5DC] shadow-sm">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-black text-[#4E342E]">{r.user}</span>
                      <span className="text-[10px] text-gray-400 font-bold uppercase">{r.date}</span>
                    </div>
                    <div className="flex text-yellow-500 mb-2">
                      {[...Array(5)].map((_, j) => <i key={j} className={`${j < r.rating ? 'fas' : 'far'} fa-star text-[10px]`}></i>)}
                    </div>
                    <p className="text-gray-600 text-sm italic">"{r.comment}"</p>
                  </div>
                ))}
             </div>
          </div>
        </div>

        <div className="fixed bottom-0 left-0 right-0 p-6 bg-white/95 backdrop-blur-md border-t border-[#D7CCC8] z-50 flex items-center justify-between">
           <div>
              <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">ค่าบริการ</p>
              <p className="text-3xl font-black text-[#4E342E]">฿{selectedCaregiver.hourlyRate}<span className="text-sm font-medium text-gray-400">/ชม.</span></p>
           </div>
           <button 
            onClick={() => setBookingState({...bookingState, step: 'payment', caregiver: selectedCaregiver})}
            className="bg-[#8D6E63] text-white px-10 py-5 rounded-[32px] font-black text-xl shadow-lg active:scale-95"
           >
            จองบริการ
           </button>
        </div>
      </div>
    );
  };

  const renderHealthRecords = () => (
    <div className="min-h-screen bg-[#FFFBF2] p-6 animate-fade-in pb-24">
      <div className="flex items-center gap-4 mb-8">
        <button onClick={() => nav(AppSection.DASHBOARD)} className="w-12 h-12 rounded-2xl bg-white border border-[#D7CCC8] flex items-center justify-center text-[#8D6E63]">
          <i className="fas fa-arrow-left"></i>
        </button>
        <h2 className="text-3xl font-black text-[#4E342E]">บันทึกสุขภาพ</h2>
      </div>
      <div className="bg-white p-8 rounded-[40px] border border-[#D7CCC8] shadow-sm mb-8">
        <h4 className="font-black text-[#4E342E] mb-6">ป้อนข้อมูลวันนี้</h4>
        <div className="grid grid-cols-2 gap-4">
          <input type="text" placeholder="ความดัน" className="w-full p-4 bg-[#FDF6E3] border-0 rounded-2xl font-bold text-[#4E342E]" />
          <input type="text" placeholder="น้ำตาล" className="w-full p-4 bg-[#FDF6E3] border-0 rounded-2xl font-bold text-[#4E342E]" />
          <input type="text" placeholder="น้ำหนัก" className="w-full p-4 bg-[#FDF6E3] border-0 rounded-2xl font-bold text-[#4E342E]" />
          <input type="text" placeholder="หัวใจ" className="w-full p-4 bg-[#FDF6E3] border-0 rounded-2xl font-bold text-[#4E342E]" />
        </div>
        <button className="w-full mt-6 py-4 bg-[#8D6E63] text-white rounded-[24px] font-black shadow-lg">บันทึก</button>
      </div>
      <div className="space-y-4">
        {healthRecords.map(r => (
          <div key={r.id} className="bg-white p-6 rounded-[32px] border border-[#F5F5DC] shadow-sm flex justify-between items-center">
            <div>
                <p className="font-black text-[#4E342E]">{r.date}</p>
                <p className="text-xs text-[#8D6E63] font-bold uppercase">ความดัน: {r.bloodPressure} | หัวใจ: {r.heartRate}</p>
            </div>
            <i className="fas fa-chevron-right text-gray-200"></i>
          </div>
        ))}
      </div>
    </div>
  );

  const renderEmergencyContacts = () => (
    <div className="min-h-screen bg-[#FFFBF2] p-6 animate-fade-in pb-24">
      <div className="flex items-center gap-4 mb-8">
        <button onClick={() => nav(AppSection.DASHBOARD)} className="w-12 h-12 rounded-2xl bg-white border border-[#D7CCC8] flex items-center justify-center text-[#8D6E63]">
          <i className="fas fa-arrow-left"></i>
        </button>
        <h2 className="text-3xl font-black text-[#4E342E]">ติดต่อฉุกเฉิน</h2>
      </div>
      <div className="space-y-4 mb-8">
        {emergencyContacts.map(c => (
          <div key={c.id} className="bg-white p-6 rounded-[32px] border border-[#D7CCC8] flex items-center justify-between shadow-sm">
            <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-red-50 text-red-500 rounded-full flex items-center justify-center"><i className="fas fa-heartbeat"></i></div>
                <div>
                    <h4 className="font-black text-[#4E342E]">{c.name}</h4>
                    <p className="text-xs text-gray-400 font-bold">{c.relation} • {c.phone}</p>
                </div>
            </div>
            <a href={`tel:${c.phone}`} className="w-12 h-12 bg-[#8D6E63] text-white rounded-xl flex items-center justify-center shadow-md"><i className="fas fa-phone-alt"></i></a>
          </div>
        ))}
      </div>
      <button className="w-full py-5 border-2 border-dashed border-[#8D6E63] text-[#8D6E63] rounded-[32px] font-black">+ เพิ่มผู้ติดต่อ</button>
    </div>
  );

  /**
   * Fix: Added missing renderProfile function to resolve compilation error
   */
  const renderProfile = () => (
    <div className="min-h-screen bg-[#FFFBF2] p-6 animate-fade-in pb-24">
      <div className="flex items-center gap-4 mb-8">
        <button onClick={() => nav(AppSection.DASHBOARD)} className="w-12 h-12 rounded-2xl bg-white border border-[#D7CCC8] flex items-center justify-center text-[#8D6E63]">
          <i className="fas fa-arrow-left"></i>
        </button>
        <h2 className="text-3xl font-black text-[#4E342E]">โปรไฟล์ของฉัน</h2>
      </div>

      <div className="bg-white p-8 rounded-[40px] border border-[#D7CCC8] shadow-sm mb-8 text-center">
        <div className="w-24 h-24 rounded-[32px] bg-[#FDF6E3] border-4 border-white shadow-md overflow-hidden mx-auto mb-4">
          <img src="https://picsum.photos/seed/man/200" alt="Profile" className="w-full h-full object-cover" />
        </div>
        <h3 className="text-2xl font-black text-[#4E342E]">{user.name}</h3>
        <p className="text-[#8D6E63] font-bold">อายุ {user.age} ปี • รหัสสมาชิก {user.id}</p>
        <div className="mt-4 inline-flex items-center gap-2 px-4 py-1 bg-yellow-50 text-yellow-700 rounded-full border border-yellow-100 text-xs font-black">
          <i className="fas fa-crown"></i> {user.isPremium ? 'สมาชิกพรีเมียม' : 'สมาชิกทั่วไป'}
        </div>
      </div>

      <div className="space-y-4">
        {[
          { label: 'แก้ไขข้อมูลส่วนตัว', icon: 'fa-user-edit' },
          { label: 'ที่อยู่ที่บันทึกไว้', icon: 'fa-map-marker-alt' },
          { label: 'วิธีการชำระเงิน', icon: 'fa-credit-card' },
          { label: 'ตั้งค่าการแจ้งเตือน', icon: 'fa-bell' },
          { label: 'ความปลอดภัย', icon: 'fa-shield-alt' },
          { label: 'ติดต่อศูนย์ช่วยเหลือ', icon: 'fa-headset' },
        ].map((item, i) => (
          <button key={i} className="w-full bg-white p-5 rounded-3xl border border-[#F5F5DC] shadow-sm flex items-center justify-between text-[#4E342E] font-bold active:bg-gray-50">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-[#FDF6E3] flex items-center justify-center text-[#8D6E63]"><i className={`fas ${item.icon}`}></i></div>
              <span>{item.label}</span>
            </div>
            <i className="fas fa-chevron-right text-gray-300"></i>
          </button>
        ))}
      </div>

      <button 
        onClick={() => nav(AppSection.LANDING)}
        className="w-full mt-12 py-5 bg-red-50 text-red-600 rounded-[32px] font-black shadow-sm flex items-center justify-center gap-2 border border-red-100"
      >
        <i className="fas fa-sign-out-alt"></i> ออกจากระบบ
      </button>
    </div>
  );

  const renderMyBookings = () => (
    <div className="min-h-screen bg-[#FFFBF2] p-6 animate-fade-in pb-24">
      <div className="flex items-center gap-4 mb-8">
        <button onClick={() => nav(AppSection.CARE_SERVICE_MENU)} className="w-12 h-12 rounded-2xl bg-white border border-[#D7CCC8] flex items-center justify-center text-[#8D6E63]">
          <i className="fas fa-arrow-left"></i>
        </button>
        <h2 className="text-3xl font-black text-[#4E342E]">การจอง & คนโปรด</h2>
      </div>
      <div className="space-y-8">
        <section>
          <h4 className="text-lg font-black text-[#4E342E] mb-4">ประวัติการจองล่าสุด</h4>
          <div className="space-y-4">
            {bookings.map(b => (
              <div key={b.id} className="bg-white p-6 rounded-[32px] border border-[#F5F5DC] shadow-sm flex justify-between items-center cursor-pointer hover:bg-gray-50 transition-colors">
                <div>
                  <h5 className="font-black text-[#4E342E]">{b.caregiverName}</h5>
                  <p className="text-xs text-gray-400 font-bold">{b.date} • {b.time} น. • บริการ{b.serviceType}</p>
                </div>
                <div className="text-right">
                  <p className="font-black text-[#8D6E63]">฿{b.total}</p>
                  <span className="text-[8px] bg-green-50 text-green-600 px-2 py-0.5 rounded-full font-black uppercase">สำเร็จ</span>
                </div>
              </div>
            ))}
          </div>
        </section>
        <section>
          <h4 className="text-lg font-black text-[#4E342E] mb-4">ผู้ดูแลที่คุณไว้วางใจ</h4>
          <div className="grid grid-cols-1 gap-4">
            {CAREGIVERS.filter(c => c.isFavorite).map(c => (
              <CaregiverCard key={c.id} caregiver={c} onSelect={openCaregiverDetail} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );

  const renderCareServiceMenu = () => (
    <div className="min-h-screen bg-[#FFFBF2] p-6 animate-fade-in">
      <div className="flex items-center gap-4 mb-8">
        <button onClick={() => nav(AppSection.DASHBOARD)} className="w-12 h-12 rounded-2xl bg-white border border-[#D7CCC8] flex items-center justify-center text-[#8D6E63]">
          <i className="fas fa-arrow-left"></i>
        </button>
        <h2 className="text-3xl font-black text-[#4E342E]">บริการ Careyou</h2>
      </div>
      <div className="grid grid-cols-1 gap-6">
        <button onClick={() => { setBookingState({type: 'NOW', step: 'options'}); nav(AppSection.CALL_NOW_FLOW); }} className="bg-[#8D6E63] p-8 rounded-[40px] text-white flex items-center justify-between shadow-xl">
          <div className="flex items-center gap-6">
            <i className="fas fa-bolt text-4xl"></i>
            <div className="text-left">
              <h4 className="text-2xl font-black">เรียกเลย Careyou</h4>
              <p className="opacity-70 text-sm font-medium">หาผู้ดูแลที่พร้อมให้บริการตอนนี้</p>
            </div>
          </div>
        </button>
        <button onClick={() => { setBookingState({type: 'ADVANCE', step: 'options'}); nav(AppSection.ADVANCE_BOOKING); }} className="bg-white p-8 rounded-[40px] border-2 border-[#8D6E63] text-[#4E342E] flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-6">
            <i className="fas fa-calendar-alt text-4xl text-[#8D6E63]"></i>
            <div className="text-left">
              <h4 className="text-2xl font-black">นัดหมายล่วงหน้า</h4>
              <p className="text-[#8D6E63] font-medium">จองคิวไว้เพื่อความอุ่นใจ</p>
            </div>
          </div>
        </button>
        <div className="grid grid-cols-2 gap-4">
          <button onClick={() => nav(AppSection.MY_BOOKINGS)} className="bg-white p-6 rounded-[36px] border border-[#D7CCC8] flex flex-col items-center gap-3 active:bg-[#FDF6E3]">
            <div className="w-14 h-14 bg-[#F5F5DC] rounded-2xl flex items-center justify-center text-[#8D6E63]"><i className="fas fa-heart text-2xl"></i></div>
            <p className="font-bold text-[#4E342E]">การจอง / คนโปรด</p>
          </button>
          <button onClick={() => nav(AppSection.MEMBERSHIP)} className="bg-white p-6 rounded-[36px] border border-[#D7CCC8] flex flex-col items-center gap-3 active:bg-purple-50">
            <div className="w-14 h-14 bg-purple-50 rounded-2xl flex items-center justify-center text-purple-600"><i className="fas fa-gem text-2xl"></i></div>
            <p className="font-bold text-[#4E342E]">แพ็กเกจสมาชิก</p>
          </button>
        </div>
      </div>
    </div>
  );

  const renderBookingFlow = (isAdvance: boolean) => {
    const { step, caregiver } = bookingState;
    if (step === 'options') return (
      <div className="min-h-screen bg-[#FFFBF2] p-8 animate-fade-in">
        <button onClick={() => nav(AppSection.CARE_SERVICE_MENU)} className="mb-8 font-bold text-[#8D6E63]"><i className="fas fa-arrow-left mr-2"></i> กลับ</button>
        <h2 className="text-4xl font-black text-[#4E342E] mb-12">วันนี้รับบริการ<br/>ด้านไหนดีครับ?</h2>
        <div className="space-y-4">
          {['HOSPITAL', 'TRAVEL', 'ERRANDS'].map(id => (
            <button key={id} onClick={() => setBookingState({ ...bookingState, step: isAdvance ? 'date' : 'location', serviceType: id as ServiceType })} className="w-full p-6 rounded-[32px] bg-white border border-[#D7CCC8] flex items-center gap-6 shadow-sm active:bg-[#FDF6E3]">
              <div className="w-16 h-16 bg-[#F5F5DC] rounded-2xl flex items-center justify-center text-[#8D6E63] text-2xl">
                <i className={`fas ${id === 'HOSPITAL' ? 'fa-hospital' : id === 'TRAVEL' ? 'fa-sun' : 'fa-shopping-bag'}`}></i>
              </div>
              <span className="text-xl font-bold text-[#4E342E]">{id === 'HOSPITAL' ? 'พาไปโรงพยาบาล' : id === 'TRAVEL' ? 'พาไปเที่ยว' : 'พาไปทำธุระ'}</span>
            </button>
          ))}
        </div>
      </div>
    );
    if (step === 'date') return (
        <div className="min-h-screen bg-white p-8 animate-fade-in">
          <button onClick={() => setBookingState({...bookingState, step: 'options'})} className="mb-8 text-[#8D6E63] font-bold"><i className="fas fa-arrow-left mr-2"></i> ย้อนกลับ</button>
          <h2 className="text-3xl font-black text-[#4E342E] mb-8">นัดหมายวันเวลา</h2>
          <div className="space-y-6">
            <input type="date" className="w-full p-5 bg-[#FDF6E3] rounded-2xl border-0 font-bold text-[#4E342E] outline-none" />
            <input type="time" className="w-full p-5 bg-[#FDF6E3] rounded-2xl border-0 font-bold text-[#4E342E] outline-none" />
            <button onClick={() => setBookingState({...bookingState, step: 'location'})} className="w-full py-5 bg-[#8D6E63] text-white rounded-[28px] font-black shadow-lg">ต่อไป: เลือกสถานที่</button>
          </div>
        </div>
    );
    if (step === 'location') return (
      <div className="min-h-screen bg-white p-8 flex flex-col animate-fade-in">
        <button onClick={() => setBookingState({...bookingState, step: isAdvance ? 'date' : 'options'})} className="mb-6 text-[#8D6E63] font-bold"><i className="fas fa-arrow-left mr-2"></i> ย้อนกลับ</button>
        <h2 className="text-3xl font-black text-[#4E342E] mb-8">ระบุจุดหมาย</h2>
        <div className="space-y-6 flex-grow">
          <input type="text" placeholder="จุดรับ: บ้านคุณลุง" className="w-full p-5 bg-[#FDF6E3] border border-[#D7CCC8] rounded-2xl font-bold" />
          <input type="text" placeholder="จุดส่ง: ระบุปลายทาง" className="w-full p-5 bg-[#FDF6E3] border border-[#D7CCC8] rounded-2xl font-bold" />
          <div className="w-full h-72 bg-[#FFFBF2] border-2 border-dashed border-[#D7CCC8] rounded-[40px] flex items-center justify-center text-[#D7CCC8] font-black">จำลองแผนที่ Careyou</div>
        </div>
        <button onClick={() => setBookingState({ ...bookingState, step: 'caregiver' })} className="mt-8 py-5 bg-[#8D6E63] text-white rounded-[32px] font-black text-xl shadow-lg">เลือกผู้ดูแล</button>
      </div>
    );
    if (step === 'caregiver') return (
      <div className="min-h-screen bg-[#FFFBF2] p-6 animate-fade-in pb-20">
        <button onClick={() => setBookingState({...bookingState, step: 'location'})} className="mb-8 font-bold text-[#8D6E63]"><i className="fas fa-arrow-left mr-2"></i> แก้ไขสถานที่</button>
        <h2 className="text-3xl font-black text-[#4E342E] mb-8">ผู้ดูแลที่ท่านไว้วางใจ</h2>
        <div className="grid grid-cols-1 gap-6">
          {CAREGIVERS.map(c => (
            <CaregiverCard key={c.id} caregiver={c} onSelect={openCaregiverDetail} />
          ))}
        </div>
      </div>
    );
    if (step === 'payment') return (
      <div className="min-h-screen bg-white p-8 flex flex-col animate-fade-in">
        <button onClick={() => setBookingState({...bookingState, step: 'caregiver'})} className="mb-6 text-[#8D6E63] font-bold"><i className="fas fa-arrow-left mr-2"></i> กลับ</button>
        <h2 className="text-3xl font-black text-[#4E342E] mb-8">สรุปการชำระเงิน</h2>
        <div className="bg-[#FDF6E3] p-8 rounded-[40px] border border-[#D7CCC8] mb-8 shadow-sm">
          <div className="flex items-center gap-4 mb-6 pb-6 border-b border-[#D7CCC8]/30">
            <img src={caregiver?.image} className="w-16 h-16 rounded-2xl object-cover" alt="" />
            <div>
              <p className="font-black text-[#4E342E]">{caregiver?.name}</p>
              <p className="text-xs text-[#8D6E63] font-bold">฿{caregiver?.hourlyRate || 300}/ชม.</p>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex justify-between font-bold text-[#4E342E]"><span>ค่าบริการ</span><span>฿{caregiver?.hourlyRate || 300}</span></div>
            <div className="flex justify-between font-bold text-[#4E342E]"><span>ค่าเดินทาง</span><span>฿50</span></div>
            <div className="pt-4 border-t border-[#D7CCC8] flex justify-between font-black text-2xl text-[#8D6E63]"><span>รวมทั้งสิ้น</span><span>฿{(caregiver?.hourlyRate || 300) + 50}</span></div>
          </div>
        </div>
        <div className="space-y-4 flex-grow">
          {['Thai QR PromptPay', 'Credit Card', 'Wallet'].map(m => (
            <button key={m} className="w-full p-6 rounded-3xl border-2 border-gray-100 flex justify-between items-center font-bold text-[#4E342E] active:border-[#8D6E63]">
              {m} <div className="w-6 h-6 rounded-full border-2 border-gray-200"></div>
            </button>
          ))}
        </div>
        <button onClick={() => setBookingState({ ...bookingState, step: 'done' })} className="mt-8 py-5 bg-[#5D4037] text-white rounded-[32px] font-black text-xl shadow-xl">ยืนยันการจอง</button>
      </div>
    );
    return (
      <div className="h-screen bg-white flex flex-col items-center justify-center p-8 text-center animate-fade-in">
        <div className="w-40 h-40 bg-[#F5F5DC] rounded-full flex items-center justify-center text-[#8D6E63] text-7xl mb-12 shadow-inner"><i className="fas fa-check"></i></div>
        <h2 className="text-4xl font-black text-[#4E342E] mb-4">จองสำเร็จ!</h2>
        <p className="text-[#8D6E63] font-medium text-lg italic mb-12">“เพราะเราห่วงใย คุณจึงไว้ใจได้เสมอ”</p>
        <button onClick={() => nav(AppSection.DASHBOARD)} className="w-full py-5 bg-[#8D6E63] text-white rounded-[32px] font-black text-xl">กลับหน้าหลัก</button>
      </div>
    );
  };

  return (
    <div className="max-w-md mx-auto shadow-2xl min-h-screen bg-[#FFFBF2] overflow-x-hidden relative font-['Prompt']">
      {section === AppSection.LANDING && renderLanding()}
      {section === AppSection.LOGIN && renderLogin()}
      {section === AppSection.DASHBOARD && renderDashboard()}
      {section === AppSection.PROFILE && renderProfile()}
      {section === AppSection.CARE_SERVICE_MENU && renderCareServiceMenu()}
      {section === AppSection.CALL_NOW_FLOW && renderBookingFlow(false)}
      {section === AppSection.ADVANCE_BOOKING && renderBookingFlow(true)}
      {section === AppSection.HEALTH_RECORDS && renderHealthRecords()}
      {section === AppSection.EMERGENCY_CONTACTS && renderEmergencyContacts()}
      {section === AppSection.MY_BOOKINGS && renderMyBookings()}
      {section === AppSection.CAREGIVER_DETAIL && renderCaregiverDetail()}
      {/* Other screens can be rendered here following the same structure */}
      {[AppSection.PARTNER_HOSPITALS, AppSection.MEMBERSHIP, AppSection.RELAXATION].includes(section) && (
        <div className="p-12 text-center min-h-screen bg-[#FFFBF2] animate-fade-in flex flex-col items-center justify-center">
             <i className="fas fa-spa text-6xl text-[#8D6E63] mb-8 animate-pulse"></i>
             <h2 className="text-2xl font-black text-[#4E342E]">กำลังปรับปรุงข้อมูล...</h2>
             <button onClick={() => nav(AppSection.DASHBOARD)} className="mt-12 bg-[#8D6E63] text-white px-8 py-4 rounded-2xl font-bold">กลับ</button>
        </div>
      )}
    </div>
  );
};

export default App;
