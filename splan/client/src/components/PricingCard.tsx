import { useState } from "react";

interface Option {
    description: string;
    isEnabled: boolean;
}

interface PricingCardProps {
    planName: string;
    price: number;
    teamMembers: Option;
    cloudStorage: Option;
    integrationHelp: Option;
    sketchFiles: Option;
    apiAccess: Option;
}

function PricingCard({
    planName,
    price,
    teamMembers,
    cloudStorage,
    integrationHelp,
    sketchFiles,
    apiAccess,
}: PricingCardProps) {
    const renderOption = (option: Option) => (
        <li className={`flex ${option.isEnabled ? '' : 'line-through decoration-gray-500'}`}>
            <svg
                className={`flex-shrink-0 w-4 h-4 ${option.isEnabled ? 'text-green-700 dark:text-green-500' : 'text-gray-400 dark:text-gray-500'}`}
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
            >
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
            </svg>
            <span className={`text-base font-normal leading-tight text-gray-500 dark:text-gray-400 ms-3`}>{option.description}</span>
        </li>
    );

    return (
        <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-70    0 dark:border-gray-700">
            <h5 className="mb-4 text-xl font-medium text-gray-500 dark:text-gray-400">{planName}</h5>
            <div className="flex items-baseline text-gray-900 dark:text-white">
                <span className="text-3xl font-semibold">$</span>
                <span className="text-5xl font-extrabold tracking-tight">{price}</span>
                <span className="ms-1 text-xl font-normal text-gray-500 dark:text-gray-400">/month</span>
            </div>
            <ul role="list" className="space-y-5 my-7">
                {renderOption(teamMembers)}
                {renderOption(cloudStorage)}
                {renderOption(integrationHelp)}
                {renderOption(sketchFiles)}
                {renderOption(apiAccess)}
            </ul>
            <button
                type="button"
                className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-200 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-900 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex justify-center w-full text-center"
            >
                Choose plan
            </button>
        </div>
    );
}

export default PricingCard;
