const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src', 'app');

// 1. Update angular.json
const angularJsonPath = path.join(__dirname, 'angular.json');
if (fs.existsSync(angularJsonPath)) {
  let content = fs.readFileSync(angularJsonPath, 'utf8');
  content = content.replace(/"style":\s*"css"/g, '"style": "scss"');
  content = content.replace(/"src\/styles\.css"/g, '"src/styles.scss"');
  fs.writeFileSync(angularJsonPath, content);
  console.log('Updated angular.json');
}

// 2. Rename styles.css to styles.scss
const stylesCss = path.join(__dirname, 'src', 'styles.css');
const stylesScss = path.join(__dirname, 'src', 'styles.scss');
if (fs.existsSync(stylesCss)) {
  fs.renameSync(stylesCss, stylesScss);
  console.log('Renamed styles.css to styles.scss');
}

function processDirectory(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processDirectory(fullPath);
    } else if (file.endsWith('.component.ts') && !file.endsWith('.spec.ts')) {
      const baseName = file.replace('.component.ts', '');
      
      // Handle CSS -> SCSS renaming
      const cssFile = path.join(dir, `${baseName}.component.css`);
      const scssFile = path.join(dir, `${baseName}.component.scss`);
      if (fs.existsSync(cssFile)) {
        fs.renameSync(cssFile, scssFile);
        console.log(`Renamed ${cssFile} to .scss`);
      } else if (!fs.existsSync(scssFile)) {
        fs.writeFileSync(scssFile, `/* ${baseName} styles */\n`);
        console.log(`Created ${scssFile}`);
      }

      // Update .ts file
      let tsContent = fs.readFileSync(fullPath, 'utf8');
      if (tsContent.includes(`styleUrl: './${baseName}.component.css'`)) {
        tsContent = tsContent.replace(`styleUrl: './${baseName}.component.css'`, `styleUrl: './${baseName}.component.scss'`);
      } else if (!tsContent.includes('styleUrl:') && !tsContent.includes('styleUrls:')) {
        // Inject styleUrl into @Component decorator
        tsContent = tsContent.replace(
          /templateUrl:\s*['"`].\/.*['"`],?/g, 
          match => `${match}\n  styleUrl: './${baseName}.component.scss',`
        );
        // Fix potential trailing commas
        tsContent = tsContent.replace(/,\n\s*styleUrl:/, ',\n  styleUrl:');
      }
      fs.writeFileSync(fullPath, tsContent);
      console.log(`Updated ${fullPath}`);

      // Generate .spec.ts if it doesn't exist
      const specFile = path.join(dir, `${baseName}.component.spec.ts`);
      if (!fs.existsSync(specFile)) {
        // Extract component class name
        const match = tsContent.match(/export class (\w+Component)/);
        if (match) {
          const className = match[1];
          const specContent = `import { ComponentFixture, TestBed } from '@angular/core/testing';\nimport { ${className} } from './${baseName}.component';\n\ndescribe('${className}', () => {\n  let component: ${className};\n  let fixture: ComponentFixture<${className}>;\n\n  beforeEach(async () => {\n    await TestBed.configureTestingModule({\n      imports: [${className}]\n    })\n    .compileComponents();\n    \n    fixture = TestBed.createComponent(${className});\n    component = fixture.componentInstance;\n    fixture.detectChanges();\n  });\n\n  it('should create', () => {\n    expect(component).toBeTruthy();\n  });\n});\n`;
          fs.writeFileSync(specFile, specContent);
          console.log(`Created ${specFile}`);
        }
      }
    }
  }
}

processDirectory(srcDir);
console.log('Standardization complete.');
