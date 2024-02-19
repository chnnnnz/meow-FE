import { CodegenConfig } from '@graphql-codegen/cli'
 
const config: CodegenConfig = {
  schema: 'http://localhost:3001/shop-api',
  documents: ['components/**/*.tsx', 'modules/hooks/**/*.tsx', 'app/**/*.tsx', 'modules/gql/operations.graphql'],
  ignoreNoDocuments: true,
  generates: {
    './modules/gql/generated.ts': {
      plugins: ['typescript', 'typescript-operations', 'typescript-react-apollo'],
    }
  }
}
 
export default config