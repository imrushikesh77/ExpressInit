import archiver from "archiver";
import fs from "fs-extra";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const generateTSDirectory = async (req, res) => {
  const {
    name,
    author,
    description,
    main,
    version,
    license,
    dependencies,
    type,
    template, // e.g., "mvc-typescript"
  } = req.body;

  console.log("Received project configuration:", req.body);

  const projectDir = path.join(__dirname, "temp_project");
  const zipFilePath = path.join(__dirname, "project.zip");

  try {
    // Clear previous files and ensure project directory exists
    await fs.remove(projectDir);
    await fs.ensureDir(projectDir);

    console.log("Temporary project directory created:", projectDir);

    // Create package.json
    const packageJson = {
      name,
      version,
      description,
      main,
      type,
      author,
      scripts: { 
          "build": "tsc",
          "postbuild": "copyfiles -u 1 src/views/**/* dist/",  // Copy views to dist/views
          "start": "tsc && node dist/server.js",
     },
      keywords: [],
      dependencies: dependencies.reduce((acc, dep) => {
        acc[dep.name] = dep.version || "latest";
        return acc;
      }, {
        "express": "^4.17.1",
        "typescript": "^4.0.0",
        "@types/node": "^18.0.0",
        "@types/express": "^4.17.13"
      }),
      devDependencies: {
        "ts-node": "^10.0.0",
        "copyfiles": "^2.4.1",  // Added copyfiles dependency
      },
      license,
    };

    await fs.writeFile(
      path.join(projectDir, "package.json"),
      JSON.stringify(packageJson, null, 2)
    );
    console.log("package.json created successfully.");

    // Create tsconfig.json
    const tsconfigContent = {
        "compilerOptions": {
          "outDir": "./dist",
          "rootDir": "./src",
          "module": "ESNext",
          "target": "ES6",
          "esModuleInterop": true,
          "strict": true,
          "skipLibCheck": true,
          "forceConsistentCasingInFileNames": true
        },
        "include": [
          "src/**/*.ts",
          "src/views/**/*"
        ],
        "exclude": [
          "node_modules"
        ]
      };

    await fs.writeFile(
      path.join(projectDir, "tsconfig.json"),
      JSON.stringify(tsconfigContent, null, 2)
    );
    console.log("tsconfig.json created successfully.");

    // Create directories and example files
    const srcDir = path.join(projectDir, "src");
    await fs.ensureDir(srcDir);

    const directories = ["controllers", "models", "routes", "views"];
    for (const dir of directories) {
      await fs.ensureDir(path.join(srcDir, dir));
      console.log(`Directory '${dir}' created.`);
    }

    // Create app.ts with ES module syntax
    const appContent = `
      import express from 'express';
      import exampleRoute from './routes/exampleRoute.js';
      import path from 'path';
      import { fileURLToPath } from 'url';

      const __filename = fileURLToPath(import.meta.url);
      const __dirname = path.dirname(__filename);

      const app = express();
      
      // Set EJS as the view engine
      app.set('view engine', 'ejs');
      app.set('views', path.join(__dirname, 'views'));
      
      app.use(express.json());
      app.use(express.urlencoded({ extended: true }));
      
      // Use example route
      app.use('/api/example', exampleRoute);
      
      app.get('/', (req, res) => {
        res.render('exampleView'); // Ensure the view is found in the 'views' directory
      });
      
      export default app;
    `;
    await fs.writeFile(path.join(srcDir, "app.ts"), appContent);
    console.log("app.ts created successfully.");

    // Create server.ts
    const serverContent = `
      import app from './app.js';

      const PORT = process.env.PORT || 3000;

      app.listen(PORT, () => {
        console.log(\`Server running on http://localhost:\${PORT}\`);
      });
    `;
    await fs.writeFile(path.join(srcDir, "server.ts"), serverContent);
    console.log("server.ts created successfully.");

    // Create example files for each directory
    // Controller
    const exampleControllerContent = `
      import { Request, Response } from 'express';

      export const getExample = (req: Request, res: Response) => {
        res.json({ message: 'Hello \`${author}\`, this is an example controller response.' });
      };
    `;
    await fs.writeFile(
      path.join(srcDir, "controllers", "exampleController.ts"),
      exampleControllerContent
    );
    console.log("controllers/exampleController.ts created successfully.");

    // Model
    const exampleModelContent = `
      // Example model - define your schema and database interactions here
      export const exampleModel = {};
    `;
    await fs.writeFile(
      path.join(srcDir, "models", "exampleModel.ts"),
      exampleModelContent
    );
    console.log("models/exampleModel.ts created successfully.");

    // Route
    const exampleRouteContent = `
      import express from 'express';
      import { getExample } from '../controllers/exampleController.js';

      const router = express.Router();

      // Define routes
      router.get('/', getExample);

      export default router;
    `;
    await fs.writeFile(
      path.join(srcDir, "routes", "exampleRoute.ts"),
      exampleRouteContent
    );
    console.log("routes/exampleRoute.ts created successfully.");

    // View
    const exampleViewContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Example View</title>
      </head>
      <body>
        <h1>This is an example view.</h1>
      </body>
      </html>
    `;
    await fs.writeFile(
      path.join(srcDir, "views", "exampleView.ejs"),
      exampleViewContent
    );
    console.log("views/exampleView.ejs created successfully.");

    // Optionally, add EJS as a dependency if using views
    if (template === "mvc-typescript") {
        packageJson.dependencies["ejs"] = "^3.1.8";  // Add EJS dependency
        await fs.writeFile(
          path.join(projectDir, "package.json"),
          JSON.stringify(packageJson, null, 2)
        );
        console.log("Updated package.json with EJS dependency.");
    }

    // Create README.md with project structure
    const readmeContent = `
    # Project Structure
    \`\`\`
    ${name}/
    ├── src/
    │   ├── controllers/
    │   │   └── exampleController.ts
    │   ├── models/
    │   │   └── exampleModel.ts
    │   ├── routes/
    │   │   └── exampleRoute.ts
    │   ├── views/
    │   │   └── exampleView.ejs
    │   ├── app.ts
    │   └── server.ts
    ├── tsconfig.json
    └── package.json
    \`\`\`
    `;
    await fs.writeFile(path.join(projectDir, "README.md"), readmeContent);
    console.log("README.md created successfully.");

    // Generate the zip file
    const output = fs.createWriteStream(zipFilePath);
    const archive = archiver("zip", { zlib: { level: 9 } });

    output.on("close", async () => {
      console.log(`Zip file created: ${zipFilePath} (${archive.pointer()} total bytes)`);
      res.set({
        'Content-Type': 'application/zip',
        'Content-Disposition': `attachment; filename="${name}.zip"`
      });
      res.download(zipFilePath, `${name}.zip`, async (err) => {
        if (err) {
          console.error("Error in file download:", err);
          res.status(500).send("Error downloading file");
        }
        await fs.remove(projectDir);
        await fs.remove(zipFilePath);
        console.log("Temporary files removed.");
      });
    });

    archive.on("error", (err) => {
      console.error("Archiver error:", err);
      throw err;
    });

    archive.pipe(output);
    archive.directory(projectDir, false);
    await archive.finalize();

  } catch (error) {
    console.error("Error generating project:", error);
    res.status(500).send("Internal Server Error");
    await fs.remove(projectDir);
    await fs.remove(zipFilePath);
  }
};

export default generateTSDirectory;
