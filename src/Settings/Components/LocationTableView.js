import React from 'react'

export const LocationTableView = () => {
  return (
    <div>
        <table>
            <thead>
                <tr>
                    <th>Location Name</th>
                    <th>Number of employee</th>
                    <th>Country</th>
                    <th>Mail Alias</th>
                    <th>Description</th>
                    <th>Action</th>
                </tr>
            </thead>

            <tbody>
                {[1,2,3,4].map((index) =>  <tr key={index}>
                    <td>Lagos</td>
                    <td>0</td>
                    <td>Nigeria</td>
                    <td>isaac@snapnet.com</td>
                    <td>Lorem ipsum dolor sit amet consectetur...</td>
                    <td><i class="ri-pencil-fill"></i> </td>
                </tr>)}
                
            </tbody>
        </table>
    </div>
  )
}

