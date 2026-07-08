import { useState, useMemo } from 'react';

// Small corner-bracket accent, mirrors src/components/patterns/CardAccent.astro
// (kept as a local inline SVG since Astro components can't be used inside a React island).
const CORNER_ACCENT_COLORS = { forest: '#74c69d', brown: '#c9956a', purple: '#a78bcc', navy: '#6aa3d4' };

function CornerAccent({ color }) {
  return (
    <svg className="absolute right-0 top-0 w-5 h-5 pointer-events-none -scale-x-100" viewBox="0 0 20 20" aria-hidden="true">
      <path d="M0 0 L20 0 L20 6 L6 6 L6 20 L0 20 Z" fill="none" stroke={CORNER_ACCENT_COLORS[color]} strokeWidth="1" opacity="0.7" />
    </svg>
  );
}

const TYPE_FILTERS = [
  { value: 'all', label: 'All' },
  { value: 'case-study', label: 'Projects' },
  { value: 'build-log', label: 'Build Log' },
  { value: 'essay', label: 'Essays' },
  { value: 'archive', label: 'Archive' },
];

// compact=true is the smaller mobile sizing so the whole group fits one row without wrapping.
function TypeFilterGroup({ typeFilter, setTypeFilter, compact }) {
  return (
    <div className={`inline-flex shrink-0 rounded-lg border border-border-subtle overflow-hidden font-medium ${compact ? 'text-xs' : 'text-sm'}`}>
      {TYPE_FILTERS.map(({ value, label }) => (
        <button
          key={value}
          onClick={() => setTypeFilter(value)}
          className={`whitespace-nowrap transition-colors ${compact ? 'px-2.5 py-1' : 'px-3 py-1.5'} ${
            typeFilter === value
              ? 'bg-forest text-ink'
              : 'text-ink-muted hover:bg-bg-surface-2'
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
}

function TagButton({ tag, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`shrink-0 whitespace-nowrap text-xs px-2.5 py-1 rounded-full border transition-colors ${
        active
          ? 'bg-forest text-ink border-forest'
          : 'border-border-subtle text-ink-muted hover:border-forest-light hover:text-forest-light'
      }`}
    >
      #{tag}
    </button>
  );
}

export default function BlogFeed({ posts }) {
  const [typeFilter, setTypeFilter] = useState('all');
  const [activeTag, setActiveTag] = useState(null);

  const allTags = useMemo(
    () => [...new Set(posts.flatMap(p => p.tags))].sort(),
    [posts]
  );

  // Distributed round-robin into 3 rows (same reading order the old grid-flow-col
  // layout produced) but each row is its own flex row, so bubbles size to their own
  // text instead of being stretched to a shared grid column width.
  const tagRows = useMemo(() => {
    const rows = [[], [], []];
    allTags.forEach((tag, i) => rows[i % 3].push(tag));
    return rows.filter(row => row.length > 0);
  }, [allTags]);

  const filtered = useMemo(
    () =>
      posts
        .filter(p => typeFilter === 'all' || p.type === typeFilter)
        .filter(p => !activeTag || p.tags.includes(activeTag)),
    [posts, typeFilter, activeTag]
  );

  return (
    <div>
      {/* Desktop: single row, pills and tags flow together and wrap normally */}
      <div className="hidden sm:flex flex-wrap items-center gap-3 mb-10">
        <TypeFilterGroup typeFilter={typeFilter} setTypeFilter={setTypeFilter} compact={false} />

        {allTags.map(tag => (
          <TagButton
            key={tag}
            tag={tag}
            active={activeTag === tag}
            onClick={() => setActiveTag(activeTag === tag ? null : tag)}
          />
        ))}

        {(typeFilter !== 'all' || activeTag) && (
          <button
            onClick={() => { setTypeFilter('all'); setActiveTag(null); }}
            className="text-xs text-ink-muted hover:text-ink transition-colors ml-auto"
          >
            Clear filters
          </button>
        )}
      </div>

      {/* Mobile: type filters on their own row (compact, always fits), tags in a
          3-row horizontal-scrolling grid below so a long tag list doesn't wrap the page taller */}
      <div className="sm:hidden mb-10">
        <div className="mb-3">
          <TypeFilterGroup typeFilter={typeFilter} setTypeFilter={setTypeFilter} compact={true} />
        </div>

        {tagRows.length > 0 && (
          <div className="flex flex-col items-start gap-2 overflow-x-auto -mx-4 px-4 pb-1">
            {tagRows.map((row, i) => (
              <div key={i} className="flex gap-2">
                {row.map(tag => (
                  <TagButton
                    key={tag}
                    tag={tag}
                    active={activeTag === tag}
                    onClick={() => setActiveTag(activeTag === tag ? null : tag)}
                  />
                ))}
              </div>
            ))}
          </div>
        )}

        {(typeFilter !== 'all' || activeTag) && (
          <button
            onClick={() => { setTypeFilter('all'); setActiveTag(null); }}
            className="mt-3 text-xs text-ink-muted hover:text-ink transition-colors"
          >
            Clear filters
          </button>
        )}
      </div>

      {filtered.length === 0 && (
        <p className="text-ink-muted text-sm py-12 text-center">No posts match this filter.</p>
      )}

      <div className="space-y-4">
        {filtered.map(post =>
          post.type === 'build-log' ? <BuildLogCard key={post.id} post={post} />
          : post.type === 'essay'   ? <EssayCard key={post.id} post={post} />
          : post.type === 'archive' ? <ArchiveCard key={post.id} post={post} />
          : <CaseStudyCard key={post.id} post={post} />
        )}
      </div>
    </div>
  );
}

function CaseStudyCard({ post }) {
  // Split title into project name + tagline
  const colonIdx = post.title.indexOf(': ');
  const displayName = post.projectName ?? (colonIdx !== -1 ? post.title.slice(0, colonIdx) : post.title);
  const tagline = colonIdx !== -1 ? post.title.slice(colonIdx + 2) : null;

  return (
    <a
      href={`/blog/${post.id}`}
      className="relative group block p-4 sm:p-6 rounded-xl border border-border-subtle hover:border-forest/40 hover:shadow-sm transition-all"
    >
      <CornerAccent color="forest" />
      <div className="flex items-center gap-2 mb-3">
        <span className="text-xs font-semibold text-forest-light bg-forest/10 px-2 py-0.5 rounded-full">
          Project
        </span>
        <time className="text-xs text-ink-muted">{formatDate(post.date)}</time>
      </div>
      <h3 className="text-xl font-heading font-bold text-ink group-hover:text-forest-light transition-colors mb-0.5">
        {displayName}
      </h3>
      {tagline && (
        <p className="text-sm text-ink-muted font-medium mb-2">{tagline}</p>
      )}
      <p className="text-ink-muted text-sm leading-relaxed mb-4">{post.summary}</p>
      {post.stack.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {post.stack.map(s => (
            <span key={s} className="text-xs bg-bg-surface-2 text-ink-muted px-2 py-0.5 rounded-full">
              {s}
            </span>
          ))}
        </div>
      )}
    </a>
  );
}

function BuildLogCard({ post }) {
  return (
    <a
      href={`/blog/${post.id}`}
      className="group block py-4 border-b border-border-subtle hover:border-brown/40 transition-colors"
    >
      <div className="flex items-center gap-2 mb-1">
        <span className="text-xs font-semibold text-brown-light bg-brown/10 px-2 py-0.5 rounded-full">
          {post.projectLabel}
        </span>
        <time className="text-xs font-mono text-ink-muted">{formatDate(post.date)}</time>
      </div>
      <h3 className="font-medium text-ink group-hover:text-brown-light transition-colors truncate">
        {post.title}
      </h3>
      <p className="text-sm text-ink-muted mt-0.5 line-clamp-3">{post.summary}</p>
    </a>
  );
}

function EssayCard({ post }) {
  return (
    <a
      href={`/blog/${post.id}`}
      className="relative group block p-4 sm:p-6 rounded-xl border border-border-subtle hover:border-purple/40 hover:shadow-sm transition-all"
    >
      <CornerAccent color="purple" />
      <div className="flex items-center gap-2 mb-3">
        <span className="text-xs font-semibold text-purple-light bg-purple/10 px-2 py-0.5 rounded-full">
          Essay
        </span>
        <time className="text-xs text-ink-muted">{formatDate(post.date)}</time>
      </div>
      <h3 className="text-xl font-heading font-bold text-ink group-hover:text-purple-light transition-colors mb-2">
        {post.title}
      </h3>
      <p className="text-ink-muted text-sm leading-relaxed">{post.summary}</p>
      {post.tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mt-3">
          {post.tags.map(t => (
            <span key={t} className="text-xs bg-bg-surface-2 text-ink-muted px-2 py-0.5 rounded-full">
              #{t}
            </span>
          ))}
        </div>
      )}
    </a>
  );
}

function ArchiveCard({ post }) {
  return (
    <a
      href={`/blog/${post.id}`}
      className="group block py-4 border-b border-border-subtle hover:border-navy/40 transition-colors"
    >
      <div className="flex items-center gap-2 mb-1">
        <span className="text-xs font-semibold text-navy-light bg-navy/10 px-2 py-0.5 rounded-full">
          Archive
        </span>
        {post.course && (
          <span className="text-xs text-ink-muted truncate">{post.course}</span>
        )}
        <time className="text-xs font-mono text-ink-muted shrink-0">{formatDate(post.date)}</time>
      </div>
      <h3 className="font-medium text-ink group-hover:text-navy-light transition-colors truncate">
        {post.title}
      </h3>
      <p className="text-sm text-ink-muted mt-0.5 line-clamp-2">{post.summary}</p>
    </a>
  );
}

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}
