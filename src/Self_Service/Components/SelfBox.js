import React from 'react'
import { Link } from 'react-router-dom'

const SelfBox = ({title, desc, icon, link}) => {
  return (
    <Link to={`/self-service/${link}`} className="bg-card p-2 rounded-lg shadow cursor-pointer group text-accent">
            <div className="bg-mainBg transition ease-in-out duration-300 py-2 px-3 rounded-lg group-hover:border-b-2 group-hover:border-caramel group-hover:shadow-md">
              <div className="flex items-center gap-2">
                <div className="border rounded-full h-11 w-11 flex items-center justify-center">
                  <img src={icon} alt={title} />
                </div>
                <h5 className="font-medium capitalize text-sm md:text-base">{title}</h5>
              </div>
              <p className="text-xs md:text-sm py-3">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </p>
            </div>
          </Link>
  )
}

export default SelfBox