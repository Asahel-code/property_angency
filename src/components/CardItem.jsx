
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
} from "@material-tailwind/react";
import { Link } from 'react-router-dom';
import { BsFillGeoAltFill } from "react-icons/bs";
import { FaBed } from "react-icons/fa";
import numberWithCommas from '../utils/numberWithCommas'


const CardItem = ({ property }) => {
  return (
    <div>
      <Link to={`/${property.category}/${property.subCategory ? property.subCategory : property.category}/${property.name}`}>
        <Card className="w-full">
          <CardHeader color="blue" className="relative h-56 m-0 rounded-b-none">
            <img
              src={property.images[0]}
              alt="property"
              className="h-full w-full"
            />
          </CardHeader>
          <CardBody className="text-justify">
            <div className="flex items-center gap-4">
              <Typography className="font-bold text-black md:text-lg xs:text-md">
                <BsFillGeoAltFill />
              </Typography>
              <Typography className="font-bold text-black text-md">
                {property.name}, {property.location}
              </Typography>
            </div>
            <div className="flex items-center gap-2 py-1">
              <Typography className="text-gray-500 py-1">
                <FaBed />
              </Typography>
              <Typography className="text-gray-500 text-sm">
                5 bed
              </Typography>
            </div>
            <Typography variant="h5" className="text-black">
              Ksh.{numberWithCommas(Number(property.price))}
            </Typography>
          </CardBody>
        </Card>
      </Link>
    </div>
  )
}

export default CardItem