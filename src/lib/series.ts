import { getCollection, type CollectionEntry } from 'astro:content';
import { ACTIVE_BUILDS } from '../data/activeBuilds';

export interface BuildLogSeries {
  logs: CollectionEntry<'blog'>[];
  caseStudy: CollectionEntry<'blog'> | undefined;
}

function sortByDateThenSlug(a: CollectionEntry<'blog'>, b: CollectionEntry<'blog'>) {
  const dateDiff = a.data.date.getTime() - b.data.date.getTime();
  return dateDiff !== 0 ? dateDiff : a.id.localeCompare(b.id);
}

// Route all series queries through here so a future `hidden` filter is a
// one-line change in one place.
export async function getBuildLogSeries(project: string): Promise<BuildLogSeries> {
  const posts = await getCollection('blog');

  const logs = posts
    .filter(post => post.data.type === 'build-log' && post.data.project === project)
    .sort(sortByDateThenSlug);

  const caseStudy = posts.find(post => post.data.type === 'case-study' && post.data.project === project);

  return { logs, caseStudy };
}

export interface SeriesPosition {
  prev: CollectionEntry<'blog'> | undefined;
  next: CollectionEntry<'blog'> | undefined;
  index: number; // 1-based
  total: number;
}

export function getSeriesPosition(series: BuildLogSeries, currentSlug: string): SeriesPosition {
  const currentIndex = series.logs.findIndex(log => log.id === currentSlug);

  return {
    prev: currentIndex > 0 ? series.logs[currentIndex - 1] : undefined,
    next: currentIndex >= 0 && currentIndex < series.logs.length - 1 ? series.logs[currentIndex + 1] : undefined,
    index: currentIndex + 1,
    total: series.logs.length,
  };
}

// Human-readable project name: the case study's own display name where one
// exists, falling back to the ACTIVE_BUILDS entry for projects still in progress.
export function getProjectDisplayName(project: string, caseStudy: CollectionEntry<'blog'> | undefined): string {
  if (caseStudy) {
    const colonIdx = caseStudy.data.title.indexOf(': ');
    return caseStudy.data.projectName ?? (colonIdx !== -1 ? caseStudy.data.title.slice(0, colonIdx) : caseStudy.data.title);
  }
  return ACTIVE_BUILDS.find(b => b.id === project)?.name ?? project;
}
