import LoginComponent from 'components/account/login'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Sign in',
  description: 'Sign in to your Medusa Store account.',
}

export default function Login() {
  return <LoginComponent />
}
