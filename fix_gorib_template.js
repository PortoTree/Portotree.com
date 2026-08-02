const fs = require('fs');
let text = fs.readFileSync('C:/PortoTree/src/lib/templates/goribPortfolio.ts', 'utf8');

// Replace TEXT navigation with NAVIGATION element
const textNavSearch = `        {
          id: "gorib-header-text-1",
          type: "TEXT",
          config: {
            text: "Home &nbsp; &nbsp; &nbsp; &nbsp; About &nbsp; &nbsp; &nbsp; &nbsp; Portfolio &nbsp; &nbsp; &nbsp; &nbsp; Service &nbsp; &nbsp; &nbsp; &nbsp; Contact",
            fontSize: 14,
            fontWeight: "600",
            textColor: "#111827",
            textAlign: "center"
          }
        },`;

const textNavReplace = `        {
          id: "gorib-header-nav-1",
          type: "NAVIGATION",
          config: {
            showNavigation: true,
            fontSize: 14,
            fontWeight: "600",
            textColor: "#111827"
          }
        },`;

text = text.replace(textNavSearch, textNavReplace);


// Add actionType: "whatsapp" to the Button config
const buttonSearch = `        {
          id: "gorib-header-btn-1",
          type: "BUTTON",
          config: {
            text: "Hire Me",`;
const buttonReplace = `        {
          id: "gorib-header-btn-1",
          type: "BUTTON",
          config: {
            text: "Hire Me",
            actionType: "whatsapp",`;
text = text.replace(buttonSearch, buttonReplace);

fs.writeFileSync('C:/PortoTree/src/lib/templates/goribPortfolio.ts', text);
