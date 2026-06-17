export interface TimelineEvent {
  id: number;
  order: number;       // dùng để sort, không hiển thị
  label: string;       // nhãn kỷ niệm, ví dụ: "Lần đầu tiên", "Chuyến đi"
  title: string;
  subtitle: string;
  description: string;
  images: string[];
  emoji: string;
  highlight: boolean;
  tags: string[];
}

export interface StoryMeta {
  startDate: string;
  totalDays: number;
  title: string;
  subtitle: string;
  coupleNames: { person1: string; person2: string };
  endMessage: string;
}

// ✏️ CẬP NHẬT ngày bắt đầu thực tế của hai người
export const STORY_META: StoryMeta = {
  startDate: '2023-09-01',
  totalDays: 900,
  title: 'Hành Trình 900 Ngày',
  subtitle: 'Câu chuyện tình yêu của chúng mình',
  coupleNames: {
    person1: 'Anh',
    person2: 'Em',
  },
  endMessage: 'Và câu chuyện vẫn đang được viết tiếp từng ngày...',
};

// ✏️ CẬP NHẬT nội dung chi tiết các sự kiện bên dưới
export const TIMELINE_EVENTS: TimelineEvent[] = [
  {
    id: 1,
    order: 1,
    label: 'Ngày đó...',
    title: 'Khi mình quay về bên nhau',
    subtitle: 'Một câu chuyện mới lại được bắt đầu...',
    description:
      'Sau một thời gian xa cách, mình trò chuyện và có những buổi đi chơi lại với nhau, và sau cái ngày mình đi ăn Kichi Kichi 🍲🍲 và buổi đi xem phim Tee Yod 👹👹 đó, anh đã chủ động thổ lộ và mình đã lại một lần nữa ở bên nhau',
    images: [],
    emoji: '🍲👹',
    highlight: true,
    tags: ['Bắt Đầu'],
  },
  {
    id: 2,
    order: 2,
    label: 'Những buổi hẹn hò đầy kỷ niệm',
    title: 'Thời gian như được ngừng lại khi hai đứa ở bên nhau',
    subtitle: 'Những kỷ niệm nhỏ, nhưng anh trân trọng từng khoảnh khắc',
    description:
      'Những buổi hẹn hò, những cuộc trò chuyện không hồi kết, những bữa ăn nhỏ bên nhau, mỗi thứ như đều trở nên đặc biệt hơn khi có em ở đó cùng anh.',
    images: ['us_cute.jpg','us_cute_2.jpg','us_cute_3.jpg','us_cute_4.jpg','us_cute_5.png','concept_cuoi.jpg'],
    emoji: '😍',
    highlight: false,
    tags: ['Hẹn Hò', 'Kỷ Niệm'],
  },
  {
    id: 3,
    order: 3,
    label: 'Sinh nhật của Dánh',
    title: 'Ngày 24/11',
    subtitle: 'Sinh nhật của em bé chinh đẹpppp',
    description:
      'Ngày 24/11 sẽ luôn là một ngày đặc biệt với anh, ngày em bé của anh chinh nhậtttt.\nNăm 2024, cùng em đón sinh nhật của em tại lễ hội Gen Fest, đêm đó hai đứa mình quẫy rất nhiệt, cháy hết mình với đam mê, quả là một ngày sinh nhật đáng nhớ với nhiều niềm vui và những kỷ niệm đẹp.\n Năm 2025, Sinh nhật của em có sự góp mặt của các cốt, lúc đó quậy điên và vui vl luôn ýyyyyyyyy',
    images: ['anh_sinh_nhat.jpg', 'gen_fest_cc.jpg','sinh_nhat_2025_slice.PNG'],
    emoji: '🎂🎵🖋️',
    highlight: true,
    tags: ['Sinh Nhật'],
  },
  {
    id: 4,
    order: 4,
    label: 'Mùa xuân đó',
    title: 'Cùng nhau đón cái Tết ấm áp, vui vẻ bên nhau',
    subtitle: 'Pháo hoa, áo dài, và mình',
    description:
      'Tết là dịp đặc biệt để hai đứa mình cùng nhau trải qua những khoảnh khắc ấm áp, vui vẻ. Anh nhớ những ngày Tết đó được cùng em về quê, cùng em đi nhận lì xì, đi đánh bài, chụp hình, mọi khoảng khắc đều trở nên đáng nhớ và tràn đầy niềm vui.',
    images: [
      'em_va_tet_2.JPG',
      'em_va_tet_3.JPG',
      'em_va_tet_4.JPG',
      'em_va_test_5.JPG',
    ],
    emoji: '🧧📷💵',
    highlight: false,
    tags: ['Tết'],
  },
  {
    id: 5,
    order: 5,
    label: 'Núi và Mây',
    title: 'Đà Lạt — Sương mù và không khí lành lạnh',
    subtitle: 'Có em ở bên thì Đà Lạt cũng trở nên ấm áp hơn',
    description:
      'Đà Lạt se lạnh, sương mù buổi sáng, những quán ăn địa phương, những địa điểm check-in đẹp, và những khoảnh khắc hai đứa mình cùng nhau trải nghiệm.\nĐây tuy là nơi hai đứa đi khá nhiều, nhưng với anh mỗi lần đi đều mang một cảm giác mới lạ hơn cùng em, gần gữi hơn, ấm áp hơn và yêu em nhiều hơn',
    images: [
      'em_da_lat_0.jpg',
      'anh_dala_1.JPG',
      'anh_dalat_2.jpeg',
      'anh_da_lat_3.CR2',
      'anh_da_lat_5.JPG',
      'anh_da_lat_6.JPG',
      'anh_da_lat_7.JPG',
    ],
    emoji: '🌿💨🥖🥛',
    highlight: true,
    tags: ['Du Lịch', 'Đà Lạt'],
  },
  {
    id: 6,
    order: 6,
    label: 'Núi và Biển',
    title: 'Đà Nẵng — Hội An - Bà Nà Hills & Em',
    subtitle: 'Cây cầu vàng, trời xanh và máng trượt siêu tốc',
    description:
      'Ba Na Hills với cây cầu vàng nổi tiếng, những cảnh đẹp như tranh vẽ, và những trò chơi thú vị.\n Nhớ cảm giác ngồi cùng em trên chiếc xe điện, rồi mình lái để đi tông những người khác, lúc đó điên với vui vl kk.\n Rồi tới khúc ngồi xe trượt, cùng trượt quanh những khúc cua ngay sườn núi, cảm giác hồi hợp và cũng thật hạnh phúc cùng iemm\n Và mình đã cùng nhau đi phố cổ Hội An, chụp những bức ảnh thật đẹp, ăn những món ăn thật ngon, trải nghiệm những cảm giác mà trước đó khi đi với công ty anh đã luôn muốn chia sẻ cùng em.',
    images: ['ba_na_hill.JPG','em_hoi_an.png','em_hoi_an_2.png','em_da_nang.jpg'],
    emoji: '⛅🚗',
    highlight: false,
    tags: ['Du Lịch', 'Đà Nẵng', 'Hội An', 'Bà Nà Hills'],
  },
  {
    id: 7,
    order: 7,
    label: 'Biển và Nắng',
    title: 'Quy Nhơn — Sóng biển và bình yên',
    subtitle: 'Chuyến đi biển đầu tiên của hai đứa mình',
    description:
      'Quy Nhơn, địa điểm đi biển đầu tiên của hai đứa, cùng là lần bay đầu tiên của hai đứa luôn, cảm giác hồi hộp và vui sướng khi được cùng nhau trải nghiệm những điều mới mẻ.',
    images: ['em_quy_nhon_bay.jpg','anh_quy_nhon.jpg', 'anh_quy_nhon.PNG','em_quy_nhon_bien.jpg'],
    emoji: '🌊✈️',
    highlight: true,
    tags: ['Du Lịch', 'Quy Nhơn'],
  },
  {
    id: 8,
    order: 8,
    label: 'Biển và Homies',
    title: 'Vĩnh Hy — Biển đẹp và các cốt',
    subtitle: 'Một chuyến đi với biết bao điều khùm điên được làm cùng nhau :v',
    description:
      'Chuyến đi với biết bao địa điểm đẹp, những trận ma sói chửi mẫu thân của nhau, những chầu hải sản ăn ngập mồm nhưng rẻ vô đối, và tất nhiên là những kỷ niệm đáng nhớ cùng nhau.',
    images: ['anh_vinh_hy.JPG','homie_vinh_hy.png','us_vinh_hy.jpg'],
    emoji: '⛵🤝🐺',
    highlight: false,
    tags: ['Du Lịch', 'Vĩnh Hy'],
  },
  {
    id: 8,
    order: 8,
    label: 'Núi và Chùa',
    title: 'Núi Bà Đen — Núi , Chùa và chuyến đi cùng gia đình em',
    subtitle: 'Lần đầu tiên đi du lịch cùng ba mẹ em',
    description:
      'Một chuyến đi đáng nhớ cùng gia đình em, có ba, có mẹ, có bà Bảy, dì Nhi và có cả bạn em.\n Một chuyến đi đầy kỷ niệm cùng gia đình, tuy mệt nhưng lại rất vui',
    images: ['em_tay_ninh.jpg'],
    emoji: '',
    highlight: true,
    tags: ['Du Lịch','Gia Đình']
  },
  {
    id: 9,
    order: 9,
    label: 'Kỉ niệm và Những món quà',
    title: 'Anniversary, Special Days, và những khoảnh khắc đáng nhớ',
    subtitle: 'Những món quà, những ngày kỉ niệm, những ngày lễ và những món quà dành tặng cho nhau',
    description:
      'Cùng nhau đón kỉ niệm tháng, năm, trăm ngày và những dịp đặc biệt, trao nhau những món quà, những lời chúc, và những kỉ niệm đáng nhớ. Những khoảnh khắc này sẽ luôn là một phần quan trọng trong câu chuyện tình yêu của chúng mình.',
    images: ['anni_concept.PNG','loi_chuc_cua_em.jpg','banh_em_tang.png','qua_cua_em.jpg','700_day.jpg','qua_2_nam.jpg','qua_anni.jpg'],
    emoji: '💑',
    highlight: false,
    tags: ['Anniversary','Special Days','Special Gift'],
  },
  {
    id: 10,
    order: 10,
    label: 'Hôm nay',
    title: 'Vẫn đang viết tiếp câu chuyện này',
    subtitle: '900 ngày, và còn nhiều hơn nữa phía trước',
    description:
      'Hôm nay tròn 900 ngày bên nhau. Anh không biết ngày mai sẽ ra sao, nhưng anh biết mình muốn mỗi ngày đều có em trong đó, đưa em đi thêm nhiều nơi, cùng em đạt được nhiều thành tựu hơn và cưới được em làm Vợ :3',
    images: [],
    emoji: '❤️',
    highlight: true,
    tags: ['Hôm nay', '900 ngày'],
  },
];
