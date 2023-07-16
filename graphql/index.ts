export const getUserQuery = `
query GetUser($email:String){
    user(by: {email:$email}) {
      id
      name
      email
      avatarURL
      description
      githubURL
      linkedIn
    }
  }
`;

export const createUserMutation = `
mutation UserCreate ($input:UserCreateInput!) {
  userCreate(input: $input){ 
    user {
      name
      email
      avatarURL
      description
      githubURL
      linkedIn
    }
  }
    
  
}
`;
export const CreateProjectMutation = `mutation ProjectCreate($input:ProjectCreateInput!) {
  projectCreate(input: $input) {
    project {
      id
      title
      description
      createdBy {
        email
        name
      }
    }
  }
}`;
export const projectsQuery = `
  query getProjects($category: String, $endcursor: String) {
    projectSearch(first: 8, after: $endcursor, filter: {category: {eq: $category}}) {
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
      edges {
        node {
          title
          githubURL
          description
          site
          id
          image
          category
          createdBy {
            id
            email
            name
            avatarURL
          }
        }
      }
    }
  }
`;
export const getProjectByIdQuery = `
  query GetProjectById($id: ID!) {
    project(by: { id: $id }) {
      id
      title
      description
      image
      site
      githubURL
      category
      createdBy {
        id
        name
        email
        avatarURL
      }
    }
  }
`;

export const getProjectsOfUserQuery = `
  query getUserProjects($id: ID!, $last: Int = 4) {
    user(by: { id: $id }) {
      id
      name
      email
      description
      avatarURL
      githubURL
      linkedIn
      projects(last: $last) {
        edges {
          node {
            id
            title
            image
          }
        }
      }
    }
  }
`;

export const deleteProjectMutation = `
  mutation DeleteProject($id: ID!) {
    projectDelete(by: { id: $id }) {
      deletedId
    }
  }
`;
export const updateProjectMutation = `
mutation ProjectUpdate($id:ID!,$input:ProjectUpdateInput!) {
  projectUpdate(by: {id:$id}, input: $input) {
    project {
      id
      title
      description
      image
      site
      githubURL
      createdBy {
        name
        email
      }
    }
  }
}
`;
