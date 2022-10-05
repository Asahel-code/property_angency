
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
} from "@material-tailwind/react";
import { Link } from 'react-router-dom';
import { BsGeoAlt } from "react-icons/bs";
import numberWithCommas from '../utils/numberWithCommas'


const CardItem = ({ property }) => {
  return (
    <div>
      <Link to={`/${property.category}/${property.subCategory ? property.subCategory : property.category}/${property.name}`}>
        <Card className="w-72">
          <CardHeader color="blue" className="relative h-56 m-0 rounded-b-none">
            <img
              src={property.images[0]}
              alt="property"
              className="h-full w-full"
            />
          </CardHeader>
          <CardBody className="text-justify">
            <Typography variant="h5" className="mb-2">
              Ksh.{numberWithCommas(Number(property.price))}
            </Typography>
            <div className="flex items-center gap-4">
              <Typography className="text-blue-700 md:text-lg xs:text-md">
                <BsGeoAlt />
              </Typography>
              <Typography className="text-gray-400 text-sm">
                {property.location}
              </Typography>
            </div>
            <Typography>
              {property.description.length > 100 ?
                `${property.description.substring(0, 100)}...` : property.description
              }
            </Typography>
          </CardBody>
        </Card>
      </Link>
    </div>
  )
}

export default CardItem