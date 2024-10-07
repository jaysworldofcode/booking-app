import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton
} from '@clerk/nextjs'
import './globals.css'
import { Button } from '@/components/ui/button'
import HomepageNavigationMenu from './components/homepage_navigation_menu'
import AboutUsSection from './components/about_us_section'
import OurServices from './components/our_services'
import HowItWorks from './components/how_it_works'
import Banner from './components/banner'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div>
      {/* header */}
      <Banner />
      <HomepageNavigationMenu />
      {/* content */}
      <div className='flex flex-col'>
        <AboutUsSection />
        <OurServices />
        <HowItWorks />
      </div>
    </div>
  )
}
