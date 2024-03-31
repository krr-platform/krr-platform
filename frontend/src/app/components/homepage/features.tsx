/* eslint-disable max-len */
import {
    DocumentTextIcon, PuzzlePieceIcon, CalculatorIcon, UserIcon,
} from '@heroicons/react/24/outline';

const features = [
    {
        name: 'Carefully crafted explanations',
        description:
            'AI-topics explained in thorough detail in a comprehensive manner without required background knowledge.',
        icon: DocumentTextIcon,
    },
    {
        name: 'Interactive games',
        description:
            'Visually appealing games that enforce the knowledge gained through the explanations in a fun manner for both adults and kids.',
        icon: PuzzlePieceIcon,
    },
    {
        name: 'Intelligent calculators',
        description:
            'Calculators that use complex algorithms to solve artificial intelligence problems efficiently.',
        icon: CalculatorIcon,
    },
    {
        name: 'Personalized experience',
        description:
            'Track your progress and earn experience points for completing lessons and playing games.',
        icon: UserIcon,
    },
];

export default function Features() {
    return (
        <div className="bg-white py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl lg:text-center">
                    <h2 className="text-base font-semibold leading-7 text-blue-500">Learn faster</h2>
                    <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                        A platform where you can learn AI topics intuitively
                    </p>
                    <p className="mt-6 text-lg leading-8 text-gray-600">
                        Open-source platform that is intended to make high-quality Artificial Intelligence
                        education available to anyone from anywhere with ease.
                    </p>
                </div>
                <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
                    <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
                        {features.map((feature) => (
                            <div key={feature.name} className="relative pl-16">
                                <dt className="text-base font-semibold leading-7 text-gray-900">
                                    <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500">
                                        <feature.icon className="h-6 w-6 text-white" aria-hidden="true" />
                                    </div>
                                    {feature.name}
                                </dt>
                                <dd className="mt-2 text-base leading-7 text-gray-600">{feature.description}</dd>
                            </div>
                        ))}
                    </dl>
                </div>
            </div>
        </div>
    );
}
