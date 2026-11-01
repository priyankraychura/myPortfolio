import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PrivacyPolicyTemplate from '../components/PrivacyPolicyTemplate';
import Button from '../components/Button';
import { ArrowRight } from '../components/icons';
import { termsOfUse } from '../utils/termsOfUse';

const TermsOfUse = () => {
  const { appName } = useParams()

  const currentTermsWrapper = termsOfUse.find((item) => item.title.toLowerCase() === appName.toLowerCase());
  const termsName = currentTermsWrapper?.terms.appName

  useEffect(() => {
    document.title = termsName
      ? `${termsName} Terms of Use | Priyank Raychura`
      : 'Terms of use not found | Priyank Raychura'
  }, [termsName])

  if (!currentTermsWrapper) {
    return (
      <main id="main">
        <section className="section page-top">
          <div className="wrap not-found">
            <span className="eyebrow">Terms of use</span>
            <h1 className="page-title">No terms of use for &ldquo;{appName}&rdquo;</h1>
            <p className="page-lede">There are terms of use for Chapter. Check the link, or head back to the apps.</p>
            <Button label="See the apps" hash="apps" variant="fill" iconAfter={<ArrowRight />} />
          </div>
        </section>
      </main>
    );
  }

  return (
    <main id="main">
      <PrivacyPolicyTemplate data={currentTermsWrapper.terms} eyebrow="Terms of use" title="Terms of Use" />
    </main>
  );
};

export default TermsOfUse;
