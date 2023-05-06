const { exec } = require("child_process");
const fs = require("fs");
const emojiRegex = require("emoji-regex");

exec(
  `git rev-list --tags --skip=1 --max-count=1`,
  (error, commitCurentVersion, stderr) => {
    if (error) {
      console.error(`Error executing command: ${error.message}`);
      return;
    }
    if (stderr) {
      console.error(`Command output to stderr: ${stderr}`);
      return;
    }
    exec(
      `git describe --abbrev=0 --tags ${commitCurentVersion}`,
      (error, CurrentVersion, stderr) => {
        if (error) {
          console.error(`Error executing command: ${error.message}`);
          return;
        }
        if (stderr) {
          console.error(`Command output to stderr: ${stderr}`);
          return;
        }
        exec(`git describe --abbrev=0 --tags`, (error, NextVersion, stderr) => {
          if (error) {
            console.error(`Error executing command: ${error.message}`);
            return;
          }
          if (stderr) {
            console.error(`Command output to stderr: ${stderr}`);
            return;
          }
          console.log(`Version : ${CurrentVersion.trim()} | Next Version : ${NextVersion.trim()}`);
          exec(
            `git log --oneline --pretty=format:'%H$$%an$$%s' ${CurrentVersion.trim()}..HEAD`,
            (error, stdout, stderr) => {
              if (error) {
                console.error(`Error executing command: ${error.message}`);
                return;
              }
              if (stderr) {
                console.error(`Command output to stderr: ${stderr}`);
                return;
              }
              const gitLogOutput = stdout.toString();
              const regex = emojiRegex();
              const gitLogOutputFormated = gitLogOutput
                .split("\n")
                .map((commit) => {
                  let changeList = commit.split("$$");
                  const commitId = changeList[0].slice(1);
                  const commitAuthor = changeList[1];
                  changeList = changeList[2].split(regex);
                  if (changeList.length < 2) {
                    return undefined;
                  }
                  changeList.shift();
                  changeList = changeList.map((e) => {
                    e = e.trim();
                    const commitType =
                      e.split("(").length > 1 ? e.split("(")[0] : e.split(":")[0];
                    const commitScope = e.split("(")[1]
                      ? e.split("(")[1].toString().split(")")[0]
                      : undefined;
                    const commitContent = e.split(":")[1].toString().trim();
                    return {
                      id: commitId,
                      author: commitAuthor,
                      type: commitType,
                      scope: commitScope,
                      content: commitContent.replace(/'/g, ""),
                    };
                  });
                  return changeList;
                })
                .filter((e) => e != undefined);

              let changelog = `# Calibrum\n\n# 🚀 Calibrum ${NextVersion.trim()} is here! 🥳`;

              const gitLogOutputFormatedFlat = gitLogOutputFormated.flat(1);
              const features = gitLogOutputFormatedFlat.filter((e) => e.type === "feat");
              if (features.length > 0) {
                changelog += "\n\n## ✨ New Features\n";
                features.forEach((e) => {
                  changelog += ` - ${e.content} ([${e.id.substring(
                    0,
                    7
                  )}](https://github.com/Mateleo/Calibrum/commit/${e.id})) by @${
                    e.author
                  }\n`;
                });
              }
              const bugfixes = gitLogOutputFormatedFlat.filter(
                (e) => e.type == "perf" || e.type == "style"
              );
              if (bugfixes.length > 0) {
                changelog += "\n\n## 🔧 Bug Fixes\n";
                bugfixes.forEach((e) => {
                  changelog += ` - ${e.content} ([${e.id.substring(
                    0,
                    7
                  )}](https://github.com/Mateleo/Calibrum/commit/${e.id})) by @${
                    e.author
                  }\n`;
                });
              }
              const doc = gitLogOutputFormatedFlat.filter((e) => e.type == "docs");
              if (doc.length > 0) {
                changelog += "\n\n## 📝 Documentation\n";
                doc.forEach((e) => {
                  changelog += ` - ${e.content} ([${e.id.substring(
                    0,
                    7
                  )}](https://github.com/Mateleo/Calibrum/commit/${e.id})) by @${
                    e.author
                  }\n`;
                });
              }
              const contributors = [
                ...new Set(gitLogOutputFormatedFlat.map((e) => e.author)),
              ];
              if (contributors.length > 0) {
                changelog += "\n\n## 🗿 Chad Contributors\n------\n";
                contributors.forEach((e) => {
                  changelog += ` - [@${e}](https://github.com/${e}) for ${gitLogOutputFormatedFlat
                    .filter((commit) => commit.author === e)
                    .reduce((acc, obj) => acc + 1, 0)} contributions\n`;
                });
              }
              fs.writeFile("changelog.md", changelog, (err) => {
                if (err) throw err;
                console.log("Changelog created!");
              });
            }
          );
        });
      }
    );
  }
);
