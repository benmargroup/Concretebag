// linkmap.ts — concretebag.com pre-computed internal linking (Phase 4)
// Generated from pages.ts. Rebuild this whenever you add pages so links stay complete.
//
// How the template uses this:
//   - On every CALCULATOR/REFERENCE page: render a "Related" block from
//     pageLinks[slug].siblings, an up-link to pageLinks[slug].hub, and
//     cross-category links from pageLinks[slug].crossLinks.
//   - On every HUB page: list every slug in hubMembers[hubSlug].
//   - In the site FOOTER (all pages): render footerHubs as the hub matrix.
//
// Sibling logic: nearest by area (slabs/sheds/driveways), by diameter
// (sonotubes), or by concrete volume (posts). Reference pages link each other.

export interface PageLinks {
  hub: string;          // category hub this page links up to
  siblings: string[];   // nearest same-category pages (6-8, fewer in small groups)
  crossLinks: string[]; // 2-3 cross-category hubs
}

export const pageLinks: Record<string, PageLinks> = {

  // slab pages
  '4x4-concrete-slab': { hub: 'slab-calculator', siblings: ['6x6-concrete-slab', '8x8-concrete-slab', '8x10-concrete-slab', '10x10-concrete-slab', '10x12-concrete-slab', '12x12-concrete-slab', '10x16-concrete-slab', '12x14-concrete-slab'], crossLinks: ['driveway-calculator', 'shed-base-calculator', 'concrete-reference'] },
  '6x6-concrete-slab': { hub: 'slab-calculator', siblings: ['4x4-concrete-slab', '8x8-concrete-slab', '8x10-concrete-slab', '10x10-concrete-slab', '10x12-concrete-slab', '12x12-concrete-slab', '10x16-concrete-slab', '12x14-concrete-slab'], crossLinks: ['driveway-calculator', 'shed-base-calculator', 'concrete-reference'] },
  '8x8-concrete-slab': { hub: 'slab-calculator', siblings: ['4x4-concrete-slab', '6x6-concrete-slab', '8x10-concrete-slab', '10x10-concrete-slab', '10x12-concrete-slab', '12x12-concrete-slab', '10x16-concrete-slab', '12x14-concrete-slab'], crossLinks: ['driveway-calculator', 'shed-base-calculator', 'concrete-reference'] },
  '8x10-concrete-slab': { hub: 'slab-calculator', siblings: ['4x4-concrete-slab', '6x6-concrete-slab', '8x8-concrete-slab', '10x10-concrete-slab', '10x12-concrete-slab', '12x12-concrete-slab', '10x16-concrete-slab', '12x14-concrete-slab'], crossLinks: ['driveway-calculator', 'shed-base-calculator', 'concrete-reference'] },
  '10x10-concrete-slab': { hub: 'slab-calculator', siblings: ['4x4-concrete-slab', '6x6-concrete-slab', '8x8-concrete-slab', '8x10-concrete-slab', '10x12-concrete-slab', '12x12-concrete-slab', '10x16-concrete-slab', '12x14-concrete-slab'], crossLinks: ['driveway-calculator', 'shed-base-calculator', 'concrete-reference'] },
  '10x12-concrete-slab': { hub: 'slab-calculator', siblings: ['8x8-concrete-slab', '8x10-concrete-slab', '10x10-concrete-slab', '12x12-concrete-slab', '10x16-concrete-slab', '12x14-concrete-slab', '12x16-concrete-slab', '14x14-concrete-slab'], crossLinks: ['driveway-calculator', 'shed-base-calculator', 'concrete-reference'] },
  '10x16-concrete-slab': { hub: 'slab-calculator', siblings: ['8x10-concrete-slab', '10x10-concrete-slab', '10x12-concrete-slab', '12x12-concrete-slab', '12x14-concrete-slab', '12x16-concrete-slab', '14x14-concrete-slab', '10x20-concrete-slab'], crossLinks: ['driveway-calculator', 'shed-base-calculator', 'concrete-reference'] },
  '10x20-concrete-slab': { hub: 'slab-calculator', siblings: ['10x12-concrete-slab', '12x12-concrete-slab', '10x16-concrete-slab', '12x14-concrete-slab', '12x16-concrete-slab', '14x14-concrete-slab', '12x20-concrete-slab', '16x16-concrete-slab'], crossLinks: ['driveway-calculator', 'shed-base-calculator', 'concrete-reference'] },
  '12x12-concrete-slab': { hub: 'slab-calculator', siblings: ['8x10-concrete-slab', '10x10-concrete-slab', '10x12-concrete-slab', '10x16-concrete-slab', '12x14-concrete-slab', '12x16-concrete-slab', '14x14-concrete-slab', '10x20-concrete-slab'], crossLinks: ['driveway-calculator', 'shed-base-calculator', 'concrete-reference'] },
  '12x14-concrete-slab': { hub: 'slab-calculator', siblings: ['10x10-concrete-slab', '10x12-concrete-slab', '12x12-concrete-slab', '10x16-concrete-slab', '12x16-concrete-slab', '14x14-concrete-slab', '10x20-concrete-slab', '12x20-concrete-slab'], crossLinks: ['driveway-calculator', 'shed-base-calculator', 'concrete-reference'] },
  '12x16-concrete-slab': { hub: 'slab-calculator', siblings: ['10x12-concrete-slab', '12x12-concrete-slab', '10x16-concrete-slab', '12x14-concrete-slab', '14x14-concrete-slab', '10x20-concrete-slab', '12x20-concrete-slab', '16x16-concrete-slab'], crossLinks: ['driveway-calculator', 'shed-base-calculator', 'concrete-reference'] },
  '12x20-concrete-slab': { hub: 'slab-calculator', siblings: ['12x12-concrete-slab', '10x16-concrete-slab', '12x14-concrete-slab', '12x16-concrete-slab', '14x14-concrete-slab', '10x20-concrete-slab', '16x16-concrete-slab', '16x20-concrete-slab'], crossLinks: ['driveway-calculator', 'shed-base-calculator', 'concrete-reference'] },
  '14x14-concrete-slab': { hub: 'slab-calculator', siblings: ['10x12-concrete-slab', '12x12-concrete-slab', '10x16-concrete-slab', '12x14-concrete-slab', '12x16-concrete-slab', '10x20-concrete-slab', '12x20-concrete-slab', '16x16-concrete-slab'], crossLinks: ['driveway-calculator', 'shed-base-calculator', 'concrete-reference'] },
  '16x16-concrete-slab': { hub: 'slab-calculator', siblings: ['12x12-concrete-slab', '10x16-concrete-slab', '12x14-concrete-slab', '12x16-concrete-slab', '14x14-concrete-slab', '10x20-concrete-slab', '12x20-concrete-slab', '16x20-concrete-slab'], crossLinks: ['driveway-calculator', 'shed-base-calculator', 'concrete-reference'] },
  '16x20-concrete-slab': { hub: 'slab-calculator', siblings: ['10x16-concrete-slab', '12x14-concrete-slab', '12x16-concrete-slab', '14x14-concrete-slab', '10x20-concrete-slab', '12x20-concrete-slab', '16x16-concrete-slab', '20x20-concrete-slab'], crossLinks: ['driveway-calculator', 'shed-base-calculator', 'concrete-reference'] },
  '20x20-concrete-slab': { hub: 'slab-calculator', siblings: ['12x16-concrete-slab', '14x14-concrete-slab', '10x20-concrete-slab', '12x20-concrete-slab', '16x16-concrete-slab', '16x20-concrete-slab', '20x24-concrete-slab', '24x24-concrete-slab'], crossLinks: ['driveway-calculator', 'shed-base-calculator', 'concrete-reference'] },
  '20x24-concrete-slab': { hub: 'slab-calculator', siblings: ['14x14-concrete-slab', '10x20-concrete-slab', '12x20-concrete-slab', '16x16-concrete-slab', '16x20-concrete-slab', '20x20-concrete-slab', '24x24-concrete-slab', '24x30-concrete-slab'], crossLinks: ['driveway-calculator', 'shed-base-calculator', 'concrete-reference'] },
  '24x24-concrete-slab': { hub: 'slab-calculator', siblings: ['10x20-concrete-slab', '12x20-concrete-slab', '16x16-concrete-slab', '16x20-concrete-slab', '20x20-concrete-slab', '20x24-concrete-slab', '24x30-concrete-slab', '30x30-concrete-slab'], crossLinks: ['driveway-calculator', 'shed-base-calculator', 'concrete-reference'] },
  '24x30-concrete-slab': { hub: 'slab-calculator', siblings: ['10x20-concrete-slab', '12x20-concrete-slab', '16x16-concrete-slab', '16x20-concrete-slab', '20x20-concrete-slab', '20x24-concrete-slab', '24x24-concrete-slab', '30x30-concrete-slab'], crossLinks: ['driveway-calculator', 'shed-base-calculator', 'concrete-reference'] },
  '30x30-concrete-slab': { hub: 'slab-calculator', siblings: ['10x20-concrete-slab', '12x20-concrete-slab', '16x16-concrete-slab', '16x20-concrete-slab', '20x20-concrete-slab', '20x24-concrete-slab', '24x24-concrete-slab', '24x30-concrete-slab'], crossLinks: ['driveway-calculator', 'shed-base-calculator', 'concrete-reference'] },

  // driveway pages
  '10x10-concrete-slab-6-inch': { hub: 'driveway-calculator', siblings: ['10x20-concrete-slab-6-inch', '12x20-concrete-slab-6-inch', '20x20-concrete-slab-6-inch', '24x24-concrete-slab-6-inch'], crossLinks: ['slab-calculator', 'shed-base-calculator', 'concrete-reference'] },
  '10x20-concrete-slab-6-inch': { hub: 'driveway-calculator', siblings: ['10x10-concrete-slab-6-inch', '12x20-concrete-slab-6-inch', '20x20-concrete-slab-6-inch', '24x24-concrete-slab-6-inch'], crossLinks: ['slab-calculator', 'shed-base-calculator', 'concrete-reference'] },
  '12x20-concrete-slab-6-inch': { hub: 'driveway-calculator', siblings: ['10x10-concrete-slab-6-inch', '10x20-concrete-slab-6-inch', '20x20-concrete-slab-6-inch', '24x24-concrete-slab-6-inch'], crossLinks: ['slab-calculator', 'shed-base-calculator', 'concrete-reference'] },
  '20x20-concrete-slab-6-inch': { hub: 'driveway-calculator', siblings: ['10x10-concrete-slab-6-inch', '10x20-concrete-slab-6-inch', '12x20-concrete-slab-6-inch', '24x24-concrete-slab-6-inch'], crossLinks: ['slab-calculator', 'shed-base-calculator', 'concrete-reference'] },
  '24x24-concrete-slab-6-inch': { hub: 'driveway-calculator', siblings: ['10x10-concrete-slab-6-inch', '10x20-concrete-slab-6-inch', '12x20-concrete-slab-6-inch', '20x20-concrete-slab-6-inch'], crossLinks: ['slab-calculator', 'shed-base-calculator', 'concrete-reference'] },

  // post pages
  '4x4-fence-post-8-inch-hole': { hub: 'post-hole-calculator', siblings: ['mailbox-post-concrete', '4x4-fence-post-9-inch-hole', '6x6-post-10-inch-hole', '4x4-fence-post-36-inch-deep', '6x6-post-12-inch-hole', 'pergola-post-concrete'], crossLinks: ['sonotube-calculator', 'concrete-reference', 'slab-calculator'] },
  '4x4-fence-post-9-inch-hole': { hub: 'post-hole-calculator', siblings: ['4x4-fence-post-8-inch-hole', 'mailbox-post-concrete', '6x6-post-10-inch-hole', '4x4-fence-post-36-inch-deep', '6x6-post-12-inch-hole', 'pergola-post-concrete'], crossLinks: ['sonotube-calculator', 'concrete-reference', 'slab-calculator'] },
  '4x4-fence-post-36-inch-deep': { hub: 'post-hole-calculator', siblings: ['4x4-fence-post-8-inch-hole', 'mailbox-post-concrete', '4x4-fence-post-9-inch-hole', '6x6-post-10-inch-hole', '6x6-post-12-inch-hole', 'pergola-post-concrete'], crossLinks: ['sonotube-calculator', 'concrete-reference', 'slab-calculator'] },
  '6x6-post-10-inch-hole': { hub: 'post-hole-calculator', siblings: ['4x4-fence-post-8-inch-hole', 'mailbox-post-concrete', '4x4-fence-post-9-inch-hole', '4x4-fence-post-36-inch-deep', '6x6-post-12-inch-hole', 'pergola-post-concrete'], crossLinks: ['sonotube-calculator', 'concrete-reference', 'slab-calculator'] },
  '6x6-post-12-inch-hole': { hub: 'post-hole-calculator', siblings: ['4x4-fence-post-8-inch-hole', 'mailbox-post-concrete', '4x4-fence-post-9-inch-hole', '6x6-post-10-inch-hole', '4x4-fence-post-36-inch-deep', 'pergola-post-concrete'], crossLinks: ['sonotube-calculator', 'concrete-reference', 'slab-calculator'] },
  'mailbox-post-concrete': { hub: 'post-hole-calculator', siblings: ['4x4-fence-post-8-inch-hole', '4x4-fence-post-9-inch-hole', '6x6-post-10-inch-hole', '4x4-fence-post-36-inch-deep', '6x6-post-12-inch-hole', 'pergola-post-concrete'], crossLinks: ['sonotube-calculator', 'concrete-reference', 'slab-calculator'] },
  'pergola-post-concrete': { hub: 'post-hole-calculator', siblings: ['4x4-fence-post-8-inch-hole', 'mailbox-post-concrete', '4x4-fence-post-9-inch-hole', '6x6-post-10-inch-hole', '4x4-fence-post-36-inch-deep', '6x6-post-12-inch-hole'], crossLinks: ['sonotube-calculator', 'concrete-reference', 'slab-calculator'] },

  // sonotube pages
  '6-inch-sonotube': { hub: 'sonotube-calculator', siblings: ['8-inch-sonotube', '10-inch-sonotube', '12-inch-sonotube', '14-inch-sonotube', '16-inch-sonotube', '18-inch-sonotube', '24-inch-sonotube'], crossLinks: ['post-hole-calculator', 'concrete-reference', 'slab-calculator'] },
  '8-inch-sonotube': { hub: 'sonotube-calculator', siblings: ['6-inch-sonotube', '10-inch-sonotube', '12-inch-sonotube', '14-inch-sonotube', '16-inch-sonotube', '18-inch-sonotube', '24-inch-sonotube'], crossLinks: ['post-hole-calculator', 'concrete-reference', 'slab-calculator'] },
  '10-inch-sonotube': { hub: 'sonotube-calculator', siblings: ['6-inch-sonotube', '8-inch-sonotube', '12-inch-sonotube', '14-inch-sonotube', '16-inch-sonotube', '18-inch-sonotube', '24-inch-sonotube'], crossLinks: ['post-hole-calculator', 'concrete-reference', 'slab-calculator'] },
  '12-inch-sonotube': { hub: 'sonotube-calculator', siblings: ['6-inch-sonotube', '8-inch-sonotube', '10-inch-sonotube', '14-inch-sonotube', '16-inch-sonotube', '18-inch-sonotube', '24-inch-sonotube'], crossLinks: ['post-hole-calculator', 'concrete-reference', 'slab-calculator'] },
  '14-inch-sonotube': { hub: 'sonotube-calculator', siblings: ['6-inch-sonotube', '8-inch-sonotube', '10-inch-sonotube', '12-inch-sonotube', '16-inch-sonotube', '18-inch-sonotube', '24-inch-sonotube'], crossLinks: ['post-hole-calculator', 'concrete-reference', 'slab-calculator'] },
  '16-inch-sonotube': { hub: 'sonotube-calculator', siblings: ['6-inch-sonotube', '8-inch-sonotube', '10-inch-sonotube', '12-inch-sonotube', '14-inch-sonotube', '18-inch-sonotube', '24-inch-sonotube'], crossLinks: ['post-hole-calculator', 'concrete-reference', 'slab-calculator'] },
  '18-inch-sonotube': { hub: 'sonotube-calculator', siblings: ['6-inch-sonotube', '8-inch-sonotube', '10-inch-sonotube', '12-inch-sonotube', '14-inch-sonotube', '16-inch-sonotube', '24-inch-sonotube'], crossLinks: ['post-hole-calculator', 'concrete-reference', 'slab-calculator'] },
  '24-inch-sonotube': { hub: 'sonotube-calculator', siblings: ['6-inch-sonotube', '8-inch-sonotube', '10-inch-sonotube', '12-inch-sonotube', '14-inch-sonotube', '16-inch-sonotube', '18-inch-sonotube'], crossLinks: ['post-hole-calculator', 'concrete-reference', 'slab-calculator'] },

  // shed pages
  '6x6-shed-base': { hub: 'shed-base-calculator', siblings: ['8x8-shed-base', '8x10-shed-base', '8x12-shed-base', '10x10-shed-base', '10x12-shed-base', '12x12-shed-base', '10x16-shed-base', '12x16-shed-base'], crossLinks: ['slab-calculator', 'driveway-calculator', 'concrete-reference'] },
  '8x8-shed-base': { hub: 'shed-base-calculator', siblings: ['6x6-shed-base', '8x10-shed-base', '8x12-shed-base', '10x10-shed-base', '10x12-shed-base', '12x12-shed-base', '10x16-shed-base', '12x16-shed-base'], crossLinks: ['slab-calculator', 'driveway-calculator', 'concrete-reference'] },
  '8x10-shed-base': { hub: 'shed-base-calculator', siblings: ['6x6-shed-base', '8x8-shed-base', '8x12-shed-base', '10x10-shed-base', '10x12-shed-base', '12x12-shed-base', '10x16-shed-base', '12x16-shed-base'], crossLinks: ['slab-calculator', 'driveway-calculator', 'concrete-reference'] },
  '8x12-shed-base': { hub: 'shed-base-calculator', siblings: ['6x6-shed-base', '8x8-shed-base', '8x10-shed-base', '10x10-shed-base', '10x12-shed-base', '12x12-shed-base', '10x16-shed-base', '12x16-shed-base'], crossLinks: ['slab-calculator', 'driveway-calculator', 'concrete-reference'] },
  '10x10-shed-base': { hub: 'shed-base-calculator', siblings: ['6x6-shed-base', '8x8-shed-base', '8x10-shed-base', '8x12-shed-base', '10x12-shed-base', '12x12-shed-base', '10x16-shed-base', '12x16-shed-base'], crossLinks: ['slab-calculator', 'driveway-calculator', 'concrete-reference'] },
  '10x12-shed-base': { hub: 'shed-base-calculator', siblings: ['8x8-shed-base', '8x10-shed-base', '8x12-shed-base', '10x10-shed-base', '12x12-shed-base', '10x16-shed-base', '12x16-shed-base', '10x20-shed-base'], crossLinks: ['slab-calculator', 'driveway-calculator', 'concrete-reference'] },
  '10x16-shed-base': { hub: 'shed-base-calculator', siblings: ['8x10-shed-base', '8x12-shed-base', '10x10-shed-base', '10x12-shed-base', '12x12-shed-base', '12x16-shed-base', '10x20-shed-base', '12x20-shed-base'], crossLinks: ['slab-calculator', 'driveway-calculator', 'concrete-reference'] },
  '10x20-shed-base': { hub: 'shed-base-calculator', siblings: ['8x12-shed-base', '10x10-shed-base', '10x12-shed-base', '12x12-shed-base', '10x16-shed-base', '12x16-shed-base', '12x20-shed-base', '12x24-shed-base'], crossLinks: ['slab-calculator', 'driveway-calculator', 'concrete-reference'] },
  '12x12-shed-base': { hub: 'shed-base-calculator', siblings: ['8x8-shed-base', '8x10-shed-base', '8x12-shed-base', '10x10-shed-base', '10x12-shed-base', '10x16-shed-base', '12x16-shed-base', '10x20-shed-base'], crossLinks: ['slab-calculator', 'driveway-calculator', 'concrete-reference'] },
  '12x16-shed-base': { hub: 'shed-base-calculator', siblings: ['8x12-shed-base', '10x10-shed-base', '10x12-shed-base', '12x12-shed-base', '10x16-shed-base', '10x20-shed-base', '12x20-shed-base', '12x24-shed-base'], crossLinks: ['slab-calculator', 'driveway-calculator', 'concrete-reference'] },
  '12x20-shed-base': { hub: 'shed-base-calculator', siblings: ['8x12-shed-base', '10x10-shed-base', '10x12-shed-base', '12x12-shed-base', '10x16-shed-base', '12x16-shed-base', '10x20-shed-base', '12x24-shed-base'], crossLinks: ['slab-calculator', 'driveway-calculator', 'concrete-reference'] },
  '12x24-shed-base': { hub: 'shed-base-calculator', siblings: ['8x12-shed-base', '10x10-shed-base', '10x12-shed-base', '12x12-shed-base', '10x16-shed-base', '12x16-shed-base', '10x20-shed-base', '12x20-shed-base'], crossLinks: ['slab-calculator', 'driveway-calculator', 'concrete-reference'] },

  // reference pages
  'bags-of-concrete-per-yard': { hub: 'concrete-reference', siblings: ['80lb-bags-per-yard', '60lb-bags-per-yard', 'cubic-feet-per-bag', '80lb-vs-60lb-concrete', 'bags-on-a-pallet', 'concrete-bag-prices'], crossLinks: ['slab-calculator', 'sonotube-calculator', 'post-hole-calculator'] },
  '80lb-bags-per-yard': { hub: 'concrete-reference', siblings: ['bags-of-concrete-per-yard', '60lb-bags-per-yard', 'cubic-feet-per-bag', '80lb-vs-60lb-concrete', 'bags-on-a-pallet', 'concrete-bag-prices'], crossLinks: ['slab-calculator', 'sonotube-calculator', 'post-hole-calculator'] },
  '60lb-bags-per-yard': { hub: 'concrete-reference', siblings: ['bags-of-concrete-per-yard', '80lb-bags-per-yard', 'cubic-feet-per-bag', '80lb-vs-60lb-concrete', 'bags-on-a-pallet', 'concrete-bag-prices'], crossLinks: ['slab-calculator', 'sonotube-calculator', 'post-hole-calculator'] },
  'cubic-feet-per-bag': { hub: 'concrete-reference', siblings: ['bags-of-concrete-per-yard', '80lb-bags-per-yard', '60lb-bags-per-yard', '80lb-vs-60lb-concrete', 'bags-on-a-pallet', 'concrete-bag-prices'], crossLinks: ['slab-calculator', 'sonotube-calculator', 'post-hole-calculator'] },
  '80lb-vs-60lb-concrete': { hub: 'concrete-reference', siblings: ['bags-of-concrete-per-yard', '80lb-bags-per-yard', '60lb-bags-per-yard', 'cubic-feet-per-bag', 'bags-on-a-pallet', 'concrete-bag-prices'], crossLinks: ['slab-calculator', 'sonotube-calculator', 'post-hole-calculator'] },
  'bags-on-a-pallet': { hub: 'concrete-reference', siblings: ['bags-of-concrete-per-yard', '80lb-bags-per-yard', '60lb-bags-per-yard', 'cubic-feet-per-bag', '80lb-vs-60lb-concrete', 'concrete-bag-prices'], crossLinks: ['slab-calculator', 'sonotube-calculator', 'post-hole-calculator'] },
  'concrete-bag-prices': { hub: 'concrete-reference', siblings: ['bags-of-concrete-per-yard', '80lb-bags-per-yard', '60lb-bags-per-yard', 'cubic-feet-per-bag', '80lb-vs-60lb-concrete', 'bags-on-a-pallet'], crossLinks: ['slab-calculator', 'sonotube-calculator', 'post-hole-calculator'] },
};

