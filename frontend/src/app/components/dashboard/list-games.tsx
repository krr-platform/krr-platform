/* eslint-disable react/destructuring-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable jsx-a11y/no-redundant-roles */
import Link from 'next/link';

interface Item {
    id: number;
    name: string;
    shortDesc: string;
}

const games: Item[] = [
    {
        id: 1,
        name: 'Anti-Unification (First-Order Language)',
        shortDesc: 'Learn Anti-Unification in more depth'
            + ' by playing an interactive game.',
    },
];
/* eslint-disable max-len */

export default function ListGames() {
    return (
        <ul role="list">
            {games.map((item: any) => (
                <li key={item.id} className="flex w-full justify-between gap-x-6 py-2">
                    <Link
                        className="flex w-full min-w-0 gap-x-4"
                        key={item.id}
                        href={`/dashboard/games/${item.name.toLowerCase().replace(/[()]/g, '').replace(/[\s()]/g, '-')}`}
                    >
                        <div className="flex min-w-0 gap-x-4 group justify-between w-full">
                            <div className="p-2 pl-5 flex min-w-0 gap-x-4 border-2 w-full transition-colors duration-300 group-hover:bg-orange-50 group-hover:border-orange-500 rounded">
                                <div className="min-w-0 flex-auto">
                                    <p className="text-base font-semibold leading-7 text-gray-950 group-hover:text-orange-500 transition-colors duration-300">
                                        {item.id}
                                        .
                                        {' '}
                                        {item.name}
                                    </p>
                                    <p className="mt-1 text-sm leading-5 text-gray-500">{item.shortDesc}</p>
                                </div>
                            </div>
                        </div>
                    </Link>
                </li>
            ))}
        </ul>
    );
}
