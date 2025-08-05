import React from 'react';
import PropTypes from 'prop-types';

const AwardCard = ({ imgSrc, title, date, issuer, description, classes }) => {
  return (
    // <-- Modern card container with subtle hover effect
    <div 
      className={`bg-zinc-800/50 p-6 rounded-lg ring-1 ring-white/10 hover:ring-sky-400 transition-all duration-300 ${classes}`}
    >
      <div className="flex items-start gap-4">
        {/* <-- Smaller, contained circular image */}
        <div className="w-24 h-20 flex-shrink-0 rounded-lg ring-2 ring-zinc-900 flex items-center justify-center">
          <img 
            src={imgSrc} 
            alt={title} 
            className="w-full h-full object-cover rounded-lg" 
          />
        </div>
        
        {/* <-- Text content container */}
        <div className="flex-grow">
          <p className="text-sm text-sky-400 mb-1">{date}</p>
          <h3 className="text-lg font-bold text-zinc-100 mb-1">{title}</h3>
          <p className="text-sm text-zinc-400 mb-4">{`Issued by: ${issuer}`}</p>
        </div>
      </div>
      
      <p className="text-zinc-300 mt-4 border-t border-white/10 pt-4">
        {description}
      </p>
    </div>
  );
};

AwardCard.propTypes = {
  imgSrc: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  issuer: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  classes: PropTypes.string,
};

export default AwardCard;