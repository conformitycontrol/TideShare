# Create T3 App

This is a [T3 Stack](https://create.t3.gg/) project bootstrapped with `create-t3-app`.

## What's next? How do I make an app with this?

We try to keep this project as simple as possible, so you can start with just the scaffolding we set up for you, and add additional things later when they become necessary.

If you are not familiar with the different technologies used in this project, please refer to the respective docs. If you still are in the wind, please join our [Discord](https://t3.gg/discord) and ask for help.

- [Next.js](https://nextjs.org)
- [NextAuth.js](https://next-auth.js.org)
- [Prisma](https://prisma.io)
- [Tailwind CSS](https://tailwindcss.com)
- [tRPC](https://trpc.io)

## Learn More

To learn more about the [T3 Stack](https://create.t3.gg/), take a look at the following resources:

- [Documentation](https://create.t3.gg/)
- [Learn the T3 Stack](https://create.t3.gg/en/faq#what-learning-resources-are-currently-available) — Check out these awesome tutorials

You can check out the [create-t3-app GitHub repository](https://github.com/t3-oss/create-t3-app) — your feedback and contributions are welcome!

## How do I deploy this?

TBD

## Setting up development environment

Make sure that you have Git installed on your machine, as well as Node.js. You can check this by typing `git` and `npm` in your wsl terminal (if you're on windows) or normal terminal if you are on mac. If these commands are found, then you have Git and Node.

Make sure you have VSCode, this will make your life very easy when developing. Also make sure you install VSCode extenstions such as Typescript/Javascript, Prittier (for formating), and ESLint (for linting our code as you write it, read about linters if you are interested), Prisma, Git, and any others that it will automatically suggest. 

To get this project into your VSCode, get into an empty folder, and then open the terminal and type in `git clone https://gitlab.com/crunchyice/tide-share.git`. This will clone the repository into your empty folder. Then, `cd tide-share` into the folder and then use the command `code .` to automatically open up a new VSCode windows within the folder. 

Explore the project and try to get a feel of the structure.

## Committing and Pushing a change in the code 

After you make a change in the code, you will see the file name change color, and have a letter next to it. This is normal, and just means you have made a change to the file, and your code no longer matches the code in the Gitlab repository. Since we are working as a team on the same project, version control is important to understand, so we can efficiently work on the same project together. After you make a changen and know it works, and are ready to officially be done with your work, you have to commit your change. This a very important aspect to understand. Commits show the history of changes in code, with a breif description of what changed when you made that commit. 

When you are done with you changes, and made sure the website feature/aspect/etc works correctly, go ahead and ytype `git add .` into the terminal. This will "stage" your changes and get them ready to commit. Following this, type `git commit -m"This is a commit message"` and this will make your commit. You will notice all your file names will go back to the normal color, indicating the changes you just made are final. However, there is one more step. In order to get these changes uploaded to the remote repository, in Gitlab, you have to put `git push` in the terminal. Also if you open up the project in VSCode and you know changes have been made by someone else since the last time you opened it, you have to type `git pull` in the terminal to pull the new content into your local repository. 

## Workflow

This project development cycle will mostly be based off of Gitlab "Issues". If you look at the tabs on the left side of the screen, you will see "Plan" tab, and then inside you will see issues (I recommend you play around with all the different stuff in the gitlab tabs, there are a million things you can do and tons we won't touch during this project.). We will all be able to create issues. These could be as big or as small of an issue to complete. It can be a feature, a change, an implimentation, etc. You should be able to see some issues already. We can also create milestones for things like Pre-Alpha release, etc. 



