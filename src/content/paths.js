export const paths = [
    {
        id: 'beginner', title: 'Beginner path: foundations to complete pages', level: 'Beginner',
        summary: 'The route the scope document defines: visual foundations → UI elements → components → patterns → complete pages.',
        outcomes: ['Speak the vocabulary of UI design.', 'Critique a screen using hierarchy, spacing, alignment and contrast.', 'Assemble components into patterns and a full page.'],
        prereq: [],
        steps: ['what-is-ui', 'visual-hierarchy', 'alignment', 'proximity-grouping', 'white-space', 'color-fundamentals', 'type-hierarchy', 'spacing-system', 'buttons', 'links', 'text-inputs', 'choice-controls', 'cards', 'top-navigation', 'alerts-banners', 'modals-dialogs', 'hero-sections', 'saas-landing-page', 'contrast-noncolor'],
        next: ['forms', 'dashboards', 'design-systems'],
    },
    {
        id: 'color', title: 'Color', level: 'All levels', summary: 'From hue and value to tokens, themes and accessible contrast.',
        outcomes: ['Build a palette and ramps.', 'Assign roles and semantic colors.', 'Pass WCAG contrast in light and dark themes.'],
        prereq: ['contrast-principle'],
        steps: ['color-fundamentals', 'color-wheel', 'color-schemes', 'color-harmony', 'color-psychology', 'color-roles', 'semantic-colors', 'color-tokens', 'accessible-color', 'palette-practice'], next: ['design-systems'],
    },
    {
        id: 'typography', title: 'Typography', level: 'All levels', summary: 'Anatomy, classification, properties, hierarchy, scale and real-world text.',
        outcomes: ['Choose and pair typefaces.', 'Set a responsive type scale.', 'Handle truncation, numerals and languages.'],
        prereq: ['visual-hierarchy'],
        steps: ['type-anatomy', 'type-classification', 'font-properties', 'font-pairing', 'type-hierarchy', 'type-scale', 'text-layout', 'case-numerals', 'readability-legibility', 'font-practicalities'], next: ['design-systems'],
    },
    {
        id: 'iconography', title: 'Iconography', level: 'Beginner', summary: 'Icon styles, construction, symbol families and accessible usage.',
        outcomes: ['Choose a consistent icon style.', 'Decide when icons need labels.', 'Name icons for assistive technology.'],
        prereq: ['basic-shapes'],
        steps: ['basic-shapes', 'pills-containers', 'icon-styles', 'icon-anatomy', 'icon-categories', 'icon-usage', 'icon-meaning', 'icon-buttons'],
    },
    {
        id: 'forms', title: 'Forms', level: 'Intermediate', summary: 'Inputs, choices, layout, validation and multistep flows.',
        outcomes: ['Choose the right control for each question.', 'Lay out forms for completion.', 'Write and place errors that help recovery.'],
        prereq: ['labels-helper-text', 'element-states'],
        steps: ['labels-helper-text', 'text-inputs', 'input-anatomy', 'choice-controls', 'segmented-controls', 'select-menus', 'sliders-steppers', 'date-time-pickers', 'file-upload', 'otp-input', 'form-layout', 'validation', 'multistep-forms', 'error-identification'], next: ['dashboards'],
    },
    {
        id: 'dashboards', title: 'Dashboards & applications', level: 'Intermediate', summary: 'Shells, data display, charts and the patterns inside products.',
        outcomes: ['Lay out a dashboard shell.', 'Design tables, filters and charts.', 'Structure settings and CRUD flows.'],
        prereq: ['grid-systems', 'cards'],
        steps: ['grid-systems', 'layout-patterns', 'sidebar-navigation', 'dashboard-shells', 'cards', 'tables-data-grids', 'charts', 'chart-anatomy', 'search-filter-sort', 'crud-flows', 'settings-account', 'system-states', 'app-pages'],
    },
    {
        id: 'landing-pages', title: 'Landing pages', level: 'Intermediate', summary: 'Sections, rhythm and complete marketing pages.',
        outcomes: ['Choose hero variants.', 'Order sections by visitor questions.', 'Use proof and pricing honestly.'],
        prereq: ['visual-hierarchy', 'type-hierarchy'],
        steps: ['hero-sections', 'headers-announcement', 'logo-clouds', 'feature-sections', 'social-proof', 'pricing-tables', 'faq-sections', 'cta-sections', 'footers', 'section-rhythm', 'saas-landing-page'],
    },
    {
        id: 'responsive', title: 'Responsive UI & accessibility', level: 'Intermediate', summary: 'Breakpoints, adaptation and the WCAG 2.2 criteria UI designers touch most.',
        outcomes: ['Plan breakpoints and content priority.', 'Design for keyboard, touch and zoom.', 'Meet WCAG 2.2 AA basics.'],
        prereq: ['layout-types'],
        steps: ['wcag-basics', 'device-adaptation', 'breakpoints-adaptation', 'breakpoint-strategies', 'responsive-navigation', 'touch-targets', 'keyboard-focus', 'semantic-controls', 'contrast-noncolor', 'zoom-reflow', 'reduced-motion-media', 'accessible-tables-charts'],
    },
    {
        id: 'design-systems', title: 'Design systems', level: 'Advanced', summary: 'Tokens, components, theming, governance and public systems.',
        outcomes: ['Structure tokens in layers.', 'Specify components fully.', 'Plan theming and governance.'],
        prereq: ['repetition-consistency', 'color-tokens', 'element-states'],
        steps: ['repetition-consistency', 'design-system-purpose', 'design-tokens', 'token-categories', 'color-tokens', 'corner-radius', 'component-libraries', 'documentation-governance', 'theming', 'platform-conventions', 'public-design-systems'],
    },
];
