import fs from 'fs';
import path from 'path';

const dir = path.join(process.cwd(), 'src', 'messages');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.json'));

for (const file of files) {
  const filePath = path.join(dir, file);
  const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  
  if (data.Footer && data.Footer.links && data.Footer.links.driverCheck) {
    data.Footer.links.browserCheck = file === 'vi.json' ? 'Kiểm tra Trình duyệt' : 'Browser Check';
    delete data.Footer.links.driverCheck;
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
    console.log(`Updated ${file}`);
  }
}
