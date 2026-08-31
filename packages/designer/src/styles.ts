let installed = false;

export function ensureDialogDesignerStyles(): void {
  if (installed || typeof document === "undefined") return;
  installed = true;

  const style = document.createElement("style");
  style.id = "dialog-designer-styles";
  style.textContent = `
.dialog-designer {
  position: fixed;
  top: 64px;
  right: 14px;
  z-index: 2147483646;
  color: #f8f5ee;
  font: 13px/1.42 Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  --dd-bg: rgba(17, 18, 24, 0.98);
  --dd-surface: #20222c;
  --dd-surface-soft: #272a36;
  --dd-border: #3b3e4d;
  --dd-border-strong: #5a5e72;
  --dd-text: #f8f5ee;
  --dd-muted: #aaaebe;
  --dd-accent: #b9a2ff;
  --dd-accent-soft: rgba(185, 162, 255, 0.14);
  --dd-gold: #f0c978;
  --dd-success: #62d5a6;
  --dd-danger: #ff8585;
}
.dialog-designer * { box-sizing: border-box; }
.dialog-designer [hidden] { display: none !important; }
.dialog-designer button,
.dialog-designer input,
.dialog-designer select,
.dialog-designer textarea { font: inherit; }
.dialog-designer__toggle {
  min-width: 92px;
  height: 42px;
  padding: 0 16px;
  border: 1px solid #72698d;
  border-radius: 999px;
  background: #242130;
  color: #fff;
  font-weight: 700;
  cursor: pointer;
}
.dialog-designer__panel {
  display: none;
  width: min(680px, calc(100vw - 28px));
  max-height: calc(100vh - 78px);
  overflow: auto;
  border: 1px solid var(--dd-border);
  border-radius: 10px;
  background:
    linear-gradient(145deg, rgba(185, 162, 255, 0.045), transparent 32%),
    var(--dd-bg);
  box-shadow: 0 22px 72px rgba(0, 0, 0, 0.5);
}
.dialog-designer[data-open="true"] .dialog-designer__panel { display: block; }
.dialog-designer__header {
  position: sticky;
  top: 0;
  z-index: 8;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  min-height: 54px;
  padding: 11px 14px;
  border-bottom: 1px solid var(--dd-border);
  background: rgba(17, 18, 24, 0.97);
  backdrop-filter: blur(12px);
}
.dialog-designer__title-wrap { min-width: 0; }
.dialog-designer__eyebrow {
  color: var(--dd-gold);
  font-size: 10px;
  font-weight: 800;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}
.dialog-designer__title {
  overflow: hidden;
  font-family: Georgia, "Times New Roman", serif;
  font-size: 19px;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.dialog-designer__actions,
.dialog-designer__row,
.dialog-designer__add-row,
.dialog-designer__compact-actions {
  display: flex;
  align-items: center;
  gap: 7px;
}
.dialog-designer__actions { flex-wrap: wrap; justify-content: flex-end; }
.dialog-designer__body { padding: 14px; }
.dialog-designer__dialog-bar {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  gap: 8px;
  margin-bottom: 13px;
}
.dialog-designer__workspace {
  display: grid;
  grid-template-columns: minmax(250px, 0.92fr) minmax(280px, 1.08fr);
  gap: 12px;
  align-items: start;
}
.dialog-designer__section,
.dialog-designer__editor {
  min-width: 0;
  border: 1px solid var(--dd-border);
  border-radius: 9px;
  background: rgba(28, 30, 39, 0.78);
}
.dialog-designer__section-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  min-height: 38px;
  padding: 8px 10px;
  border-bottom: 1px solid var(--dd-border);
  color: var(--dd-muted);
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}
.dialog-designer__tree,
.dialog-designer__editor-body { padding: 10px; }
.dialog-designer__tree { overflow-x: auto; }
.dialog-designer__branch { position: relative; min-width: 220px; }
.dialog-designer__branch + .dialog-designer__branch { margin-top: 9px; }
.dialog-designer__branch-label {
  display: flex;
  align-items: center;
  gap: 6px;
  margin: 0 0 5px 2px;
  color: var(--dd-muted);
  font-size: 10px;
  font-weight: 750;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}
.dialog-designer__branch-label::before {
  width: 14px;
  height: 1px;
  background: var(--dd-border-strong);
  content: "";
}
.dialog-designer__node {
  overflow: hidden;
  border: 1px solid var(--dd-border);
  border-radius: 8px;
  background: #181a22;
}
.dialog-designer__node.is-selected {
  border-color: var(--dd-accent);
  box-shadow: 0 0 0 2px var(--dd-accent-soft);
}
.dialog-designer__node.is-disabled { opacity: 0.58; }
.dialog-designer__node-head {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto auto;
  gap: 6px;
  align-items: center;
  padding: 7px;
}
.dialog-designer__node-select {
  display: flex;
  min-width: 0;
  align-items: center;
  gap: 7px;
  padding: 3px;
  border: 0;
  background: transparent;
  color: var(--dd-text);
  text-align: left;
  cursor: pointer;
}
.dialog-designer__node-name {
  overflow: hidden;
  font-weight: 700;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.dialog-designer__type {
  flex: none;
  padding: 2px 5px;
  border: 1px solid rgba(185, 162, 255, 0.34);
  border-radius: 999px;
  color: var(--dd-accent);
  font-size: 9px;
  font-weight: 850;
  letter-spacing: 0.05em;
  text-transform: uppercase;
}
.dialog-designer__type--decision {
  border-color: rgba(240, 201, 120, 0.38);
  color: var(--dd-gold);
}
.dialog-designer__node-children {
  display: grid;
  gap: 8px;
  padding: 8px 8px 8px 17px;
  border-top: 1px solid rgba(59, 62, 77, 0.72);
  background: rgba(10, 11, 15, 0.26);
}
.dialog-designer__mini-lines {
  display: grid;
  gap: 4px;
  margin-bottom: 2px;
}
.dialog-designer__mini-line,
.dialog-designer__option-summary {
  display: flex;
  min-width: 0;
  align-items: center;
  gap: 6px;
  padding: 5px 7px;
  border: 1px solid transparent;
  border-radius: 6px;
  background: rgba(39, 42, 54, 0.62);
  color: var(--dd-muted);
  cursor: pointer;
}
.dialog-designer__mini-line:hover,
.dialog-designer__mini-line.is-selected,
.dialog-designer__option-summary:hover,
.dialog-designer__option-summary.is-selected {
  border-color: var(--dd-border-strong);
  color: var(--dd-text);
}
.dialog-designer__mini-line span,
.dialog-designer__option-summary span {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.dialog-designer__option-branch {
  padding: 7px;
  border-left: 2px solid rgba(240, 201, 120, 0.3);
  border-radius: 0 7px 7px 0;
  background: rgba(240, 201, 120, 0.035);
}
.dialog-designer__option-branch.is-disabled { opacity: 0.55; }
.dialog-designer__option-head {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto auto;
  gap: 5px;
  align-items: center;
  margin-bottom: 6px;
}
.dialog-designer__continuation {
  padding-top: 7px;
  border-top: 1px dashed rgba(90, 94, 114, 0.55);
}
.dialog-designer__button,
.dialog-designer__icon-button {
  min-height: 29px;
  padding: 5px 9px;
  border: 1px solid var(--dd-border-strong);
  border-radius: 6px;
  background: var(--dd-surface-soft);
  color: var(--dd-text);
  cursor: pointer;
}
.dialog-designer__button:hover,
.dialog-designer__icon-button:hover {
  border-color: var(--dd-accent);
  background: #303344;
}
.dialog-designer__button:disabled,
.dialog-designer__icon-button:disabled { opacity: 0.38; cursor: not-allowed; }
.dialog-designer__button--primary {
  border-color: #7664aa;
  background: #41375f;
}
.dialog-designer__button--danger:hover,
.dialog-designer__icon-button--danger:hover {
  border-color: var(--dd-danger);
  color: #ffd1d1;
}
.dialog-designer__button--small { min-height: 25px; padding: 3px 7px; font-size: 11px; }
.dialog-designer__icon-button {
  display: inline-grid;
  width: 28px;
  min-height: 28px;
  padding: 0;
  place-items: center;
}
.dialog-designer__field {
  display: grid;
  gap: 5px;
  margin-bottom: 10px;
}
.dialog-designer__field > span,
.dialog-designer__field-label {
  color: var(--dd-muted);
  font-size: 11px;
  font-weight: 650;
}
.dialog-designer__input,
.dialog-designer__select,
.dialog-designer__textarea {
  width: 100%;
  min-width: 0;
  border: 1px solid var(--dd-border);
  border-radius: 6px;
  padding: 7px 8px;
  background: #101118;
  color: var(--dd-text);
}
.dialog-designer__textarea { min-height: 70px; resize: vertical; }
.dialog-designer__input:focus,
.dialog-designer__select:focus,
.dialog-designer__textarea:focus,
.dialog-designer button:focus-visible {
  outline: 2px solid rgba(185, 162, 255, 0.72);
  outline-offset: 1px;
}
.dialog-designer__check {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  color: var(--dd-muted);
  cursor: pointer;
}
.dialog-designer__check input { accent-color: var(--dd-accent); }
.dialog-designer__subhead {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  margin: 14px 0 7px;
  padding-top: 10px;
  border-top: 1px solid var(--dd-border);
  color: var(--dd-muted);
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 0.07em;
  text-transform: uppercase;
}
.dialog-designer__card-list { display: grid; gap: 7px; }
.dialog-designer__line-card,
.dialog-designer__option-card,
.dialog-designer__create-card {
  padding: 9px;
  border: 1px solid var(--dd-border);
  border-radius: 8px;
  background: rgba(16, 17, 24, 0.72);
}
.dialog-designer__line-card.is-selected,
.dialog-designer__option-card.is-selected { border-color: var(--dd-accent); }
.dialog-designer__line-card.is-disabled,
.dialog-designer__option-card.is-disabled { opacity: 0.62; }
.dialog-designer__line-top,
.dialog-designer__option-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  margin-bottom: 8px;
}
.dialog-designer__line-index {
  color: var(--dd-gold);
  font: 700 10px/1 ui-monospace, SFMono-Regular, Menlo, monospace;
}
.dialog-designer__line-copy {
  margin: 7px 0 0;
  color: var(--dd-muted);
  font-size: 11px;
}
.dialog-designer__create-card summary {
  color: var(--dd-accent);
  font-weight: 750;
  cursor: pointer;
}
.dialog-designer__create-form { margin-top: 10px; }
.dialog-designer__empty {
  padding: 14px 10px;
  color: var(--dd-muted);
  text-align: center;
}
.dialog-designer__hint {
  margin: 6px 0;
  color: var(--dd-muted);
  font-size: 11px;
}
.dialog-designer__status {
  position: sticky;
  bottom: 0;
  min-height: 38px;
  margin-top: 12px;
  padding: 10px 12px;
  border: 1px solid var(--dd-border);
  border-radius: 8px;
  background: rgba(17, 18, 24, 0.96);
  color: var(--dd-muted);
}
.dialog-designer__status[data-tone="success"] { color: var(--dd-success); }
.dialog-designer__status[data-tone="error"] { color: var(--dd-danger); }
.dialog-designer__status[data-tone="working"] { color: var(--dd-gold); }

@media (max-width: 660px) {
  .dialog-designer__workspace { grid-template-columns: 1fr; }
  .dialog-designer__header { align-items: flex-start; }
  .dialog-designer__actions { max-width: 210px; }
}
`;
  document.head.append(style);
}
