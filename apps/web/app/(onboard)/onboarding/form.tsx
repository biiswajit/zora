"use client";
import { useEffect, useRef, useState } from "react";
import { Textarea, Button } from "@zora/ui/components";
import axios from "axios";

export function OnboardingForm({ userId }: { userId: string }) {
  const [description, setDescription] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  useEffect(() => {
    textareaRef.current?.focus();
  }, []);

  async function handleClick() {
    if (isSubmitting) return;
    setIsSubmitting(true);
    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_APP_URL}/api/onboarding`, {
        userId,
        description: description.trim(),
      });
      console.log(JSON.stringify(res.data));
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="flex flex-col gap-4 w-[360px]">
      <Textarea
        ref={textareaRef}
        className="bg-light outline-dawnlight h-[140px]"
        placeholder="Write your description here."
        onChange={(e) => setDescription(e.target.value)}
        value={description}
      />
      <Button
        label={isSubmitting ? "Saving..." : "Save"}
        variant="primary"
        disabled={description.trim() === "" || isSubmitting}
        onClick={handleClick}
      />
    </div>
  );
}
