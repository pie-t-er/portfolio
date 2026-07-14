export interface LiveDeployment {
  name: string;
  description: string;
  url: string;
  caseStudy?: string; // blog post slug, if one exists
}

export const LIVE_DEPLOYMENTS: LiveDeployment[] = [
  {
    name: 'Tennis Oracle',
    description: 'ATP match predictor hooked up to live results and betting odds. Accurate and well-calibrated, retrained and tuned in public.',
    url: 'https://tennis-oracle.vercel.app/',
    caseStudy: 'tennis-oracle',
  },
  {
    name: 'Virgo',
    description: 'AI-powered wardrobe management agent.',
    url: 'https://virgo-85048588163.us-central1.run.app/',
    caseStudy: 'virgo',
  },
];
