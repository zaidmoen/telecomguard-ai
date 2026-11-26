import type { ReactNode } from "react";
import { ArrowRight, CircleHelp, Database, LoaderCircle } from "lucide-react";
import type { LoadState } from "../types";

export function PageHeading({
  eyebrow,
  title,
  description,
  action,
}: {
  eyebrow: string;
  title: string;
  description: string;
  action?: ReactNode;
}) {
  return (
    <div className="page-heading">
      <div>
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="page-title">{title}</h1>
        <p className="page-description">{description}</p>
      </div>
      {action && <div className="page-heading-action">{action}</div>}
    </div>
  );
}

export function StateLabel({
  state,
  readyLabel = "Connected",
}: {
  state: LoadState;
  readyLabel?: string;
}) {
  const label = state === "ready" ? readyLabel :
    state === "loading" ? "Connecting" : "Offline";
  return (
    <span className={`state-label state-${state}`} role="status">
      <span className="state-dot" />
      {label}
    </span>
  );
}

export function EmptyState({
  icon,
  title,
  description,
  action,
  compact = false,
}: {
  icon?: ReactNode;
  title: string;
  description: string;
  action?: ReactNode;
  compact?: boolean;
}) {
  return (
    <div className={`empty-state ${compact ? "empty-state-compact" : ""}`}>
      <div className="empty-state-icon">{icon || <Database size={23} strokeWidth={1.7} />}</div>
      <h3>{title}</h3>
      <p>{description}</p>
      {action && <div className="empty-state-action">{action}</div>}
    </div>
  );
}

export function SectionHeading({
  title,
  subtitle,
  extra,
}: {
  title: string;
  subtitle?: string;
  extra?: ReactNode;
}) {
  return (
    <div className="section-heading">
      <div>
        <h2>{title}</h2>
        {subtitle && <p>{subtitle}</p>}
      </div>
      {extra}
    </div>
  );
}

export function ProgressStep({
  step,
  label,
  detail,
  active = false,
  done = false,
}: {
  step: number;
  label: string;
  detail: string;
  active?: boolean;
  done?: boolean;
}) {
  return (
    <div className={`progress-step ${active ? "is-active" : ""} ${done ? "is-done" : ""}`}>
      <div className="progress-step-number">{step.toString().padStart(2, "0")}</div>
      <div>
        <strong>{label}</strong>
        <span>{detail}</span>
      </div>
    </div>
  );
}

export function LoadingMessage({ label = "Loading…" }: { label?: string }) {
  return <div className="loading-message"><LoaderCircle className="spin" size={18}/>{label}</div>;
}

export function InfoNote({ children }: { children: ReactNode }) {
  return (
    <div className="info-note">
      <CircleHelp size={17} aria-hidden="true" />
      <p>{children}</p>
    </div>
  );
}

export function TextLink({ children, to }: { children: ReactNode; to: string }) {
  return <a className="text-link" href={to}>{children} <ArrowRight size={14}/></a>;
}
