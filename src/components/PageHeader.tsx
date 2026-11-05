export function PageHeader({ title, lead }: { title: string; lead?: string }) {
  return (
    <header className="wrap pt-10 pb-1 md:pt-12">
      <h1 className="d-l text-paper">{title}</h1>
      {lead && <p className="mt-5 text-lg text-muted prose-w">{lead}</p>}
    </header>
  );
}
