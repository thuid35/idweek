export default function robots() {
  const baseUrl = 'https://idweek.thuid.net'; // 請將此處替換為您的實際網域名稱

  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
};