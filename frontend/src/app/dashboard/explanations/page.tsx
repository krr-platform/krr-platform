import React from 'react';
import ListExplanations from '@/app/components/dashboard/list-explanations';

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
            <ListExplanations />
        </div>
    );
}
