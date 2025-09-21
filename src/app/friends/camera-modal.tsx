import { useState, useRef, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Camera, RefreshCcw, Send } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface CameraModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSendSnap: (imageDataUri: string) => void;
}

export function CameraModal({ isOpen, onClose, onSendSnap }: CameraModalProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const getCameraPermission = async () => {
      if (!isOpen) return;
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        setHasCameraPermission(true);
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (error) {
        console.error('Error accessing camera:', error);
        setHasCameraPermission(false);
        toast({
          variant: 'destructive',
          title: 'Camera Access Denied',
          description: 'Please enable camera permissions in your browser settings.',
        });
      }
    };

    getCameraPermission();

    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [isOpen, toast]);

  const handleCapture = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (video && canvas) {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const context = canvas.getContext('2d');
      context?.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
      const dataUri = canvas.toDataURL('image/png');
      setCapturedImage(dataUri);
    }
  };

  const handleRetake = () => {
    setCapturedImage(null);
  };
  
  const handleSend = () => {
    if (capturedImage) {
      onSendSnap(capturedImage);
      onClose();
      setCapturedImage(null);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Send a Progress Snap</DialogTitle>
        </DialogHeader>
        <div className="aspect-video w-full bg-muted rounded-md overflow-hidden relative">
          <video
            ref={videoRef}
            className="w-full h-full object-cover"
            autoPlay
            muted
            playsInline
            style={{ display: capturedImage ? 'none' : 'block' }}
          />
          {capturedImage && (
            <img src={capturedImage} alt="Captured snap" className="w-full h-full object-cover" />
          )}
          <canvas ref={canvasRef} className="hidden" />
        </div>
        {hasCameraPermission === false && (
          <Alert variant="destructive">
            <AlertTitle>Camera Access Required</AlertTitle>
            <AlertDescription>
              Please allow camera access to use this feature.
            </AlertDescription>
          </Alert>
        )}
        <DialogFooter>
          {capturedImage ? (
            <>
              <Button variant="outline" onClick={handleRetake}>
                <RefreshCcw className="mr-2 h-4 w-4" /> Retake
              </Button>
              <Button onClick={handleSend}>
                <Send className="mr-2 h-4 w-4" /> Send Snap
              </Button>
            </>
          ) : (
            <Button onClick={handleCapture} disabled={!hasCameraPermission}>
              <Camera className="mr-2 h-4 w-4" /> Capture
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
