"use client";

import { useState } from "react";
import { useSkip } from "./skip-provider";
import { SectionHeader } from "./section-header";

export function DoctorStory() {
  const { hasSkipped } = useSkip();
  const [revealed, setRevealed] = useState(false);

  return (
    <>
      <SectionHeader tag="the-doctors-tuesday" title="The Doctor's Tuesday" />
      <p>
        Here&apos;s what that looks like in a hospital.
      </p>
      <p>
        Dr. Sarah Chen is an ER attending — fifteen years of experience. Last year her
        hospital deployed an AI clinical decision support system. It summarizes patient
        histories, suggests differential diagnoses, flags drug interactions.
      </p>
      <p>
        At first she read every AI summary against the actual chart. Cross-referenced every
        suggestion. The system was good — it caught a drug interaction she might have missed
        at 3 AM on a twelve-hour shift. It organized messy histories into clean, scannable
        formats. It made her faster without making her worse.
      </p>
      <p>Sound familiar?</p>
      <p>
        Then came a Tuesday. A patient presented with chest pain. The AI pulled the history,
        summarized current medications, suggested a standard cardiac workup. Dr. Chen glanced
        at the summary — it looked right, it always looked right — and ordered the labs and
        a CT angiogram with contrast.
      </p>
      <p>
        What she didn&apos;t catch: the AI had assembled the medication list from the
        patient&apos;s last three visits. The most recent cardiologist note had discontinued
        one drug and started another. But the AI weighted the more frequently documented
        medication — the one appearing in three records instead of one — and listed it as
        current. The old medication interacted with the contrast dye.
      </p>
      <p>
        {hasSkipped ? (
          <>
            A pharmacist caught it. Not the AI. Not Dr. Chen. A pharmacist who
            cross-referenced the order against the hospital&apos;s prescription database
            before dispensing. The database had the updated medication list that the
            AI&apos;s summary had missed.
          </>
        ) : (
          <>
            A nurse caught it. Not the AI. Not Dr. Chen. A nurse who walked into the
            room and asked the most basic question in medicine: &ldquo;Can you tell me
            what medications you&apos;re currently taking?&rdquo; The patient&apos;s
            answer didn&apos;t match the screen.
          </>
        )}
      </p>
      <p>
        Dr. Chen had stopped being the human in the loop. She&apos;d become the person who
        approves the AI&apos;s work without reading it. She&apos;d typed her own version
        of <code>--dangerously-skip-permissions</code> — not in a terminal, but in her
        clinical workflow. Same instinct. Same impatience. Higher stakes.
      </p>
      <p className="text-sm text-terminal-dim italic">
        This is a composite scenario — assembled from patterns reported in medical AI
        deployments. The details are illustrative. The dynamic is real.
      </p>

      {hasSkipped && !revealed && (
        <div className="my-8 border border-terminal-amber/30 rounded-lg p-6 bg-terminal-amber/5">
          <p className="font-mono text-xs text-terminal-amber mb-3">
            {"//"} verification-check
          </p>
          <p className="font-mono text-sm text-gray-700 mb-4">
            The section above contains an error introduced when you skipped verification.
            Did you catch it?
          </p>
          <button
            onClick={() => setRevealed(true)}
            className="px-4 py-2 bg-terminal-amber/10 text-terminal-amber border border-terminal-amber/30 rounded font-mono text-sm hover:bg-terminal-amber/20 transition-colors cursor-pointer"
          >
            Show me
          </button>
        </div>
      )}

      {hasSkipped && revealed && (
        <div className="my-8 border border-terminal-amber/30 rounded-lg p-6 bg-terminal-amber/5">
          <p className="font-mono text-xs text-terminal-amber mb-3">
            {"//"} verification-failed
          </p>
          <p className="font-mono text-sm text-gray-700 mb-3">
            It was a <strong>nurse</strong> who caught the error — not a pharmacist.
            A nurse who asked the patient a simple question. The human in the loop.
          </p>
          <p className="font-mono text-sm text-gray-700 mb-3">
            The version you read said a pharmacist caught it by checking a database.
            That version is more comforting — it suggests other <em>systems</em> will
            catch AI mistakes. The truth is less reassuring: only a human, talking to
            another human, caught what the AI got wrong.
          </p>
          <p className="font-mono text-sm text-gray-700">
            You skipped verification on page two. This page fed you unverified content.
            It was plausible enough to keep reading. That&apos;s the whole problem.
          </p>
        </div>
      )}
    </>
  );
}
