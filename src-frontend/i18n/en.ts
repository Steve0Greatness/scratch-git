export default {
  menu: {
    push: "Push",
    pull: "Pull",
    commit: "Commit",
    "setup-repo": "Setup repository",
    "view-commits": "View commits",
    "repo-needed": "Please set up a repository to use this!",
  },
  diff: {
    "use-highlights": "Use highlights",
    "plain-text": "Plain text",
    script: "Script {{number}}",
  },
  commit: {
    "search-commits": "Search commits",
    commits: "Commits",
    newer: "< Newer",
    older: "Older >",
    "committed-when": "{{name}} committed {{time}}",
  },
  welcome: {
    "project-opened": "Project opened",
    "open-project": "Open project",
    welcome: "Welcome to scratch.git",
    "get-started": "Please load a project for Git development to get started",
    "select-project-loc": "Select project location",
    "select-location":
      "Please select the location of your project file. This is so scratch.git can find your project locally to use with your repository.",
    "set-info": "Enter a username and email",
    "set-git-username":
      "Please pick a username and email to use when making commits. Remember to keep this info appropriate if you want to share your repository on Scratch. Your email is only used for Git and doesn't have to be a real email.",
    next: "Next",
    back: "Back",
  },
  repoconfig: {
    "repo-url-placeholder": "Enter a link to a repository URL",
    "repo-url": "Repository URL (optional)",
    name: "Name",
    email: "Email",
    repoconfig: "Configure your [[repository]]",
    "no-empty-fields": "Don't leave starred fields blank!",
    "repo-tip": "A repository (repo) is a place to store your project online",
  },
  alerts: {
    "unrelated-changes":
      "Couldn't pull new changes since they are unrelated with your changes.",
    "pull-success": "Successfully pulled new changes. Reload to see them.",
    "no-changes": "There's no new changes to pull.",
    "inconsistent-work":
      "The online repository contains work that you don't have. Try pulling changes from online first.",
    "up-to-date": "Everything is up to date. There are no new commits to push.",
    "push-success": "Successfully pushed changes to {{url}}",
    "gh-device-code-needed": {
      start: "Authentication needed for GitHub. Please go to",
      end: "and enter the code: {{code}}",
    },
    "wrong-project": "Nothing was changed. Did you open the right project?",
  },
  close: "Close",
  okay: "Okay",
};
