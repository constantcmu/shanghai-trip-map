/**
 * Shanghai + Suzhou Plan B Master Trip Data (6–11 Dec 2026)
 * Extensible data-driven module for index.html
 * Assigning window.TRIP_DATA
 */
window.TRIP_DATA = {
  meta: {
    title: 'Shanghai Plan B Master Map',
    subtitle: 'ทริปเซี่ยงไฮ้ + ซูโจว (Plan B)',
    dates: '6–11 ธ.ค. 2569',
    datesEn: '6–11 Dec 2026',
    hotel: {
      id: 'hotel',
      name: 'ผู่จิงเว่ยถิง โฮเทล / Pujing Weiting Hotel',
      cn: '浦境威廷酒店 · 上海市黄浦区新闸路219号',
      address: 'Xinzha Rd 219, Huangpu District',
      metro: 'Metro Line 1 สถานี Xinzha Rd (新闸路)',
      lat: 31.2385,
      lng: 121.4660
    }
  },

  zones: {
    z1: {
      id: 'z1',
      name: '📍 โซน 1: The Bund & East Nanjing',
      shortName: 'โซน 1: The Bund & East Nanjing',
      color: '#0284c7'
    },
    z2: {
      id: 'z2',
      name: '📍 โซน 2: Lujiazui & North Bund',
      shortName: 'โซน 2: Lujiazui & North Bund',
      color: '#0d9488'
    },
    z3: {
      id: 'z3',
      name: '📍 โซน 3: West Nanjing & Jing\'an',
      shortName: 'โซน 3: West Nanjing & Jing\'an',
      color: '#d97706'
    },
    z4: {
      id: 'z4',
      name: '📍 โซน 4: French Concession & Xintiandi',
      shortName: 'โซน 4: French Concession & Xintiandi',
      color: '#9333ea'
    },
    z5: {
      id: 'z5',
      name: '📍 โซน 5: Expo & วัดโซนใต้ (+ Suzhou Day Trip hub)',
      shortName: 'โซน 5: Expo & วัดโซนใต้ / ซูโจว',
      color: '#e11d48'
    },
    z6: {
      id: 'z6',
      name: '📍 โซน 6: Disney Resort',
      shortName: 'โซน 6: Disney Resort',
      color: '#10b981'
    }
  },

  transitStyles: {
    walk:   { label: 'เดินเท้า', color: '#059669', dash: '5,6', weight: 3.5 },
    L1:     { label: 'Metro Line 1', color: '#E4002B', weight: 4 },
    L2:     { label: 'Metro Line 2', color: '#97D700', weight: 4 },
    L7:     { label: 'Metro Line 7', color: '#FF6900', weight: 4 },
    L8:     { label: 'Metro Line 8', color: '#009EDB', weight: 4 },
    L10:    { label: 'Metro Line 10', color: '#C1A7E2', weight: 4 },
    L11:    { label: 'Metro Line 11', color: '#76232F', weight: 4 },
    L12:    { label: 'Metro Line 12', color: '#007B5F', weight: 4 },
    L13:    { label: 'Metro Line 13', color: '#EF95CF', weight: 4 },
    L14:    { label: 'Metro Line 14', color: '#827A04', weight: 4 },
    maglev: { label: 'Maglev (430 km/h)', color: '#008B95', weight: 4.5 },
    crh:    { label: 'รถไฟ CRH (ไป-กลับ ซูโจว)', color: '#1D4ED8', dash: '10,6', weight: 4 },
    didi:   { label: 'DiDi / แท็กซี่', color: '#D97706', dash: '6,6', weight: 3.5 }
  },

  places: [
    // --- Hubs & Transit ---
    {
      id: 'hotel',
      name: '🏨 ผู่จิงเว่ยถิง โฮเทล (โรงแรมฐาน)',
      cn: '浦境威廷酒店 · 上海市黄浦区新闸路219号',
      zone: 'z1',
      day: 'd1',
      timeSlot: 'ฐานที่พัก (6–11 ธ.ค.)',
      lat: 31.2385,
      lng: 121.4660,
      metro: 'Metro Line 1 สถานี Xinzha Rd (新闸路) เดิน 3 นาที',
      note: 'โรงแรมฐานตลอดทริป เช็กอิน 6 ธ.ค. ~21:30 น. / เช็กเอาท์ 11 ธ.ค. 04:45 น. (เผื่อเวลา +30 นาที เรียก DiDi ไป PVG)',
      img: null
    },
    {
      id: 'pvg',
      name: '✈️ สนามบินผู่ตง (PVG Terminal 1)',
      cn: '上海浦东国际机场 T1',
      zone: 'z6',
      day: 'd1',
      timeSlot: 'ขาไป 20:45 น. / ขากลับ 08:30 น.',
      lat: 31.1443,
      lng: 121.8083,
      metro: 'Maglev (8 นาทีถึง Longyang Rd) + Line 2/1 หรือ DiDi ~50 นาที',
      note: 'ขาไปถึง 6 ธ.ค. 20:45 น. (แนะนำ DiDi เพราะมีกระเป๋าใหญ่) / ขากลับ 11 ธ.ค. ออก 04:45 น. ถึงสนามบิน ~05:45 น. (เผื่อล่วงหน้าก่อนบิน 2 ชม. 45 น.)',
      img: null
    },
    {
      id: 'sh_station',
      name: '🚄 สถานีรถไฟ Shanghai Railway Station',
      cn: '上海站',
      zone: 'z5',
      day: 'd4',
      timeSlot: 'ถึง 07:20 น. (รถออก 08:00 น.) & กลับถึง ~15:55 น.',
      lat: 31.2494,
      lng: 121.4557,
      metro: 'Metro Line 1 (2 ป้ายจาก Xinzha Rd ~6 นาที)',
      note: 'จุดขึ้น-ลงรถไฟ CRH ไป-กลับซูโจว (ต้องถึงสถานีก่อนรถออกอย่างน้อย 30 นาที: ขาไปถึง 07:20 น. รถออก 08:00 น. / ขากลับถึงสถานีซูโจว 14:50 น. รถออก 15:20 น.)',
      img: null
    },
    {
      id: 'suzhou_garden',
      name: '🏯 ซูโจว: สวนจัวเจิ้งหยวน (Humble Administrator\'s Garden)',
      cn: '苏州 · 拙政园',
      zone: 'z5',
      day: 'd4',
      timeSlot: '08:45–10:15 น.',
      lat: 31.3242,
      lng: 120.6295,
      metro: 'CRH รอบ 08:00 น. (ถึง Suzhou ~08:30 น.) แล้วต่อ DiDi ~10 นาที หรือ Metro Line 6',
      note: '1 ใน 4 สวนคลาสสิกมรดกโลกของจีน ค่าเข้า ~70–80 หยวน (แนะนำจองล่วงหน้าผ่าน WeChat/Trip.com)',
      img: 'place_images/suzhou_humble_garden.jpg'
    },
    {
      id: 'suzhou_pingjiang',
      name: '🏮 ซูโจว: ถนนผิงเจียง (Pingjiang Road)',
      cn: '苏州 · 平江路',
      zone: 'z5',
      day: 'd4',
      timeSlot: '10:20–11:40 น.',
      lat: 31.3145,
      lng: 120.6345,
      metro: 'เดินต่อจากสวนจัวเจิ้งหยวน ~10 นาที (หรือ Metro Line 1 สถานี Xiangmen)',
      note: 'ถนนโบราณเลียบคลองอายุกว่า 800 ปี ถ่ายรูปกำแพงแมว โคมแดง และคาเฟ่ริมคลอง (เดินชมฟรี)',
      img: 'place_images/suzhou_pingjiang.jpg'
    },
    {
      id: 'suzhou_shantang',
      name: '🛶 ซูโจว: ถนนซานถัง (Shantang Street)',
      cn: '苏州 · 七里山塘',
      zone: 'z5',
      day: 'd4',
      timeSlot: '11:55–13:15 น.',
      lat: 31.3183,
      lng: 120.6063,
      metro: 'DiDi ~15 นาทีจาก Pingjiang Rd หรือ Metro Line 2 สถานี Shantang Street',
      note: 'ย่านคลองเก่า 7 ลี้สุดคลาสสิก แวะทานมื้อเที่ยงและถ่ายรูปสะพานโค้ง/เรือพาย (เดินชมฟรี, ล่องเรือ ~45–50 หยวน)',
      img: 'place_images/suzhou_shantang.jpg'
    },
    {
      id: 'suzhou_jinji_lake',
      name: '🌊 ซูโจว: ทะเลสาบจินจี (Jinji Lake)',
      cn: '苏州 · 金鸡湖',
      zone: 'z5',
      day: 'd4',
      timeSlot: '13:30–14:00 น.',
      lat: 31.3208,
      lng: 120.7025,
      metro: 'DiDi ~25 นาที หรือ Metro Line 1 สถานี Culture & Expo Center / Moon Harbor',
      note: 'แลนด์มาร์กโซนเมืองใหม่ Suzhou Industrial Park ชมวิวตึก Gate of the Orient ริมทะเลสาบ (เข้าชมฟรี)',
      img: 'place_images/suzhou_jinji_lake.jpg'
    },
    {
      id: 'suzhou_eye',
      name: '🎡 ซูโจว: ชิงช้าสวรรค์ Suzhou Eye',
      cn: '苏州之眼摩天轮',
      zone: 'z5',
      day: 'd4',
      timeSlot: '14:00–14:30 น.',
      lat: 31.3143,
      lng: 120.7127,
      metro: 'เดินเลียบทะเลสาบจินจีฝั่งตะวันออก ~10 นาที (ใกล้สถานี Culture & Expo Center)',
      note: 'ชิงช้าสวรรค์ริมทะเลสาบจินจี ถ่ายรูปแคปซูลชมวิวพาโนรามา (ขึ้นชิงช้าสวรรค์มีค่าตั๋ว ~120–150 หยวน / ถ่ายรูปด้านนอกฟรี)',
      img: 'place_images/suzhou_eye_ferris.jpg'
    },

    // --- Day 2: French Concession, Temples & West Nanjing (Mon 7 Dec) ---
    {
      id: 'dingtele',
      name: '🍜 Dingtele Congee & Noodles (มิชลิน)',
      cn: '顶特勒粥面馆 · 淮海中路494弄22号',
      zone: 'z4',
      day: 'd2',
      timeSlot: '09:00 น. (มื้อเช้า)',
      lat: 31.2194,
      lng: 121.4615,
      metro: 'Metro Line 1 / 10 / 12 สถานี South Shaanxi Rd ทางออก 2 เดิน 5 นาที',
      note: 'ร้านโจ๊กและบะหมี่รางวัลมิชลิน เมนูเด็ดคือบะหมี่หมูกรอบน้ำซุปเหลืองและโจ๊กไข่เยี่ยวม้า',
      img: 'place_images/dingtele.jpg'
    },
    {
      id: 'wukang',
      name: '🏛️ ตึกอู๋คัง (Wukang Mansion)',
      cn: '武康大楼',
      zone: 'z4',
      day: 'd2',
      timeSlot: '10:15 น.',
      lat: 31.2044,
      lng: 121.4384,
      metro: 'Metro Line 10 / 11 สถานี Jiaotong University ทางออก 7',
      note: 'แลนด์มาร์กตึกหัวเรือย่านเขตเช่าฝรั่งเศส ถ่ายรูปมุมยอดฮิตหัวมุมถนน Huaihai & Wukang',
      img: null
    },
    {
      id: 'anfu',
      name: '🌿 ถนนอันฝู (Anfu Road)',
      cn: '安福路',
      zone: 'z4',
      day: 'd2',
      timeSlot: '11:15 น.',
      lat: 31.2137,
      lng: 121.4427,
      metro: 'Metro Line 1 / 7 สถานี Changshu Rd ทางออก 8 (หรือเดินต่อจากตึกอู๋คังตามถนน Wukang Rd)',
      note: 'ถนนคาเฟ่และร้านไลฟ์สไตล์สุดชิค แวะ Wiggle Wiggle, 13DE MARZO, BM และร้านกาแฟใต้ร่มไม้',
      img: null
    },
    {
      id: 'jingan',
      name: '🛕 วัดจิ้งอัน (Jing\'an Temple)',
      cn: '静安寺',
      zone: 'z3',
      day: 'd2',
      timeSlot: '12:45 น.',
      lat: 31.2233,
      lng: 121.4454,
      metro: 'Metro Line 2 / 7 / 14 สถานี Jing\'an Temple ทางออก 1 หรือ 2',
      note: 'วัดทองคำใจกลางย่านธุรกิจเซี่ยงไฮ้ ค่าเข้า 50 หยวน (ถ่ายรูปมุมสะพานลอยหน้าวัดสวยมาก)',
      img: 'place_images/ex_jingan_temple.jpg'
    },
    {
      id: 'longhua',
      name: '🛕 วัดหลงหัว (Longhua Temple)',
      cn: '龙华古寺',
      zone: 'z5',
      day: 'd2',
      timeSlot: '14:15 น.',
      lat: 31.1749,
      lng: 121.4518,
      metro: 'Metro Line 11 / 12 สถานี Longhua ทางออก 2',
      note: 'วัดเก่าแก่ที่สุดในเซี่ยงไฮ้ (อายุกว่า 1,700 ปี) มีเจดีย์หลงหัว 7 ชั้นและบะหมี่เจขึ้นชื่อ',
      img: 'place_images/ex_longhua_temple.jpg'
    },
    {
      id: 'xintiandi',
      name: '🧱 ซินเทียนตี้ (Xintiandi)',
      cn: '新天地',
      zone: 'z4',
      day: 'd2',
      timeSlot: '16:00 น.',
      lat: 31.2188,
      lng: 121.4748,
      metro: 'Metro Line 10 / 13 สถานี Site of the First CPC · Xintiandi',
      note: 'ย่านบ้านอิฐสือคู่เหมิน (Shikumen) ผสมผสานร้านอาหาร คาเฟ่ และช้อปปิ้งสุดหรู',
      img: 'place_images/ex_xintiandi.jpg'
    },
    {
      id: 'matcha_wang',
      name: '🍵 Matcha Wang (HAI550)',
      cn: '抹茶王 · 淮海中路550号 HAI550',
      zone: 'z4',
      day: 'd2',
      timeSlot: '17:15 น.',
      lat: 31.2202,
      lng: 121.4648,
      metro: 'Metro Line 13 สถานี Middle Huaihai Rd ทางออก 1 (ห้าง HAI550 ชั้น 1)',
      note: 'ร้านมัทฉะพรีเมียมเข้มข้นสายชาเขียวห้ามพลาด เดินต่อจาก Xintiandi ได้เลย',
      img: 'place_images/matcha_wang.jpg'
    },
    {
      id: 'nanjing_w',
      name: '🛍️ ถนนนานจิงตะวันตก (West Nanjing Rd)',
      cn: '南京西路 · 张园',
      zone: 'z3',
      day: 'd2',
      timeSlot: '18:00 น.',
      lat: 31.2297,
      lng: 121.4601,
      metro: 'Metro Line 2 / 12 / 13 สถานี West Nanjing Rd',
      note: 'ย่านช้อปปิ้งแบรนด์เนมและคอมมูนิตี้มอลล์ รวมโซนตึกเก่า Zhang Yuan (张园) ฝั่งตรงข้าม',
      img: 'place_images/ex_zhang_yuan.jpg'
    },
    {
      id: 'starbucks_r',
      name: '☕ Starbucks Reserve Roastery Shanghai',
      cn: '星巴克臻选上海烘焙工坊',
      zone: 'z3',
      day: 'd2',
      timeSlot: '18:30 น.',
      lat: 31.2300,
      lng: 121.4611,
      metro: 'Metro Line 2 / 12 / 13 สถานี West Nanjing Rd ทางออก 11',
      note: 'สาขาโรงคั่วกาแฟขนาดใหญ่ระดับโลก มีมุมเบเกอรี่ Princi และเครื่องดื่มเฉพาะสาขา',
      img: 'place_images/ex_starbucks_roastery.jpg'
    },
    {
      id: 'longtago',
      name: '🍢 ปิ้งย่างเตาหมุน Longtago (818 Plaza B1)',
      cn: '很久以前羊肉串 (818广场 B1)',
      zone: 'z3',
      day: 'd2',
      timeSlot: '19:30 น. (มื้อเย็น)',
      lat: 31.2294,
      lng: 121.4598,
      metro: 'Metro Line 2 / 12 / 13 สถานี West Nanjing Rd (ห้าง Mall 818 Plaza ชั้น B1)',
      note: 'ปิ้งย่างเนื้อแกะ/เนื้อวัวเตาหมุนอัตโนมัติ แนะนำกดจองคิวล่วงหน้าผ่าน WeChat ก่อนถึงร้าน',
      img: null
    },

    // --- Day 3: Shanghai Disney Resort (Tue 8 Dec) ---
    {
      id: 'disney',
      name: '🎢 Shanghai Disney Resort',
      cn: '上海迪士尼度假区',
      zone: 'z6',
      day: 'd3',
      timeSlot: '08:15–20:30 น. (ทั้งวัน)',
      lat: 31.1440,
      lng: 121.6618,
      metro: 'Metro Line 1 → Xujiahui ต่อ Line 11 สุดสายสถานี Disney Resort (~55 นาที)',
      note: 'ล็อกวันอังคารที่ 8 ธ.ค. คนน้อยกว่าวันหยุด! โซนแนะนำ: Zootopia, TRON, Pirates of the Caribbean และชมพลุหน้าปราสาท',
      img: null
    },
    {
      id: 'disney_sichuan',
      name: '🐟 ปลาต้มผักกาดดอง Disneytown',
      cn: '巷子宽川菜 · 迪士尼小镇',
      zone: 'z6',
      day: 'd3',
      timeSlot: '19:00 น. (มื้อเย็น)',
      lat: 31.1401,
      lng: 121.6614,
      metro: 'เดินออกจากสวนสนุกเข้าโซน Disneytown (~8 นาที)',
      note: 'ร้านอาหารเสฉวนใน Disneytown เมนูปลาต้มผักกาดดองร้อนๆ เติมพลังหลังเดินสวนสนุกทั้งวัน',
      img: 'place_images/sichuan_fish_disney.jpg'
    },

    // --- Day 4: Suzhou + Rockbund Christmas & The Bund (Wed 9 Dec) ---
    {
      id: 'christmas_rockbund',
      name: '🎄 Shanghai Christmas Market @ Rockbund',
      cn: '外滩源德国圣诞集市',
      zone: 'z1',
      day: 'd4',
      timeSlot: '16:15 น.',
      lat: 31.2426,
      lng: 121.4881,
      metro: 'Metro Line 2 / 10 สถานี East Nanjing Rd ทางออก 6 หรือ Line 12 Tiantong Rd',
      note: 'ตลาดคริสต์มาสสไตล์เยอรมันสุดคึกคักหน้าโบสถ์ Union Church จุดเช็กอินไฮไลต์ช่วง ธ.ค.',
      img: 'place_images/shanghai_christmas_rockbund.jpg'
    },
    {
      id: 'rock_bund',
      name: '🏛️ ร็อกบันด์ (Rockbund)',
      cn: '洛克·外滩源',
      zone: 'z1',
      day: 'd4',
      timeSlot: '17:15 น.',
      lat: 31.2422,
      lng: 121.4874,
      metro: 'Metro Line 2 / 10 สถานี East Nanjing Rd ทางออก 6 เดินขึ้นเหนือ 500 ม.',
      note: 'กลุ่มตึกประวัติศาสตร์ต้นกำเนิดเดอะบันด์ บรรยากาศยุโรปคลาสสิกและแกลเลอรีศิลปะ',
      img: null
    },
    {
      id: 'bund',
      name: '🌃 หาดไว่ทาน / เดอะบันด์ (The Bund)',
      cn: '外滩',
      zone: 'z1',
      day: 'd4',
      timeSlot: '18:00 น. (เปิดไฟ)',
      lat: 31.2395,
      lng: 121.4901,
      metro: 'Metro Line 2 / 10 สถานี East Nanjing Rd ทางออก 2 เดินตรงสุดถนน',
      note: 'ชมวิวเปิดไฟตึกระฟ้าฝั่งผู่ตงและหอไข่มุกเวลา 18:00 น. ตรง พร้อมแนวตึกยุโรปฝั่งผู่ซี',
      img: 'place_images/ex_the_bund.jpg'
    },
    {
      id: 'nanjing_e',
      name: '🚶 ถนนคนเดินนานจิง (East Nanjing Rd)',
      cn: '南京东路步行街',
      zone: 'z1',
      day: 'd4',
      timeSlot: '19:00 น.',
      lat: 31.2368,
      lng: 121.4810,
      metro: 'Metro Line 1 / 2 / 8 People\'s Square หรือ Line 2 / 10 East Nanjing Rd',
      note: 'ถนนช้อปปิ้งสายหลักใจกลางเมือง แวะ POP MART Flagship, M&M\'s World และตึกไฟนีออน',
      img: null
    },
    {
      id: 'feidachu',
      name: '🌶️ Fei Da Chu หมูผัดพริกหยวก',
      cn: '费大厨辣椒炒肉 · 悦荟广场',
      zone: 'z1',
      day: 'd4',
      timeSlot: '19:30 น. (มื้อเย็น)',
      lat: 31.2374,
      lng: 121.4828,
      metro: 'Metro Line 2 / 10 สถานี East Nanjing Rd ทางออก 2 (Mosaic Mall)',
      note: 'หมูผัดพริกหยวกสไตล์หูหนานชื่อดัง เสิร์ฟพร้อมข้าวหม้อหุงร้อนๆ หอมอร่อยมาก',
      img: 'place_images/fei_da_chu.jpg'
    },
    {
      id: 'gangyuji',
      name: '🦆 Gangyuji (เป็ด/ห่านย่างมิชลิน)',
      cn: '港裕记 · 外滩中央广场 3F',
      zone: 'z1',
      day: 'd4',
      timeSlot: '20:30 น.',
      lat: 31.2377,
      lng: 121.4874,
      metro: 'Metro Line 2 / 10 สถานี East Nanjing Rd (อาคาร Bund Central ชั้น 3)',
      note: 'ร้านอาหารกวางตุ้ง-เซี่ยงไฮ้ระดับมิชลิน โดดเด่นเรื่องเป็ดย่างและห่านย่างหนังกรอบ',
      img: null
    },

    // --- Day 5: Museums, Lujiazui, North Bund, Yuyuan & Food Finale (Thu 10 Dec) ---
    {
      id: 'lailai',
      name: '🥟 Lai Lai Xiao Long (มิชลินเสี่ยวหลงเปาปู)',
      cn: '莱莱小笼 · 天津路506号',
      zone: 'z1',
      day: 'd5',
      timeSlot: '08:45 น. (มื้อเช้า)',
      lat: 31.2367,
      lng: 121.4806,
      metro: 'Metro Line 1 / 2 / 8 สถานี People\'s Square ทางออก 14 ถนน Tianjin Rd',
      note: 'เสี่ยวหลงเปาไส้หมูผสมมันปูระดับ Michelin Bib Gourmand แนะนำไปเช้าๆ เพื่อเลี่ยงคิวยาว',
      img: null
    },
    {
      id: 'natural_hist',
      name: '🦕 พิพิธภัณฑ์ธรรมชาติวิทยา (Natural History Museum)',
      cn: '上海自然博物馆',
      zone: 'z3',
      day: 'd5',
      timeSlot: '10:00 น.',
      lat: 31.2362,
      lng: 121.4628,
      metro: 'Metro Line 13 สถานี Natural History Museum ทางออก 2 (เดินจากโรงแรม 10 นาที)',
      note: 'พิพิธภัณฑ์ขนาดใหญ่ทันสมัย ชมโครงกระดูกไดโนเสาร์และโซนธรรมชาติ (ปิดวันจันทร์)',
      img: null
    },
    {
      id: '1000trees',
      name: '🌳 ตึกต้นไม้พันต้น (Tian An 1,000 Trees)',
      cn: '天安·千树',
      zone: 'z3',
      day: 'd5',
      timeSlot: '11:30 น.',
      lat: 31.2463,
      lng: 121.4422,
      metro: 'Metro Line 13 สถานี Jiangning Rd ทางออก 1 เดิน 500 ม.',
      note: 'สถาปัตยกรรมภูเขาต้นไม้พันต้นริมคลองซูโจว ถ่ายรูปมุมสะพาน Changhua Rd Bridge สวยที่สุด',
      img: null
    },
    {
      id: 'china_art',
      name: '🏮 พิพิธภัณฑ์ศิลปะจีน (China Art Museum)',
      cn: '中华艺术宫',
      zone: 'z5',
      day: 'd5',
      timeSlot: '13:00 น.',
      lat: 31.1852,
      lng: 121.4941,
      metro: 'Metro Line 8 สถานี China Art Museum ทางออก 3 (ปิดวันจันทร์)',
      note: 'อดีต China Pavilion งาน World Expo อาคารทรงมงกุฎสีแดงขนาดมหึมา เข้าชมฟรี (จองคิวหน้างาน/WeChat)',
      img: null
    },
    {
      id: 'map_pudong',
      name: '🖼️ Museum of Art Pudong (MAP)',
      cn: '浦东美术馆 · 滨江大道2777号',
      zone: 'z2',
      day: 'd5',
      timeSlot: '14:45 น.',
      lat: 31.2381,
      lng: 121.4963,
      metro: 'Metro Line 2 / 14 สถานี Lujiazui ทางออก 2 เดิน 5–10 นาที',
      note: 'พิพิธภัณฑ์ศิลปะร่วมสมัยริมแม่น้ำหวงผู่ จุดถ่ายรูปกระจกบานยักษ์สะท้อนวิวฝั่งเดอะบันด์',
      img: 'place_images/museum_of_art_pudong.jpg'
    },
    {
      id: 'mingzhu',
      name: '🗼 วงเวียนหมิงจู (Mingzhu Roundabout)',
      cn: '明珠环岛',
      zone: 'z2',
      day: 'd5',
      timeSlot: '16:15 น.',
      lat: 31.2397,
      lng: 121.4998,
      metro: 'Metro Line 2 / 14 สถานี Lujiazui ทางออก 1 หรือ 2',
      note: 'สกายวอล์กวงเวียนใจกลางลู่เจียจุ่ย จุดถ่ายรูปคู่หอไข่มุกและกลุ่มตึกระฟ้าสามพี่น้อง',
      img: null
    },
    {
      id: 'disney_ljz',
      name: '🏰 Disney Store สาขา Lujiazui',
      cn: '迪士尼旗舰店 (陆家嘴)',
      zone: 'z2',
      day: 'd5',
      timeSlot: '16:45 น.',
      lat: 31.2385,
      lng: 121.4995,
      metro: 'Metro Line 2 / 14 สถานี Lujiazui ติดวงเวียนหมิงจู',
      note: 'สาขาแฟลกชิปใหญ่ที่สุดในเอเชีย (ไม่ต้องใช้ตั๋วสวนสนุก) เก็บของฝากดิสนีย์ที่พลาดจากวันอังคาร',
      img: null
    },
    {
      id: 'holiland',
      name: '🚀 Holiland Travel (ธีมสถานีอวกาศ)',
      cn: '好利来 · 正大广场 1F',
      zone: 'z2',
      day: 'd5',
      timeSlot: '17:15 น.',
      lat: 31.2372,
      lng: 121.4989,
      metro: 'Metro Line 2 / 14 สถานี Lujiazui ชั้น 1 ห้าง Super Brand Mall',
      note: 'ร้านเบเกอรี่ตกแต่งธีมสถานีอวกาศสุดล้ำ ชีสเค้กกึ่งสุก (Half-baked Cheesecake) เป็นของฝากยอดฮิต',
      img: null
    },
    {
      id: 'north_bund',
      name: '🌅 สวนนอร์ทบันด์ (North Bund Garden)',
      cn: '北外滩滨江绿地',
      zone: 'z2',
      day: 'd5',
      timeSlot: '17:50 น. (ชมไฟพลบค่ำ)',
      lat: 31.2475,
      lng: 121.4995,
      metro: 'Metro Line 12 สถานี Int\'l Cruise Terminal ทางออก 3 เดิน 450 ม.',
      note: 'จุดถ่ายรูปโดมเงิน "หยดน้ำสีเงิน" คู่ฉากหลังหอไข่มุกและเส้นขอบฟ้าผู่ตงแบบพาโนรามา',
      img: null
    },
    {
      id: 'bund_bull',
      name: '🐂 รูปปั้นกระทิงเดอะบันด์ (The Bund Bull)',
      cn: '外滩牛',
      zone: 'z1',
      day: 'd5',
      timeSlot: '18:45 น.',
      lat: 31.2328,
      lng: 121.4909,
      metro: 'Metro Line 10 / 14 สถานี Yu Garden ทางออก 1 เดินไปริมน้ำ',
      note: 'รูปปั้นกระทิงทองแดงสุดขลังย่านการเงินเดอะบันด์ตอนใต้ ใกล้ท่าเรือข้ามฟาก',
      img: null
    },
    {
      id: 'yuyuan',
      name: '🏮 ถนนคนเดินอวี้หยวน (Yuyuan Old Street)',
      cn: '豫园老街',
      zone: 'z1',
      day: 'd5',
      timeSlot: '19:15 น.',
      lat: 31.2272,
      lng: 121.4921,
      metro: 'Metro Line 10 / 14 สถานี Yu Garden ทางออก 1 เดิน 300 ม.',
      note: 'ตลาดเมืองเก่าสถาปัตยกรรมจีนโบราณเปิดไฟสีทองอร่ามยามค่ำคืน เดินชมสะพานเก้าโค้ง',
      img: 'place_images/ex_yuyuan_old_street.jpg'
    },
    {
      id: 'taotaoju',
      name: '🥟 Tao Tao Ju ติ่มซัม',
      cn: '陶陶居 · 新世界城 7F',
      zone: 'z1',
      day: 'd5',
      timeSlot: '20:15 น. (มื้อค่ำ)',
      lat: 31.2348,
      lng: 121.4738,
      metro: 'Metro Line 1 / 2 / 8 สถานี People\'s Square (ห้าง New World City ชั้น 7)',
      note: 'ติ่มซัมกวางตุ้งระดับตำนาน ฮะเก๋ากุ้งตัวโตและหมูกรอบขึ้นชื่อ',
      img: 'place_images/tao_tao_ju.jpg'
    },
    {
      id: 'xiesanbao',
      name: '🦀 Xie San Bao บะหมี่มันปู',
      cn: '蟹叁宝 · 南京东路',
      zone: 'z1',
      day: 'd5',
      timeSlot: '21:00 น.',
      lat: 31.2360,
      lng: 121.4818,
      metro: 'Metro Line 1 / 2 / 8 สถานี People\'s Square / East Nanjing Rd',
      note: 'บะหมี่และข้าวราดซอสมันปูเข้มข้นเต็มคำ ปิดดึกเหมาะเป็นมื้อปิดท้ายวัน',
      img: 'place_images/xie_san_bao.jpg'
    },
    {
      id: 'first_food',
      name: '🛒 ห้าง Shanghai First Food Hall',
      cn: '上海第一食品商店',
      zone: 'z1',
      day: 'd5',
      timeSlot: '21:30 น.',
      lat: 31.2351,
      lng: 121.4774,
      metro: 'Metro Line 1 / 2 / 8 สถานี People\'s Square ทางออก 19',
      note: 'ศูนย์รวมของฝากเซี่ยงไฮ้ ขนมผีเสื้อ (Butterfly Cookies), ลูกอม White Rabbit และชาจีน',
      img: null
    },
    {
      id: 'baos',
      name: '🥐 Bao\'s Pastry (鲍师傅) & HEYTEA (喜茶)',
      cn: '鲍师傅糕点 · 喜茶',
      zone: 'z1',
      day: 'd5',
      timeSlot: '22:00 น.',
      lat: 31.2364,
      lng: 121.4819,
      metro: 'ย่าน East Nanjing Rd (เดินจาก First Food Hall 4 นาที)',
      note: 'ขนมเปี๊ยะหน้าหมูหยองสาหร่าย (Xiao Bei) ของ Bao\'s Pastry คู่ชาองุ่นชีส HEYTEA',
      img: null
    }
  ],

  days: [
    {
      id: 'd1',
      title: 'Day 1 • อาทิตย์ 6 ธ.ค.',
      subtitle: 'เดินทางถึงเซี่ยงไฮ้ & เช็กอินโรงแรม',
      badge: '✈️ Arrival',
      steps: [
        {
          stepNo: 1,
          placeId: 'pvg',
          time: '20:45',
          mode: 'didi',
          transitText: 'ลงเครื่อง PVG Terminal 1 รับกระเป๋าเดินทาง',
          coords: [[31.1443, 121.8083]]
        },
        {
          stepNo: 2,
          placeId: 'hotel',
          time: '21:30',
          mode: 'didi',
          transitText: 'DiDi ~50 นาที (สะดวกสุดพร้อมกระเป๋า) หรือ Maglev+Line 2/1',
          coords: [
            [31.1443, 121.8083],
            [31.1811, 121.7876],
            [31.1890, 121.7678],
            [31.1565, 121.6611],
            [31.1520, 121.6129],
            [31.1440, 121.5602],
            [31.1325, 121.4957],
            [31.1717, 121.4782],
            [31.1773, 121.4839],
            [31.2207, 121.4719],
            [31.2341, 121.4666],
            [31.2385, 121.4660]
          ]
        }
      ]
    },
    {
      id: 'd2',
      title: 'Day 2 • จันทร์ 7 ธ.ค.',
      subtitle: 'French Concession • วัดดัง • West Nanjing',
      badge: '🌿 CityWalk',
      steps: [
        {
          stepNo: 1,
          placeId: 'hotel',
          time: '08:30',
          mode: 'walk',
          transitText: 'ออกจากโรงแรม เดิน 3 นาทีไปสถานี Xinzha Rd (Line 1)',
          coords: [[31.2385, 121.4660], [31.2387, 121.4676]]
        },
        {
          stepNo: 2,
          placeId: 'dingtele',
          time: '09:00',
          mode: 'L1',
          transitText: 'Metro Line 1 (Xinzha Rd → People\'s Sq → S. Huangpi Rd → S. Shaanxi Rd) + เดิน 5 นาที',
          coords: [
            [31.2387, 121.4676],
            [31.2321, 121.4754],
            [31.2227, 121.4732],
            [31.2170, 121.4586],
            [31.2194, 121.4615]
          ],
          segments: [
            { mode: 'L1', coords: [[31.2387, 121.4676], [31.2321, 121.4754], [31.2227, 121.4732], [31.2170, 121.4586]] },
            { mode: 'walk', coords: [[31.2170, 121.4586], [31.2194, 121.4615]] }
          ]
        },
        {
          stepNo: 3,
          placeId: 'wukang',
          time: '10:15',
          mode: 'L10',
          transitText: 'Metro Line 10 (South Shaanxi Rd → Sh. Library → Jiaotong Univ) ทางออก 7',
          coords: [
            [31.2194, 121.4615],
            [31.2170, 121.4586],
            [31.2081, 121.4443],
            [31.2020, 121.4346],
            [31.2044, 121.4384]
          ],
          segments: [
            { mode: 'walk', coords: [[31.2194, 121.4615], [31.2170, 121.4586]] },
            { mode: 'L10', coords: [[31.2170, 121.4586], [31.2081, 121.4443], [31.2020, 121.4346]] },
            { mode: 'walk', coords: [[31.2020, 121.4346], [31.2044, 121.4384]] }
          ]
        },
        {
          stepNo: 4,
          placeId: 'anfu',
          time: '11:15',
          mode: 'walk',
          transitText: 'เดินชมตึกเก่าตามถนน Wukang Rd เลี้ยวเข้าถนน Anfu Rd (~12 นาที)',
          coords: [
            [31.2044, 121.4384],
            [31.2072, 121.4396],
            [31.2102, 121.4408],
            [31.2130, 121.4422],
            [31.2137, 121.4427]
          ]
        },
        {
          stepNo: 5,
          placeId: 'jingan',
          time: '12:45',
          mode: 'L7',
          transitText: 'เดินเข้า Changshu Rd นั่ง Metro Line 7 → Jing\'an Temple (1 ป้าย)',
          coords: [
            [31.2137, 121.4427],
            [31.2133, 121.4511],
            [31.2182, 121.4488],
            [31.2231, 121.4466],
            [31.2233, 121.4454]
          ],
          segments: [
            { mode: 'walk', coords: [[31.2137, 121.4427], [31.2133, 121.4511]] },
            { mode: 'L7', coords: [[31.2133, 121.4511], [31.2182, 121.4488], [31.2231, 121.4466]] },
            { mode: 'walk', coords: [[31.2231, 121.4466], [31.2233, 121.4454]] }
          ]
        },
        {
          stepNo: 6,
          placeId: 'longhua',
          time: '14:15',
          mode: 'didi',
          transitText: 'DiDi ~18 นาทีลงใต้ตามแนวถนน (หรือ Line 7 → Zhaojiabang Rd ต่อ Line 11/12)',
          coords: [
            [31.2233, 121.4454],
            [31.2237, 121.4446],
            [31.2112, 121.4499],
            [31.2095, 121.4500],
            [31.2071, 121.4483],
            [31.1907, 121.4550],
            [31.1851, 121.4572],
            [31.1822, 121.4528],
            [31.1795, 121.4520],
            [31.1749, 121.4518]
          ]
        },
        {
          stepNo: 7,
          placeId: 'xintiandi',
          time: '16:00',
          mode: 'L12',
          transitText: 'Metro Line 12 (Longhua → Jiashan → S. Shaanxi Rd) ต่อ Line 10 → Xintiandi',
          coords: [
            [31.1749, 121.4518],
            [31.1728, 121.4532],
            [31.1831, 121.4576],
            [31.1939, 121.4636],
            [31.2027, 121.4609],
            [31.2170, 121.4586],
            [31.2162, 121.4750],
            [31.2188, 121.4748]
          ],
          segments: [
            { mode: 'walk', coords: [[31.1749, 121.4518], [31.1728, 121.4532]] },
            { mode: 'L12', coords: [[31.1728, 121.4532], [31.1831, 121.4576], [31.1939, 121.4636], [31.2027, 121.4609], [31.2170, 121.4586]] },
            { mode: 'L10', coords: [[31.2170, 121.4586], [31.2162, 121.4750]] },
            { mode: 'walk', coords: [[31.2162, 121.4750], [31.2188, 121.4748]] }
          ]
        },
        {
          stepNo: 8,
          placeId: 'matcha_wang',
          time: '17:15',
          mode: 'walk',
          transitText: 'เดินจาก Xintiandi ขึ้นถนน Middle Huaihai Rd (~7 นาที) ถึง HAI550',
          coords: [
            [31.2188, 121.4748],
            [31.2195, 121.4700],
            [31.2202, 121.4648]
          ]
        },
        {
          stepNo: 9,
          placeId: 'nanjing_w',
          time: '18:00',
          mode: 'L13',
          transitText: 'Metro Line 13 (Middle Huaihai Rd → West Nanjing Rd, 1 ป้าย)',
          coords: [
            [31.2202, 121.4648],
            [31.2255, 121.4622],
            [31.2297, 121.4601]
          ]
        },
        {
          stepNo: 10,
          placeId: 'starbucks_r',
          time: '18:30',
          mode: 'walk',
          transitText: 'เดิน 2 นาทีริมถนน West Nanjing Rd ถึง Starbucks Roastery',
          coords: [
            [31.2297, 121.4601],
            [31.2299, 121.4607],
            [31.2300, 121.4611]
          ]
        },
        {
          stepNo: 11,
          placeId: 'longtago',
          time: '19:30',
          mode: 'walk',
          transitText: 'เดินข้ามฝั่ง 3 นาทีไปห้าง 818 Plaza ชั้น B1 (ร้าน Longtago)',
          coords: [
            [31.2300, 121.4611],
            [31.2297, 121.4604],
            [31.2294, 121.4598]
          ]
        }
      ]
    },
    {
      id: 'd3',
      title: 'Day 3 • อังคาร 8 ธ.ค.',
      subtitle: 'Shanghai Disney Resort (เต็มวัน)',
      badge: '🎢 Disney',
      steps: [
        {
          stepNo: 1,
          placeId: 'hotel',
          time: '07:15',
          mode: 'walk',
          transitText: 'ออกจากโรงแรม เดิน 3 นาทีไปสถานี Xinzha Rd',
          coords: [[31.2385, 121.4660], [31.2383, 121.4680]]
        },
        {
          stepNo: 2,
          placeId: 'disney',
          time: '08:15',
          mode: 'L11',
          transitText: 'Line 1 (Xinzha Rd → Xujiahui) ต่อ Line 11 สุดสาย Disney Resort (~55 นาที)',
          coords: [
            [31.2387, 121.4676],
            [31.2321, 121.4754],
            [31.2227, 121.4732],
            [31.2170, 121.4586],
            [31.2133, 121.4511],
            [31.2045, 121.4465],
            [31.1948, 121.4369],
            [31.1817, 121.4366],
            [31.1728, 121.4532],
            [31.1580, 121.5150],
            [31.1538, 121.5920],
            [31.1413, 121.6680],
            [31.1440, 121.6618]
          ],
          segments: [
            { mode: 'L1', coords: [[31.2387, 121.4676], [31.2321, 121.4754], [31.2227, 121.4732], [31.2170, 121.4586], [31.2133, 121.4511], [31.2045, 121.4465], [31.1948, 121.4369]] },
            { mode: 'L11', coords: [[31.1948, 121.4369], [31.1817, 121.4366], [31.1728, 121.4532], [31.1580, 121.5150], [31.1538, 121.5920], [31.1413, 121.6680]] },
            { mode: 'walk', coords: [[31.1413, 121.6680], [31.1440, 121.6618]] }
          ]
        },
        {
          stepNo: 3,
          placeId: 'disney_sichuan',
          time: '19:00',
          mode: 'walk',
          transitText: 'เดินออกจากประตูสวนสนุกเข้าโซน Disneytown (~8 นาที)',
          coords: [
            [31.1440, 121.6618],
            [31.1419, 121.6615],
            [31.1401, 121.6614]
          ]
        },
        {
          stepNo: 4,
          placeId: 'hotel',
          time: '21:30',
          mode: 'didi',
          transitText: 'DiDi กลับโรงแรม ~45 นาที (หรือ Metro Line 11 → Xujiahui ต่อ Line 1)',
          coords: [
            [31.1401, 121.6614],
            [31.1393, 121.6561],
            [31.1346, 121.6533],
            [31.1471, 121.6481],
            [31.1551, 121.6507],
            [31.1473, 121.5941],
            [31.1389, 121.5383],
            [31.1720, 121.4782],
            [31.1773, 121.4839],
            [31.2133, 121.4706],
            [31.2341, 121.4666],
            [31.2385, 121.4660]
          ]
        }
      ]
    },
    {
      id: 'd4',
      title: 'Day 4 • พุธ 9 ธ.ค.',
      subtitle: 'Suzhou CRH • Rockbund Christmas • The Bund',
      badge: '🚄 Suzhou',
      steps: [
        {
          stepNo: 1,
          placeId: 'hotel',
          time: '07:05',
          mode: 'walk',
          transitText: 'ออกจากโรงแรม เดินไปสถานี Xinzha Rd (Line 1)',
          coords: [[31.2385, 121.4660], [31.2383, 121.4680]]
        },
        {
          stepNo: 2,
          placeId: 'sh_station',
          time: '07:20',
          mode: 'L1',
          transitText: 'Metro Line 1 ถึง Shanghai Station ~07:20 น. (จำเป็นต้องถึงก่อนรถออกอย่างน้อย 30 นาที เพื่อตรวจกระเป๋า/สแกนพาสปอร์ต)',
          coords: [
            [31.2387, 121.4676],
            [31.2408, 121.4590],
            [31.2498, 121.4574],
            [31.2494, 121.4557]
          ]
        },
        {
          stepNo: 3,
          placeId: 'suzhou_garden',
          time: '08:45',
          mode: 'crh',
          transitText: 'รถไฟ CRH 08:00 น. (จองแล้ว · ชั้นสอง Shanghai → Suzhou ~08:30 น.) + DiDi 10 นาที',
          coords: [
            [31.2494, 121.4557],
            [31.2650, 121.3500],
            [31.2950, 121.1500],
            [31.3200, 120.9200],
            [31.3300, 120.7200],
            [31.3242, 120.6295]
          ]
        },
        {
          stepNo: 4,
          placeId: 'suzhou_pingjiang',
          time: '10:20',
          mode: 'walk',
          transitText: 'เดินเลียบคลองจากสวนจัวเจิ้งหยวนเข้าสู่ถนนผิงเจียง (~10 นาที)',
          coords: [
            [31.3242, 120.6295],
            [31.3195, 120.6322],
            [31.3145, 120.6345]
          ]
        },
        {
          stepNo: 5,
          placeId: 'suzhou_shantang',
          time: '11:55',
          mode: 'didi',
          transitText: 'นั่ง DiDi ~15 นาที (หรือ Metro Line 1→2) ไปย่านคลองเก่าถนนซานถัง & ทานมื้อเที่ยง',
          coords: [
            [31.3145, 120.6345],
            [31.3196, 120.6363],
            [31.3163, 120.6142],
            [31.3179, 120.6132],
            [31.3195, 120.6127],
            [31.3187, 120.6076],
            [31.3183, 120.6063]
          ]
        },
        {
          stepNo: 6,
          placeId: 'suzhou_jinji_lake',
          time: '13:30',
          mode: 'didi',
          transitText: 'นั่ง DiDi ~25 นาที (หรือ Metro Line 2→1) ไปโซนเมืองใหม่ริมทะเลสาบจินจี',
          coords: [
            [31.3183, 120.6063],
            [31.3234, 120.6089],
            [31.3286, 120.6258],
            [31.3319, 120.6278],
            [31.3338, 120.6504],
            [31.3296, 120.6564],
            [31.3362, 120.6973],
            [31.3352, 120.6992],
            [31.3233, 120.7015],
            [31.3208, 120.7025]
          ]
        },
        {
          stepNo: 7,
          placeId: 'suzhou_eye',
          time: '14:00',
          mode: 'walk',
          transitText: 'เดินเลียบทะเลสาบ ~10 นาที ชม Suzhou Eye (ออกเดินทางไปสถานีรถไฟ 14:30 น. เพื่อถึงสถานี 14:50 น.)',
          coords: [
            [31.3208, 120.7025],
            [31.3175, 120.7078],
            [31.3143, 120.7127]
          ]
        },
        {
          stepNo: 8,
          placeId: 'sh_station',
          time: '14:50 → 15:20',
          mode: 'crh',
          transitText: 'ถึงสถานีซูโจว 14:50 น. (ก่อนรถออก 30 นาที) · ขึ้น CRH 15:20 น. กลับถึง Shanghai Station ~15:55 น.',
          coords: [
            [31.3143, 120.7127],
            [31.3250, 120.8200],
            [31.3150, 120.9600],
            [31.2950, 121.1500],
            [31.2650, 121.3500],
            [31.2494, 121.4557]
          ]
        },
        {
          stepNo: 9,
          placeId: 'christmas_rockbund',
          time: '16:20',
          mode: 'L10',
          transitText: 'Metro Line 1 (Shanghai Station → People\'s Sq) ต่อ Line 2 → East Nanjing Rd เดิน 6 นาที',
          coords: [
            [31.2494, 121.4557],
            [31.2408, 121.4590],
            [31.2387, 121.4676],
            [31.2321, 121.4754],
            [31.2378, 121.4842],
            [31.2426, 121.4881]
          ],
          segments: [
            { mode: 'L1', coords: [[31.2494, 121.4557], [31.2408, 121.4590], [31.2387, 121.4676], [31.2321, 121.4754]] },
            { mode: 'L2', coords: [[31.2321, 121.4754], [31.2378, 121.4842]] },
            { mode: 'walk', coords: [[31.2378, 121.4842], [31.2426, 121.4881]] }
          ]
        },
        {
          stepNo: 10,
          placeId: 'rock_bund',
          time: '17:15',
          mode: 'walk',
          transitText: 'เดินชมกลุ่มตึกประวัติศาสตร์ย่าน Rockbund ต่อเนื่อง (~2 นาที)',
          coords: [
            [31.2426, 121.4881],
            [31.2422, 121.4874]
          ]
        },
        {
          stepNo: 11,
          placeId: 'bund',
          time: '18:00',
          mode: 'walk',
          transitText: 'เดินออกสู่ริมน้ำ The Bund (~5 นาที) ทันชมเปิดไฟหอไข่มุก 18:00 น.',
          coords: [
            [31.2422, 121.4874],
            [31.2415, 121.4896],
            [31.2395, 121.4901]
          ]
        },
        {
          stepNo: 12,
          placeId: 'nanjing_e',
          time: '19:00',
          mode: 'walk',
          transitText: 'เดินเข้าถนนคนเดิน East Nanjing Rd (~6 นาที)',
          coords: [
            [31.2395, 121.4901],
            [31.2385, 121.4865],
            [31.2377, 121.4840],
            [31.2368, 121.4810]
          ]
        },
        {
          stepNo: 13,
          placeId: 'feidachu',
          time: '19:30',
          mode: 'walk',
          transitText: 'เดินต่อบนถนน East Nanjing Rd ถึง Mosaic Mall (~3 นาที)',
          coords: [
            [31.2368, 121.4810],
            [31.2371, 121.4820],
            [31.2374, 121.4828]
          ]
        },
        {
          stepNo: 14,
          placeId: 'gangyuji',
          time: '20:30',
          mode: 'walk',
          transitText: 'เดินย้อนไปฝั่ง Bund Central 3F (~5 นาที) แวะร้าน Gangyuji',
          coords: [
            [31.2374, 121.4828],
            [31.2376, 121.4852],
            [31.2377, 121.4874]
          ]
        }
      ]
    },
    {
      id: 'd5',
      title: 'Day 5 • พฤหัส 10 ธ.ค.',
      subtitle: 'Museums • Lujiazui • North Bund • Yuyuan',
      badge: '🏛️ Finale',
      steps: [
        {
          stepNo: 1,
          placeId: 'hotel',
          time: '08:30',
          mode: 'walk',
          transitText: 'ออกจากโรงแรม เดินไปสถานี Xinzha Rd (Line 1)',
          coords: [[31.2385, 121.4660], [31.2383, 121.4680]]
        },
        {
          stepNo: 2,
          placeId: 'lailai',
          time: '08:45',
          mode: 'L1',
          transitText: 'Line 1 (Xinzha Rd → People\'s Square, 1 ป้าย) ทางออก 14 เดิน 6 นาที',
          coords: [
            [31.2387, 121.4676],
            [31.2321, 121.4754],
            [31.2355, 121.4785],
            [31.2367, 121.4806]
          ],
          segments: [
            { mode: 'L1', coords: [[31.2387, 121.4676], [31.2321, 121.4754]] },
            { mode: 'walk', coords: [[31.2321, 121.4754], [31.2355, 121.4785], [31.2367, 121.4806]] }
          ]
        },
        {
          stepNo: 3,
          placeId: 'natural_hist',
          time: '10:00',
          mode: 'L13',
          transitText: 'Line 2 (People\'s Sq → W. Nanjing Rd) ต่อ Line 13 → Natural History Museum',
          coords: [
            [31.2367, 121.4806],
            [31.2321, 121.4754],
            [31.2299, 121.4606],
            [31.2363, 121.4624],
            [31.2362, 121.4628]
          ],
          segments: [
            { mode: 'walk', coords: [[31.2367, 121.4806], [31.2321, 121.4754]] },
            { mode: 'L2', coords: [[31.2321, 121.4754], [31.2299, 121.4606]] },
            { mode: 'L13', coords: [[31.2299, 121.4606], [31.2363, 121.4624], [31.2362, 121.4628]] }
          ]
        },
        {
          stepNo: 4,
          placeId: '1000trees',
          time: '11:30',
          mode: 'L13',
          transitText: 'Metro Line 13 (Natural History Museum → Hanzhong Rd → Jiangning Rd) เดิน 500 ม.',
          coords: [
            [31.2362, 121.4628],
            [31.2363, 121.4624],
            [31.2408, 121.4590],
            [31.2443, 121.4446],
            [31.2463, 121.4422]
          ],
          segments: [
            { mode: 'L13', coords: [[31.2362, 121.4628], [31.2363, 121.4624], [31.2408, 121.4590], [31.2443, 121.4446]] },
            { mode: 'walk', coords: [[31.2443, 121.4446], [31.2463, 121.4422]] }
          ]
        },
        {
          stepNo: 5,
          placeId: 'china_art',
          time: '13:00',
          mode: 'L8',
          transitText: 'Line 13 (Jiangning Rd → Xintiandi) → Line 10 (Laoximen) → Line 8 (China Art Museum)',
          coords: [
            [31.2463, 121.4422],
            [31.2443, 121.4446],
            [31.2408, 121.4590],
            [31.2363, 121.4624],
            [31.2299, 121.4606],
            [31.2200, 121.4643],
            [31.2162, 121.4750],
            [31.2189, 121.4829],
            [31.1960, 121.4890],
            [31.1851, 121.4938],
            [31.1852, 121.4941]
          ],
          segments: [
            { mode: 'walk', coords: [[31.2463, 121.4422], [31.2443, 121.4446]] },
            { mode: 'L13', coords: [[31.2443, 121.4446], [31.2408, 121.4590], [31.2363, 121.4624], [31.2299, 121.4606], [31.2200, 121.4643], [31.2162, 121.4750]] },
            { mode: 'L10', coords: [[31.2162, 121.4750], [31.2189, 121.4829]] },
            { mode: 'L8', coords: [[31.2189, 121.4829], [31.1960, 121.4890], [31.1851, 121.4938], [31.1852, 121.4941]] }
          ]
        },
        {
          stepNo: 6,
          placeId: 'map_pudong',
          time: '14:45',
          mode: 'L2',
          transitText: 'Line 8 (China Art Museum → People\'s Sq) ต่อ Line 2 → Lujiazui ทางออก 2',
          coords: [
            [31.1852, 121.4941],
            [31.1851, 121.4938],
            [31.2189, 121.4829],
            [31.2272, 121.4793],
            [31.2321, 121.4754],
            [31.2378, 121.4842],
            [31.2377, 121.5014],
            [31.2381, 121.4963]
          ],
          segments: [
            { mode: 'L8', coords: [[31.1852, 121.4941], [31.1851, 121.4938], [31.2189, 121.4829], [31.2272, 121.4793], [31.2321, 121.4754]] },
            { mode: 'L2', coords: [[31.2321, 121.4754], [31.2378, 121.4842], [31.2377, 121.5014]] },
            { mode: 'walk', coords: [[31.2377, 121.5014], [31.2381, 121.4963]] }
          ]
        },
        {
          stepNo: 7,
          placeId: 'mingzhu',
          time: '16:15',
          mode: 'walk',
          transitText: 'เดินจากพิพิธภัณฑ์ MAP ขึ้นสกายวอล์กวงเวียนหมิงจู (~6 นาที)',
          coords: [
            [31.2381, 121.4963],
            [31.2390, 121.4980],
            [31.2397, 121.4998]
          ]
        },
        {
          stepNo: 8,
          placeId: 'disney_ljz',
          time: '16:45',
          mode: 'walk',
          transitText: 'เดินบนสกายวอล์กติดวงเวียนหมิงจู (2 นาที) ถึง Disney Store',
          coords: [
            [31.2397, 121.4998],
            [31.2391, 121.4997],
            [31.2385, 121.4995]
          ]
        },
        {
          stepNo: 9,
          placeId: 'holiland',
          time: '17:15',
          mode: 'walk',
          transitText: 'เดินเข้าห้าง Super Brand Mall ชั้น 1 (~3 นาที) ร้าน Holiland Travel',
          coords: [
            [31.2385, 121.4995],
            [31.2378, 121.4992],
            [31.2372, 121.4989]
          ]
        },
        {
          stepNo: 10,
          placeId: 'north_bund',
          time: '17:50',
          mode: 'L12',
          transitText: 'Metro Line 2 (Lujiazui → E. Nanjing Rd) ต่อ Line 10 → Tiantong Rd ต่อ Line 12 → Int\'l Cruise Terminal',
          coords: [
            [31.2372, 121.4989],
            [31.2377, 121.5014],
            [31.2378, 121.4842],
            [31.2438, 121.4823],
            [31.2500, 121.4981],
            [31.2475, 121.4995]
          ],
          segments: [
            { mode: 'walk', coords: [[31.2372, 121.4989], [31.2377, 121.5014]] },
            { mode: 'L2', coords: [[31.2377, 121.5014], [31.2378, 121.4842]] },
            { mode: 'L10', coords: [[31.2378, 121.4842], [31.2438, 121.4823]] },
            { mode: 'L12', coords: [[31.2438, 121.4823], [31.2500, 121.4981]] },
            { mode: 'walk', coords: [[31.2500, 121.4981], [31.2475, 121.4995]] }
          ]
        },
        {
          stepNo: 11,
          placeId: 'bund_bull',
          time: '18:45',
          mode: 'didi',
          transitText: 'DiDi ข้ามสะพาน Waibaidu Bridge เลียบเดอะบันด์ลงใต้ (~10 นาที)',
          coords: [
            [31.2475, 121.4995],
            [31.2474, 121.4949],
            [31.2483, 121.4937],
            [31.2468, 121.4922],
            [31.2429, 121.4899],
            [31.2390, 121.4902],
            [31.2363, 121.4905],
            [31.2337, 121.4916],
            [31.2328, 121.4909]
          ]
        },
        {
          stepNo: 12,
          placeId: 'yuyuan',
          time: '19:15',
          mode: 'walk',
          transitText: 'เดินจากรูปปั้นกระทิงเข้าถนนคนเดินอวี้หยวน (~8 นาที)',
          coords: [
            [31.2328, 121.4909],
            [31.2300, 121.4915],
            [31.2272, 121.4921]
          ]
        },
        {
          stepNo: 13,
          placeId: 'taotaoju',
          time: '20:15',
          mode: 'L14',
          transitText: 'Metro Line 14/8 (Yu Garden → Dashijie → People\'s Square) ห้าง New World City 7F',
          coords: [
            [31.2272, 121.4921],
            [31.2278, 121.4871],
            [31.2272, 121.4793],
            [31.2321, 121.4754],
            [31.2348, 121.4738]
          ],
          segments: [
            { mode: 'walk', coords: [[31.2272, 121.4921], [31.2278, 121.4871]] },
            { mode: 'L14', coords: [[31.2278, 121.4871], [31.2272, 121.4793]] },
            { mode: 'L8', coords: [[31.2272, 121.4793], [31.2321, 121.4754]] },
            { mode: 'walk', coords: [[31.2321, 121.4754], [31.2348, 121.4738]] }
          ]
        },
        {
          stepNo: 14,
          placeId: 'xiesanbao',
          time: '21:00',
          mode: 'walk',
          transitText: 'เดินเข้าถนน East Nanjing Rd (~8 นาที) ชิมบะหมี่มันปู Xie San Bao',
          coords: [
            [31.2348, 121.4738],
            [31.2355, 121.4780],
            [31.2360, 121.4818]
          ]
        },
        {
          stepNo: 15,
          placeId: 'first_food',
          time: '21:30',
          mode: 'walk',
          transitText: 'เดินย้อนไปฝั่ง People\'s Square (~5 นาที) ซื้อของฝาก First Food Hall',
          coords: [
            [31.2360, 121.4818],
            [31.2355, 121.4795],
            [31.2351, 121.4774]
          ]
        },
        {
          stepNo: 16,
          placeId: 'baos',
          time: '22:00',
          mode: 'walk',
          transitText: 'เดินปิดท้าย Bao\'s Pastry & ชาผลไม้ HEYTEA (~4 นาที)',
          coords: [
            [31.2351, 121.4774],
            [31.2358, 121.4798],
            [31.2364, 121.4819]
          ]
        }
      ]
    },
    {
      id: 'd6',
      title: 'Day 6 • ศุกร์ 11 ธ.ค.',
      subtitle: 'เช็กเอาท์ 04:45 น. • ถึงสนามบิน PVG ก่อนบินล่วงหน้า',
      badge: '🛫 Departure',
      steps: [
        {
          stepNo: 1,
          placeId: 'hotel',
          time: '04:45',
          mode: 'didi',
          transitText: 'เช็กเอาท์จากโรงแรม Xinzha Rd 219 (ขยับเร็วขึ้น +30 นาที, Metro ยังไม่เปิด)',
          coords: [[31.2385, 121.4660]]
        },
        {
          stepNo: 2,
          placeId: 'pvg',
          time: '05:45',
          mode: 'didi',
          transitText: 'DiDi ตรงสู่ PVG Terminal 1 (~50–60 นาที) · ถึงก่อนเครื่องออก 2 ชม. 45 น. (เที่ยวบิน 08:30 น.)',
          coords: [
            [31.2385, 121.4660],
            [31.2340, 121.4690],
            [31.2320, 121.4880],
            [31.2290, 121.5150],
            [31.2160, 121.5680],
            [31.2080, 121.6250],
            [31.1920, 121.6850],
            [31.1680, 121.7450],
            [31.1443, 121.8083]
          ]
        }
      ]
    }
  ]
};
