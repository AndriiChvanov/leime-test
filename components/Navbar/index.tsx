'use client'

import { usePathname } from 'next/navigation'
import {
  Link,
  Navbar as HeroNavbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from '@heroui/react'

export function Navbar() {
  const pathname = usePathname()

  const isActive = (path: string) => pathname === path

  return (
    <HeroNavbar position="static">
      <NavbarBrand>
        <p className="font-bold text-inherit">MemeBook</p>
      </NavbarBrand>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem
          isActive={isActive('/')}
          className={isActive('/') ? 'text-blue-600' : 'text-gray-800'}
        >
          <Link color="foreground" href="/">
            Table
          </Link>
        </NavbarItem>
        <NavbarItem
          isActive={isActive('/list')}
          className={isActive('/list') ? 'text-blue-600' : 'text-gray-800'}
        >
          <Link color="foreground" href="/list">
            List
          </Link>
        </NavbarItem>
      </NavbarContent>
    </HeroNavbar>
  )
}
