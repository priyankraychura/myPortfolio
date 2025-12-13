import React, { useEffect } from 'react';
import PrivacyPolicyTemplate from '../components/PrivacyPolicyTemplate';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
// import { pushtimarg } from '../utils/privacyPolicies/PushtiMarg';
import { privacyPolicies } from '../utils/privacyPolicies';
import { useParams } from 'react-router-dom';

const PrivacyPolicy = () => {
  const { appName } = useParams()

 const currentPolicyWrapper = privacyPolicies.find((item) => item.title.toLowerCase() === appName.toLowerCase());

 if (!currentPolicyWrapper) {
    return <h2>Policy not found for {appName}</h2>;
  }

  return <PrivacyPolicyTemplate data={currentPolicyWrapper.policy} />;
};

export default PrivacyPolicy;