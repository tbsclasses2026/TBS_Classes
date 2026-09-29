import React from 'react';

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gray-50 pt-32 pb-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white p-8 md:p-16 rounded-3xl shadow-sm border border-gray-100">
          <h1 className="text-4xl md:text-5xl font-extrabold text-navy mb-6">Privacy Policy</h1>
          <p className="text-gray-500 mb-10 text-lg">Effective Date: September 2026</p>

          <div className="space-y-10 text-gray-600 leading-relaxed">

            <section>
              <h2 className="text-2xl font-bold text-navy mb-4">1. Introduction</h2>
              <p>
                Welcome to TBS Classes. We value your privacy and are committed to protecting your personal information. This Privacy Policy explains how we collect, use, and share information about you when you use our website and educational services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-navy mb-4">2. Information We Collect</h2>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong className="text-gray-800">Personal Information:</strong> When you register, we may collect your name, email address, phone number, and academic details.</li>
                <li><strong className="text-gray-800">Usage Data:</strong> We automatically collect data about your interactions with our platform, such as the pages you visit, quizzes you take, and resources you download.</li>
                <li><strong className="text-gray-800">Device Information:</strong> We may collect information about the device and network you use to access TBS Classes.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-navy mb-4">3. How We Use Your Information</h2>
              <p className="mb-3">We use the collected information for the following purposes:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>To provide, maintain, and improve our educational resources.</li>
                <li>To personalize your learning experience and recommend relevant subjects or roadmaps.</li>
                <li>To communicate with you regarding updates, security alerts, and support messages.</li>
                <li>To monitor and analyze trends, usage, and activities in connection with our platform.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-navy mb-4">4. Sharing of Information</h2>
              <p>
                We do not sell your personal information. We may share your information with third-party vendors, consultants, and other service providers who need access to such information to carry out work on our behalf (e.g., cloud hosting or email delivery). We may also share information to comply with legal obligations or to protect the rights and safety of TBS Classes and our users.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-navy mb-4">5. Data Security</h2>
              <p>
                We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, loss, or alteration. However, please note that no internet transmission is 100% secure.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-navy mb-4">6. Contact Us</h2>
              <p>
                If you have any questions or concerns about this Privacy Policy, please contact us at: <br />
                <strong className="text-navy">tbsclasses2026@gmail.com</strong>
              </p>
            </section>

          </div>
        </div>
      </div>
    </div>
  );
}
