/* eslint-disable max-len */
import { PhotoIcon, GlobeEuropeAfricaIcon, LightBulbIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';

const features = [
    {
        name: 'Visually appealing explanations.',
        description:
            'We put intensive care to provide visuals that clarify the concepts in a friendly manner.',
        icon: PhotoIcon,
    },
    {
        name: 'Available online.',
        description: 'Our platform is available on the internet for anyone from anywhere to use and learn.',
        icon: GlobeEuropeAfricaIcon,
    },
    {
        name: 'Intuitive learning.',
        description: 'Explanations are cleverly written to be easy to comprehend for anyone regardless of their backgrounds.',
        icon: LightBulbIcon,
    },
];

export default function Example() {
    return (
        <div className="overflow-hidden bg-white py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
                    <div className="lg:pr-8 lg:pt-4">
                        <div className="lg:max-w-lg">
                            <h2 className="text-base font-semibold leading-7 text-blue-500">Learn faster</h2>
                            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Organized lessons</p>
                            <p className="mt-6 text-lg leading-8 text-gray-600">
                                Learn artificial intelligence topics with ease and comfort.
                            </p>
                            <dl className="mt-10 max-w-xl space-y-8 text-base leading-7 text-gray-600 lg:max-w-none">
                                {features.map((feature) => (
                                    <div key={feature.name} className="relative pl-9">
                                        <dt className="inline font-semibold text-gray-900">
                                            <feature.icon className="absolute left-1 top-1 h-5 w-5 text-blue-500" aria-hidden="true" />
                                            {feature.name}
                                        </dt>
                                        {' '}
                                        <dd className="inline">{feature.description}</dd>
                                    </div>
                                ))}
                            </dl>
                        </div>
                    </div>
                    <Image
                        src="https://i.imgur.com/aonLtAC.png"
                        alt="Product screenshot"
                        className="w-[48rem] max-w-none rounded-xl shadow-xl ring-1 ring-gray-400/10 sm:w-[57rem] md:-ml-4 lg:-ml-0"
                        width={2432}
                        height={1442}
                    />
                </div>
            </div>
        </div>
    );
}
