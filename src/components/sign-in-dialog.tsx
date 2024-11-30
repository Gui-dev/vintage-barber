import { signIn } from 'next-auth/react'
import Image from 'next/image'
import { Button } from './ui/button'
import { DialogDescription, DialogHeader, DialogTitle } from './ui/dialog'

export const SignInDialog = () => {
  const handleGoogleLogin = async () => {
    await signIn('google')
  }

  return (
    <>
      <DialogHeader>
        <DialogTitle>Faça login na plataforma</DialogTitle>
        <DialogDescription>Conecte-se com o Google</DialogDescription>
      </DialogHeader>

      <Button
        variant="secondary"
        className="gap-1 font-bold"
        onClick={handleGoogleLogin}
      >
        <Image src="/google.svg" alt="Google Logo" height={18} width={18} />
        Google
      </Button>
    </>
  )
}
