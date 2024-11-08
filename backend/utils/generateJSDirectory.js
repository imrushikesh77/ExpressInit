import archiver from "archiver";
import fs from "fs-extra";
import path from "path";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const generateJSDirectory = async (req, res) => {
  const {
    name,
    author,
    description,
    main,
    version,
    license,
    dependencies,
    type,
    template, // e.g., "mvc-javascript" or "mvc-typescript"
  } = req.body;

  console.log("Received project configuration:", req.body);

  const projectDir = path.join("/tmp", "temp_project");
  const zipFilePath = path.join("/tmp", "project.zip");

  try {
    // Clear any previous files and ensure project directory exists
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
      scripts: { start: "node server.js" },
      keywords: [],
      dependencies: dependencies.reduce((acc, dep) => {
          acc[dep.name] = dep.version || "latest";
          return acc;
        }, {
            "express": "^4.17.1",
        }),
      license,
    };

    await fs.writeFile(
      path.join(projectDir, "package.json"),
      JSON.stringify(packageJson, null, 2)
    );
    console.log("package.json created successfully.");

    // Create app.js
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
        res.render('exampleView');
      });
      
      export default app;
    `;

    await fs.writeFile(path.join(projectDir, "app.js"), appContent);
    console.log("app.js created successfully.");

    // Create server.js
    const serverContent = `
      import app from './app.js';

      const PORT = process.env.PORT || 3000;

      app.listen(PORT, () => {
        console.log(\`Server running on http://localhost:\${PORT}\`);
      });
    `;

    await fs.writeFile(path.join(projectDir, "server.js"), serverContent);
    console.log("server.js created successfully.");

    const readmeContent = `
    #Project Structure
    \`\`\`
    myProject/
    ├── controllers/
    │   └── exampleController.js
    ├── models/
    │   └── exampleModel.js
    ├── routes/
    │   └── exampleRoute.js
    ├── views/
    │   └── exampleView.ejs
    ├── app.js
    ├── server.js
    └── package.json
    \`\`\`
    `;
    
    await fs.writeFile(path.join(projectDir, "README.md"), readmeContent);
    console.log("README.md created successfully.");
    

    // Create directories: controllers, models, routes, views
    const directories = ["controllers", "models", "routes", "views"];
    for (const dir of directories) {
      await fs.ensureDir(path.join(projectDir, dir));
      console.log(`Directory '${dir}' created.`);
    }

    // Create sample files
    // 1. Controller
    const exampleControllerContent = `
      export const getExample = (req, res) => {
        res.json({ message: 'Hello \`${author}\`,This is an example controller response.' });
      };
    `;
    await fs.writeFile(
      path.join(projectDir, "controllers", "exampleController.js"),
      exampleControllerContent
    );
    console.log("controllers/exampleController.js created successfully.");

    // 2. Model
    const exampleModelContent = `
      // Example model - define your schema and database interactions here
      export const exampleModel = {};
    `;
    await fs.writeFile(
      path.join(projectDir, "models", "exampleModel.js"),
      exampleModelContent
    );
    console.log("models/exampleModel.js created successfully.");

    // 3. Route
    const exampleRouteContent = `
      import express from 'express';
      import { getExample } from '../controllers/exampleController.js';

      const router = express.Router();

      // Define routes
      router.get('/', getExample);

      export default router;
    `;
    await fs.writeFile(
      path.join(projectDir, "routes", "exampleRoute.js"),
      exampleRouteContent
    );
    console.log("routes/exampleRoute.js created successfully.");

    // 4. View (using EJS as an example)
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
      path.join(projectDir, "views", "exampleView.ejs"),
      exampleViewContent
    );
    console.log("views/exampleView.ejs created successfully.");

    // Optionally, add EJS as a dependency if using views
    if (template === "mvc-javascript") {
      packageJson.dependencies["ejs"] = "^3.1.8";
      await fs.writeFile(
        path.join(projectDir, "package.json"),
        JSON.stringify(packageJson, null, 2)
      );
      console.log("Updated package.json with EJS dependency.");
    }

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
        // Clean up temporary files
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
    archive.directory(projectDir, false); // Add projectDir contents to the root of the zip
    await archive.finalize();

  } catch (error) {
    console.error("Error generating project:", error);
    res.status(500).send("Internal Server Error");
  }
};

export default generateJSDirectory;
