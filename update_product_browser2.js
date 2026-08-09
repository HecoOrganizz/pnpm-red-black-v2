import fs from 'fs';
import path from 'path';

const EN_BROWSER = {
  df1: { title: "Ultra-Fast Rendering", description: "Optimized engine loads web pages up to 3x faster." },
  df2: { title: "Built-in Ad Blocker", description: "Stops annoying ads and pop-ups automatically." },
  df3: { title: "Strict Privacy", description: "Blocks third-party trackers and fingerprinting scripts." },
  df4: { title: "Low RAM Usage", description: "Uses up to 50% less memory than other major browsers." },
  df5: { title: "Chromium Based", description: "Fully compatible with all Chrome web store extensions." },
  df6: { title: "Cloud Sync", description: "Sync your bookmarks and passwords securely across devices." },
  q1: "Is Zidimi Browser based on Chrome?",
  a1: "Zidimi Browser is built on the open-source Chromium project. This means it is fast, secure, and supports all Chrome extensions.",
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
};

const VI_BROWSER = {
  df1: { title: "Tải trang siêu tốc", description: "Lõi Chromium tối ưu giúp tải trang web nhanh gấp 3 lần." },
  df2: { title: "Chặn quảng cáo", description: "Loại bỏ hoàn toàn các quảng cáo và popup phiền phức." },
  df3: { title: "Bảo mật tuyệt đối", description: "Chặn các mã độc theo dõi và thu thập dữ liệu người dùng." },
  df4: { title: "Tiết kiệm RAM", description: "Sử dụng ít RAM hơn đến 50% nhờ cơ chế đóng băng tab thông minh." },
  df5: { title: "Tương thích Chrome", description: "Hỗ trợ cài đặt mọi tiện ích (extension) từ cửa hàng Chrome." },
  df6: { title: "Đồng bộ đám mây", description: "Đồng bộ hóa dấu trang và mật khẩu an toàn giữa các thiết bị." },
  q1: "Zidimi Browser có giống Google Chrome không?",
  a1: "Zidimi Browser sử dụng chung lõi mã nguồn mở Chromium. Tuy nhiên, chúng tôi đã loại bỏ các tính năng theo dõi ngầm và thêm trình chặn quảng cáo, giúp trình duyệt nhẹ và bảo mật hơn.",
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
};

const dir = path.join(process.cwd(), 'src', 'messages');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.json'));

for (const file of files) {
  const filePath = path.join(dir, file);
  const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  const t = file === 'vi.json' ? VI_BROWSER : EN_BROWSER;

  if (data.ProductDetail) {
    if (data.ProductDetail.detailedFeatures && data.ProductDetail.detailedFeatures.driver) {
      data.ProductDetail.detailedFeatures.browser = {
        df1: t.df1, df2: t.df2, df3: t.df3, df4: t.df4, df5: t.df5, df6: t.df6
      };
      delete data.ProductDetail.detailedFeatures.driver;
    }

    if (data.ProductDetail.faqs && data.ProductDetail.faqs.driver) {
      data.ProductDetail.faqs.browser = {
        q1: t.q1, a1: t.a1, q2: t.q2, a2: t.a2, q3: t.q3, a3: t.a3, q4: t.q4, a4: t.a4
      };
      delete data.ProductDetail.faqs.driver;
    }

    if (data.ProductDetail.howItWorks && data.ProductDetail.howItWorks.driver) {
      data.ProductDetail.howItWorks.browser = {
        h1t: t.h1t, h1d: t.h1d, h2t: t.h2t, h2d: t.h2d, h3t: t.h3t, h3d: t.h3d
      };
      delete data.ProductDetail.howItWorks.driver;
    }
  }

  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
  console.log(`Fixed ${file}`);
}
