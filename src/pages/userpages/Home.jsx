import Cards from "../../components/Cards"
import ContactButtonSection from "../../components/ContactButtonSection"
import Helmet from "../../components/Helemet"
import Search from "../../components/Search"

const Home = () => {
    return (
        <Helmet title="Home">
            <div>
                <Search />
                <Cards />
                <div className="m-4">
                    <ContactButtonSection />
                </div>
            </div>
        </Helmet>
    )
}

export default Home