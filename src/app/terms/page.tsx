import React from 'react';

export default function TermsAndConditions() {
  return (
    <div className="min-h-screen bg-gray-50 pt-32 pb-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white p-8 md:p-16 rounded-3xl shadow-sm border border-gray-100">
          <h1 className="text-4xl md:text-5xl font-extrabold text-navy mb-6">Terms & Conditions</h1>
          <p className="text-gray-500 mb-10 text-lg">Effective Date: September 2026</p>

          <div className="space-y-10 text-gray-600 leading-relaxed">

            <section>
              <h2 className="text-2xl font-bold text-navy mb-4">1. Acceptance of Terms</h2>
              <p>
                By accessing or using the TBS Classes website, you agree to be bound by these Terms and Conditions. If you disagree with any part of the terms, then you may not access our educational platform.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-navy mb-4">2. Use of Educational Resources</h2>
              <p className="mb-3">Our platform provides study materials, notes, quizzes, and career roadmaps. You agree to use these resources for personal, non-commercial educational purposes only. You must not:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Republish, sell, rent, or sub-license material from TBS Classes.</li>
                <li>Reproduce, duplicate, or copy materials for commercial purposes.</li>
                <li>Attempt to reverse-engineer any part of the website or its AI systems.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-navy mb-4">3. User Accounts</h2>
              <p>
                When you create an account with us, you must provide accurate, complete, and current information. You are responsible for safeguarding your password and for all activities that occur under your account. TBS Classes reserves the right to terminate accounts that violate these terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-navy mb-4">4. Intellectual Property</h2>
              <p>
                The website and its original content (including text, graphics, logos, and software) are the property of TBS Classes and are protected by applicable intellectual property laws. You may not use our intellectual property without prior written consent.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-navy mb-4">5. Disclaimer of Warranties</h2>
              <p>
                The materials on TBS Classes are provided on an "as is" basis. We make no warranties, expressed or implied, regarding the accuracy, completeness, or reliability of the study materials. We do not guarantee that your use of the service will be uninterrupted or error-free.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-navy mb-4">6. Changes to Terms</h2>
              <p>
                We reserve the right, at our sole discretion, to modify or replace these Terms at any time. We will try to provide at least 30 days' notice prior to any new terms taking effect. Continued use of the platform after changes implies acceptance of the new terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-navy mb-4">7. Contact Information</h2>
              <p>
                For any questions regarding these Terms and Conditions, please reach out to us at: <br />
                <strong className="text-navy">tbsclasses2026@gmail.com</strong>
              </p>
            </section>

          </div>
        </div>
      </div>
    </div>
  );
}
