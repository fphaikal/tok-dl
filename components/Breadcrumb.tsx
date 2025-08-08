import Link from 'next/link'
import { ChevronRight, Home } from 'lucide-react'

interface BreadcrumbItem {
  label: string
  href?: string
}

interface BreadcrumbProps {
  items: BreadcrumbItem[]
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.label,
      item: item.href ? `https://tokdl.vercel.app${item.href}` : undefined
    }))
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <nav 
        className="flex items-center space-x-2 text-sm text-gray-600 mb-6"
        aria-label="Breadcrumb"
      >
        <Link 
          href="/" 
          className="flex items-center hover:text-blue-600 transition-colors"
          aria-label="Home"
        >
          <Home size={16} className="mr-1" />
          Home
        </Link>
        
        {items.slice(1).map((item, index) => (
          <div key={index} className="flex items-center">
            <ChevronRight size={16} className="mx-2 text-gray-400" />
            {item.href ? (
              <Link 
                href={item.href} 
                className="hover:text-blue-600 transition-colors"
              >
                {item.label}
              </Link>
            ) : (
              <span className="text-gray-900 font-medium">{item.label}</span>
            )}
          </div>
        ))}
      </nav>
    </>
  )
}
