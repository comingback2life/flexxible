export const getUserQuery = `
query GetUser($email:String){
    user(by: {email:$email}) {
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
