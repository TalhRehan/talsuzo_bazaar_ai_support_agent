"use client"

import React, { FormEvent, useContext, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { CiUser } from "react-icons/ci"
import { FaRegHeart } from "react-icons/fa"
import { FaCartShopping } from "react-icons/fa6"
import { BsList } from "react-icons/bs"
import { useSession, signOut } from "next-auth/react"
import { CartContext } from "@/context/CartContext"
import { WishlistContext } from "@/context/WishlistContext"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export default function Navbar() {
  const router = useRouter()
  const { data: session, status } = useSession()
  const { numberOfCartItems } = useContext(CartContext)
  const { wishlistIds } = useContext(WishlistContext)
  const [desktopSearch, setDesktopSearch] = useState("")
  const [mobileSearch, setMobileSearch] = useState("")

  function mySignOut() {
    signOut({ redirect: true, callbackUrl: "/login" })
  }

  function submitSearch(event: FormEvent<HTMLFormElement>, value: string) {
    event.preventDefault()
    const query = value.trim()
    router.push(query ? `/shop?search=${encodeURIComponent(query)}` : "/shop")
  }

  return (
    <nav className="sticky top-0 z-50 bg-white border-b shadow-sm px-6 md:px-10 py-3">
      <div className="flex items-center justify-between">

        <Link href="/">
          <div className="flex items-center gap-2 font-bold text-xl text-gray-800">
            <FaCartShopping className="text-green-600" />
            <span>TalSuzo Bazaar</span>
          </div>
        </Link>

        <div className="hidden md:flex items-center gap-6">

          <form
            onSubmit={(event) => submitSearch(event, desktopSearch)}
            className="flex items-center border border-gray-200 rounded-full overflow-hidden"
          >
            <input
              type="text"
              placeholder="Search products..."
              value={desktopSearch}
              onChange={(event) => setDesktopSearch(event.target.value)}
              className="px-4 py-2 text-sm focus:outline-none w-56"
            />
            <button type="submit" className="bg-green-600 hover:bg-green-700 px-4 py-4 text-white transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </form>

          <Link href="/" className="text-sm font-medium text-gray-700 hover:text-green-600 transition-colors">Home</Link>
          <Link href="/shop" className="text-sm font-medium text-gray-700 hover:text-green-600 transition-colors">Shop</Link>
          <Link href="/support" className="text-sm font-medium text-gray-700 hover:text-green-600 transition-colors">Support</Link>

          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="text-sm font-medium text-gray-700 hover:text-green-600 bg-transparent p-0">
                  Categories
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="w-[200px] p-2">
                    {[
                      { name: "All Categories", href: "/categories" },
                      { name: "Electronics", href: "/categories/6439d2d167d9aa4ca970649f" },
                      { name: "Women's Fashion", href: "/categories/6439d58a0049ad0b52b9003f" },
                      { name: "Men's Fashion", href: "/categories/6439d5b90049ad0b52b90048" },
                      { name: "Beauty & Health", href: "/categories/beauty" },
                    ].map((item) => (
                      <li key={item.name}>
                        <NavigationMenuLink
                          render={
                            <Link href={item.href}>
                              <div className="px-3 py-2 text-sm rounded-md hover:bg-green-50 hover:text-green-700 transition-colors cursor-pointer">
                                {item.name}
                              </div>
                            </Link>
                          }
                        />
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          <Link href="/brands" className="text-sm font-medium text-gray-700 hover:text-green-600 transition-colors">Brands</Link>

          <Link href="/wishlist" className="relative text-gray-500 hover:text-red-500 transition-colors">
            <FaRegHeart className="text-xl" />
            {wishlistIds.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {wishlistIds.length}
              </span>
            )}
          </Link>

          <Link href="/cart" className="relative text-gray-500 hover:text-green-600 transition-colors">
            <FaCartShopping className="text-xl" />
            {numberOfCartItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {numberOfCartItems}
              </span>
            )}
          </Link>

          {status === "unauthenticated" ? (
            <Link
              href="/login"
              className="bg-green-600 hover:bg-green-700 text-white text-sm font-medium px-5 py-2 rounded-full flex items-center gap-2 transition-colors"
            >
              <CiUser className="text-base" />
              Sign In
            </Link>
          ) : (
            <div className="flex items-center gap-3">
              <Link
                href="/profile/addresses"
                className="w-9 h-9 rounded-full border border-gray-200 bg-gray-50 hover:bg-green-50 hover:border-green-300 flex items-center justify-center text-gray-500 hover:text-green-600 transition-colors"
              >
                <CiUser className="text-xl" />
              </Link>

              <button
                onClick={mySignOut}
                className="bg-green-600 hover:bg-green-700 text-white text-sm font-medium px-5 py-2 rounded-full flex items-center gap-2 transition-colors"
              >
                Logout
              </button>
            </div>
          )}
        </div>

        <Sheet>
          <SheetTrigger className="md:hidden bg-green-500 text-white size-10 rounded-full flex items-center justify-center">
            <BsList className="text-xl" />
          </SheetTrigger>

          <SheetContent side="right" className="w-[300px] p-0 flex flex-col">

            <div className="flex items-center px-5 py-4 border-b">
              <div className="flex items-center gap-2 font-bold text-xl text-gray-800">
                <FaCartShopping className="text-green-600" />
                <span>TalSuzo Bazaar</span>
              </div>
            </div>

            <div className="px-5 py-4 border-b">
              <form
                onSubmit={(event) => submitSearch(event, mobileSearch)}
                className="flex items-center border border-gray-200 rounded-lg overflow-hidden"
              >
                <input
                  type="text"
                  placeholder="Search products..."
                  value={mobileSearch}
                  onChange={(event) => setMobileSearch(event.target.value)}
                  className="flex-1 px-4 py-2 text-sm focus:outline-none"
                />
                <button type="submit" className="bg-green-600 px-3 py-3 text-white">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
              </form>
            </div>

            <div className="flex flex-col px-2 py-2 border-b">
              {[
                { name: "Home", href: "/" },
                { name: "Shop", href: "/shop" },
                { name: "Support", href: "/support" },
                { name: "Categories", href: "/categories" },
                { name: "Brands", href: "/brands" },
              ].map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="px-4 py-3 text-gray-700 text-sm font-medium rounded-lg hover:bg-green-50 hover:text-green-700 transition-colors"
                >
                  {item.name}
                </Link>
              ))}
            </div>

            <div className="flex flex-col px-2 py-2 border-b">
              <Link
                href="/wishlist"
                className="flex items-center gap-3 px-4 py-3 text-gray-700 text-sm font-medium rounded-lg hover:bg-red-50 hover:text-red-500 transition-colors"
              >
                <FaRegHeart className="text-red-400 text-base" />
                Wishlist
                {wishlistIds.length > 0 && (
                  <span className="ml-auto bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                    {wishlistIds.length}
                  </span>
                )}
              </Link>
              <Link
                href="/cart"
                className="flex items-center gap-3 px-4 py-3 text-gray-700 text-sm font-medium rounded-lg hover:bg-green-50 hover:text-green-700 transition-colors"
              >
                <FaCartShopping className="text-green-600 text-base" />
                Cart
                {numberOfCartItems > 0 && (
                  <span className="ml-auto bg-green-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                    {numberOfCartItems}
                  </span>
                )}
              </Link>
              {status === "authenticated" && (
                <Link
                  href="/profile/addresses"
                  className="flex items-center gap-3 px-4 py-3 text-gray-700 text-sm font-medium rounded-lg hover:bg-green-50 hover:text-green-700 transition-colors"
                >
                  <CiUser className="text-green-600 text-base" />
                  My Account
                </Link>
              )}
            </div>

            <div className="px-5 py-4 flex gap-3">
              {status === "unauthenticated" ? (
                <>
                  <Link
                    href="/login"
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white text-sm font-medium py-2 rounded-full text-center transition-colors"
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/register"
                    className="flex-1 border border-green-600 text-green-600 hover:bg-green-50 text-sm font-medium py-2 rounded-full text-center transition-colors"
                  >
                    Sign Up
                  </Link>
                </>
              ) : status === "authenticated" ? (
                <div className="flex flex-col gap-3 w-full">
                  <div className="flex items-center gap-3 px-1">
                    <div className="w-9 h-9 rounded-full bg-green-100 flex items-center justify-center">
                      <CiUser className="text-green-700 text-xl" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-gray-800">
                        {session?.user?.name ?? "User"}
                      </div>
                      <div className="text-xs text-gray-400">
                        {session?.user?.email ?? ""}
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={mySignOut}
                    className="w-full bg-red-500 hover:bg-red-600 text-white text-sm font-medium py-2 rounded-full transition-colors"
                  >
                    Logout
                  </button>
                </div>
              ) : null}
            </div>

            <div className="mt-auto px-5 py-4 border-t">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-green-50 border border-green-200 flex items-center justify-center">
                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                      d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <div className="leading-tight">
                  <div className="text-sm font-medium text-gray-800">Need Help?</div>
<Link href="/support" className="text-xs text-green-600 hover:underline">Contact Support</Link>
                </div>
              </div>
            </div>

          </SheetContent>
        </Sheet>

      </div>
    </nav>
  )
}
