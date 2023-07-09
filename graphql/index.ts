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
mutation CreateUser($input:UserCreateInput!){
    userCreate(input:$input){
        user{
            name
            email
            description
            githubURL
            linkedIn
        }
    }
}
`;
