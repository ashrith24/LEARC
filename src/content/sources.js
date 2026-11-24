/** Source registry. `checked` = date the link and the claim it supports were checked.
 *  Entries without `checked` render as "Pending verification". */
const C = '2026-11-24';
const gov = (slug, title, kind = 'components') => ({
    id: 'gov-' + slug, title: `${title} — GOV.UK Design System`, publisher: 'UK Government Digital Service',
    url: `https://design-system.service.gov.uk/${kind}/${slug}/`, kind: 'Official documentation', checked: C,
});
const apg = (slug, title) => ({
    id: 'apg-' + slug, title: `${title} pattern — ARIA Authoring Practices Guide`, publisher: 'W3C WAI',
    url: `https://www.w3.org/WAI/ARIA/apg/patterns/${slug}/`, kind: 'Standard', checked: C,
});
const wcag = (slug, title, checked = true) => ({
    id: 'wcag-' + slug, title: `Understanding ${title} (WCAG 2.2)`, publisher: 'W3C WAI',
    url: `https://www.w3.org/WAI/WCAG22/Understanding/${slug}.html`, kind: 'Standard', checked: checked ? C : undefined,
});
const m3 = (id, path, title) => ({
    id: 'm3-' + id, title: `${title} — Material Design 3`, publisher: 'Google',
    url: `https://m3.material.io/${path}`, kind: 'Official documentation', checked: C,
});
const hig = (slug, title) => ({
    id: 'hig-' + slug, title: `${title} — Human Interface Guidelines`, publisher: 'Apple',
    url: `https://developer.apple.com/design/human-interface-guidelines/${slug}`, kind: 'Official documentation', checked: C,
});
export const sourceList = [
    // GOV.UK components (existence verified from the component index; error summary, button and tag content checked)
    ...[
        ['accordion', 'Accordion'], ['back-link', 'Back link'], ['breadcrumbs', 'Breadcrumbs'], ['button', 'Button'],
        ['character-count', 'Character count'], ['checkboxes', 'Checkboxes'], ['cookie-banner', 'Cookie banner'],
        ['date-input', 'Date input'], ['details', 'Details'], ['error-message', 'Error message'], ['error-summary', 'Error summary'],
        ['fieldset', 'Fieldset'], ['file-upload', 'File upload'], ['header', 'GOV.UK header'], ['footer', 'GOV.UK footer'],
        ['inset-text', 'Inset text'], ['notification-banner', 'Notification banner'], ['pagination', 'Pagination'],
        ['panel', 'Panel'], ['password-input', 'Password input'], ['phase-banner', 'Phase banner'], ['radios', 'Radios'],
        ['select', 'Select'], ['service-navigation', 'Service navigation'], ['skip-link', 'Skip link'],
        ['summary-list', 'Summary list'], ['table', 'Table'], ['tabs', 'Tabs'], ['tag', 'Tag'], ['task-list', 'Task list'],
        ['text-input', 'Text input'], ['textarea', 'Textarea'], ['warning-text', 'Warning text'],
    ].map(([s, t]) => gov(s, t)),
    ...[
        ['question-pages', 'Question pages'], ['check-answers', 'Check answers'], ['validation', 'Recover from validation errors'],
        ['page-not-found-pages', 'Page not found pages'], ['service-unavailable-pages', 'Service unavailable pages'],
        ['problem-with-the-service-pages', 'There is a problem with the service pages'], ['step-by-step-navigation', 'Step by step navigation'],
        ['confirmation-pages', 'Confirmation pages'], ['complete-multiple-tasks', 'Complete multiple tasks'],
        ['create-accounts', 'Create accounts'], ['confirm-a-phone-number', 'Confirm a phone number'], ['dates', 'Dates'], ['passwords', 'Passwords'],
        ['payment-card-details', 'Payment card details'], ['phone-numbers', 'Phone numbers'], ['email-addresses', 'Email addresses'],
        ['start-using-a-service', 'Start using a service'], ['navigate-a-service', 'Navigate a service'],
    ].map(([s, t]) => gov(s, t, 'patterns')),
    // ARIA Authoring Practices Guide patterns (slugs verified from the pattern index)
    ...[
        ['accordion', 'Accordion'], ['alert', 'Alert'], ['alertdialog', 'Alert and message dialogs'], ['breadcrumb', 'Breadcrumb'],
        ['button', 'Button'], ['carousel', 'Carousel'], ['checkbox', 'Checkbox'], ['combobox', 'Combobox'],
        ['dialog-modal', 'Dialog (modal)'], ['disclosure', 'Disclosure'], ['feed', 'Feed'], ['grid', 'Grid'],
        ['landmarks', 'Landmarks'], ['link', 'Link'], ['listbox', 'Listbox'], ['menubar', 'Menu and menubar'],
        ['menu-button', 'Menu button'], ['meter', 'Meter'], ['radio', 'Radio group'], ['slider', 'Slider'],
        ['slider-multithumb', 'Slider (multi-thumb)'], ['spinbutton', 'Spinbutton'], ['switch', 'Switch'],
        ['table', 'Table'], ['tabs', 'Tabs'], ['toolbar', 'Toolbar'], ['tooltip', 'Tooltip'], ['treeview', 'Tree view'],
        ['windowsplitter', 'Window splitter'],
    ].map(([s, t]) => apg(s, t)),
    // WCAG 2.2 Understanding documents
    wcag('contrast-minimum', 'SC 1.4.3 Contrast (Minimum), Level AA'),
    wcag('non-text-contrast', 'SC 1.4.11 Non-text Contrast, Level AA'),
    wcag('use-of-color', 'SC 1.4.1 Use of Color, Level A'),
    wcag('reflow', 'SC 1.4.10 Reflow, Level AA'),
    wcag('text-spacing', 'SC 1.4.12 Text Spacing, Level AA'),
    wcag('target-size-minimum', 'SC 2.5.8 Target Size (Minimum), Level AA'),
    wcag('focus-appearance', 'SC 2.4.13 Focus Appearance, Level AAA'),
    wcag('animation-from-interactions', 'SC 2.3.3 Animation from Interactions, Level AAA'),
    wcag('focus-visible', 'SC 2.4.7 Focus Visible', false),
    wcag('focus-order', 'SC 2.4.3 Focus Order', false),
    wcag('keyboard', 'SC 2.1.1 Keyboard', false),
    wcag('resize-text', 'SC 1.4.4 Resize Text', false),
    wcag('error-identification', 'SC 3.3.1 Error Identification', false),
    wcag('labels-or-instructions', 'SC 3.3.2 Labels or Instructions', false),
    wcag('name-role-value', 'SC 4.1.2 Name, Role, Value', false),
    wcag('captions-prerecorded', 'SC 1.2.2 Captions (Prerecorded)', false),
    wcag('pause-stop-hide', 'SC 2.2.2 Pause, Stop, Hide', false),
    wcag('info-and-relationships', 'SC 1.3.1 Info and Relationships', false),
    { id: 'wcag22', title: 'Web Content Accessibility Guidelines (WCAG) 2.2', publisher: 'W3C', url: 'https://www.w3.org/TR/WCAG22/', kind: 'Standard' },
    // Material Design 3
    m3('nav-rail', 'components/navigation-rail/overview', 'Navigation rail'),
    m3('nav-bar', 'components/navigation-bar/overview', 'Navigation bar'),
    m3('snackbar', 'components/snackbar/overview', 'Snackbar'),
    m3('bottom-sheets', 'components/bottom-sheets/overview', 'Bottom sheets'),
    m3('chips', 'components/chips/overview', 'Chips'),
    m3('buttons', 'components/buttons/overview', 'Buttons'),
    m3('easing', 'styles/motion/easing-and-duration', 'Easing and duration'),
    m3('color-roles', 'styles/color/roles', 'Color roles'),
    m3('tokens', 'foundations/design-tokens/overview', 'Design tokens'),
    m3('shape', 'styles/shape/corner-radius-scale', 'Shape — corner radius scale'),
    m3('elevation', 'styles/elevation/overview', 'Elevation'),
    // Apple HIG
    hig('tab-bars', 'Tab bars'), hig('sheets', 'Sheets'), hig('materials', 'Materials'),
    hig('sf-symbols', 'SF Symbols'), hig('typography', 'Typography'), hig('accessibility', 'Accessibility'),
    // IBM Carbon
    { id: 'carbon-grid', title: '2x Grid — Carbon Design System', publisher: 'IBM', url: 'https://carbondesignsystem.com/elements/2x-grid/overview/', kind: 'Official documentation', checked: C },
    { id: 'carbon-data-table', title: 'Data table usage — Carbon Design System', publisher: 'IBM', url: 'https://carbondesignsystem.com/components/data-table/usage/', kind: 'Official documentation', checked: C },
    { id: 'carbon-empty-states', title: 'Empty states pattern — Carbon Design System', publisher: 'IBM', url: 'https://carbondesignsystem.com/patterns/empty-states-pattern/', kind: 'Official documentation', checked: C },
    { id: 'carbon-motion', title: 'Motion — Carbon Design System', publisher: 'IBM', url: 'https://carbondesignsystem.com/elements/motion/overview/', kind: 'Official documentation', checked: C },
    // Atlassian
    { id: 'atl-lozenge', title: 'Lozenge — Atlassian Design System', publisher: 'Atlassian', url: 'https://atlassian.design/components/lozenge/examples', kind: 'Official documentation', checked: C },
    { id: 'atl-tokens', title: 'Design tokens — Atlassian Design System', publisher: 'Atlassian', url: 'https://atlassian.design/foundations/tokens/design-tokens', kind: 'Official documentation', checked: C },
    // Microsoft
    { id: 'fluent2', title: 'Fluent 2 Design System', publisher: 'Microsoft', url: 'https://fluent2.microsoft.design/', kind: 'Official documentation', checked: C },
    // MDN (reference)
    { id: 'mdn-reduced-motion', title: 'prefers-reduced-motion — MDN Web Docs', publisher: 'Mozilla', url: 'https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion', kind: 'Reference', checked: C },
    { id: 'mdn-grid', title: 'CSS grid layout — MDN Web Docs', publisher: 'Mozilla', url: 'https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_grid_layout', kind: 'Reference' },
    { id: 'mdn-flexbox', title: 'CSS flexible box layout — MDN Web Docs', publisher: 'Mozilla', url: 'https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_flexible_box_layout', kind: 'Reference' },
    { id: 'mdn-stacking', title: 'Stacking context — MDN Web Docs', publisher: 'Mozilla', url: 'https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_positioned_layout/Stacking_context', kind: 'Reference' },
    { id: 'mdn-variable-fonts', title: 'Variable fonts guide — MDN Web Docs', publisher: 'Mozilla', url: 'https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_fonts/Variable_fonts_guide', kind: 'Reference' },
    { id: 'mdn-backdrop-filter', title: 'backdrop-filter — MDN Web Docs', publisher: 'Mozilla', url: 'https://developer.mozilla.org/en-US/docs/Web/CSS/backdrop-filter', kind: 'Reference' },
    { id: 'mdn-media-queries', title: 'Using media queries — MDN Web Docs', publisher: 'Mozilla', url: 'https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_media_queries/Using_media_queries', kind: 'Reference' },
    { id: 'mdn-dialog', title: '<dialog> element — MDN Web Docs', publisher: 'Mozilla', url: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dialog', kind: 'Reference' },
    { id: 'mdn-input-types', title: '<input> types — MDN Web Docs', publisher: 'Mozilla', url: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input', kind: 'Reference' },
    { id: 'mdn-text-overflow', title: 'text-overflow — MDN Web Docs', publisher: 'Mozilla', url: 'https://developer.mozilla.org/en-US/docs/Web/CSS/text-overflow', kind: 'Reference' },
    { id: 'mdn-font-variant-numeric', title: 'font-variant-numeric — MDN Web Docs', publisher: 'Mozilla', url: 'https://developer.mozilla.org/en-US/docs/Web/CSS/font-variant-numeric', kind: 'Reference' },
    { id: 'mdn-gradients', title: 'Using CSS gradients — MDN Web Docs', publisher: 'Mozilla', url: 'https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_images/Using_CSS_gradients', kind: 'Reference' },
    { id: 'mdn-easing', title: '<easing-function> — MDN Web Docs', publisher: 'Mozilla', url: 'https://developer.mozilla.org/en-US/docs/Web/CSS/easing-function', kind: 'Reference' },
    { id: 'mdn-autocomplete', title: 'HTML autocomplete attribute — MDN Web Docs', publisher: 'Mozilla', url: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete', kind: 'Reference' },
    { id: 'mdn-inputmode', title: 'inputmode — MDN Web Docs', publisher: 'Mozilla', url: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/inputmode', kind: 'Reference' },
    { id: 'google-fonts-knowledge', title: 'Google Fonts Knowledge', publisher: 'Google', url: 'https://fonts.google.com/knowledge', kind: 'Reference' },
];
export const sources = Object.fromEntries(sourceList.map(s => [s.id, s]));
