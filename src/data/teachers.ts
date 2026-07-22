export interface Teacher {
  id: string;
  name: string;
  avatar: string;
  title: string;
  education: string; // Học vấn
  graduatedSchool: string; // Trường đã học
  currentTeaching: string; // Hiện đang giảng dạy
  bio: string; // Tiểu sử, kinh nghiệm, phương pháp
  certifications: string[]; // Chứng chỉ / Thành tích
  experienceYears: number;
  coursesTaught: {
    id: string;
    title: string;
  }[];
  rating: number;
  studentsCount: number;
}

export const mockTeachers: Teacher[] = [
  {
    id: "alex-nguyen",
    name: "ThS. Nguyễn Hoàng Anh (Teacher Alex)",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop",
    title: "Trưởng khoa Luyện thi IELTS & Tiếng Anh Học thuật",
    education: "Thạc sĩ Ngôn ngữ Anh Ứng dụng (Master of Applied Linguistics)",
    graduatedSchool: "Đại học Cambridge (University of Cambridge, UK) & ĐH Sư Phạm Hà Nội",
    currentTeaching: "Chuyên luyện thi IELTS Academic 7.5+ - 8.5+, Tiếng Anh Học thuật tại EngLearn Academy",
    bio: "Với hơn 12 năm kinh nghiệm luyện thi IELTS đỉnh cao, thầy Hoàng Anh đã trực tiếp dẫn dắt hơn 3,000 học viên đạt mốc IELTS 7.5+. Thầy sáng lập phương pháp tư duy Logic Paragraphing & Collocation Mapping giúp học viên bứt phá kỹ năng Writing & Speaking tự nhiên, chinh phục ban giám khảo quốc tế.",
    certifications: [
      "IELTS Overall 8.5 (Reading 9.0, Listening 9.0)",
      "Chứng chỉ Giảng dạy Quốc tế CELTA & Delta từ Cambridge",
      "Cố vấn Học thuật xuất sắc năm 2024 - 2025"
    ],
    experienceYears: 12,
    coursesTaught: [
      { id: "ielts-intensive-speaking", title: "IELTS 8.0+ Speaking & Writing Intensive" },
      { id: "academic-writing-university", title: "Academic Research Essay & Thesis Writing" }
    ],
    rating: 4.98,
    studentsCount: 3450
  },
  {
    id: "sarah-tran",
    name: "Cô Trần Minh Trang (Sarah Tran)",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=400&auto=format&fit=crop",
    title: "Chuyên gia Tiếng Anh Giao tiếp & Doanh Nghiệp",
    education: "Cử nhân Song ngữ Anh - Trung, Thạc sĩ Quản trị Kinh doanh (MBA)",
    graduatedSchool: "Đại học Ngoại Thương TP.HCM & Monash University (Australia)",
    currentTeaching: "Tiếng Anh Thương mại (Business English), Phỏng vấn Tuyển dụng & Thuyết trình Doanh nghiệp",
    bio: "Cô Minh Trang từng đảm nhiệm vị trí Giám đốc Đào tạo Nhân sự tại tập đoàn đa quốc gia. Phương pháp giảng dạy Case-study mô phỏng thực tế của cô giúp hàng ngàn người đi làm loại bỏ rào cản tâm lý, tự tin thương lượng hợp đồng và điều phối hội thảo quốc tế.",
    certifications: [
      "TOEIC Tuyệt đối 990/990",
      "Chứng chỉ Giảng dạy TESOL Australia",
      "Chuyên gia Huấn luyện Kỹ năng Mềm Corporate Trainer"
    ],
    experienceYears: 8,
    coursesTaught: [
      { id: "business-english-pro", title: "Business English for Working Professionals" },
      { id: "executive-job-interview", title: "Executive Job Interview & CV Masterclass" }
    ],
    rating: 4.95,
    studentsCount: 2800
  },
  {
    id: "david-do",
    name: "Thầy Đỗ Quốc Bảo (David Do)",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop",
    title: "Giảng viên Tiếng Anh Trẻ em & Phonics Starter",
    education: "Cử nhân Sư phạm Tiếng Anh Tiểu học & Giáo dục Sớm",
    graduatedSchool: "Đại học Sư Phạm TP.HCM",
    currentTeaching: "Tiếng Anh Tiểu học (Junior English), Luyện âm Phonics & Cambridge Starters/Movers",
    bio: "Thầy Quốc Bảo sở hữu phong cách giảng dạy truyền cảm hứng, vui nhộn và giàu năng lượng. Thầy kết hợp nhịp nhàng giữa bài hát Phonics, trò chơi tương tác và kể chuyện minh họa sinh động, giúp các bé tiểu học yêu thích tiếng Anh ngay từ những buổi học đầu tiên.",
    certifications: [
      "Huấn luyện viên Cambridge YLE (Starters/Movers/Flyers)",
      "Chứng chỉ TKT (Teaching Knowledge Test) Band 4",
      "Giải Giảng viên Tiên phong Giáo dục Tiểu học"
    ],
    experienceYears: 6,
    coursesTaught: [
      { id: "primary-english-fun", title: "Junior Kids Starter English" },
      { id: "primary-phonics-level-2", title: "Kids Phonics & Rhymes Level 2" },
      { id: "primary-cambridge-starters", title: "Cambridge English Starters (YLE)" }
    ],
    rating: 4.97,
    studentsCount: 1950
  },
  {
    id: "minh-vu",
    name: "Thầy Vũ Nhật Minh (Minh Vu)",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&auto=format&fit=crop",
    title: "Chuyên gia Luyện thi THPT Quốc Gia & VSTEP",
    education: "Cử nhân Sư phạm Tiếng Anh Chất lượng cao",
    graduatedSchool: "Đại học Sư Phạm Hà Nội",
    currentTeaching: "Đề thi THPT Quốc Gia 2026, VSTEP B2/C1 cho Sinh viên & Giáo viên",
    bio: "Thầy Nhật Minh nổi tiếng với chuỗi bài giảng tổng hợp 100+ bẫy ngữ pháp và ma trận từ vựng phân hóa cao trong kỳ thi THPT Quốc gia. Thầy đã hỗ trợ hàng ngàn thủ khoa, á khoa môn Tiếng Anh chạm mốc 9.8 - 10.0, hiện thực hóa ước mơ đỗ vào các trường đại học top đầu.",
    certifications: [
      "VSTEP C1 (9.5/10) & IELTS 8.5",
      "Giải Nhất HSG Quốc gia môn Tiếng Anh",
      "Tác giả bộ sách 'Bứt phá 9+ Tiếng Anh THPT QG'"
    ],
    experienceYears: 10,
    coursesTaught: [
      { id: "high-school-national-exam", title: "High School National Exam Mastery 2026" },
      { id: "vstep-speaking", title: "VSTEP B2/C1 Speaking & Writing" }
    ],
    rating: 4.96,
    studentsCount: 4200
  },
  {
    id: "elena-le",
    name: "Cô Lê Thanh Hà (Elena Le)",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400&auto=format&fit=crop",
    title: "Giảng viên Chuyên luyện TOEIC 900+ & Phát âm Chuẩn Mỹ",
    education: "Cử nhân Ngôn ngữ Anh & Thạc sĩ Phương pháp Giảng dạy (M.Ed)",
    graduatedSchool: "Đại học Hà Nội (HANU) & University of Melbourne (Australia)",
    currentTeaching: "TOEIC 750+/900+ Career Booster, American Accent & Pronunciation Doctor",
    bio: "Cô Thanh Hà áp dụng quy trình luyện nghe phản xạ 3 bước độc quyền giúp học viên tăng trung bình 250-350 điểm TOEIC chỉ sau 2 tháng. Cô cũng là cố vấn phát âm IPA chuẩn cho nhiều người dẫn chương trình truyền hình và diễn giả hội thảo.",
    certifications: [
      "TOEIC 990/990 Tuyệt đối",
      "Chứng chỉ Chuyên gia Phát âm IPA & International Accent Trainer",
      "Top 10 Giảng viên Đóng góp Xuất sắc EngLearn"
    ],
    experienceYears: 7,
    coursesTaught: [
      { id: "toeic-750-mastery", title: "TOEIC 750+ Career Booster" },
      { id: "toeic-900-mastery", title: "TOEIC 900+ Maximum Score Masterclass" },
      { id: "american-accent-pronunciation", title: "American Accent & Pronunciation Doctor" }
    ],
    rating: 4.94,
    studentsCount: 3100
  }
];
