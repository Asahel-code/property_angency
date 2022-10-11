import Cards from "../../components/Cards";
import Helmet from "../../components/Helemet";
import Search from "../../components/Search";
import { BsDashLg } from "react-icons/bs";
import { CgArrowLongRight } from "react-icons/cg";
import { Link } from "react-router-dom";

const Home = () => {
    return (
        <Helmet title="Home">
            <div>
                <Search />
                <div className="pt-8 pb-32 md:mt-20 relative">
                    <div className="md:px-12 xs:px-4">
                        <div className="flex items-center gap-2">
                            <span className="text-2xl font-normal"><BsDashLg /></span>
                            <span className="text-2xl font-normal capitalize">Popular</span>
                        </div>
                        <div className="flex justify-between py-4">
                            <h3 className="font-bold md:text-3xl xs:text-xl">Our popular properties</h3>
                            <Link to="/allProperties" className="flex items-center gap-2 cursor-pointer">
                                <span className="capitalize">Expore all</span>
                                <span><CgArrowLongRight /></span>
                            </Link>
                        </div>
                    </div>
                    <Cards id="popular" />
                </div>
            </div>
        </Helmet>
    )
}

export default Home