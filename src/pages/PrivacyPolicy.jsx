import React from 'react';
import { useParams } from 'react-router-dom';
import PrivacyPolicyTemplate from '../components/PrivacyPolicyTemplate';
import Button from '../components/Button';
import { ArrowRight } from '../components/icons';
import usePageMeta from '../hooks/usePageMeta';
import { privacyPolicies } from '../utils/privacyPolicies';

const PrivacyPolicy = () => {
  const { appName } = useParams()

  const currentPolicyWrapper = privacyPolicies.find((item) => item.title.toLowerCase() === appName.toLowerCase());
  const policyName = currentPolicyWrapper?.policy.appName

  usePageMeta(
    policyName ? `${policyName} Privacy Policy | Priyank Raychura` : 'Privacy policy not found | Priyank Raychura',
    policyName ? `The privacy policy for ${policyName}, an app by Priyank Raychura: what it collects, what it keeps on your device and how to get in touch.` : undefined
  )

  if (!currentPolicyWrapper) {
    return (
      <main id="main">
        <section className="section page-top">
          <div className="wrap not-found">
            <span className="eyebrow">Privacy policy</span>
            <h1 className="page-title">No privacy policy for &ldquo;{appName}&rdquo;</h1>
            <p className="page-lede">There are policies for Pushtimarg, Cloak and AirKey. Check the link, or head back to the apps.</p>
            <Button label="See the apps" hash="apps" variant="fill" iconAfter={<ArrowRight />} />
          </div>
        </section>
      </main>
    );
  }

  return (
    <main id="main">
      <PrivacyPolicyTemplate data={currentPolicyWrapper.policy} />
    </main>
  );
};

export default PrivacyPolicy;
