'use client';

import { useState } from 'react';
import { Bars3Icon } from '@heroicons/react/24/outline';
import UserLogin from './UserLogin';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle
} from '@/components/ui/drawer';

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header>
      <nav
        aria-label="Global"
        className={cn(
          'mx-auto flex max-w-6xl items-center justify-between px-5 py-5 md:py-6 transition-all'
        )}
      >
        <div className="flex lg:flex-1">
          <Link
            href="/"
            className="group flex gap-5 md:gap-10 items-center grow-0"
          >
            <span className="sr-only">Trener</span>
            <span className="md:text-lg font-medium !leading-none">
              Trener <span className="block">Personalny</span>
            </span>

            <p className="text-slate-600 hidden md:block">
              Wyszukiwarka trenerów
            </p>
          </Link>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon aria-hidden="true" className="h-6 w-6" />
          </button>
        </div>

        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <UserLogin />
        </div>
      </nav>

      {/* mobile menu */}
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerContent className="px-5 pb-10">
          <DrawerHeader className="text-left px-0 py-2">
            <DrawerTitle className="mb-5">Opcje</DrawerTitle>
          </DrawerHeader>
          <div className="space-y-4">
            <Link
              href="/"
              className="text-lg block"
              onClick={() => setOpen(!open)}
            >
              Wyszukaj trenera
            </Link>
            <div onClick={() => setOpen(!open)}>
              <UserLogin />
            </div>
            <Link
              href="/zapytaj-trenera"
              className="text-lg block"
              onClick={() => setOpen(!open)}
            >
              Porady trenerów
            </Link>
          </div>
        </DrawerContent>
      </Drawer>
    </header>
  );
}
