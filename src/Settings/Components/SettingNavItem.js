import React from 'react'
import { Link } from 'react-router-dom';

const SettingNavItem = ({item}) => {
    const {title, items} = item;
  return (
    <div className='setting-nav-item mb-24'>
                    <h5 className="font-semibold text-accent text-xl">
                        {title}
                    </h5>
                    <ul className='sub-items mt-4'>
                        {items.map(item => (
                            <li className='mb-4 text-base' key = {item.Link}>
                                <Link to = {item.link}>{item.name}</Link>
                            </li>
                        ))}

                    </ul>
                </div>
  )
}

export default SettingNavItem