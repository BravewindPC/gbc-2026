import { MetadataRoute } from 'next'
 
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://gbc-ubt-2024.vercel.app/',
      lastModified: new Date(),
    },
  ]
}