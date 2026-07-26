const { Project } = require("ts-morph");
const path = require("path");
const fs = require("fs");

const project = new Project();
const filePath = path.join(process.cwd(), "src/components/builder/CanvasEngine.tsx");
const sourceFile = project.addSourceFileAtPath(filePath);

let typeDeclarations = "";

sourceFile.getInterfaces().forEach(i => {
  let text = i.getText();
  if (!text.startsWith("export ")) {
    text = "export " + text;
  }
  typeDeclarations += text + "\n\n";
});

sourceFile.getTypeAliases().forEach(t => {
  let text = t.getText();
  if (!text.startsWith("export ")) {
    text = "export " + text;
  }
  typeDeclarations += text + "\n\n";
});

const typesDir = path.join(process.cwd(), "src/types");
if (!fs.existsSync(typesDir)) {
  fs.mkdirSync(typesDir, { recursive: true });
}
fs.writeFileSync(path.join(typesDir, "builder.ts"), typeDeclarations);
console.log("Extraction to src/types/builder.ts completed.");
