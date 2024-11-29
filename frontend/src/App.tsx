import { Button } from "@/components/ui/button";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";

function App() {
  return (
    <div>
      <h1 className="text-red-500 text-8xl" >Hello World!</h1>
      <header>
        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </header>
      <Button>press me</Button>
    </div>
  )
}

export default App