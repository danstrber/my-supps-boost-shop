
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { MessageCircle, Zap, Target, Users } from 'lucide-react';

interface CoachingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CoachingModal = ({ isOpen, onClose }: CoachingModalProps) => {
  const handleJoinTelegram = () => {
    window.open('https://t.me/+fDDZObF0zjI2M2Y0', '_blank');
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">
            🏆 MySupps Premium Coaching
          </DialogTitle>
          <DialogDescription className="text-center text-gray-600">
            Take your results to the next level with personalized coaching from our experts!
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-blue-50 p-6 rounded-xl border border-blue-200">
              <div className="flex items-center mb-3">
                <Target className="h-6 w-6 text-blue-600 mr-2" />
                <h3 className="font-semibold text-blue-800">Personalized Programs</h3>
              </div>
              <ul className="text-blue-700 text-sm space-y-1">
                <li>• Custom cycles and protocols</li>
                <li>• Dosage optimization</li>
                <li>• Diet and training plans</li>
                <li>• Goal-specific guidance</li>
              </ul>
            </div>

            <div className="bg-green-50 p-6 rounded-xl border border-green-200">
              <div className="flex items-center mb-3">
                <Zap className="h-6 w-6 text-green-600 mr-2" />
                <h3 className="font-semibold text-green-800">Expert Support</h3>
              </div>
              <ul className="text-green-700 text-sm space-y-1">
                <li>• 24/7 coaching support</li>
                <li>• Blood work analysis</li>
                <li>• Side effect management</li>
                <li>• Real-time adjustments</li>
              </ul>
            </div>

            <div className="bg-purple-50 p-6 rounded-xl border border-purple-200">
              <div className="flex items-center mb-3">
                <Users className="h-6 w-6 text-purple-600 mr-2" />
                <h3 className="font-semibold text-purple-800">Community Access</h3>
              </div>
              <ul className="text-purple-700 text-sm space-y-1">
                <li>• Private coaching group</li>
                <li>• Success stories & tips</li>
                <li>• Member-only content</li>
                <li>• Peer support network</li>
              </ul>
            </div>

            <div className="bg-orange-50 p-6 rounded-xl border border-orange-200">
              <div className="flex items-center mb-3">
                <MessageCircle className="h-6 w-6 text-orange-600 mr-2" />
                <h3 className="font-semibold text-orange-800">Direct Communication</h3>
              </div>
              <ul className="text-orange-700 text-sm space-y-1">
                <li>• One-on-one consultations</li>
                <li>• Quick response times</li>
                <li>• Progress tracking</li>
                <li>• Anonymous support</li>
              </ul>
            </div>
          </div>

          <div className="bg-gradient-to-r from-gray-800 to-gray-900 text-white p-6 rounded-xl text-center">
            <h3 className="text-xl font-bold mb-2">Ready to Transform Your Results?</h3>
            <p className="mb-4 opacity-90">
              Join our exclusive coaching community and get the guidance you need to maximize your potential safely and effectively.
            </p>
            <Button
              onClick={handleJoinTelegram}
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-8 py-3"
            >
              <MessageCircle className="h-5 w-5 mr-2" />
              Join Coaching on Telegram
            </Button>
          </div>

          <div className="text-center text-sm text-gray-600">
            <p>
              💬 Click the button above to join our private Telegram coaching group and start your journey today!
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CoachingModal;
