"use client";

import "@google/model-viewer";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "model-viewer": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & {
        src?: string;
        alt?: string;
        ar?: boolean;
        "ar-modes"?: string;
        autoplay?: boolean;
        "camera-controls"?: boolean;
        style?: React.CSSProperties;
      }, HTMLElement>;
    }
  }
}

interface ModelViewerWrapperProps {
  src: string;
}

export function ModelViewerWrapper({ src }: ModelViewerWrapperProps) {
  return (
    <model-viewer
        src={src}
        alt="A 3D model representing your progress"
        ar
        ar-modes="webxr scene-viewer quick-look"
        autoplay
        camera-controls
        style={{ width: '100%', height: '100%' }}
    />
  );
}
