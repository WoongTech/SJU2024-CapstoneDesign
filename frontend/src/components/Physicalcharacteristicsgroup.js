import React, { useContext, useEffect } from 'react';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';
import { Customcardbutton } from './index';
import { UserContext } from '../contexts';
import {
  Anaemia,
  Breastfeeding,
  Constipation,
  Diabetes,
  Gout,
  Osteoporosis,
  Pregnant,
  Stone,
  Vegan,
} from '../../assets/components';

const Cardcontainer = styled.View`
  align-items: flex-start;
  justify-content: center;
  background-color: ${({ theme }) => theme.background};
  padding: 0px 0px;
`;

const Cardrowcontainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.background};
`;

const Physicalcharacteristicsgroup = () => {
  const { user, setUser: updateUserInfo } = useContext(UserContext);

  const toggleUserState = (condition) => {
    updateUserInfo({
      [condition]: !user[condition],
    });
    //console.log(condition);
  };

  useEffect(() => {
    //console.table(user);
  }, [user]);

  return (
    <Cardcontainer>
      <Cardrowcontainer>
        <Customcardbutton
          onPress={() => toggleUserState('vegan')}
          url={Vegan}
          title="채식주의"
          isFocused={user.vegan}
        ></Customcardbutton>
        <Customcardbutton
          onPress={() => toggleUserState('diabetes')}
          url={Diabetes}
          title="당뇨병"
          isFocused={user.diabetes}
        ></Customcardbutton>
        <Customcardbutton
          onPress={() => toggleUserState('constipation')}
          url={Constipation}
          title="변비"
          isFocused={user.constipation}
        ></Customcardbutton>
      </Cardrowcontainer>
      <Cardrowcontainer>
        <Customcardbutton
          onPress={() => toggleUserState('anaemia')}
          url={Anaemia}
          title="빈혈"
          isFocused={user.anaemia}
        ></Customcardbutton>
        <Customcardbutton
          onPress={() => toggleUserState('osteoporosis')}
          url={Osteoporosis}
          title="골다공증"
          isFocused={user.osteoporosis}
        ></Customcardbutton>
        <Customcardbutton
          onPress={() => toggleUserState('gout')}
          url={Gout}
          title="통풍"
          isFocused={user.gout}
        ></Customcardbutton>
      </Cardrowcontainer>
      <Cardrowcontainer>
        <Customcardbutton
          onPress={() => toggleUserState('urinarystone')}
          url={Stone}
          title="요로결석"
          isFocused={user.urinarystone}
        ></Customcardbutton>
        {user.gender == 'F' && (
          <Customcardbutton
            onPress={() => toggleUserState('pregnant')}
            url={Pregnant}
            title="임신"
            isFocused={user.pregnant}
          ></Customcardbutton>
        )}
        {user.gender == 'F' && (
          <Customcardbutton
            onPress={() => toggleUserState('breastfeeding')}
            url={Breastfeeding}
            title="모유수유"
            isFocused={user.breastfeeding}
          ></Customcardbutton>
        )}
      </Cardrowcontainer>
    </Cardcontainer>
  );
};

export default Physicalcharacteristicsgroup;
