'use client';

import {
    AcademicCapIcon,
    PuzzlePieceIcon,
    CalculatorIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.
const links = [
    {
        name: 'Explanations',
        href: '/dashboard/explanations',
        icon: AcademicCapIcon,
    },
    {
        name: 'Games',
        href: '/dashboard/games',
        icon: PuzzlePieceIcon,
    },
    {
        name: 'Calculators',
        href: '/dashboard/calculators',
        icon: CalculatorIcon,
    },
];

export default function NavLinks() {
    const pathname = usePathname();
    return (
        <>
            {links.map((link) => {
                const LinkIcon = link.icon;
                return (
                    <Link
                        key={link.name}
                        href={link.href}
                        className={clsx(
                            'flex h-[48px] grow items-center justify-center',
                            'gap-2 rounded-md bg-gray-50 p-3',
                            'text-sm font-medium hover:bg-blue-100',
                            'transition-colors duration-300',
                            'hover:text-blue-500 md:flex-none',
                            'md:justify-start md:p-2 md:px-3',
                            {
                                'bg-blue-100 text-blue-500': pathname
                                    ? pathname.includes(link.href) : false,
                            },
                        )}
                    >
                        <LinkIcon className="w-6" />
                        <p className="hidden md:block">{link.name}</p>
                    </Link>
                );
            })}
        </>
    );
}
