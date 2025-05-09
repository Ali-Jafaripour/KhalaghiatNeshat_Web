import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import clsx from "clsx";
// @ts-ignore
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
// @ts-ignore
import LottieIcon from "../Icon/LottieIcon.tsx";
// @ts-ignore
import Check from "../Icon/Security.json";

// Update the interface to handle multiple team names
interface UserData {
  name: string;
  email: string;
  studentId: string;
  nationalId: string;
  sex: string;
  teamName1: string | null;
  teamName2: string | null;
}

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [editedData, setEditedData] = useState<UserData | null>(null);
  const [error, setError] = useState('');
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [isFinalModalOpen, setIsFinalModalOpen] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Fetch user data from the backend
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('http://localhost:3398/creativeDay/user/getUserData', {
          method: 'GET',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }

        const data = await response.json();
        if (data.success) {
          setUserData(data.userData);
          setEditedData(data.userData);
        } else {
          setError(data.message || 'خطا در دریافت اطلاعات');
        }
      } catch (err) {
        console.error('Error fetching user data:', err);
        setError('خطا در ارتباط با سرور');
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleInputChange = (field: keyof UserData, value: string) => {
    if (editedData) {
      setEditedData({
        ...editedData,
        [field]: value
      });
    }
  };

  const handleConfirm = () => {
    if (editMode) {
      // Save changes before confirming
      handleSaveChanges();
    } else {
      setIsFinalModalOpen(true);
    }
  };

  const handleSaveChanges = async () => {
    if (!editedData) return;

    try {
      setError('');
      const response = await fetch('http://localhost:3398/creativeDay/user/updateUserData', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editedData)
      });

      if (!response.ok) {
        throw new Error('Failed to update user data');
      }

      const data = await response.json();
      if (data.success) {
        setUserData(editedData);
        setEditMode(false);
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 3000);
      } else {
        setError(data.message || 'خطا در بروزرسانی اطلاعات');
      }
    } catch (err) {
      console.error('Error updating user data:', err);
      setError('خطا در ارتباط با سرور');
    }
  };

  const handleEditToggle = () => {
    if (editMode) {
      // Discard changes
      setEditedData(userData);
    }
    setEditMode(!editMode);
  };

  const handleFinalModalConfirm = async () => {
    try {
      const response = await fetch('http://localhost:3398/creativeDay/user/finalizeRegistration', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' }
      });

      if (!response.ok) {
        throw new Error('Failed to finalize registration');
      }

      const data = await response.json();
      if (data.success) {
        setIsConfirmed(true);
        setIsFinalModalOpen(false);
        navigate("/");
      } else {
        setError(data.message || 'خطا در ثبت نهایی');
        setIsFinalModalOpen(false);
      }
    } catch (err) {
      console.error('Error finalizing registration:', err);
      setError('خطا در ارتباط با سرور');
      setIsFinalModalOpen(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="text-primary-2 font-Peyda">در حال بارگذاری...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className={clsx("absolute h-full w-full top-0",
        "lg:bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] lg:[background-size:20px_20px] lg:[mask-image:radial-gradient(ellipse_60%_70%_at_50%_40%,#0002_40%,transparent_100%)]",
        "bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:18px_18px] [mask-image:radial-gradient(ellipse_60%_70%_at_50%_10%,#0001_40%,transparent_100%)]"
      )}></div>

      <div className="z-20 absolute right-[6.5%] lg:right-[30%] top-[10%] lg:top-[20%] w-[87%] lg:w-[40%] p-8 rounded-2xl backdrop-blur-0 bg-[#ffffff03] border border-white/20 shadow-[inset_0_0_18px_rgba(255,255,255,0.2)]">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-center text-primary-2 font-Potk">
            {editMode ? 'ویرایش اطلاعات' : 'تایید اطلاعات'}
          </h2>
          <button
            onClick={handleEditToggle}
            className="px-3 py-1 rounded-lg text-sm border border-primary-1 text-primary-1 font-Peyda"
          >
            {editMode ? 'انصراف' : 'ویرایش'}
          </button>
        </div>

        {error && (
          <div className="bg-red-500/20 border border-red-500/50 text-primary-1 p-3 rounded-lg mb-4 font-Peyda text-right">
            {error}
          </div>
        )}

        {saveSuccess && (
          <div className="bg-green-500/20 border border-green-500/50 text-primary-1 p-3 rounded-lg mb-4 font-Peyda text-right">
            اطلاعات با موفقیت ذخیره شد
          </div>
        )}

        {userData && editedData && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <EditableInfoCard
                label="نام و نام خانوادگی"
                value={editedData.name}
                onChange={(value) => handleInputChange('name', value)}
                editMode={editMode}
              />
              <EditableInfoCard
                label="ایمیل"
                value={editedData.email}
                onChange={(value) => handleInputChange('email', value)}
                editMode={editMode}
              />
              <EditableInfoCard
                label="کد ملی"
                value={editedData.nationalId}
                onChange={(value) => handleInputChange('nationalId', value)}
                editMode={editMode}
              />
              <div className="flex gap-4">
                <div className="w-[30%]">
                  <EditableInfoCard
                    label="جنسیت"
                    value={editedData.sex === 'male' ? 'آقا' : 'خانم'}
                    onChange={(value) => handleInputChange('sex', value === 'آقا' ? 'male' : 'female')}
                    editMode={editMode}
                    isSelect={true}
                    options={['آقا', 'خانم']}
                  />
                </div>
                <div className="w-[70%]">
                  <EditableInfoCard
                    label="شماره دانشجویی"
                    value={editedData.studentId}
                    onChange={(value) => handleInputChange('studentId', value)}
                    editMode={editMode}
                  />
                </div>
              </div>
              {editedData.teamName1 ? (
                <EditableInfoCard
                  label="نام تیم در بازی X"
                  value={editedData.teamName1}
                  onChange={(value) => handleInputChange('teamName1', value)}
                  editMode={editMode}
                />
              ) : (
                <div className="flex flex-col gap-2">
                  <label className="block font-Peyda text-sm font-medium text-primary-1 text-right mr-3">
                    : وضعیت ثبت نام بازی اول
                  </label>
                  <div className="relative">
                    <div className="w-full pl-2 pr-10 py-[0.6rem] bg-white/5 rounded-lg flex items-center 
                      justify-end shadow-[inset_0_0_9px_rgba(255,255,255,0.2)] 
                      border-2 border-white/10 font-Peyda text-right text-red-400">
                      شما در بازی اول ثبت نام نکرده‌اید
                    </div>
                  </div>
                </div>
              )}
              {editedData.teamName2 ? (
                <EditableInfoCard
                  label="نام تیم در مسابقه برنامه نویســی"
                  value={editedData.teamName2}
                  onChange={(value) => handleInputChange('teamName2', value)}
                  editMode={editMode}
                />
              ) : (
                <div className="flex flex-col gap-2">
                  <label className="block font-Peyda text-sm font-medium text-primary-1 text-right mr-3">
                    : وضعیت ثبت نام مسابقه برنامه نویســی
                  </label>
                  <div className="relative">
                    <div className="w-full pl-2 pr-10 py-[0.6rem] bg-white/5 rounded-lg flex items-center 
                      justify-end shadow-[inset_0_0_9px_rgba(255,255,255,0.2)] 
                      border-2 border-white/10 font-Peyda text-right text-red-400">
                      شما در مسابقه برنامه نویســی ثبت نام نکرده‌اید
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="flex justify-center mt-8">
              <button
                onClick={handleConfirm}
                className="z-10 lg:w-2/4 w-full font-Peyda h-fit inline-flex lg:px-3 px-4 lg:py-4 py-3 lg:text-xl lg:rounded-xl rounded-xl
                  animate-shimmer items-center justify-center border border-primary-1
                  bg-[linear-gradient(110deg,#101010,30%,#272727,50%,#101010)] 
                  bg-[length:190%_100%] text-primary-1 font-semibold hover:opacity-70 hover:scale-105 
                  focus:outline-none text-nowrap overflow-hidden transition-transform duration-500"
              >
                {editMode ? 'ذخیره تغییرات' : 'تایید اطلاعات'}
              </button>
            </div>
          </div>
        )}
      </div>
      
      {isFinalModalOpen && (
        <div className="z-50 fixed inset-0 flex items-center justify-center backdrop-blur-lg">
          <div className="bg-[#ffffff03] border border-white/20 
            shadow-[inset_0_0_20px_rgba(255,255,255,0.2)] py-8 rounded-xl max-w-sm lg:w-full w-[83%] backdrop-blur-3xl
            flex flex-col justify-center items-center gap-6">
            <div className='flex flex-col gap-2 justify-center items-center'>
              <h3 className="lg:text-lg text-sm font-semibold font-Peyda text-primary-1 text-right text-nowrap">
                اطلاعات شما تایید و ثبت نهایی خواهد شد
              </h3>
              <h4 className="lg:text-lg text-sm font-semibold font-Peyda text-primary-1 text-right text-nowrap">
                آیا مطمئن هستید؟
              </h4>
            </div>
            <div className="flex justify-between gap-4">
              <button
                className="bg-red-600 bg-opacity-20 border border-red-900 border-opacity-60 text-primary-placeholder font-Peyda font-semibold px-4 py-2 rounded-lg text-nowrap"
                onClick={() => setIsFinalModalOpen(false)}
              >
                انصراف
              </button>
              <button
                className="bg-green-600 bg-opacity-20 border border-green-900 border-opacity-60 text-primary-placeholder font-Peyda font-semibold px-4 py-2 rounded-lg text-nowrap"
                onClick={handleFinalModalConfirm}
              >
                تایید نهایی
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="absolute inset-0 h-full w-full items-center px-5 py-24 [background:radial-gradient(250%_150%_at_50%_20%,#0000_35%,#ff6000_180%)] lg:[background:radial-gradient(150%_125%_at_50%_30%,#0000_40%,#ff6000_190%)]"></div>
    </div>
  );
};

interface EditableInfoCardProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  editMode: boolean;
  isSelect?: boolean;
  options?: string[];
}

const EditableInfoCard: React.FC<EditableInfoCardProps> = ({
  label,
  value,
  onChange,
  editMode,
  isSelect = false,
  options = []
}) => (
  <div className="flex flex-col gap-2">
    <label className="block font-Peyda text-sm font-medium text-primary-1 text-right mr-3">
      : {label}
    </label>
    <div className="relative">
      {editMode ? (
        isSelect ? (
          <select
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full pl-2 pr-8 py-[0.6rem] bg-white/5 rounded-lg 
              shadow-[inset_0_0_9px_rgba(255,255,255,0.2)] text-right
              border-2 border-white/10 font-Peyda text-primary-1 focus:border-primary-2 focus:border-2 focus:outline-none"
          >
            {options.map((option) => (
              <option key={option} value={option} className="bg-gray-800 text-primary-1">
                {option}
              </option>
            ))}
          </select>
        ) : (
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full pl-2 pr-8 py-[0.6rem] bg-white/5 rounded-lg text-right
              shadow-[inset_0_0_9px_rgba(255,255,255,0.2)] 
              border-2 border-white/10 font-Peyda text-primary-1 focus:border-primary-2 focus:border-2 focus:outline-none"
          />
        )
      ) : (
        <div className="w-full pl-2 pr-8 lg:pr-2 py-[0.6rem] bg-white/5 rounded-lg flex items-center 
          justify-end lg:justify-center shadow-[inset_0_0_9px_rgba(255,255,255,0.2)] 
          border-2 border-white/10 font-Peyda text-right text-primary-3">
          {value}
        </div>
      )}
    </div>
  </div>
);

export default Dashboard;