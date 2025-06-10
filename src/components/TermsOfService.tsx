
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';

interface TermsOfServiceProps {
  isOpen: boolean;
  onClose: () => void;
}

const TermsOfService = ({ isOpen, onClose }: TermsOfServiceProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-4xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle>Terms of Service</DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-[60vh] pr-4">
          <div className="space-y-6 text-sm">
            <section>
              <h3 className="font-semibold text-lg mb-3">1. Acceptance of Terms</h3>
              <p className="text-gray-700 leading-relaxed">
                By accessing and using MySupps services, you accept and agree to be bound by the terms 
                and provision of this agreement. If you do not agree to abide by the above, please do 
                not use this service.
              </p>
            </section>

            <section>
              <h3 className="font-semibold text-lg mb-3">2. Product Information</h3>
              <p className="text-gray-700 leading-relaxed">
                All products sold on MySupps are intended for research purposes only and are not for 
                human consumption. Customers must be 18 years or older to purchase products from our 
                website. We reserve the right to refuse service to anyone for any reason at any time.
              </p>
            </section>

            <section>
              <h3 className="font-semibold text-lg mb-3">3. Account Registration</h3>
              <p className="text-gray-700 leading-relaxed">
                To access certain features of our service, you may be required to register for an account. 
                You agree to provide accurate, current, and complete information during the registration 
                process and to update such information to keep it accurate, current, and complete.
              </p>
            </section>

            <section>
              <h3 className="font-semibold text-lg mb-3">4. Referral System Policy</h3>
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-4">
                <h4 className="font-semibold text-orange-800 mb-2">Important Notice</h4>
                <p className="text-orange-700 leading-relaxed">
                  <strong>Referral System Abuse:</strong> Creating multiple accounts or using fraudulent 
                  methods to exploit the referral system is strictly prohibited. Violators may face 
                  account suspension or termination. This includes but is not limited to:
                </p>
                <ul className="list-disc list-inside mt-2 text-orange-700 space-y-1">
                  <li>Creating fake accounts to refer yourself</li>
                  <li>Using multiple email addresses or devices to circumvent account limits</li>
                  <li>Manipulating IP addresses or using VPNs to create multiple accounts</li>
                  <li>Encouraging others to create accounts solely for referral benefits</li>
                  <li>Any other fraudulent activity related to the referral program</li>
                </ul>
              </div>
            </section>

            <section>
              <h3 className="font-semibold text-lg mb-3">5. Account Security</h3>
              <p className="text-gray-700 leading-relaxed">
                You are responsible for safeguarding the password and for all activities that occur under 
                your account. You agree not to disclose your password to any third party and to take sole 
                responsibility for any activities or actions under your account.
              </p>
            </section>

            <section>
              <h3 className="font-semibold text-lg mb-3">6. Payment Terms</h3>
              <p className="text-gray-700 leading-relaxed">
                Payment must be received before products are shipped. We accept various payment methods 
                including cryptocurrency. All prices are subject to change without notice. Discounts 
                earned through the referral program are applied at checkout and cannot be combined with 
                other promotional offers unless explicitly stated.
              </p>
            </section>

            <section>
              <h3 className="font-semibold text-lg mb-3">7. Shipping and Delivery</h3>
              <p className="text-gray-700 leading-relaxed">
                Shipping costs and delivery times vary based on location and product availability. 
                Free shipping thresholds may apply based on your account status and referral activity. 
                We are not responsible for delays caused by shipping carriers or customs processes.
              </p>
            </section>

            <section>
              <h3 className="font-semibold text-lg mb-3">8. Privacy Policy</h3>
              <p className="text-gray-700 leading-relaxed">
                Your privacy is important to us. Our Privacy Policy explains how we collect, use, and 
                protect your information when you use our service. By using our service, you agree to 
                the collection and use of information in accordance with our Privacy Policy.
              </p>
            </section>

            <section>
              <h3 className="font-semibold text-lg mb-3">9. Prohibited Uses</h3>
              <p className="text-gray-700 leading-relaxed mb-3">
                You may not use our service for any illegal or unauthorized purpose. You agree to comply 
                with all local laws regarding online conduct and acceptable content. Prohibited activities include:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                <li>Violating any applicable federal, state, or local laws or regulations</li>
                <li>Transmitting any harmful, threatening, or harassing material</li>
                <li>Attempting to gain unauthorized access to our systems</li>
                <li>Using our products for human consumption</li>
                <li>Reselling products without authorization</li>
                <li>Abusing the referral system or creating fraudulent accounts</li>
              </ul>
            </section>

            <section>
              <h3 className="font-semibold text-lg mb-3">10. Limitation of Liability</h3>
              <p className="text-gray-700 leading-relaxed">
                In no event shall MySupps be liable for any indirect, incidental, special, consequential, 
                or punitive damages, including without limitation, loss of profits, data, use, goodwill, 
                or other intangible losses, resulting from your use of the service.
              </p>
            </section>

            <section>
              <h3 className="font-semibold text-lg mb-3">11. Termination</h3>
              <p className="text-gray-700 leading-relaxed">
                We may terminate or suspend your account and bar access to the service immediately, 
                without prior notice or liability, under our sole discretion, for any reason whatsoever 
                and without limitation, including but not limited to a breach of the Terms, abuse of 
                the referral system, or suspicious account activity.
              </p>
            </section>

            <section>
              <h3 className="font-semibold text-lg mb-3">12. Changes to Terms</h3>
              <p className="text-gray-700 leading-relaxed">
                We reserve the right, at our sole discretion, to modify or replace these Terms at any time. 
                If a revision is material, we will provide at least 30 days notice prior to any new terms 
                taking effect. What constitutes a material change will be determined at our sole discretion.
              </p>
            </section>

            <section>
              <h3 className="font-semibold text-lg mb-3">13. Contact Information</h3>
              <p className="text-gray-700 leading-relaxed">
                If you have any questions about these Terms of Service, please contact us through our 
                customer support channels. We are committed to resolving any issues or concerns you may have.
              </p>
            </section>

            <div className="text-center text-gray-500 text-xs mt-8 pt-4 border-t">
              Last updated: {new Date().toLocaleDateString()}
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default TermsOfService;
