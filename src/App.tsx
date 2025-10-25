import React, { useState, useEffect } from 'react';
import { RefreshCw } from 'lucide-react';

const XiaoLiuRen = () => {
  const [result, setResult] = useState(null);

  // 小六壬六神
  const sixGods = [
    { name: '大安', meaning: '身不动时，五行属木，颜色青色，方位东方。临青龙，谋事主一、五、七。有静止、心安、吉祥之含义。', interpretation: '吉', detail: '凡事安宁，无风无浪，求财有利，婚姻和睦，出行平安。' },
    { name: '留连', meaning: '人未归时，五行属水，颜色黑色，方位北方。临玄武，谋事主二、八、十。有暗昧不明，延迟、纠缠、拖延之含义。', interpretation: '凶', detail: '事有阻碍，凡事难成，求财不利，婚姻有阻，出行迟滞。' },
    { name: '速喜', meaning: '人即至时，五行属火，颜色红色，方位南方。临朱雀，谋事主三、六、九。有快速、喜庆、吉利之含义。', interpretation: '吉', detail: '喜事将至，求财顺利，婚姻美满，出行吉利，万事如意。' },
    { name: '赤口', meaning: '官事凶时，五行属金，颜色白色，方位西方。临白虎，谋事主四、七、十。有不吉、惊恐、凶险之含义。', interpretation: '凶', detail: '口舌是非，破财损物，婚姻不利，出行有险，诸事小心。' },
    { name: '小吉', meaning: '人来喜时，五行属木，临六合，谋事主一、五、七。有和合、吉利之含义。', interpretation: '吉', detail: '小有收获，求财平顺，婚姻可成，出行平安，事半功倍。' },
    { name: '空亡', meaning: '音信稀时，五行属土，颜色黄色，方位中央。临勾陈，谋事主三、六、九。有不吉、无结果、忧虑之含义。', interpretation: '凶', detail: '谋事难成，求财落空，婚姻虚假，出行不宜，希望渺茫。' }
  ];

  // 农历数据（1900-2100年）
  const lunarInfo = [
    0x04bd8,0x04ae0,0x0a570,0x054d5,0x0d260,0x0d950,0x16554,0x056a0,0x09ad0,0x055d2,
    0x04ae0,0x0a5b6,0x0a4d0,0x0d250,0x1d255,0x0b540,0x0d6a0,0x0ada2,0x095b0,0x14977,
    0x04970,0x0a4b0,0x0b4b5,0x06a50,0x06d40,0x1ab54,0x02b60,0x09570,0x052f2,0x04970,
    0x06566,0x0d4a0,0x0ea50,0x06e95,0x05ad0,0x02b60,0x186e3,0x092e0,0x1c8d7,0x0c950,
    0x0d4a0,0x1d8a6,0x0b550,0x056a0,0x1a5b4,0x025d0,0x092d0,0x0d2b2,0x0a950,0x0b557,
    0x06ca0,0x0b550,0x15355,0x04da0,0x0a5b0,0x14573,0x052b0,0x0a9a8,0x0e950,0x06aa0,
    0x0aea6,0x0ab50,0x04b60,0x0aae4,0x0a570,0x05260,0x0f263,0x0d950,0x05b57,0x056a0,
    0x096d0,0x04dd5,0x04ad0,0x0a4d0,0x0d4d4,0x0d250,0x0d558,0x0b540,0x0b6a0,0x195a6,
    0x095b0,0x049b0,0x0a974,0x0a4b0,0x0b27a,0x06a50,0x06d40,0x0af46,0x0ab60,0x09570,
    0x04af5,0x04970,0x064b0,0x074a3,0x0ea50,0x06b58,0x055c0,0x0ab60,0x096d5,0x092e0,
    0x0c960,0x0d954,0x0d4a0,0x0da50,0x07552,0x056a0,0x0abb7,0x025d0,0x092d0,0x0cab5,
    0x0a950,0x0b4a0,0x0baa4,0x0ad50,0x055d9,0x04ba0,0x0a5b0,0x15176,0x052b0,0x0a930,
    0x07954,0x06aa0,0x0ad50,0x05b52,0x04b60,0x0a6e6,0x0a4e0,0x0d260,0x0ea65,0x0d530,
    0x05aa0,0x076a3,0x096d0,0x04afb,0x04ad0,0x0a4d0,0x1d0b6,0x0d250,0x0d520,0x0dd45,
    0x0b5a0,0x056d0,0x055b2,0x049b0,0x0a577,0x0a4b0,0x0aa50,0x1b255,0x06d20,0x0ada0,
    0x14b63,0x09370,0x049f8,0x04970,0x064b0,0x168a6,0x0ea50,0x06b20,0x1a6c4,0x0aae0,
    0x0a2e0,0x0d2e3,0x0c960,0x0d557,0x0d4a0,0x0da50,0x05d55,0x056a0,0x0a6d0,0x055d4,
    0x052d0,0x0a9b8,0x0a950,0x0b4a0,0x0b6a6,0x0ad50,0x055a0,0x0aba4,0x0a5b0,0x052b0,
    0x0b273,0x06930,0x07337,0x06aa0,0x0ad50,0x14b55,0x04b60,0x0a570,0x054e4,0x0d160,
    0x0e968,0x0d520,0x0daa0,0x16aa6,0x056d0,0x04ae0,0x0a9d4,0x0a2d0,0x0d150,0x0f252,
    0x0d520,0x0dd45
  ];

  // 阳历转农历
  const solarToLunar = (date) => {
    const baseDate = new Date(1900, 0, 31);
    let offset = Math.floor((date - baseDate) / 86400000);
    
    let year = 1900;
    let daysInYear = 0;
    
    for (year = 1900; year < 2101 && offset > 0; year++) {
      daysInYear = getLunarYearDays(year);
      offset -= daysInYear;
    }
    
    if (offset < 0) {
      offset += daysInYear;
      year--;
    }
    
    const leapMonth = getLeapMonth(year);
    let isLeap = false;
    
    let month = 1;
    for (month = 1; month < 13 && offset > 0; month++) {
      if (leapMonth > 0 && month === (leapMonth + 1) && !isLeap) {
        month--;
        isLeap = true;
        daysInYear = getLeapDays(year);
      } else {
        daysInYear = getMonthDays(year, month);
      }
      
      if (isLeap && month === (leapMonth + 1)) {
        isLeap = false;
      }
      
      offset -= daysInYear;
    }
    
    if (offset === 0 && leapMonth > 0 && month === leapMonth + 1) {
      if (isLeap) {
        isLeap = false;
      } else {
        isLeap = true;
        month--;
      }
    }
    
    if (offset < 0) {
      offset += daysInYear;
      month--;
    }
    
    const day = offset + 1;
    
    return { year, month, day, isLeap };
  };

  // 获取农历年天数
  const getLunarYearDays = (year) => {
    let sum = 348;
    for (let i = 0x8000; i > 0x8; i >>= 1) {
      sum += (lunarInfo[year - 1900] & i) ? 1 : 0;
    }
    return sum + getLeapDays(year);
  };

  // 获取闰月天数
  const getLeapDays = (year) => {
    if (getLeapMonth(year)) {
      return (lunarInfo[year - 1900] & 0x10000) ? 30 : 29;
    }
    return 0;
  };

  // 获取闰月月份
  const getLeapMonth = (year) => {
    return lunarInfo[year - 1900] & 0xf;
  };

  // 获取农历月天数
  const getMonthDays = (year, month) => {
    return (lunarInfo[year - 1900] & (0x10000 >> month)) ? 30 : 29;
  };

  // 计算小六壬
  const calculateXiaoLiuRen = () => {
    const now = new Date();
    const lunar = solarToLunar(now);
    const hour = now.getHours();
    
    // 时辰转换（子时0-1点为0，丑时1-3点为1，以此类推）
    const shiChen = Math.floor((hour + 1) % 24 / 2);
    
    // 小六壬算法：月份+日期+时辰，除以6取余数
    // 第一课（月将）：农历月份落宫
    let firstCourse = lunar.month % 6 - 1;
    if (firstCourse < 0) firstCourse += 6;
    
    // 第二课（日辰）：农历月份+农历日期
    let secondCourse = (firstCourse + lunar.day) % 6 - 1;
    if (secondCourse < 0) secondCourse += 6;
    
    // 第三课（时辰）：农历月份+农历日期+时辰
    let thirdCourse = (secondCourse + shiChen) % 6;
    if (thirdCourse < 0) thirdCourse += 6;
    
    return {
      time: now,
      solar: {
        year: now.getFullYear(),
        month: now.getMonth() + 1,
        day: now.getDate()
      },
      lunar,
      hour,
      shiChen,
      firstCourse: sixGods[firstCourse],
      secondCourse: sixGods[secondCourse],
      thirdCourse: sixGods[thirdCourse],
      courses: [firstCourse, secondCourse, thirdCourse]
    };
  };

  // 时辰名称
  const getShiChenName = (hour) => {
    const shiChens = ['子时', '丑时', '寅时', '卯时', '辰时', '巳时', '午时', '未时', '申时', '酉时', '戌时', '亥时'];
    return shiChens[Math.floor((hour + 1) % 24 / 2)];
  };

  // 综合判断
  const getOverallReading = (courses) => {
    const [first, second, third] = courses;
    
    // 三课全吉
    if ([0, 2, 4].includes(first) && [0, 2, 4].includes(second) && [0, 2, 4].includes(third)) {
      return { status: '大吉', message: '三课皆吉，诸事顺遂，求谋必成，万事大吉。' };
    }
    // 三课全凶
    if ([1, 3, 5].includes(first) && [1, 3, 5].includes(second) && [1, 3, 5].includes(third)) {
      return { status: '大凶', message: '三课皆凶，诸事不利，宜守不宜动，静待时机。' };
    }
    // 两吉一凶
    const jiCount = [first, second, third].filter(c => [0, 2, 4].includes(c)).length;
    if (jiCount === 2) {
      return { status: '中吉', message: '吉多凶少，虽有阻碍，但终能成功，需耐心应对。' };
    }
    // 两凶一吉
    if (jiCount === 1) {
      return { status: '中凶', message: '凶多吉少，困难重重，需谨慎行事，不可冒进。' };
    }
    return { status: '平', message: '吉凶参半，事有变化，随机应变，顺势而为。' };
  };

  useEffect(() => {
    performDivination();
  }, []);

  const performDivination = () => {
    const res = calculateXiaoLiuRen();
    setResult(res);
  };

  if (!result) return null;

  const overall = getOverallReading(result.courses);

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* 标题 */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-red-800 mb-2">小六壬占卜</h1>
          <p className="text-gray-600">诸葛孔明马前课·即时占卜</p>
        </div>

        {/* 时间信息 */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="text-center">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">占卜时刻</h2>
            <div className="grid grid-cols-2 gap-4 text-lg">
              <div className="bg-amber-50 p-3 rounded">
                <div className="text-gray-600 text-sm mb-1">阳历</div>
                <div className="font-medium">{result.solar.year}年{result.solar.month}月{result.solar.day}日</div>
              </div>
              <div className="bg-red-50 p-3 rounded">
                <div className="text-gray-600 text-sm mb-1">农历</div>
                <div className="font-medium text-red-700">
                  {result.lunar.year}年{result.lunar.isLeap ? '闰' : ''}{result.lunar.month}月{result.lunar.day}日
                </div>
              </div>
            </div>
            <div className="mt-4 bg-orange-50 p-3 rounded">
              <span className="text-gray-600">时辰：</span>
              <span className="font-medium text-orange-700">{getShiChenName(result.hour)} ({result.hour}时)</span>
            </div>
          </div>
        </div>

        {/* 三课结果 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {/* 第一课 */}
          <div className="bg-white rounded-lg shadow-lg p-5">
            <div className="text-center mb-3">
              <div className="text-sm text-gray-500 mb-2">第一课·月将</div>
              <div className="text-3xl font-bold text-red-700 mb-2">{result.firstCourse.name}</div>
              <div className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                result.firstCourse.interpretation === '吉' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
              }`}>
                {result.firstCourse.interpretation}
              </div>
            </div>
            <div className="text-sm text-gray-600 leading-relaxed">
              <p className="mb-2">{result.firstCourse.meaning}</p>
              <p className="text-gray-800 font-medium">{result.firstCourse.detail}</p>
            </div>
          </div>

          {/* 第二课 */}
          <div className="bg-white rounded-lg shadow-lg p-5">
            <div className="text-center mb-3">
              <div className="text-sm text-gray-500 mb-2">第二课·日辰</div>
              <div className="text-3xl font-bold text-red-700 mb-2">{result.secondCourse.name}</div>
              <div className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                result.secondCourse.interpretation === '吉' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
              }`}>
                {result.secondCourse.interpretation}
              </div>
            </div>
            <div className="text-sm text-gray-600 leading-relaxed">
              <p className="mb-2">{result.secondCourse.meaning}</p>
              <p className="text-gray-800 font-medium">{result.secondCourse.detail}</p>
            </div>
          </div>

          {/* 第三课 */}
          <div className="bg-white rounded-lg shadow-lg p-5">
            <div className="text-center mb-3">
              <div className="text-sm text-gray-500 mb-2">第三课·时辰</div>
              <div className="text-3xl font-bold text-red-700 mb-2">{result.thirdCourse.name}</div>
              <div className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                result.thirdCourse.interpretation === '吉' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
              }`}>
                {result.thirdCourse.interpretation}
              </div>
            </div>
            <div className="text-sm text-gray-600 leading-relaxed">
              <p className="mb-2">{result.thirdCourse.meaning}</p>
              <p className="text-gray-800 font-medium">{result.thirdCourse.detail}</p>
            </div>
          </div>
        </div>

        {/* 综合判断 */}
        <div className="bg-gradient-to-r from-red-700 to-orange-600 rounded-lg shadow-lg p-6 text-white mb-6">
          <h2 className="text-2xl font-bold text-center mb-4">综合断语</h2>
          <div className="text-center">
            <div className="text-4xl font-bold mb-3">{overall.status}</div>
            <p className="text-lg leading-relaxed">{overall.message}</p>
          </div>
        </div>

        {/* 重新占卜按钮 */}
        <div className="text-center">
          <button
            onClick={performDivination}
            className="bg-red-700 hover:bg-red-800 text-white font-medium py-3 px-8 rounded-lg shadow-lg transition-colors duration-200 flex items-center gap-2 mx-auto"
          >
            <RefreshCw size={20} />
            重新占卜
          </button>
        </div>

        {/* 说明 */}
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>小六壬为民间流传的简易占卜法，采用农历计算</p>
          <p className="mt-1">仅供娱乐参考，诸事仍需理性判断，切勿过分迷信</p>
        </div>
      </div>
    </div>
  );
};

export default XiaoLiuRen;
