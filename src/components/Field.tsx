export function Field({
  label, name, type = "text", required, defaultValue, placeholder, hint, error, textarea, autoComplete, inputMode, scope,
}: {
  label: string; name: string; type?: string; required?: boolean; defaultValue?: string;
  placeholder?: string; hint?: string; error?: string; textarea?: boolean;
  autoComplete?: string; inputMode?: "text" | "email" | "tel" | "numeric"; scope?: string;
}) {
  const id = `f-${scope ? `${scope}-` : ""}${name}`;
  const describedBy = [hint && `${id}-hint`, error && `${id}-err`].filter(Boolean).join(" ") || undefined;
  return (
    <div className="field">
      <label htmlFor={id}>
        {label} {required && <span className="text-accent">*</span>}
      </label>
      {textarea ? (
        <textarea id={id} name={name} required={required} defaultValue={defaultValue} placeholder={placeholder}
          className="textarea" aria-invalid={!!error} aria-describedby={describedBy} />
      ) : (
        <input id={id} name={name} type={type} required={required} defaultValue={defaultValue} placeholder={placeholder}
          autoComplete={autoComplete} inputMode={inputMode}
          className="input" aria-invalid={!!error} aria-describedby={describedBy} />
      )}
      {/* A dica vem depois do campo: acima, ela empurrava o input e dois campos
          lado a lado ficavam desalinhados. */}
      {hint && <p id={`${id}-hint`} className="hint">{hint}</p>}
      {error && <p id={`${id}-err`} className="error-text" role="alert">{error}</p>}
    </div>
  );
}
