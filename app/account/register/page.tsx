import RegisterComponent from 'components/account/register'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Sign up',
  description: 'Sign up to your Meowtimes Store account.',
}

export default function Register() {
  return <RegisterComponent />
}
