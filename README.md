# RepoSyncer 🚀

## Description

This project provides a Node.js script designed to streamline the process of uploading a local project to GitHub. The script automates several tasks, including:

- **Creating a New Repository**: Automatically creates a new GitHub repository using the GitHub API, saving time and effort in manually setting up repositories 🗂️.
- **Initializing Git Repository**: Initializes a new Git repository in the specified project directory, allowing you to start tracking changes immediately ⚙️.
- **Adding and Committing Files**: Adds a README.md file (if not already present) and commits it to the local repository, ensuring that your repository has an initial commit with basic documentation 📄.
- **Pushing to GitHub**: Pushes the committed changes to the newly created GitHub repository, making your project accessible online 🌐.

## Features ✨

- **Automated Repository Creation**: Simplifies the setup of new GitHub repositories by handling the creation process through the GitHub API 🛠️.
- **Local Git Operations**: Uses the simple-git library to manage local Git operations, ensuring a seamless integration with GitHub 🔄.
- **Customizable Inputs**: Allows you to specify repository details such as name, description, and privacy settings through user inputs in the script ⚙️.

## Usage 📝

1. **Install Dependencies**: Ensure that Node.js and Git are installed. Install the required npm packages using `npm install @octokit/rest simple-git` 📦.
2. **Configure the Script**: Replace placeholder values in the `uploadToGitHub.js` script with your GitHub username, personal access token, repository name, and other details 🛠️.
3. **Run the Script**: Execute the script using `node uploadToGitHub.js` to upload your project to GitHub 🚀.

## Benefits 🌟

- **Efficiency**: Saves time by automating repetitive tasks involved in uploading projects to GitHub ⏱️.
- **Ease of Use**: Provides a straightforward way to initialize and upload projects with minimal manual intervention 🧩.
- **Integration**: Easily integrates with existing workflows and can be customized to fit various project needs 🔧.
