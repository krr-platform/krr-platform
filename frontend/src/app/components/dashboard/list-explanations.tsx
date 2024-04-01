/* eslint-disable react/destructuring-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable jsx-a11y/no-redundant-roles */
import Link from 'next/link';

interface Item {
    id: number;
    name: string;
    shortDesc: string;
}

const explanations: Item[] = [
    {
        id: 1,
        name: 'Anti-Unification',
        shortDesc: 'The process of constructing a generalization'
            + ' common to two given symbolic expressions.',
    },
    // {
    //     id: 2,
    //     name: 'Unification',
    //     shortDesc: 'The process of making two different logical'
    //         + ' atomic expressions identical by finding a substitution.',
    // },
    // {
    //     id: 3,
    //     name: 'First-order Language',
    //     shortDesc: 'First-Order Logic speaks about objects, which'
    //         + ' are the domain of discourse or the universe.',
    // },
];
/* eslint-disable max-len */

export default function ListExplanations() {
    return (
        <ul role="list">
            {explanations.map((item: any) => (
                <li key={item.id} className="flex w-full justify-between gap-x-6 py-2">
                    <Link
                        className="flex w-full min-w-0 gap-x-4"
                        key={item.id}
                        href={`/dashboard/explanations/${item.name.toLowerCase().replace(/[()]/g, '').replace(/[\s]/g, '-')}`}
                    >
                        <div className="flex min-w-0 gap-x-4 group justify-between w-full">
                            <div className="p-2 pl-5 flex min-w-0 gap-x-4 border-2  w-full group-hover:bg-orange-50 group-hover:border-orange-500 rounded transition-colors duration-300">
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
