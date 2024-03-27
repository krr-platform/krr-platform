/* eslint-disable react/destructuring-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable jsx-a11y/no-redundant-roles */
import Link from 'next/link';

import { ArrowRightCircleIcon } from '@heroicons/react/24/outline';

interface Item {
    id: number;
    name: string;
    shortDesc: string;
}

const calculators: Item[] = [
    {
        id: 1,
        name: 'Anti-Unification (First-Order Language)',
        shortDesc: 'Calculate the anti-unification of first-order'
            + ' language statements.',
    },
];
/* eslint-disable max-len */

export default function ListCalculators() {
    return (
        <ul role="list" className="divide-y divide-gray-100">
            {calculators.map((item: any) => (
                <li key={item.email} className="flex w-full justify-between gap-x-6 py-5">
                    <Link
                        className="flex w-full min-w-0 gap-x-4"
                        key={item.id}
                        href={`/dashboard/calculators/${item.name.toLowerCase().replace(/[()]/g, '').replace(/[\s()]/g, '-')}`}
                    >
                        <div className="flex min-w-0 gap-x-4 group justify-between w-full">
                            <div className="p-2 pl-5 flex min-w-0 gap-x-4 border-2 border-white w-full transition-colors duration-300 group-hover:bg-orange-50 group-hover:border-orange-500 group-hover:rounded">
                                <div className="min-w-0 flex-auto">
                                    <p className="text-base font-semibold leading-7 text-gray-950 group-hover:text-orange-500 transition-colors duration-300">{item.name}</p>
                                    <p className="mt-1 text-sm leading-5 text-gray-500">{item.shortDesc}</p>
                                </div>
                                <div className="group-hover:hidden flex-none rounded m-auto bg-white h-10 w-10 justify-end transition-colors duration-300" />
                                <div className="hidden group-hover:block flex-none rounded m-auto bg-orange-500 h-10 w-10 justify-end transition-colors duration-300">
                                    <ArrowRightCircleIcon className="text-orange-50" w-10 h-10 />
                                </div>
                            </div>
                        </div>
                    </Link>
                </li>
            ))}
        </ul>
    );
}
