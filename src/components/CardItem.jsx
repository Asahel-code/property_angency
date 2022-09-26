import { Card } from 'flowbite-react';
import { Link } from 'react-router-dom';
import { BsGeoAlt } from "react-icons/bs";
import numberWithCommas from '../utils/numberWithCommas';

const CardItem = ({ property }) => {
  return (
    <div>
      <Link to={`/${property.category}/${property.subCategory ? property.subCategory : property.category}/${property.name}`}>
        <div className="max-w-sm">
          <Card imgSrc={property.images[0]}>
            <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              Ksh.{numberWithCommas(Number(property.price))}
            </h5>
            <div className="flex items-center gap-4">
              <p className="text-blue-700 md:text-lg xs:text-md">
                <BsGeoAlt />
              </p>
              <p className="text-gray-400 text-sm">
                {property.location}
              </p>
            </div>

            <p className="font-light text-gray-700 ">
              {property.description.length > 100 ?
                `${property.description.substring(0, 100)}...` : property.description
              }
            </p>
          </Card>
        </div>
      </Link>
    </div>
  )
}

export default CardItem