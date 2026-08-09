import fs from 'fs';
import path from 'path';

const translations = {
  'en.json': "Discover what users are saying about their experience with Zidimi.",
  'vi.json': "Khám phá những chia sẻ từ người dùng về trải nghiệm với Zidimi.",
  'fr.json': "Découvrez ce que les utilisateurs disent de leur expérience avec Zidimi.",
  'de.json': "Erfahren Sie, was Benutzer über ihre Erfahrungen mit Zidimi sagen.",
  'it.json': "Scopri cosa dicono gli utenti della loro esperienza con Zidimi.",
  'ja.json': "Zidimiのユーザーエクスペリエンスについての感想をご覧ください。",
  'ko.json': "Zidimi 사용 경험에 대한 사용자들의 의견을 확인해보세요.",
  'lo.json': "ຄົ້ນພົບວ່າຜູ້ໃຊ້ເວົ້າຫຍັງກ່ຽວກັບປະສົບການຂອງເຂົາເຈົ້າກັບ Zidimi.",
  'ru.json': "Узнайте, что говорят пользователи о своем опыте работы с Zidimi.",
  'zh.json': "探索用户对 Zidimi 使用体验的评价。"
};

const dir = path.join(process.cwd(), 'src', 'messages');

for (const [file, text] of Object.entries(translations)) {
  const filePath = path.join(dir, file);
  if (fs.existsSync(filePath)) {
    const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    if (data.Reviews && data.Reviews.subtitle) {
      data.Reviews.subtitle = text;
      fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
      console.log(`Updated ${file}`);
    }
  }
}
