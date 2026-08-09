import fs from 'fs';
import path from 'path';

const EN_BROWSER = {
  Products: {
    name: "Zidimi Browser",
    tagline: "Fast & Private Web Browser",
    description: "Experience the web without ads, trackers, or interruptions. Built for speed and maximum privacy.",
    features: [
      "Built-in Ad Blocker",
      "Anti-Tracking Engine",
      "Low RAM & CPU Usage",
      "Free VPN (Coming soon)"
    ]
  },
  Metadata: {
    title: "Zidimi Browser — Fast & Private Web Browser",
    description: "Browse the web safely with Zidimi Browser. Built-in ad blocker, tracking protection, and optimized for low RAM usage. Download free today."
  },
  Reqs: {
    os: "Windows 11, 10, 8.1, 7",
    cpu: "1 GHz or faster",
    ram: "512 MB minimum",
    disk: "100 MB free space",
    internet: "Required for web browsing"
  },
  ProductDetail: {
    title: "Zidimi Browser",
    description: "Zidimi Browser is a next-generation web browser built on the Chromium engine but heavily optimized for speed, privacy, and low resource usage. With built-in AdBlock, strict anti-tracking, and a minimalist interface, it loads pages up to 3x faster than standard browsers while using 50% less RAM.",
    df1: { title: "Ultra-Fast Rendering", description: "Optimized engine loads web pages up to 3x faster." },
    df2: { title: "Built-in Ad Blocker", description: "Stops annoying ads and pop-ups automatically." },
    df3: { title: "Strict Privacy", description: "Blocks third-party trackers and fingerprinting scripts." },
    df4: { title: "Low RAM Usage", description: "Uses up to 50% less memory than other major browsers." },
    df5: { title: "Chromium Based", description: "Fully compatible with all Chrome web store extensions." },
    df6: { title: "Cloud Sync", description: "Sync your bookmarks and passwords securely across devices." },
    q1: "Is Zidimi Browser based on Chrome?",
    a1: "Zidimi Browser is built on the open-source Chromium project (same foundation as Chrome and Edge). This means it is fast, secure, and supports all Chrome extensions.",
    q2: "Can I install my Chrome extensions?",
    a2: "Yes! Zidimi Browser is fully compatible with the Chrome Web Store. You can install all your favorite extensions with a single click.",
    q3: "How does it use less RAM?",
    a3: "We've optimized the background processes and implemented aggressive tab sleeping for inactive tabs, reducing memory footprint by up to 50%.",
    q4: "Is the ad blocker free?",
    a4: "Yes, the ad blocker and tracking protection are built directly into the browser core and are completely free forever.",
    h1t: "Download & Install",
    h1d: "Get the lightweight 85MB installer and set up Zidimi Browser in under 30 seconds.",
    h2t: "Import Your Data",
    h2d: "Easily import your bookmarks, passwords, and history from your old browser.",
    h3t: "Browse Securely",
    h3d: "Enjoy a faster, ad-free web experience with maximum privacy protection."
  },
  Review: "I downloaded Zidimi Browser for faster surfing. It blocks ads perfectly and uses way less RAM than Chrome. The UI is clean and extensions work great. Highly recommended!"
};

