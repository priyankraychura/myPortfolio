import React from 'react';
import { Link, useParams } from 'react-router-dom';
import PrivacyPolicyTemplate from '../components/PrivacyPolicyTemplate';
import { privacyPolicies } from '../utils/privacyPolicies';

const PrivacyPolicy = () => {
  const { appName } = useParams();
  const currentPolicyWrapper = privacyPolicies.find((item) => item.title.toLowerCase() === appName.toLowerCase());

  if (!currentPolicyWrapper) {
    return (
      <div className="rd-page">
        <main className="rd-section rd-section--page">
          <div className="rd-wrap rd-head">
            <p className="rd-eyebrow">Privacy policy</p>
            <h1 className="rd-page-title">No policy for “{appName}”</h1>
            <p className="rd-lede">Check the link, or pick an app: Cloak, AirKey or Pushtimarg.</p>
            <div className="rd-cta-row">
              {privacyPolicies.map(({ title, policy }) => (
                <Link key={title} to={`/privacy-policy/${title}`} className="rd-btn rd-btn-ghost">{policy.appName}</Link>
              ))}
            </div>
          </div>
        </main>
      </div>
    );
  }

  return <PrivacyPolicyTemplate key={appName} data={currentPolicyWrapper.policy} />;
};

export default PrivacyPolicy;
