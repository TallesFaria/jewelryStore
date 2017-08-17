import React from 'react';
import Debtors from './Debtors';

const DebtorsList = ({ clients }) =>
  <div>
    {
      <div className="client-list">
        {Object.values(clients).map((client) => 
          <Debtors key={client._id} {...client} />
        )}
      </div>
    }
  </div>;

export default DebtorsList;
