import React from 'react';
import ListGames from '@/app/components/dashboard/list-games';

export default function CalculatorsPage() {
    return (
        <div className="max-w-4xl mx-auto py-10 px-4">
            <h1 className="text-3xl font-bold  text-gray-900 mb-2">
                Games Module
            </h1>
            <p className="">
                Fun AI-related games to reinforce learned material.
            </p>
            <hr className="border-b border-gray-200 my-6 rounded" />
            <ListGames />
        </div>
    );
}
