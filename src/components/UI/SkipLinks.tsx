import React from 'react';

interface SkipLink {
  href: string;
  label: string;
}

interface SkipLinksProps {
  links?: SkipLink[];
  className?: string;
}

const defaultLinks: SkipLink[] = [
  { href: '#main-content', label: 'Skip to main content' },
  { href: '#navigation', label: 'Skip to navigation' },
  { href: '#search', label: 'Skip to search' },
  { href: '#footer', label: 'Skip to footer' }
];

const SkipLinks: React.FC<SkipLinksProps> = ({ 
  links = defaultLinks, 
  className = '' 
}) => {
  const handleSkipClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    
    const target = document.querySelector(href) as HTMLElement;
    if (target) {
      // Make the target focusable if it isn't already
      if (!target.hasAttribute('tabindex')) {
        target.setAttribute('tabindex', '-1');
      }
      
      target.focus();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      
      // Remove tabindex after focus to restore natural tab order
      setTimeout(() => {
        if (target.getAttribute('tabindex') === '-1') {
          target.removeAttribute('tabindex');
        }
      }, 100);
    }
  };

  return (
    <div className={`sr-only focus-within:not-sr-only ${className}`}>
      <div className="fixed top-4 left-4 z-50 flex flex-col space-y-2">
        {links.map((link, index) => (
          <a
            key={index}
            href={link.href}
            onClick={(e) => handleSkipClick(e, link.href)}
            className="bg-green-600 text-white px-4 py-2 rounded-lg font-medium shadow-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transform -translate-y-full focus:translate-y-0 transition-transform duration-200"
          >
            {link.label}
          </a>
        ))}
      </div>
    </div>
  );
};

export default SkipLinks;