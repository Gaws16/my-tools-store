"use client";

import LanguageDropdown from "@/components/layout/LanguageDropdown";

export function LanguageFloating() {
  return (
    <div className="fixed bottom-4 right-4 z-50">
      <LanguageDropdown />
    </div>
  );
}

export default LanguageFloating;
