import React, { useState } from 'react';
import { Github, Linkedin, Mail, Check } from 'lucide-react';

const EMAIL = 'ijenebefrancis@gmail.com';

// Footer shared by every page: credit on the left, a copy-email pill in the
// middle, and the social links on the right.
export default function SiteFooter() {
  return (
    <footer className="px-5 md:px-8">
      <div className="max-w-6xl mx-auto border-t border-ink/10 py-8 flex flex-col sm:flex-row items-center justify-between gap-6">
        <p className="text-sm text-ink/55">
          <a href="/" className="underline decoration-ink/25 underline-offset-4 hover:text-ink transition-colors">
            designed + coded by francis
          </a>
          <span className="text-ink/35"> · © 2026</span>
        </p>
        <CopyEmail />
        <div className="flex items-center gap-5">
          <a href="https://github.com/FrancisIje" target="_blank" rel="noopener noreferrer" aria-label="GitHub"
             className="text-ink/45 hover:text-ink transition-colors">
            <Github className="w-[18px] h-[18px]" />
          </a>
          <a href="https://www.linkedin.com/in/francis-ijenebe/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"
             className="text-ink/45 hover:text-ink transition-colors">
            <Linkedin className="w-[18px] h-[18px]" />
          </a>
          <a href={`mailto:${EMAIL}`} aria-label="Email" className="text-ink/45 hover:text-ink transition-colors">
            <Mail className="w-[18px] h-[18px]" />
          </a>
        </div>
      </div>
    </footer>
  );
}

// Copies the address rather than opening a mail client, which most people
// with webmail never set up. Falls back to mailto where the clipboard is
// unavailable (insecure origins, older browsers).
export function CopyEmail({ className = '' }: { className?: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${EMAIL}`;
    }
  };

  return (
    <button
      type="button"
      onClick={copy}
      className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border border-ink/15 bg-white/80 text-sm text-ink/75 hover:text-ink hover:border-ink/30 transition-colors ${className}`}
    >
      {copied ? <Check className="w-4 h-4 text-green-700" /> : <Mail className="w-4 h-4" />}
      <span aria-live="polite">{copied ? 'Email copied' : 'Copy email'}</span>
    </button>
  );
}
