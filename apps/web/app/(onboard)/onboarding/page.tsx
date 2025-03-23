"use client";
import { useEffect, useRef } from "react";
import { Textarea, Button } from "@zora/ui/components";

export default function OnboardingForm() {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  useEffect(() => {
    textareaRef.current?.focus();
  }, []);

  return (
    <div className="flex flex-col gap-4 w-[360px]">
      <Textarea
        ref={textareaRef}
        className="bg-light outline-dawnlight h-[140px]"
        placeholder="Write your description here."
      />
      <Button label="Save" variant="primary" />
    </div>
  );
}
