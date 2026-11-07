import { useLang } from "../i18n/LangContext";
import { INSTAGRAM_URL, INSTAGRAM_HANDLE } from "../config";
import { Emblem } from "./Emblem";

const CURRENT_YEAR = new Date().getFullYear();

export default function Footer() {
  const { t } = useLang();

  return (
    <footer className="bg-obsidian text-white/80 py-12 px-5 border-t border-white/15">
      <div className="mx-auto max-w-6xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <Emblem className="w-7 h-7 text-brass shrink-0" />
          <div>
            <span className="font-serif text-lg text-white">Suar Studio</span>
            <p className="text-sm text-white/75">{t.footer.tagline}</p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-sm text-white/80">
          <span>{t.footer.follow}:</span>
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono font-semibold text-brass hover:underline min-h-11 inline-flex items-center px-1"
          >
            @{INSTAGRAM_HANDLE}
          </a>
        </div>
      </div>

      <p className="text-xs text-white/70 text-center mt-8">
        © {CURRENT_YEAR} Suar Studio (@{INSTAGRAM_HANDLE}). {t.footer.rights}
      </p>
    </footer>
  );
}
