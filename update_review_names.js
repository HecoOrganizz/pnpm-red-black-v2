import fs from 'fs';
import path from 'path';

const newProfiles = {
  r1: { name: "Alex Johnson", city: "New York" },
  r2: { name: "Sarah Williams", city: "London" },
  r3: { name: "Michael Davis", city: "Berlin" },
  r4: { name: "Emily Chen", city: "Toronto" },
  r5: { name: "David Smith", city: "Sydney" },
  r6: { name: "Jessica Taylor", city: "Chicago" }
};

const dir = path.join(process.cwd(), 'src', 'messages');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.json'));

for (const file of files) {
  const filePath = path.join(dir, file);
  const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  
  if (data.Reviews && data.Reviews.items) {
    for (const [key, profile] of Object.entries(newProfiles)) {
      if (data.Reviews.items[key]) {
        // Update name
        data.Reviews.items[key].name = profile.name;
        
        // Update city in role
        const roleStr = data.Reviews.items[key].role;
        if (roleStr && roleStr.includes(' · ')) {
          const parts = roleStr.split(' · ');
          parts[1] = profile.city;
          data.Reviews.items[key].role = parts.join(' · ');
        } else {
          // Fallback if no dot
          data.Reviews.items[key].role += ` · ${profile.city}`;
        }
      }
    }
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
    console.log(`Updated ${file}`);
  }
}
