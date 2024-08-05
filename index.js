const simpleGit = require("simple-git");
const fs = require("fs");
const path = require("path");

// User inputs
const GITHUB_USERNAME = "amjadimdad00";
const GITHUB_TOKEN = "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";
const REPO_NAME = "RepoSyncer";
const REPO_DESCRIPTION =
  "A Node.js script to automate the process of uploading a project to GitHub, including repository creation, initialization, and pushing code.";
const REPO_PRIVATE = true;

// Path to your project directory
const PROJECT_DIR = "../reposyncer";

async function uploadToGitHub() {
  try {
    // Dynamically import Octokit
    const { Octokit } = await import("@octokit/rest");

    // Initialize Octokit
    const octokit = new Octokit({ auth: GITHUB_TOKEN });

    // Initialize Simple Git
    const git = simpleGit(PROJECT_DIR);

    // Create a .gitignore file if it doesn't exist
    const gitignorePath = path.join(PROJECT_DIR, ".gitignore");
    if (!fs.existsSync(gitignorePath)) {
      const gitignoreContent = `
# Node modules
node_modules/

# Logs
logs
*.log

# Environment files
.env

# OS-specific files
.DS_Store
Thumbs.db

# Build output
dist/
build/
      `;
      fs.writeFileSync(gitignorePath, gitignoreContent);
    }

    // Create a README.md file with project description if it doesn't exist
    const readmePath = path.join(PROJECT_DIR, "README.md");
    if (!fs.existsSync(readmePath)) {
      const description = `
# ${REPO_NAME}

## Description

This project provides a Node.js script designed to streamline the process of uploading a local project to GitHub. The script automates several tasks, including:

- **Creating a New Repository**: Automatically creates a new GitHub repository using the GitHub API, saving time and effort in manually setting up repositories.
- **Initializing Git Repository**: Initializes a new Git repository in the specified project directory, allowing you to start tracking changes immediately.
- **Adding and Committing Files**: Adds a README.md file (if not already present) and commits it to the local repository, ensuring that your repository has an initial commit with basic documentation.
- **Pushing to GitHub**: Pushes the committed changes to the newly created GitHub repository, making your project accessible online.

## Features

- **Automated Repository Creation**: Simplifies the setup of new GitHub repositories by handling the creation process through the GitHub API.
- **Local Git Operations**: Uses the simple-git library to manage local Git operations, ensuring a seamless integration with GitHub.
- **Customizable Inputs**: Allows you to specify repository details such as name, description, and privacy settings through user inputs in the script.

## Usage

1. **Install Dependencies**: Ensure that Node.js and Git are installed. Install the required npm packages using \`npm install @octokit/rest simple-git\`.
2. **Configure the Script**: Replace placeholder values in the \`uploadToGitHub.js\` script with your GitHub username, personal access token, repository name, and other details.
3. **Run the Script**: Execute the script using \`node uploadToGitHub.js\` to upload your project to GitHub.

## Benefits

- **Efficiency**: Saves time by automating repetitive tasks involved in uploading projects to GitHub.
- **Ease of Use**: Provides a straightforward way to initialize and upload projects with minimal manual intervention.
- **Integration**: Easily integrates with existing workflows and can be customized to fit various project needs.
      `;
      fs.writeFileSync(readmePath, description);
    }

    // Initialize Git repository
    await git.init();

    // Add all files in the project directory
    await git.add("./*");
    await git.commit("Initial commit with README.md");

    // Create a new GitHub repository
    const { data: repo } = await octokit.rest.repos.createForAuthenticatedUser({
      name: REPO_NAME,
      description: REPO_DESCRIPTION,
      private: REPO_PRIVATE,
    });

    // Add remote origin and push
    const repoUrl = repo.clone_url;
    await git.addRemote("origin", repoUrl);
    await git.branch(["-M", "main"]);
    await git.push("origin", "main");

    console.log(`Project has been uploaded to GitHub: ${repoUrl}`);
  } catch (error) {
    console.error("Error:", error);
  }
}

uploadToGitHub();
