import Footer from "@/components/Footer"
import Header from "@/components/Header"
import Hero from "@/components/Hero"
type Props = {
children: React.ReactNode;
showHero? : boolean; //this prop is optional for <Hero/>
}

const Layout =({children, showHero = false}:Props) => {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            {showHero && <Hero />} {/*display <Hero /> only when showHero is true, we do this beacuse we don't need it for UserProfile page where user enters their city,country,addressLine...*/}  
        <div className="container mx-auto flex-1 py-10 px-1">
            {children}
        </div>
        <Footer />
        </div>

   
    )
       
}

export default Layout