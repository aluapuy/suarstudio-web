import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, RotateCcw, Send } from "lucide-react";
import { useLang } from "../i18n/LangContext";
import { Button } from "./ui/Button";

type Phase = "idle" | "sent" | "typing" | "approved";

const bubble = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
  transition: { duration: 0.28 },
};

/* ── Received (left-aligned) ───────────────────────── */
function Received({ children }: { children: React.ReactNode }) {
  return (
    <motion.div {...bubble} className="flex justify-start">
      <div className="bg-white rounded-2xl rounded-tl-sm px-3.5 py-2.5 max-w-[90%] shadow-xs border border-sand-border/60 text-sm text-charcoal">
        {children}
      </div>
    </motion.div>
  );
}

/* ── Sent (right-aligned, green) ───────────────────── */
function Sent({ children }: { children: React.ReactNode }) {
  return (
    <motion.div {...bubble} className="flex justify-end">
      <div className="bg-cypress-tint border border-cypress/25 text-charcoal font-medium rounded-2xl rounded-tr-sm px-3.5 py-2.5 max-w-[85%] shadow-xs text-sm">
        {children}
      </div>
    </motion.div>
  );
}

/* ── Typing indicator (3 animated dots) ────────────── */
function TypingDots() {
  return (
    <motion.div {...bubble} className="flex justify-start">
      <div className="bg-white rounded-2xl rounded-tl-sm px-4 py-3 shadow-xs border border-sand-border/60 flex gap-1.5 items-center">
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="block w-2 h-2 rounded-full bg-slate"
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{
              duration: 1,
              repeat: Infinity,
              delay: i * 0.2,
            }}
          />
        ))}
      </div>
    </motion.div>
  );
}

/* ══════════════════════════════════════════════════════
   WhatsAppDemo
   ══════════════════════════════════════════════════════ */
export default function WhatsAppDemo() {
  const { t } = useLang();
  const [phase, setPhase] = useState<Phase>("idle");

  const reset = useCallback(() => setPhase("idle"), []);

  /* Auto-transitions: sent → typing → approved */
  useEffect(() => {
    if (phase === "sent") {
      const id = setTimeout(() => setPhase("typing"), 1100);
      return () => clearTimeout(id);
    }
    if (phase === "typing") {
      const id = setTimeout(() => setPhase("approved"), 1200);
      return () => clearTimeout(id);
    }
  }, [phase]);

  return (
    <div className="w-full">
      {/* ── Interactive WhatsApp Window Card ─────────────────── */}
      <div className="rounded-3xl overflow-hidden w-full shadow-xl border-2 border-sand-border bg-alabaster">
        {/* Top WhatsApp Header */}
        <div className="bg-cypress text-white px-5 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="w-9 h-9 rounded-full bg-white/15 border border-white/25 flex items-center justify-center font-serif font-bold text-base text-white">
              S
            </span>
            <div>
              <p className="font-semibold text-sm leading-tight">
                {t.demo.chatName}
              </p>
              <p className="text-[11px] text-white/80 font-mono">
                {t.demo.online}
              </p>
            </div>
          </div>

          <span className="font-mono text-[10px] uppercase tracking-wider bg-white/15 px-2.5 py-1 rounded-full">
            {t.demo.sample}
          </span>
        </div>

        {/* Chat Body */}
        <div className="bg-alabaster p-4 sm:p-5 space-y-3 min-h-[340px]">
          <AnimatePresence mode="popLayout">
            {/* Greeting */}
            <Received key="greeting">{t.demo.greeting}</Received>

            {/* Verbatim Quotes with Timecodes */}
            {t.demo.quotes.map((q, i) => (
              <Received key={`quote-${i}`}>
                <span className="inline-block font-mono text-[11px] font-bold text-terracotta bg-[#FDF5EE] border border-[#F3DEC9] rounded px-1.5 py-0.5 mb-1">
                  {q.code}
                </span>
                <p className="font-serif italic text-sm text-charcoal leading-snug">
                  {q.text}
                </p>
              </Received>
            ))}

            {/* Prompt */}
            <Received key="prompt">
              <span className="font-semibold text-cypress">{t.demo.prompt}</span>
            </Received>

            {/* Sent "OK" */}
            {(phase === "sent" ||
              phase === "typing" ||
              phase === "approved") && (
              <Sent key="ok">{t.demo.pastorReply}</Sent>
            )}

            {/* Typing dots */}
            {phase === "typing" && <TypingDots key="typing" />}

            {/* Approved */}
            {phase === "approved" && (
              <Received key="approved-msg">
                <span className="font-semibold text-cypress">
                  {t.demo.approvedMsg}
                </span>
              </Received>
            )}

            {/* Render progress */}
            {phase === "approved" && (
              <motion.div
                key="render-progress"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.15 }}
                className="flex justify-start"
              >
                <div className="bg-white rounded-2xl rounded-tl-sm px-4 py-3 max-w-[90%] shadow-xs border border-cypress/30 text-sm text-charcoal space-y-2">
                  {t.demo.renderItems.map((item, i) => (
                    <motion.div
                      key={i}
                      className="flex items-center gap-2 text-xs sm:text-sm"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.25 + i * 0.2 }}
                    >
                      <Check
                        className="w-4 h-4 text-cypress shrink-0"
                        aria-hidden="true"
                      />
                      <span>{item}</span>
                    </motion.div>
                  ))}
                  <motion.p
                    className="font-mono text-xs font-bold text-cypress pt-1 border-t border-sand-border"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{
                      delay: 0.25 + t.demo.renderItems.length * 0.2,
                    }}
                  >
                    {t.demo.ready}
                  </motion.p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer Action Bar */}
        <div className="bg-white border-t border-sand-border px-4 py-3.5">
          {phase === "idle" && (
            <Button
              variant="primary"
              className="w-full shadow-sm"
              onClick={() => setPhase("sent")}
            >
              <Send className="w-4 h-4" />
              {t.demo.sendOk}
            </Button>
          )}

          {(phase === "sent" || phase === "typing") && (
            <div className="text-center py-2 font-mono text-xs text-slate">
              {t.demo.typing}
            </div>
          )}

          {phase === "approved" && (
            <Button variant="secondary" className="w-full" onClick={reset}>
              <RotateCcw className="w-4 h-4" />
              {t.demo.replay}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
