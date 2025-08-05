import React from 'react';
import PropTypes from 'prop-types';

const TimelineItem = ({ year, title, institution, university, percentage, isLast, index }) => {
    const isLeft = index % 2 === 0; // Start with left (index 0 = left, index 1 = right)
    
    return (
        <div className="relative">
            {/* Mobile Layout (default) */}
            <div className="md:hidden pl-10">
                {/* Timeline Connector and Dot */}
                <div className="absolute left-0 top-1 h-full">
                    <div className="w-4 h-4 bg-zinc-700 rounded-full ring-4 ring-zinc-900 relative">
                        {/* Horizontal line to content */}
                        <div className="absolute top-1/2 left-4 w-6 h-0.5 bg-zinc-700 transform -translate-y-0.5"></div>
                    </div>
                    {!isLast && <div className="h-full w-0.5 bg-zinc-700 mx-auto mt-1"></div>}
                </div>

                {/* Content */}
                <div className="mb-10 ml-4">
                    <p className="text-sm text-sky-400 font-semibold mb-2">{year}</p>
                    <h3 className="text-xl font-semibold text-white mb-1">{title}</h3>
                    <h4 className="text-md text-zinc-300 mb-1">{institution}</h4>
                    <p className="text-sm text-zinc-400 mb-2">{university}</p>
                    {percentage && (
                        <span className="inline-block bg-emerald-500/10 text-emerald-400 text-xs font-medium px-2.5 py-1 rounded-full">
                            {percentage}
                        </span>
                    )}
                </div>
            </div>

            {/* Desktop Layout (md and up) */}
            <div className="hidden md:block relative">
                {/* Timeline line - full height for all items except last */}
                {!isLast && (
                    <div className="absolute left-1/2 top-8 w-0.5 h-full bg-zinc-700 transform -translate-x-0.5"></div>
                )}
                
                <div className="flex items-start justify-center relative">
                    {/* Left Content */}
                    <div className={`w-1/2 pr-8 ${!isLeft ? 'invisible' : ''}`}>
                        {isLeft && (
                            <div className="text-right mb-5">
                                <p className="text-sm text-sky-400 font-semibold mb-2">{year}</p>
                                <h3 className="text-xl font-semibold text-white mb-1">{title}</h3>
                                <h4 className="text-md text-zinc-300 mb-1">{institution}</h4>
                                <p className="text-sm text-zinc-400 mb-2">{university}</p>
                                {percentage && (
                                    <span className="inline-block bg-emerald-500/10 text-emerald-400 text-xs font-medium px-2.5 py-1 rounded-full">
                                        {percentage}
                                    </span>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Center Dot */}
                    <div className="relative z-10">
                        <div className="w-4 h-4 bg-zinc-700 rounded-full ring-4 ring-zinc-900"></div>
                        {/* Horizontal line to content */}
                        <div className={`absolute top-1/2 w-6 h-0.5 bg-zinc-700 transform -translate-y-0.5 ${
                            isLeft ? 'right-4' : 'left-4'
                        }`}></div>
                    </div>

                    {/* Right Content */}
                    <div className={`w-1/2 pl-8 ${isLeft ? 'invisible' : ''}`}>
                        {!isLeft && (
                            <div className="text-left mb-5">
                                <p className="text-sm text-sky-400 font-semibold mb-2">{year}</p>
                                <h3 className="text-xl font-semibold text-white mb-1">{title}</h3>
                                <h4 className="text-md text-zinc-300 mb-1">{institution}</h4>
                                <p className="text-sm text-zinc-400 mb-2">{university}</p>
                                {percentage && (
                                    <span className="inline-block bg-emerald-500/10 text-emerald-400 text-xs font-medium px-2.5 py-1 rounded-full">
                                        {percentage}
                                    </span>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

TimelineItem.propTypes = {
    year: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    institution: PropTypes.string.isRequired,
    university: PropTypes.string.isRequired,
    percentage: PropTypes.string,
    isLast: PropTypes.bool,
    index: PropTypes.number.isRequired
};

export default TimelineItem;