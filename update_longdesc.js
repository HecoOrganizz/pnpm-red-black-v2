import fs from 'fs';
import path from 'path';

const dir = path.join(process.cwd(), 'src', 'messages');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.json'));

const enDesc = "Zidimi Browser is a next-generation web browser built on the Chromium engine but heavily optimized for speed, privacy, and low resource usage. With built-in AdBlock, strict anti-tracking, and a minimalist interface, it loads pages up to 3x faster than standard browsers while using 50% less RAM.";
const viDesc = "Zidimi Browser là trình duyệt web thế hệ mới, được xây dựng trên lõi Chromium nhưng tinh chỉnh tối đa về tốc độ, bảo mật và siêu nhẹ. Với trình chặn quảng cáo tích hợp sâu, cơ chế chống theo dõi và giao diện tối giản, Zidimi Browser tải trang nhanh gấp 3 lần đồng thời tiết kiệm 50% RAM so với các trình duyệt thông thường.";

for (const file of files) {
  const filePath = path.join(dir, file);
  const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  
  if (data.ProductDetail && data.ProductDetail.longDesc) {
    if (data.ProductDetail.longDesc.driver || !data.ProductDetail.longDesc.browser) {
      data.ProductDetail.longDesc.browser = file === 'vi.json' ? viDesc : enDesc;
      delete data.ProductDetail.longDesc.driver;
      fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
      console.log(`Updated longDesc in ${file}`);
    }
  }
}
