// -------------------------------------------------------------------------
// Site-wide settings. This is the main file to edit when you set up the site.
// -------------------------------------------------------------------------
export const site = {
  name: 'TAKO Lab', // short name — shown in the nav bar, footer, and browser tab
  fullName: 'Trustworthy AI through Knowledge and Optimization Lab', // full name — home page heading
  role: 'Research Lab', // shown under the name
  tagline:
    'We perform research in artificial intelligence (AI) and machine learning (ML) with focus on neurosymbolic AI. Our goal is to enable and support decision-making in the real world in the presence of probabilistic uncertainty and symbolic knowledge (graph structures, logical, arithmetic, and physical constraints, etc) to achieve trustworthy AI and aid scientific discoveries.',
  description: 'The Example Research Laboratory — research in your area of interest.',

  // Principal investigator / director.
  director: {
    name: 'Prof. Zhe Zeng',
    url: 'https://zzeng.me/', // link to the PI's personal site
  },

  // Contact block on the home page.
  affiliation: 'Department of Computer Science',
  address: ['University of Virginia'],
  email: 'zhez@virginia.edu',

  // Social / profile links. Leave a value empty ('') to hide that row.
  links: {
    github: '',
    twitter: '',
    mastodon: '',
    youtube: '',
  },
};

// -------------------------------------------------------------------------
// Top navigation. `id` must match the page's active tab; `href` is the path.
// -------------------------------------------------------------------------
export const nav = [
  { id: 'news', href: '/', label: 'News' },
  { id: 'members', href: '/members/', label: 'Members' },
  { id: 'publications', href: '/publications/', label: 'Publications' },
  { id: 'talks', href: '/talks/', label: 'Talks' },
  { id: 'pi', href: 'https://zzeng.me', label: 'PI' },
];
