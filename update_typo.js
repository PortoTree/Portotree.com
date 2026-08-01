const fs = require('fs');

let content = fs.readFileSync('C:/PortoTree/src/components/builder/useBuilderState.tsx', 'utf8');

// Replace Gorib logo
content = content.replace(
  /text: 'Gorib.', fontSize: 32, fontWeight: 'bold', textColor: '#1f2937'/g,
  "text: 'Gorib.', fontSize: 32, fontWeight: '900', fontFamily: 'Inter, sans-serif', textColor: '#1f2937'"
);

// Replace Hello There
content = content.replace(
  /text: 'Hello There !', fontWeight: 'bold'/g,
  "text: 'Hello There !', fontWeight: '700', fontSize: 18, fontFamily: 'Inter, sans-serif', textColor: '#1f2937'"
);

// Replace I'M KILLER MILLERSE
content = content.replace(
  /text: 'I\\'M KILLER MILLERSE', tag: 'h1', fontSize: 48, fontWeight: 'bold', textColor: '#1f2937'/g,
  "text: 'I\\'M KILLER MILLERSE', tag: 'h1', fontSize: 56, fontWeight: '900', fontFamily: 'Inter, sans-serif', textColor: '#1f2937', lineHeight: '1.1', letterSpacing: '-1px'"
);

// Replace Desc
content = content.replace(
  /text: 'I\\'m a professional web designer and developer with 3 years of UI & UX design experience.', textColor: '#4b5563'/g,
  "text: 'I\\'m a professional web designer and developer with 3 years of UI & UX design experience.', textColor: '#4b5563', fontSize: 16, fontFamily: 'Inter, sans-serif', lineHeight: '1.6'"
);

// Replace Hire Me Buttons
content = content.replace(
  /id: 'nav-btn', type: 'BUTTON', order: 5, config: \{ text: 'Hire Me', bgColor: '#22c55e', textColor: '#ffffff', borderRadius: 20, paddingX: 24, paddingY: 8 \}/g,
  "id: 'nav-btn', type: 'BUTTON', order: 5, config: { text: 'Hire Me', bgColor: '#22c55e', textColor: '#ffffff', borderRadius: 20, paddingX: 24, paddingY: 8, customClass: 'whitespace-nowrap', fontWeight: 'bold', fontFamily: 'Inter, sans-serif' }"
);

content = content.replace(
  /id: 'hero-btn', type: 'BUTTON', order: 4, config: \{ text: 'Hire Me', bgColor: '#22c55e', textColor: '#ffffff', borderRadius: 20, paddingX: 24, paddingY: 12 \}/g,
  "id: 'hero-btn', type: 'BUTTON', order: 4, config: { text: 'Hire Me', bgColor: '#22c55e', textColor: '#ffffff', borderRadius: 20, paddingX: 24, paddingY: 12, customClass: 'whitespace-nowrap', fontWeight: 'bold', fontFamily: 'Inter, sans-serif' }"
);

content = content.replace(
  /draft_template_sections_v11/g,
  'draft_template_sections_v13'
);

fs.writeFileSync('C:/PortoTree/src/components/builder/useBuilderState.tsx', content, 'utf8');
console.log('Update success');
