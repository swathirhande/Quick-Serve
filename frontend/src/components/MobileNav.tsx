
import {Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger} from "./ui/sheet";
import { CircleUserRound, Menu } from "lucide-react"
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import { useAuth0 } from "@auth0/auth0-react";
import MobileNavLinks from "./MobileNavLinks";
const MobileNav = () => {
    const { isAuthenticated, loginWithRedirect, user } = useAuth0();

    return(
        <Sheet>
            <SheetTrigger> 
            {/*Whatever we add here, will cause the Sheet to open*/}
            <Menu className="text-orange-500" />
            </SheetTrigger>
            <SheetContent>
                <SheetTitle className="m-2 mt-3">
                {isAuthenticated ? (
            <span className="flex items-center font-bold gap-2">
              <CircleUserRound className="text-orange-500" />
              {user?.email}
            </span>
          ) : (
            <span> Welcome to MernEats.com!</span>
          )}
                </SheetTitle>
                <Separator />
                <SheetDescription className  ="flex flex-col gap-4">
                    {isAuthenticated ? (<MobileNavLinks/>) : (<Button onClick={() => loginWithRedirect()} className="flex-1 font-bold bg-orange-500 m-2">Log In</Button>)}
                    
                </SheetDescription>
            </SheetContent>
        </Sheet>
    )
}
export default MobileNav