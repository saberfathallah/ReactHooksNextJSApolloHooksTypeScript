import React, { useContext } from 'react';
import { useQuery } from '@apollo/react-hooks';

import GET_USER_DETAILS from '@graphql/users/queries/getUserDetails';
import From from '@component/form';
import UserContext from '@context/userContext';


const EditProfil = (props) => {
  const { isAuth } = useContext(UserContext);

  console.log('props', props);
  console.log('isAuth', isAuth);
  const { data, loading } = useQuery(GET_USER_DETAILS, {
    skip: !isAuth,
  });
  console.log('data', data);


  return (
    <div>
      {loading ? <p>loading...</p> : <From user={data.getUserDetails.user} />}
    </div>
  );
};

export default EditProfil;
