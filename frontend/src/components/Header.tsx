import { Link } from "react-router-dom";
import MobileNav from "./MobileNav";
import MainNav from "./MainNav";

const Header = () => {
    return(
        <div className="border-b-2 border-b-orange-500 py-6">
            <div className="container mx-auto flex justify-between items-center">
                <Link 
                to="/" 
                className = "text-3xl font-bold tracking-tight text-orange-500 mr-3 ml-3"
                >
                MernEats.com
                </Link>
                <div className="md:hidden mr-3 ml-3">
                    <MobileNav /> {/* Hide this for large screens using className="md:hidden" */}
                </div>
                <div className="hidden md:block"> {/* on small screen this div is hidden, from medium screen this will be visible */}
                    <MainNav />
                </div>
            </div>
        </div>
    )
}

export default Header;