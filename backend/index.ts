import { prisma } from './generated/prisma-client';

// A `main` function so that we can use async/await
async function main() {
  // Create a new user called `Alice`
  const newUser = await prisma.createUser({ name: 'Alice' });
  const project = await prisma.createProject({ name: 'basicProject' });
  const contest = await prisma.createContest({ name: 'basicContest' });
  // tslint:disable-next-line:no-console
  // console.log(`Created new user: ${newUser.name} (ID: ${newUser.id})`);

  // Read all users from the database and print them to the console
  const allUsers = await prisma.users();
  const allProjects = await prisma.projects();
  const allContests = await prisma.contests();

  // tslint:disable-next-line:no-console
  console.log(allUsers);
  // tslint:disable-next-line:no-console
  console.log(allProjects);
  // tslint:disable-next-line:no-console
  console.log(allContests);
}

// const postsByUser = await prisma
// .user({ email: "bob@prisma.io" })
// .posts()
// console.log(`All posts by that user: ${JSON.stringify(postsByUser)}`)

// tslint:disable-next-line:no-console
main().catch(e => console.error(e));
