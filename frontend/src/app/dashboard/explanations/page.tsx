// import Image from 'next/image';
import React from 'react';
import List from '@/app/components/dashboard/list-explanations';

export default function ExplanationsPage() {
    return (
        <div className="max-w-4xl mx-auto py-10 px-4">
            <h1 className="text-3xl font-bold  text-gray-900 mb-2">
                Explanations Module
            </h1>
            <p className="">
                Interactive lessons with easy explanations of topics
                related to artificial intelligence.
            </p>
            <hr className="border-b border-gray-200 my-6 rounded" />
            <List />
            {/* <div className="space-y-8">
                <div className="">
                    <Image
                        src="/../../../../../public/tool-logo.png" // Replace with your image path
                        width={300}
                        height={200}
                        alt="Anti-Unification"
                        className="mx-auto" // Center the image
                        style={{ width: '300px', height: '200px' }} // Adjust size as needed
                    />
                    <h2 className="text-xl text-gray-800 mt-2">Anti-Unification</h2>
                </div>
            </div> */}
        </div>
    );
}
