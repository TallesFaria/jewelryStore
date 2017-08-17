import React from 'react';
import Acerto from './Acerto';

const AcertosList = ({ acertos }) =>
  <div>
    {
      <div className="client-list">
        {Object.values(acertos).map((acerto) => 
          <Acerto key={acerto._id} {...acerto} />
        )}
      </div>
    }
  </div>;

export default AcertosList;
