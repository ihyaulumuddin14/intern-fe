'use client'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { usePathname, useRouter } from "next/navigation";

const LoginPageInterceptor = () => {
  const router = useRouter();
  const pathname = usePathname();
  const isOpen = pathname.startsWith("/login");

  const handleOpenChange = (open: boolean) => {
    if (open) return;
    router.replace("/home");
  };

  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Login</DialogTitle>
        </DialogHeader>
        {/* <AuthLayout
          level="dialog"
          welcomeTitle="Hello Toeankoe"
          subtitle="Ready to get your best haircut today?"
          footer="Don't have an account yet?"
          footerUrl="/signup"
        >
          <div className="w-full h-fit sticky top-0">
            <Suspense fallback={<div className='flex justify-center items-center p-10'><Spinner/></div>}>
              <SignInForm />
            </Suspense>
          </div>
        </AuthLayout> */}
      </DialogContent>
    </Dialog>
  )
}

export default LoginPageInterceptor