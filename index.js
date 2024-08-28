const simpleGit = require("simple-git");
const fs = require("fs");
const path = require("path");

// User inputs
const GITHUB_USERNAME = "Your Github Username";
const GITHUB_TOKEN = "Your GitHub Token Here";
const REPO_NAME = "Your Repo Name";
const REPO_DESCRIPTION =
  "Your Repo Description";
const REPO_PRIVATE = "Is Repo Private";

// Path to your project directory
const PROJECT_DIR = "Path To Your Repo";

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
      const description = `Add ReadME File Content Here`;
      fs.writeFileSync(readmePath, description);
    }

    // Initialize Git repository
    await git.init();

    // Add all files in the project directory
    await git.add("./*");
    await git.commit(`Commit: Made ${REPO_NAME}`);

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
