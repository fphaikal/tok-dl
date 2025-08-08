// Google Analytics 4 configuration
export const GA_MEASUREMENT_ID = 'G-XXXXXXXXXX' // Replace with your actual GA4 measurement ID

// Google Analytics 4 gtag events
export const pageview = (url: string) => {
  if (typeof window !== 'undefined') {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (window as any).gtag('config', GA_MEASUREMENT_ID, {
      page_path: url,
    })
  }
}

export const event = ({ action, category, label, value }: {
  action: string
  category: string
  label?: string
  value?: number
}) => {
  if (typeof window !== 'undefined') {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (window as any).gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    })
  }
}

// Track download events
export const trackDownload = (videoUrl: string, quality: string) => {
  event({
    action: 'download_video',
    category: 'engagement',
    label: `${quality}_quality`,
    value: 1
  })
}

// Track search events
export const trackSearch = () => {
  event({
    action: 'search_video',
    category: 'engagement',
    label: 'tiktok_url_search',
    value: 1
  })
}
