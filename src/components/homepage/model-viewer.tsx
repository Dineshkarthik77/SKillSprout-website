"use client";

import "@google/model-viewer";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "model-viewer": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & {
        src: string;
        alt: string;
        ar: boolean;
        "ar-modes": string;
        autoplay: boolean;
        "animation-name": string;
        "camera-controls": boolean;
        "disable-zoom": boolean;
      }, HTMLElement>;
    }
  }
}

export function ModelViewer() {
  return (
    <div className="w-full h-full min-h-[400px] md:min-h-0">
        <model-viewer
          src="https://modelviewer.dev/shared-assets/models/Astronaut.glb"
          alt="A 3D model of an astronaut"
          ar
          ar-modes="webxr scene-viewer quick-look"
          autoplay
          animation-name="Orbit"
          camera-controls={false}
          disable-zoom
          style={{ width: '100%', height: '100%' }}
        />
    </div>
  );
}
