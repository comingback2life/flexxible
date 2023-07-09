import { g, auth, config } from '@grafbase/sdk';

const User = g.model('user', {
  name: g.string().length({ min: 2, max: 20 }),
  email: g.string().unique(),
  avatarURL: g.url(),
  description: g.string().length({ min: 10 }).optional(),
  githubURL: g.url().optional(),
  linkedIn: g.url().optional(),
  projects: g
    .relation(() => Project)
    .list()
    .optional(),
});

const Project = g.model('project', {
  title: g.string().length({ min: 3 }),
  description: g.string(),
  image: g.url(),
  site: g.url(),
  githubURL: g.url(),
  category: g.string().search(),
  createdBy: g.relation(() => User),
});
export default config({
  schema: g,
  // Integrate Auth
  // https://grafbase.com/docs/auth
  // auth: {
  //   providers: [authProvider],
  //   rules: (rules) => {
  //     rules.private()
  //   }
  // }
});