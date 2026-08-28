import React, { useEffect } from 'react';

export interface SEOHeadProps {
  title: string;
  description?: string;
  keywords?: string;
}

export const SEOHead: React.FC<SEOHeadProps> = ({
  title,
  description = 'Production React Vite TypeScript Frontend Setup & Enterprise Foundation',
  keywords = 'react, vite, typescript, tailwindcss, frontend-setup, enterprise',
}) => {
  useEffect(() => {
    const fullTitle = `${title} | React Vite Setup`;
    document.title = fullTitle;

    // Update meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', description);

    // Update meta keywords
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      metaKeywords = document.createElement('meta');
      metaKeywords.setAttribute('name', 'keywords');
      document.head.appendChild(metaKeywords);
    }
    metaKeywords.setAttribute('content', keywords);
  }, [title, description, keywords]);

  return null;
};
