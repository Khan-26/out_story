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
      'Sau một thời gian xa cách, mình trò chuyện và có những buổi đi chơi lại với nhau, và sau cái ngày mình đi ăn Kichi Kichi 🍲🍲 và buổi đi xem phim Tee Yod 👹👹 đó, mình đã chủ động thổ lộ và mình đã lại một lần nữa ở bên nhau',
    images: [],
    emoji: '🍲👹',
    highlight: true,
    tags: ['Bắt đầu'],
  },
  {
    id: 2,
    order: 2,
    label: 'Những buổi hẹn hò đầy kỷ niệm',
    title: 'Hẹn nhau ở những noi đặc biệt với hai con người đặc biệt',
    subtitle: 'Những kỷ niệm nhỏ, nhưng anh trân trọng từng khoảnh khắc',
    description:
      'Những buổi hẹn hò, những cuộc trò chuyện không hồi kết, những bữa ăn nhỏ bên nhau, mỗi thứ như đều trở nên đặc biệt hơn khi có em ở đó cùng anh.',
    images: [],
    emoji: '😊',
    highlight: false,
    tags: ['Hẹn hò', 'Kỷ niệm'],
  },
  {
    id: 3,
    order: 3,
    label: 'Những chuyến du lịch cùng nhau',
    title: 'Đi đến những nơi mới, khám phá thế giới cùng nhau',
    subtitle: 'Em, Anh, và những chuyến đi đáng nhớ',
    description:
      'Mỗi chuyến đi là một chương mới trong câu chuyện của chúng mình. Từ những ngày se lạnh ở Đà Lạt, đến những buổi chiều thơ mộng với ánh hoàng hôn của bên bờ biển Quy Nhơn, hay khoảng khác trượt xe cùng nhau trên Bà Nà Hills, đến những khoảng khắc cười vỡ bụng khi đi với bạn em ở Vĩnh Hy, mỗi nơi đều mang lại những kỷ niệm đáng nhớ và những khoảnh khắc hạnh phúc bên nhau.',
    images: ['anh_sinh_nhat.jpg', 'banh_em_tang.PNG'],
    emoji: '🎂',
    highlight: true,
    tags: ['Sinh nhật'],
  },
  {
    id: 3,
    order: 3,
    label: 'Sinh nhật của em',
    title: 'Ngày ',
    subtitle: 'Anh muốn mỗi sinh nhật em đều có anh',
    description:
      '[Nội dung sẽ được cập nhật — Sinh nhật đầu tiên mình ở bên nhau. Anh đã chuẩn bị bao nhiêu điều bất ngờ, nhưng cuối cùng nụ cười của em mới là điều đẹp nhất anh nhận được hôm đó.]',
    images: ['anh_sinh_nhat.jpg', 'banh_em_tang.PNG'],
    emoji: '🎂',
    highlight: true,
    tags: ['Sinh nhật'],
  },
  {
    id: 4,
    order: 4,
    label: 'Mùa xuân đó',
    title: 'Tết đầu tiên bên nhau',
    subtitle: 'Pháo hoa, áo dài, và mình',
    description:
      '[Nội dung sẽ được cập nhật — Cái Tết đầu tiên mình được đón cùng nhau. Áo dài đỏ rực, câu chúc năm mới và cảm giác ấm áp khi biết rằng có một người đặc biệt đang bên cạnh mình.]',
    images: [
      'em_va_tet_1.JPG',
      'em_va_tet_2.JPG',
      'em_va_tet_3.JPG',
      'em_va_tet_4.JPG',
    ],
    emoji: '🧧',
    highlight: false,
    tags: ['Tết', 'Gia đình'],
  },
  {
    id: 5,
    order: 5,
    label: 'Chuyến đi',
    title: 'Đà Lạt — Sương mù và cà phê nóng',
    subtitle: 'Lần đầu mình đi xa cùng nhau',
    description:
      '[Nội dung sẽ được cập nhật — Đà Lạt se lạnh, sương mù buổi sáng, đồi thông xanh mướt. Chuyến đi đầu tiên của chúng mình — và anh nhớ mình đã cười nhiều đến thế nào suốt chuyến đó.]',
    images: [
      'anh_dala_1.JPG',
      'anh_dalat_2.jpeg',
      'anh_da_lat_5.JPG',
      'anh_da_lat_6.JPG',
      'anh_da_lat_7.JPG',
    ],
    emoji: '🌿',
    highlight: true,
    tags: ['Du lịch', 'Đà Lạt'],
  },
  {
    id: 6,
    order: 6,
    label: 'Chuyến đi',
    title: 'Ba Na Hills — Mình đứng trên mây',
    subtitle: 'Cây cầu vàng và trời xanh',
    description:
      '[Nội dung sẽ được cập nhật — Đi lên Ba Na Hills, nhìn ra khung cảnh trời mây bao la, đứng trên cây cầu vàng nổi tiếng và cảm giác cả thế giới bé lại — chỉ còn mình với em.]',
    images: ['ba_na_hill.JPG'],
    emoji: '⛅',
    highlight: false,
    tags: ['Du lịch', 'Ba Na'],
  },
  {
    id: 7,
    order: 7,
    label: 'Biển và nắng',
    title: 'Quy Nhơn — Sóng biển và bình yên',
    subtitle: 'Những ngày lười biếng bên bờ biển',
    description:
      '[Nội dung sẽ được cập nhật — Quy Nhơn xanh ngắt. Mình ngồi nhìn sóng, ăn hải sản, đi dạo dọc bờ biển lúc hoàng hôn. Những ngày đơn giản mà anh thấy mình hạnh phúc nhất.]',
    images: ['anh_quy_nhon.jpg', 'anh_quy_nhon.PNG'],
    emoji: '🌊',
    highlight: true,
    tags: ['Du lịch', 'Biển', 'Quy Nhơn'],
  },
  {
    id: 8,
    order: 8,
    label: 'Biển và nắng',
    title: 'Vịnh Hy — Nước trong như pha lê',
    subtitle: 'Một vịnh biển mình sẽ nhớ mãi',
    description:
      '[Nội dung sẽ được cập nhật — Vịnh Hy với làn nước trong vắt, núi xanh bao quanh và cảm giác thoát khỏi mọi ồn ào của cuộc sống. Hai đứa ngồi nhìn biển và nói chuyện chẳng muốn về.]',
    images: ['anh_vinh_hy.JPG'],
    emoji: '⛵',
    highlight: false,
    tags: ['Du lịch', 'Biển', 'Vịnh Hy'],
  },
  {
    id: 9,
    order: 9,
    label: 'Kỷ niệm ❤️',
    title: 'Hai năm — vẫn còn thích nhau lắm',
    subtitle: 'Mỗi ngày qua là một ngày anh trân trọng',
    description:
      '[Nội dung sẽ được cập nhật — Hai năm rồi đó. Không hoàn hảo, không phải lúc nào cũng dễ dàng, nhưng anh biết mình đã chọn đúng người. Cảm ơn em đã ở lại.]',
    images: ['anni_concept.PNG'],
    emoji: '💑',
    highlight: true,
    tags: ['Kỷ niệm', 'Anniversary'],
  },
  {
    id: 10,
    order: 10,
    label: 'Tương lai ✦',
    title: 'Hôm đó mình chụp ảnh concept cưới',
    subtitle: 'Và anh biết mình muốn cùng em đi đến cuối',
    description:
      '[Nội dung sẽ được cập nhật — Buổi chụp ảnh concept cưới. Nhìn em trong chiếc váy trắng, anh không nói được gì, chỉ biết rằng anh muốn được đứng bên em như thế — mãi mãi.]',
    images: ['concept_cuoi.jpg'],
    emoji: '💍',
    highlight: true,
    tags: ['Đặc biệt', 'Tương lai'],
  },
  {
    id: 11,
    order: 11,
    label: 'Hôm nay',
    title: 'Vẫn đang viết tiếp câu chuyện này',
    subtitle: '900 ngày, và còn nhiều hơn nữa phía trước',
    description:
      '[Nội dung sẽ được cập nhật — 900 ngày bên nhau. Anh không biết ngày mai sẽ ra sao, nhưng anh biết mình muốn mỗi ngày đều có em trong đó.]',
    images: ['loi_chuc_cua_em.jpg'],
    emoji: '❤️',
    highlight: true,
    tags: ['Hôm nay', '900 ngày'],
  },
];
