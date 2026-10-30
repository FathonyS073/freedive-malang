import '../styles/main.css'

// Navbar digunakan bersama pada semua halaman FDM.
const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/tentang/' },
  { label: 'Activities', href: '/kegiatan/' },
  { label: 'Gallery', href: '/galeri/' },
  { label: 'Contact', href: '/kontak/' },
]

const currentPath = window.location.pathname === '/'
  ? '/'
  : `/${window.location.pathname.split('/').filter(Boolean).join('/')}/`

function makeNavLink({ label, href }, isMobile = false) {
  const isActive = currentPath === href
  const state = isActive
    ? 'text-ocean font-bold'
    : 'text-ink font-semibold hover:text-ocean'
  const layout = isMobile
    ? 'block rounded-xl px-4 py-3 text-[15px] hover:bg-slate-50'
    : 'text-[14px] leading-none transition-colors duration-200'

  return `<a href="${href}" ${isActive ? 'aria-current="page"' : ''}
    class="${layout} ${state} focus-visible:rounded-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ocean">${label}</a>`
}

const planeIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
  viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"
  stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
  <path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/>
</svg>`

function makeCTA(isMobile = false) {
  return `<a href="/kontak/"
    class="${isMobile ? 'w-full justify-center' : ''} inline-flex items-center gap-2 rounded-full bg-ocean px-[22px] py-[12px] text-[13px] font-semibold leading-none text-white shadow-[0_2px_5px_rgba(4,53,101,0.12)] transition-colors duration-200 hover:bg-[#06457e] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ocean">
    Hubungi FDM ${planeIcon}</a>`
}

const headerMount = document.querySelector('#site-header')

if (headerMount) {
  headerMount.innerHTML = `
    <header class="relative border-b border-slate-100 bg-white shadow-[0_1px_3px_rgba(8,40,74,0.06)]">
      <div class="mx-auto grid h-[70px] w-full max-w-[1280px] grid-cols-[1fr_auto] items-center px-5 sm:px-7 lg:h-[76px] lg:grid-cols-[1fr_auto_1fr] lg:px-4">
        <!-- Logo resmi FDM dari file asli -->
        <a href="/" aria-label="Malang Freediving Community — Home" class="inline-flex w-fit items-center rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ocean">
          <img src="/images/fdm-logo.png" alt="Malang Freedive" width="108" height="54"
               class="h-[52px] w-[104px] object-fill lg:h-[54px] lg:w-[108px]" />
        </a>

        <!-- Centered desktop navigation -->
        <nav aria-label="Navigasi utama" class="hidden items-center gap-10 lg:flex">
          ${navLinks.map(link => makeNavLink(link)).join('')}
        </nav>

        <div class="hidden justify-end lg:flex">
          ${makeCTA()}
        </div>

        <button id="menu-toggle" type="button" aria-label="Buka menu navigasi"
          aria-expanded="false" aria-controls="mobile-navigation"
          class="flex h-11 w-11 items-center justify-center justify-self-end rounded-xl text-ink transition-colors hover:bg-slate-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ocean lg:hidden">
          <svg id="icon-menu" xmlns="http://www.w3.org/2000/svg" width="25" height="25"
            viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"
            stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="M4 6h16M4 12h16M4 18h16"/>
          </svg>
          <svg id="icon-close" xmlns="http://www.w3.org/2000/svg" width="25" height="25"
            viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"
            stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" class="hidden">
            <path d="M18 6 6 18M6 6l12 12"/>
          </svg>
        </button>
      </div>

      <!-- Mobile menu: hidden by default -->
      <nav id="mobile-navigation" aria-label="Navigasi mobile"
        class="absolute inset-x-0 top-full hidden border-t border-slate-100 bg-white px-5 pb-6 pt-3 shadow-[0_12px_24px_rgba(8,40,74,0.10)] lg:hidden">
        <div class="mx-auto flex max-w-[1280px] flex-col gap-1">
          ${navLinks.map(link => makeNavLink(link, true)).join('')}
          <div class="mt-3 px-3">${makeCTA(true)}</div>
        </div>
      </nav>
    </header>`

  const toggle = document.querySelector('#menu-toggle')
  const mobileNav = document.querySelector('#mobile-navigation')
  const menuIcon = document.querySelector('#icon-menu')
  const closeIcon = document.querySelector('#icon-close')

  const setMenuOpen = (open) => {
    toggle.setAttribute('aria-expanded', String(open))
    toggle.setAttribute('aria-label', open ? 'Tutup menu navigasi' : 'Buka menu navigasi')
    mobileNav.classList.toggle('hidden', !open)
    menuIcon.classList.toggle('hidden', open)
    closeIcon.classList.toggle('hidden', !open)
  }

  toggle.addEventListener('click', () => {
    setMenuOpen(toggle.getAttribute('aria-expanded') !== 'true')
  })

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') setMenuOpen(false)
  })

  document.addEventListener('click', (event) => {
    if (!headerMount.contains(event.target)) setMenuOpen(false)
  })

  window.matchMedia('(min-width: 1024px)').addEventListener('change', (event) => {
    if (event.matches) setMenuOpen(false)
  })
}
