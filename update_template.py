import json
import re

template = [
  { 'id': 'global-settings', 'type': 'CANVAS_SETTINGS', 'order': -1, 'isActive': True, 'config': { 'bgType': 'solid', 'bgColor': '#ffffff' }, 'elements': [] },
  {
    'id': 'global-header',
    'type': 'HEADER',
    'order': 0,
    'isActive': True,
    'config': { 'bgColor': '#e8fbf0', 'layout': 'grid', 'columns': 2, 'paddingTop': 24, 'paddingBottom': 24, 'paddingLeft': 40, 'paddingRight': 40, 'align': 'center' },
    'elements': [
      {
        'id': 'header-col-1', 'type': 'COLUMN', 'order': 1,
        'config': { 'align': 'start', 'justifyContent': 'center' },
        'children': [
          { 'id': 'logo', 'type': 'HEADING', 'order': 1, 'config': { 'text': 'Gorib.', 'fontSize': 32, 'fontWeight': 'bold', 'textColor': '#1f2937' } }
        ]
      },
      {
        'id': 'header-col-2', 'type': 'COLUMN', 'order': 2,
        'config': { 'align': 'end', 'justifyContent': 'center', 'layout': 'horizontal', 'gap': 24 },
        'children': [
          { 'id': 'nav-home', 'type': 'TEXT', 'order': 1, 'config': { 'text': 'Home', 'fontWeight': 'bold' } },
          { 'id': 'nav-about', 'type': 'TEXT', 'order': 2, 'config': { 'text': 'About' } },
          { 'id': 'nav-portfolio', 'type': 'TEXT', 'order': 3, 'config': { 'text': 'Portfolio' } },
          { 'id': 'nav-contact', 'type': 'TEXT', 'order': 4, 'config': { 'text': 'Contact' } },
          { 'id': 'nav-btn', 'type': 'BUTTON', 'order': 5, 'config': { 'text': 'Hire Me', 'bgColor': '#22c55e', 'textColor': '#ffffff', 'borderRadius': 20, 'paddingX': 24, 'paddingY': 8 } }
        ]
      }
    ]
  },
  {
    'id': 'section-hero',
    'type': 'SECTION',
    'order': 1,
    'isActive': True,
    'config': { 'bgColor': '#e8fbf0', 'layout': 'grid', 'columns': 2, 'gap': 32, 'paddingTop': 80, 'paddingBottom': 80, 'paddingLeft': 40, 'paddingRight': 40 },
    'elements': [
      {
        'id': 'hero-col-1', 'type': 'COLUMN', 'order': 1,
        'config': { 'align': 'start', 'justifyContent': 'center', 'gap': 16 },
        'children': [
          { 'id': 'hero-subtitle', 'type': 'TEXT', 'order': 1, 'config': { 'text': 'Hello There !', 'fontWeight': 'bold' } },
          { 'id': 'hero-title', 'type': 'HEADING', 'order': 2, 'config': { 'text': 'I\'M KILLER MILLERSE', 'tag': 'h1', 'fontSize': 48, 'fontWeight': 'bold', 'textColor': '#1f2937' } },
          { 'id': 'hero-desc', 'type': 'TEXT', 'order': 3, 'config': { 'text': 'I\'m a professional web designer and developer with 3 years of UI & UX design experience.', 'textColor': '#4b5563' } },
          { 'id': 'hero-btn', 'type': 'BUTTON', 'order': 4, 'config': { 'text': 'Hire Me', 'bgColor': '#22c55e', 'textColor': '#ffffff', 'borderRadius': 20, 'paddingX': 24, 'paddingY': 12 } }
        ]
      },
      {
        'id': 'hero-col-2', 'type': 'COLUMN', 'order': 2,
        'config': { 'align': 'center', 'justifyContent': 'center' },
        'children': [
          { 'id': 'hero-img', 'type': 'IMAGE', 'order': 1, 'config': { 'src': '/placeholder-potret.png', 'width': 400, 'height': 400, 'objectFit': 'cover' } }
        ]
      }
    ]
  },
  {
    'id': 'section-about',
    'type': 'SECTION',
    'order': 2,
    'isActive': True,
    'config': { 'bgColor': '#ffffff', 'layout': 'grid', 'columns': 2, 'gap': 40, 'paddingTop': 80, 'paddingBottom': 80, 'paddingLeft': 40, 'paddingRight': 40 },
    'elements': [
      {
        'id': 'about-col-1', 'type': 'COLUMN', 'order': 1,
        'config': { 'align': 'center', 'justifyContent': 'center' },
        'children': [
          { 'id': 'about-img', 'type': 'IMAGE', 'order': 1, 'config': { 'src': '/placeholder-potret.png', 'width': 300, 'height': 350, 'objectFit': 'cover' } }
        ]
      },
      {
        'id': 'about-col-2', 'type': 'COLUMN', 'order': 2,
        'config': { 'align': 'start', 'justifyContent': 'center', 'gap': 16 },
        'children': [
          { 'id': 'about-title', 'type': 'HEADING', 'order': 1, 'config': { 'text': 'ABOUT ME', 'fontSize': 32, 'fontWeight': 'bold', 'textColor': '#22c55e' } },
          { 'id': 'about-subtitle', 'type': 'HEADING', 'order': 2, 'config': { 'text': 'I\'m killers millerse', 'fontSize': 24, 'fontWeight': 'bold' } },
          { 'id': 'about-desc', 'type': 'TEXT', 'order': 3, 'config': { 'text': 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.', 'textColor': '#4b5563' } },
          { 'id': 'about-btn-row', 'type': 'COLUMN', 'order': 4, 'config': { 'layout': 'horizontal', 'gap': 16, 'alignItems': 'center' }, 'children': [
            { 'id': 'btn-cv', 'type': 'BUTTON', 'order': 1, 'config': { 'text': 'Download CV', 'bgColor': '#22c55e', 'textColor': '#ffffff', 'borderRadius': 20, 'paddingX': 24, 'paddingY': 12 } },
            { 'id': 'btn-hire', 'type': 'BUTTON', 'order': 2, 'config': { 'text': 'Hire Me', 'bgColor': '#e8fbf0', 'textColor': '#22c55e', 'borderRadius': 20, 'paddingX': 24, 'paddingY': 12 } }
          ]}
        ]
      }
    ]
  },
  {
    'id': 'section-services',
    'type': 'SECTION',
    'order': 3,
    'isActive': True,
    'config': { 'bgColor': '#e8fbf0', 'layout': 'flexbox', 'direction': 'col', 'alignItems': 'center', 'gap': 32, 'paddingTop': 80, 'paddingBottom': 80, 'paddingLeft': 40, 'paddingRight': 40 },
    'elements': [
      {
        'id': 'services-header-col', 'type': 'COLUMN', 'order': 1,
        'config': { 'align': 'center', 'justifyContent': 'center' },
        'children': [
          { 'id': 'services-title', 'type': 'HEADING', 'order': 1, 'config': { 'text': 'MY SERVICES', 'fontSize': 32, 'fontWeight': 'bold', 'textColor': '#22c55e' } }
        ]
      },
      {
        'id': 'services-grid', 'type': 'COLUMN', 'order': 2,
        'config': { 'layout': 'grid', 'columns': 3, 'gap': 24, 'width': '100%' },
        'children': [
          { 'id': 'card-1', 'type': 'COLUMN', 'order': 1, 'config': { 'bgColor': '#ffffff', 'paddingTop': 32, 'paddingBottom': 32, 'paddingLeft': 24, 'paddingRight': 24, 'borderRadius': 16, 'align': 'center', 'gap': 16 }, 'children': [
            { 'id': 'card-1-title', 'type': 'HEADING', 'order': 1, 'config': { 'text': 'Web Design', 'fontSize': 20, 'fontWeight': 'bold' } },
            { 'id': 'card-1-desc', 'type': 'TEXT', 'order': 2, 'config': { 'text': 'It is a long established fact that a reader.', 'textAlign': 'center', 'textColor': '#6b7280' } }
          ]},
          { 'id': 'card-2', 'type': 'COLUMN', 'order': 2, 'config': { 'bgColor': '#ffffff', 'paddingTop': 32, 'paddingBottom': 32, 'paddingLeft': 24, 'paddingRight': 24, 'borderRadius': 16, 'align': 'center', 'gap': 16 }, 'children': [
            { 'id': 'card-2-title', 'type': 'HEADING', 'order': 1, 'config': { 'text': 'Graphic Design', 'fontSize': 20, 'fontWeight': 'bold' } },
            { 'id': 'card-2-desc', 'type': 'TEXT', 'order': 2, 'config': { 'text': 'It is a long established fact that a reader.', 'textAlign': 'center', 'textColor': '#6b7280' } }
          ]},
          { 'id': 'card-3', 'type': 'COLUMN', 'order': 3, 'config': { 'bgColor': '#ffffff', 'paddingTop': 32, 'paddingBottom': 32, 'paddingLeft': 24, 'paddingRight': 24, 'borderRadius': 16, 'align': 'center', 'gap': 16 }, 'children': [
            { 'id': 'card-3-title', 'type': 'HEADING', 'order': 1, 'config': { 'text': 'UI/UX Design', 'fontSize': 20, 'fontWeight': 'bold' } },
            { 'id': 'card-3-desc', 'type': 'TEXT', 'order': 2, 'config': { 'text': 'It is a long established fact that a reader.', 'textAlign': 'center', 'textColor': '#6b7280' } }
          ]}
        ]
      }
    ]
  },
  {
    'id': 'section-portfolio',
    'type': 'SECTION',
    'order': 4,
    'isActive': True,
    'config': { 'bgColor': '#ffffff', 'layout': 'flexbox', 'direction': 'col', 'alignItems': 'center', 'gap': 32, 'paddingTop': 80, 'paddingBottom': 80, 'paddingLeft': 40, 'paddingRight': 40 },
    'elements': [
      {
        'id': 'portfolio-header-col', 'type': 'COLUMN', 'order': 1,
        'config': { 'align': 'center', 'justifyContent': 'center' },
        'children': [
          { 'id': 'portfolio-title', 'type': 'HEADING', 'order': 1, 'config': { 'text': 'MY PORTFOLIO', 'fontSize': 32, 'fontWeight': 'bold', 'textColor': '#22c55e' } }
        ]
      },
      {
        'id': 'portfolio-grid', 'type': 'COLUMN', 'order': 2,
        'config': { 'layout': 'grid', 'columns': 4, 'gap': 16, 'width': '100%' },
        'children': [
          { 'id': 'p-1', 'type': 'IMAGE', 'order': 1, 'config': { 'src': '/placeholder-potret.png', 'width': 250, 'height': 200, 'objectFit': 'cover' } },
          { 'id': 'p-2', 'type': 'IMAGE', 'order': 2, 'config': { 'src': '/placeholder-potret.png', 'width': 250, 'height': 200, 'objectFit': 'cover' } },
          { 'id': 'p-3', 'type': 'IMAGE', 'order': 3, 'config': { 'src': '/placeholder-potret.png', 'width': 250, 'height': 200, 'objectFit': 'cover' } },
          { 'id': 'p-4', 'type': 'IMAGE', 'order': 4, 'config': { 'src': '/placeholder-potret.png', 'width': 250, 'height': 200, 'objectFit': 'cover' } },
          { 'id': 'p-5', 'type': 'IMAGE', 'order': 5, 'config': { 'src': '/placeholder-potret.png', 'width': 250, 'height': 200, 'objectFit': 'cover' } },
          { 'id': 'p-6', 'type': 'IMAGE', 'order': 6, 'config': { 'src': '/placeholder-potret.png', 'width': 250, 'height': 200, 'objectFit': 'cover' } },
          { 'id': 'p-7', 'type': 'IMAGE', 'order': 7, 'config': { 'src': '/placeholder-potret.png', 'width': 250, 'height': 200, 'objectFit': 'cover' } },
          { 'id': 'p-8', 'type': 'IMAGE', 'order': 8, 'config': { 'src': '/placeholder-potret.png', 'width': 250, 'height': 200, 'objectFit': 'cover' } }
        ]
      },
      {
        'id': 'portfolio-stats', 'type': 'COLUMN', 'order': 3,
        'config': { 'layout': 'grid', 'columns': 4, 'gap': 24, 'width': '100%', 'paddingTop': 40 },
        'children': [
          { 'id': 's-1', 'type': 'COLUMN', 'order': 1, 'config': { 'align': 'center' }, 'children': [
            { 'id': 's-1-val', 'type': 'HEADING', 'order': 1, 'config': { 'text': '200+', 'fontSize': 32, 'fontWeight': 'bold', 'textColor': '#22c55e' } },
            { 'id': 's-1-lbl', 'type': 'TEXT', 'order': 2, 'config': { 'text': 'TOTAL PROJECT', 'fontWeight': 'bold' } }
          ]},
          { 'id': 's-2', 'type': 'COLUMN', 'order': 2, 'config': { 'align': 'center' }, 'children': [
            { 'id': 's-2-val', 'type': 'HEADING', 'order': 1, 'config': { 'text': '150+', 'fontSize': 32, 'fontWeight': 'bold', 'textColor': '#22c55e' } },
            { 'id': 's-2-lbl', 'type': 'TEXT', 'order': 2, 'config': { 'text': 'HAPPY CLIENTS', 'fontWeight': 'bold' } }
          ]},
          { 'id': 's-3', 'type': 'COLUMN', 'order': 3, 'config': { 'align': 'center' }, 'children': [
            { 'id': 's-3-val', 'type': 'HEADING', 'order': 1, 'config': { 'text': '250+', 'fontSize': 32, 'fontWeight': 'bold', 'textColor': '#22c55e' } },
            { 'id': 's-3-lbl', 'type': 'TEXT', 'order': 2, 'config': { 'text': 'TOTAL REVIEW', 'fontWeight': 'bold' } }
          ]},
          { 'id': 's-4', 'type': 'COLUMN', 'order': 4, 'config': { 'align': 'center' }, 'children': [
            { 'id': 's-4-val', 'type': 'HEADING', 'order': 1, 'config': { 'text': '850+', 'fontSize': 32, 'fontWeight': 'bold', 'textColor': '#22c55e' } },
            { 'id': 's-4-lbl', 'type': 'TEXT', 'order': 2, 'config': { 'text': 'WORKING HOURS', 'fontWeight': 'bold' } }
          ]}
        ]
      }
    ]
  },
  {
    'id': 'section-contact',
    'type': 'SECTION',
    'order': 5,
    'isActive': True,
    'config': { 'bgColor': '#e8fbf0', 'layout': 'flexbox', 'direction': 'col', 'alignItems': 'center', 'gap': 32, 'paddingTop': 80, 'paddingBottom': 80, 'paddingLeft': 40, 'paddingRight': 40 },
    'elements': [
      {
        'id': 'contact-header-col', 'type': 'COLUMN', 'order': 1,
        'config': { 'align': 'center', 'justifyContent': 'center' },
        'children': [
          { 'id': 'contact-title', 'type': 'HEADING', 'order': 1, 'config': { 'text': 'CONTACT ME', 'fontSize': 32, 'fontWeight': 'bold', 'textColor': '#22c55e' } }
        ]
      },
      {
        'id': 'contact-form', 'type': 'COLUMN', 'order': 2,
        'config': { 'layout': 'flexbox', 'direction': 'col', 'align': 'center', 'gap': 24, 'width': '100%', 'customClass': 'max-w-2xl mx-auto' },
        'children': [
          { 'id': 'c-row-1', 'type': 'COLUMN', 'order': 1, 'config': { 'layout': 'grid', 'columns': 2, 'gap': 24, 'width': '100%' }, 'children': [
            { 'id': 'c-name', 'type': 'BUTTON', 'order': 1, 'config': { 'text': 'Name', 'bgColor': '#ffffff', 'textColor': '#9ca3af', 'borderRadius': 8, 'paddingX': 24, 'paddingY': 12, 'width': '100%' } },
            { 'id': 'c-email', 'type': 'BUTTON', 'order': 2, 'config': { 'text': 'Email', 'bgColor': '#ffffff', 'textColor': '#9ca3af', 'borderRadius': 8, 'paddingX': 24, 'paddingY': 12, 'width': '100%' } }
          ]},
          { 'id': 'c-msg', 'type': 'BUTTON', 'order': 2, 'config': { 'text': 'Message', 'bgColor': '#ffffff', 'textColor': '#9ca3af', 'borderRadius': 8, 'paddingX': 24, 'paddingY': 48, 'width': '100%' } },
          { 'id': 'c-submit', 'type': 'BUTTON', 'order': 3, 'config': { 'text': 'Submit', 'bgColor': '#22c55e', 'textColor': '#ffffff', 'borderRadius': 20, 'paddingX': 32, 'paddingY': 12 } }
        ]
      }
    ]
  },
  {
    'id': 'section-footer',
    'type': 'SECTION',
    'order': 6,
    'isActive': True,
    'config': { 'bgColor': '#22c55e', 'paddingTop': 24, 'paddingBottom': 24 },
    'elements': [
      {
        'id': 'footer-col', 'type': 'COLUMN', 'order': 1,
        'config': { 'align': 'center', 'justifyContent': 'center' },
        'children': [
          { 'id': 'footer-text', 'type': 'TEXT', 'order': 1, 'config': { 'text': 'Copyright 2024 by Gorib', 'textColor': '#ffffff', 'fontWeight': 'bold' } }
        ]
      }
    ]
  }
]

with open('C:/PortoTree/src/components/builder/useBuilderState.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

new_json = json.dumps(template, indent=2)
# Find the start of the EMPTY_TEMPLATE array
pattern = re.compile(r'const EMPTY_TEMPLATE = \[.*?\];', re.DOTALL)

# Make sure we only replace the ones matching.
new_content = pattern.sub('const EMPTY_TEMPLATE = ' + new_json + ';', content)

# Version bump
new_content = new_content.replace('draft_template_sections_v9', 'draft_template_sections_v10')
new_content = new_content.replace('draft_template_sections_v8', 'draft_template_sections_v10')

with open('C:/PortoTree/src/components/builder/useBuilderState.tsx', 'w', encoding='utf-8') as f:
    f.write(new_content)
print('Done!')
