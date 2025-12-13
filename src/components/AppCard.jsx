import React from 'react'
import PropTypes from 'prop-types'

const AppCard = ({
    imgSrc,
    title,
    tags,
    playStoreLink,
    plolicyLink,
    classes
}) => {
    return (
        <div className={"relative p-3 rounded-xl bg-zinc-800 hover:bg-zinc-700/50 active:bg-zinc-700/60 ring-1 ring-inset ring-zinc-50/5 transition-colors flex items-center gap-3 group " + classes}>
            
            <figure className="w-12 h-12 rounded-lg overflow-hidden shrink-0">
                <img
                    src={imgSrc}
                    alt={title}
                    loading='lazy'
                    className="w-full h-full object-cover scale-125"
                />
            </figure>

            <div className="flex-grow min-w-0">
                <h3 className="text-base font-medium text-zinc-200 truncate mb-1" title={title}>
                    {title}
                </h3>

                <div className="flex flex-wrap gap-1.5">
                    {tags.map((label, key) => (
                        <span
                            key={key}
                            className="text-xs text-zinc-400 bg-zinc-50/10 px-2 py-0.5 rounded"
                        >
                            {label}
                        </span>
                    ))}
                </div>
            </div>

            <a
                href={playStoreLink}
                target="_blank"
                rel="noreferrer"
                className="absolute inset-0 z-10"
                aria-label={`View ${title}`}
            ></a>

            <button
                className="w-8 h-8 rounded-lg grid place-items-center text-zinc-400 hover:text-zinc-100 hover:bg-zinc-50/10 z-20 transition-colors"
                onClick={(e) => {
                    e.stopPropagation(); 
                    window.open(plolicyLink, '_blank');
                }}
                aria-label="View Source Code"
                title="View Source Code"
            >
                <img
                    src="./images/privacyPolicy.png"
                    width={25}
                    height={25}
                    alt="github"
                    className='opacity-70 group-hover:opacity-100 transition-opacity'
                />
            </button>
        </div>
    )
}

AppCard.propTypes = {
    imgSrc: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    tags: PropTypes.array.isRequired,
    playStoreLink: PropTypes.string,
    plolicyLink: PropTypes.string,
    classes: PropTypes.string
}

export default AppCard