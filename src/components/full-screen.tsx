"use client";

import { useState } from "react";
import { Maximize, Minimize } from "lucide-react";
import { Button } from "./ui/button";

export default function FullScreen() {
  const [isFullscreen, setIsFullscreen] = useState(false);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement
        .requestFullscreen()
        .then(() => {
          setIsFullscreen(true);
        })
        .catch((err) => {
          console.error("Error attempting to enable full-screen mode:", err);
        });
    } else {
      document
        .exitFullscreen()
        .then(() => {
          setIsFullscreen(false);
        })
        .catch((err) => {
          console.error("Error attempting to exit full-screen mode:", err);
        });
    }
  };

  return (
    <Button variant="ghost" onClick={toggleFullscreen} size="icon">
      {isFullscreen ? <Minimize /> : <Maximize />}
    </Button>
  );
}
