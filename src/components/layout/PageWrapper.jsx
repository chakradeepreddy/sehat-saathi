// src/components/layout/PageWrapper.jsx
// ─────────────────────────────────────────────────────────────
// Wraps every page with consistent padding, max-width, and
// bottom spacing to clear the fixed bottom nav bar.
// Also applies the fade-in-up animation to every page transition.
// ─────────────────────────────────────────────────────────────

/**
 * @param {object} props
 * @param {React.ReactNode} props.children
 * @param {string}  [props.className]
 * @param {boolean} [props.noPadding=false]  - For full-bleed pages
 * @param {boolean} [props.noNavOffset=false] - For pages without bottom nav
 */
const PageWrapper = ({
  children,
  className = '',
  noPadding = false,
  noNavOffset = false,
}) => {
  return (
    <main
      className={[
        'w-full lg:w-[calc(100%-16rem)] min-h-[100dvh] bg-[var(--color-background)] transition-all duration-300',
        'lg:ml-64', // Offset for desktop sidebar
        !noPadding ? 'p-4 lg:p-8' : '',
        !noNavOffset ? 'pb-safe-nav lg:pb-8' : '', // Bottom nav padding on mobile, regular on desktop
        className,
      ].join(' ')}
    >
      {children}
    </main>
  )
}

export default PageWrapper
