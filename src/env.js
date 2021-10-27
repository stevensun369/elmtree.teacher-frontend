let apiURL
let authURL
let env = 'dev'

if (env === 'dev') {
  apiURL = 'http://localhost:1000'
  authURL = 'http://localhost:5000'
} else if (env === 'prod') {
  apiURL = 'https://elmtreeapi.xyz'
  authURL = 'http://elmtree-auth-frontend.vercel.app'
}

export { apiURL, authURL, env }