const VI_BROWSER = {
  Products: {
    name: "Zidimi Browser",
    tagline: "Trình duyệt web Nhanh & Bảo mật",
    description: "Trải nghiệm web không quảng cáo, không theo dõi. Tối ưu tốc độ và siêu nhẹ cho máy tính.",
    features: [
      "Chặn quảng cáo tích hợp",
      "Chống theo dõi (Anti-Tracking)",
      "Siêu nhẹ, ngốn ít RAM",
      "VPN miễn phí (Sắp ra mắt)"
    ]
  },
  Metadata: {
    title: "Zidimi Browser — Trình duyệt web siêu nhẹ, không quảng cáo",
    description: "Lướt web an toàn với Zidimi Browser. Tích hợp chặn quảng cáo, bảo vệ quyền riêng tư và tối ưu RAM. Tải miễn phí ngay hôm nay."
  },
  Reqs: {
    os: "Windows 11, 10, 8.1, 7",
    cpu: "Từ 1 GHz trở lên",
    ram: "Tối thiểu 512 MB",
    disk: "100 MB dung lượng trống",
    internet: "Yêu cầu kết nối mạng"
  },
  ProductDetail: {
    title: "Zidimi Browser",
    description: "Zidimi Browser là trình duyệt web thế hệ mới, được xây dựng trên lõi Chromium nhưng tinh chỉnh tối đa về tốc độ, bảo mật và siêu nhẹ. Với trình chặn quảng cáo tích hợp sâu, cơ chế chống theo dõi và giao diện tối giản, Zidimi Browser tải trang nhanh gấp 3 lần đồng thời tiết kiệm 50% RAM so với các trình duyệt thông thường.",
    df1: { title: "Tải trang siêu tốc", description: "Lõi Chromium tối ưu giúp tải trang web nhanh gấp 3 lần." },
    df2: { title: "Chặn quảng cáo", description: "Loại bỏ hoàn toàn các quảng cáo và popup phiền phức." },
    df3: { title: "Bảo mật tuyệt đối", description: "Chặn các mã độc theo dõi và thu thập dữ liệu người dùng." },
    df4: { title: "Tiết kiệm RAM", description: "Sử dụng ít RAM hơn đến 50% nhờ cơ chế đóng băng tab thông minh." },
    df5: { title: "Tương thích Chrome", description: "Hỗ trợ cài đặt mọi tiện ích (extension) từ cửa hàng Chrome." },
    df6: { title: "Đồng bộ đám mây", description: "Đồng bộ hóa dấu trang và mật khẩu an toàn giữa các thiết bị." },
    q1: "Zidimi Browser có giống Google Chrome không?",
    a1: "Zidimi Browser sử dụng chung lõi mã nguồn mở Chromium với Chrome và Edge. Tuy nhiên, chúng tôi đã loại bỏ các tính năng theo dõi ngầm và thêm vào trình chặn quảng cáo, giúp trình duyệt nhẹ và bảo mật hơn.",
    q2: "Tôi có thể cài tiện ích (extension) không?",
    a2: "Hoàn toàn có thể! Zidimi Browser tương thích 100% với Cửa hàng Chrome trực tuyến. Bạn có thể cài đặt bất kỳ extension nào chỉ với 1 click.",
    q3: "Tại sao trình duyệt này lại ít ngốn RAM?",
    a3: "Zidimi Browser tự động đóng băng các tab không sử dụng (Tab Sleeping) và tối ưu hóa tiến trình nền, giúp tiết kiệm đến 50% bộ nhớ.",
    q4: "Tính năng chặn quảng cáo có miễn phí không?",
    a4: "Có, trình chặn quảng cáo được tích hợp sâu vào nhân trình duyệt và hoàn toàn miễn phí vĩnh viễn.",
    h1t: "Tải & Cài đặt",
    h1d: "Tải bộ cài siêu nhẹ 85MB và cài đặt Zidimi Browser chỉ trong vòng 30 giây.",
    h2t: "Nhập dữ liệu cũ",
    h2d: "Dễ dàng chuyển dấu trang, mật khẩu và lịch sử từ trình duyệt cũ sang.",
    h3t: "Lướt web an toàn",
    h3d: "Tận hưởng trải nghiệm lướt web nhanh hơn, không quảng cáo và hoàn toàn riêng tư."
  },
  Review: "Mình chuyển sang dùng Zidimi Browser để lướt web nhanh hơn. Chặn quảng cáo rất tốt và ăn cực kỳ ít RAM so với Chrome. Cài extension bình thường, rất đáng dùng!"
};

const dir = path.join(process.cwd(), 'src', 'messages');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.json'));

for (const file of files) {
  const filePath = path.join(dir, file);
  const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  const t = file === 'vi.json' ? VI_BROWSER : EN_BROWSER;

  // 1. Products.items
  if (data.Products && data.Products.items && data.Products.items.driver) {
    data.Products.items.browser = t.Products;
    delete data.Products.items.driver;
  }

  // 2. Metadata.products
  if (data.Metadata && data.Metadata.products && data.Metadata.products.driver) {
    data.Metadata.products.browser = t.Metadata;
    delete data.Metadata.products.driver;
  }

  // 3. ProductDetail.reqs
  if (data.ProductDetail && data.ProductDetail.reqs && data.ProductDetail.reqs.driver) {
    data.ProductDetail.reqs.browser = t.Reqs;
    delete data.ProductDetail.reqs.driver;
  }

  // 4. ProductDetail.items (Browser details)
  if (data.ProductDetail && data.ProductDetail.items && data.ProductDetail.items.driver) {
    data.ProductDetail.items.browser = t.ProductDetail;
    delete data.ProductDetail.items.driver;
  }

  // 5. Review r3
  if (data.Reviews && data.Reviews.items && data.Reviews.items.r3) {
    data.Reviews.items.r3.text = t.Review;
  }

  // Handle homepage array if it mentions "driver updater"
  // E.g., Metadata.defaultKeywords
  if (data.Metadata && data.Metadata.defaultKeywords) {
    data.Metadata.defaultKeywords = data.Metadata.defaultKeywords.map(k => 
      k.toLowerCase().includes('driver') ? 'web browser' : k
    );
  }
  
  if (data.Metadata && data.Metadata.defaultDescription) {
    data.Metadata.defaultDescription = data.Metadata.defaultDescription.replace('driver updates', 'web browsing');
    data.Metadata.defaultDescription = data.Metadata.defaultDescription.replace('cập nhật driver', 'lướt web nhanh');
  }
  if (data.Metadata && data.Metadata.home && data.Metadata.home.description) {
    data.Metadata.home.description = data.Metadata.home.description.replace('driver updates', 'web browsing');
    data.Metadata.home.description = data.Metadata.home.description.replace('cập nhật driver', 'lướt web nhanh');
  }
  if (data.Hero && data.Hero.subtitle) {
    data.Hero.subtitle = data.Hero.subtitle.replace('driver updates', 'web browser');
    data.Hero.subtitle = data.Hero.subtitle.replace('cập nhật driver', 'trình duyệt web');
  }

  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
  console.log(`Updated ${file}`);
}
