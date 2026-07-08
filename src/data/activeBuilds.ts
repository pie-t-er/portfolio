export interface ActiveBuild {
  id: string;         // matches the `project` field in blog post frontmatter
  name: string;
  description: string;
  github?: string;
  demo?: string;
}

// Add a project here while it's actively being worked on.
// When development winds down, write a case study and remove it from this list.
export const ACTIVE_BUILDS: ActiveBuild[] = [
  {
    id: 'portfolio',
    name: 'This Site',
    description: 'Building this portfolio in public; Astro, React islands, content-driven design.',
    github: 'https://github.com/pie-t-er/portfolio',
  },
];
