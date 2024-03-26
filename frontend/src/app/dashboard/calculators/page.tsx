// import Image from 'next/image';
import React from 'react';
import ListCalculators from '@/app/components/dashboard/list-calculators';

export default function CalculatorssPage() {
    return (
        <div className="max-w-4xl mx-auto py-10 px-4">
            <h1 className="text-3xl font-bold  text-gray-900 mb-2">
                Calculators Module
            </h1>
            <p className="">
                Effortlessly calculate AI-related computations with
                interactive results.
            </p>
            <hr className="border-b border-gray-200 my-6 rounded" />
            <ListCalculators />
        </div>
    );
}
