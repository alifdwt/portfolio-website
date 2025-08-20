"use client";

import { Share2Icon } from "lucide-react";
import React from "react";

import { Button } from "@/components/ui/button";

const ShareButton = ({ locale, post }: { locale: string; post: BlogPost }) => {
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: post.title,
          text: post.excerpt,
          url: window.location.href,
        });
      } catch (err) {
        console.log("Error sharing:", err);
      }
    } else {
      // Fallback to copying URL
      navigator.clipboard.writeText(window.location.href);
      alert(locale === "id" ? "URL disalin!" : "URL copied!");
    }
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handleShare}
      className="ml-auto"
    >
      <Share2Icon className="mr-2 h-4 w-4" />
      {locale === "id" ? "Bagikan" : "Share"}
    </Button>
  );
};

export default ShareButton;
