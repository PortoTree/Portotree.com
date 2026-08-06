const fs = require('fs');
let content = fs.readFileSync('c:/PortoTree/src/components/builder/PortfolioViewer.tsx', 'utf8');

const replacements = {
    "\\$\\{isMobilePreview \\? '' : 'md:px-8'\\}": "${isMobilePreview === true ? '' : isMobilePreview === false ? 'px-8' : 'md:px-8'}",
    "\\$\\{isMobilePreview \\? '' : 'md:px-6'\\}": "${isMobilePreview === true ? '' : isMobilePreview === false ? 'px-6' : 'md:px-6'}",
    "\\$\\{isMobilePreview \\? '' : 'md:gap-12'\\}": "${isMobilePreview === true ? '' : isMobilePreview === false ? 'gap-12' : 'md:gap-12'}",
    "\\$\\{isMobilePreview \\? 'hidden' : 'hidden md:flex'\\}": "${isMobilePreview === true ? 'hidden' : isMobilePreview === false ? 'flex' : 'hidden md:flex'}",
    "\\$\\{isMobilePreview \\? 'flex-col' : 'flex-col md:flex-row'\\}": "${isMobilePreview === true ? 'flex-col' : isMobilePreview === false ? 'flex-row' : 'flex-col md:flex-row'}",
    "\\$\\{isMobilePreview \\? 'w-48 h-48' : 'w-40 h-40 md:w-72 md:h-72 md:order-last'\\}": "${isMobilePreview === true ? 'w-48 h-48' : isMobilePreview === false ? 'w-72 h-72 order-last' : 'w-40 h-40 md:w-72 md:h-72 md:order-last'}",
    "\\$\\{isMobilePreview \\? 'text-center' : 'md:space-y-6 text-center md:text-left'\\}": "${isMobilePreview === true ? 'text-center' : isMobilePreview === false ? 'space-y-6 text-left' : 'md:space-y-6 text-center md:text-left'}",
    "\\$\\{isMobilePreview \\? 'text-4xl' : 'text-4xl md:text-6xl'\\}": "${isMobilePreview === true ? 'text-4xl' : isMobilePreview === false ? 'text-6xl' : 'text-4xl md:text-6xl'}",
    "\\$\\{isMobilePreview \\? 'text-2xl' : 'text-xl md:text-3xl'\\}": "${isMobilePreview === true ? 'text-2xl' : isMobilePreview === false ? 'text-3xl' : 'text-xl md:text-3xl'}",
    "\\$\\{isMobilePreview \\? 'text-lg mx-auto' : 'text-base md:text-lg mx-auto md:mx-0'\\}": "${isMobilePreview === true ? 'text-lg mx-auto' : isMobilePreview === false ? 'text-lg mx-0' : 'text-base md:text-lg mx-auto md:mx-0'}",
    "\\$\\{isMobilePreview \\? '' : 'md:items-start'\\}": "${isMobilePreview === true ? '' : isMobilePreview === false ? 'items-start' : 'md:items-start'}",
    "\\$\\{isMobilePreview \\? '' : 'md:justify-start md:gap-4'\\}": "${isMobilePreview === true ? '' : isMobilePreview === false ? 'justify-start gap-4' : 'md:justify-start md:gap-4'}",
    "\\$\\{isMobilePreview \\? '' : 'md:inline'\\}": "${isMobilePreview === true ? '' : isMobilePreview === false ? 'inline' : 'md:inline'}",
    "\\$\\{isMobilePreview \\? '' : 'md:px-6 md:py-20 md:space-y-24'\\}": "${isMobilePreview === true ? '' : isMobilePreview === false ? 'px-6 py-20 space-y-24' : 'md:px-6 md:py-20 md:space-y-24'}",
    "\\$\\{isMobilePreview \\? '' : 'md:grid-cols-2 lg:grid-cols-3'\\}": "${isMobilePreview === true ? '' : isMobilePreview === false ? 'grid-cols-3' : 'md:grid-cols-2 lg:grid-cols-3'}",
    "\\$\\{isMobilePreview \\? '' : 'md:flex-row md:items-center'\\}": "${isMobilePreview === true ? '' : isMobilePreview === false ? 'flex-row items-center' : 'md:flex-row md:items-center'}",
    "\\$\\{isMobilePreview \\? '' : 'md:grid-cols-3'\\}": "${isMobilePreview === true ? '' : isMobilePreview === false ? 'grid-cols-3' : 'md:grid-cols-3'}",
    "\\$\\{isMobilePreview \\? '' : 'md:grid-cols-2'\\}": "${isMobilePreview === true ? '' : isMobilePreview === false ? 'grid-cols-2' : 'md:grid-cols-2'}",
    "\\$\\{isMobilePreview \\? '' : 'md:gap-6'\\}": "${isMobilePreview === true ? '' : isMobilePreview === false ? 'gap-6' : 'md:gap-6'}"
};

for (const [key, value] of Object.entries(replacements)) {
    content = content.replace(new RegExp(key, 'g'), value);
}

fs.writeFileSync('c:/PortoTree/src/components/builder/PortfolioViewer.tsx', content);
console.log('Done!');
