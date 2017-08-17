import React from 'react';
import Client from './Client';

const ClientList = ({ clients }) =>
  <div>
    {
      <div className="">
        {Object.values(clients).map((client) => 
          <Client key={client._id} {...client} />
        )}
      </div>
    }
  </div>;

export default ClientList;
