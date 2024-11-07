# Express Generator

Express Generator is a project scaffolding tool for Node.js, designed to quickly set up a structured Express.js application with an MVC architecture. It allows you to select between JavaScript and TypeScript templates and manage dependencies using npm or Yarn.

## Features

- **MVC Structure**: Automatically generates directories for `controllers`, `models`, `routes`, and `views`.
- **Customizable Templates**: Choose between JavaScript or TypeScript templates for your project.
- **Dependency Management**: Easily manage dependencies with npm or Yarn.
- **Efficient Project Setup**: Generate a zip file containing the project structure and essential files like `package.json`, `server.js`, and `README.md`.

## Project Structure

After generation, the project structure will look like this:

```bash    
myProject/ ├── controllers/ │ └── exampleController.js ├── models/ │ └── exampleModel.js ├── routes/ │ └── exampleRoute.js ├── views/ │ └── exampleView.ejs ├── app.js ├── server.js └── package.json
```

markdown
Copy code

## Usage

1. **Install dependencies**:
```bash   
    npm install
    or
    yarn install```


2. **Run the app**:
```bash
npm start
or
yarn start
```


## API Reference

### `/api/generate`

Generates a new project based on the provided configuration. Supports both JavaScript and TypeScript templates.

- **Method**: `POST`
- **Body Parameters**:
- `name`: Project name
- `version`: Version of the project
- `description`: Project description
- `author`: Author name
- `license`: License type
- `dependencies`: List of dependencies

## Environment Variables

- `BACKEND_URI`: Set the URI for the backend server.

## Technologies Used

- **Node.js**
- **Express.js**
- **JavaScript/TypeScript** (depending on template choice)

## License

This project is licensed under the MIT License.