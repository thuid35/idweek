export default function robots() {
  const baseUrl = 'https://idweek.thuid.net';

  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
  
};