// Every page in each category, ordered by size — used to build the hub pages.
export const hubMembers: Record<string, string[]> = {
  'slab-calculator': ['4x4-concrete-slab', '6x6-concrete-slab', '8x8-concrete-slab', '8x10-concrete-slab', '10x10-concrete-slab', '10x12-concrete-slab', '12x12-concrete-slab', '10x16-concrete-slab', '12x14-concrete-slab', '12x16-concrete-slab', '14x14-concrete-slab', '10x20-concrete-slab', '12x20-concrete-slab', '16x16-concrete-slab', '16x20-concrete-slab', '20x20-concrete-slab', '20x24-concrete-slab', '24x24-concrete-slab', '24x30-concrete-slab', '30x30-concrete-slab'],
  'driveway-calculator': ['10x10-concrete-slab-6-inch', '10x20-concrete-slab-6-inch', '12x20-concrete-slab-6-inch', '20x20-concrete-slab-6-inch', '24x24-concrete-slab-6-inch'],
  'post-hole-calculator': ['4x4-fence-post-8-inch-hole', 'mailbox-post-concrete', '4x4-fence-post-9-inch-hole', '6x6-post-10-inch-hole', '4x4-fence-post-36-inch-deep', '6x6-post-12-inch-hole', 'pergola-post-concrete'],
  'sonotube-calculator': ['6-inch-sonotube', '8-inch-sonotube', '10-inch-sonotube', '12-inch-sonotube', '14-inch-sonotube', '16-inch-sonotube', '18-inch-sonotube', '24-inch-sonotube'],
  'shed-base-calculator': ['6x6-shed-base', '8x8-shed-base', '8x10-shed-base', '8x12-shed-base', '10x10-shed-base', '10x12-shed-base', '12x12-shed-base', '10x16-shed-base', '12x16-shed-base', '10x20-shed-base', '12x20-shed-base', '12x24-shed-base'],
  'concrete-reference': ['bags-of-concrete-per-yard', '80lb-bags-per-yard', '60lb-bags-per-yard', 'cubic-feet-per-bag', '80lb-vs-60lb-concrete', 'bags-on-a-pallet', 'concrete-bag-prices'],
};

// Global footer matrix: show all of these on every page so nothing is orphaned.
export const footerHubs: string[] = ['slab-calculator', 'driveway-calculator', 'post-hole-calculator', 'sonotube-calculator', 'shed-base-calculator', 'concrete-reference'];
