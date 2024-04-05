import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components/native';
import { Button, Input, ErrorMessage, Customtext } from '../components';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { UserContext } from '../contexts';
import { MultipleSelectList } from 'react-native-dropdown-select-list';

const Container = styled.View`
  align-items: flex-start;
  justify-content: flex-start;
  background-color: ${({ theme }) => theme.background};
  padding: 10px 40px;
  width: 100%;
`;

const MultipleSelectListContainer = styled.View`
  margin: 10px 0px;
`;

const GUIDE_TEXT = `가지고 있는 
건강고민을 선택해주세요`;

const Signupdiseases = ({ navigation }) => {
  const [selectedCardio, setSelectedCardio] = useState([]);
  const [selectedDigestive, setSelectedDigestive] = useState([]);
  const [selectedKidney_disease, setSelectedKidney_disease] = useState([]);
  const [selectedNervous_system, setSelectedNervous_system] = useState([]);
  const [selectedCancer, setSelectedCancer] = useState([]);
  const [selectedAllergy, setSelectedAllergy] = useState([]);

  const { user, setUser: updateUserInfo } = useContext(UserContext);

  const toggleUserState = (category, diseases) => {
    const updatedCategoryItems = user[category].map((item) => {
      if (diseases.includes(item.value)) {
        return { ...item, check: true };
      } else {
        return item;
      }
    });

    updateUserInfo({
      [category]: updatedCategoryItems,
    });
  };

  useEffect(() => {
    // console.table(user.cardio);
    // console.table(user.digestive);
    // console.table(user.kidney_disease);
    // console.table(user.nervous_system);
    // console.table(user.cancer);
    // console.table(user.allergy);
    // console.table(user);
  }, [user]);

  const _handleSignupBtnPress = () => {
    toggleUserState('cardio', selectedCardio);
    toggleUserState('digestive', selectedDigestive);
    toggleUserState('kidney_disease', selectedKidney_disease);
    toggleUserState('nervous_system', selectedNervous_system);
    toggleUserState('cancer', selectedCancer);
    toggleUserState('allergy', selectedAllergy);

    navigation.popToTop();
  };

  return (
    <KeyboardAwareScrollView extraScrollHeight={20} enableOnAndroid={true}>
      <Container>
        <Customtext text={GUIDE_TEXT}></Customtext>
        <MultipleSelectListContainer>
          <MultipleSelectList
            setSelected={(val) => setSelectedCardio(val)}
            data={user.cardio}
            save="value"
            label="심혈관질환"
            placeholder="심혈관질환"
            searchPlaceholder="심혈관질환"
          ></MultipleSelectList>
        </MultipleSelectListContainer>

        <MultipleSelectListContainer>
          <MultipleSelectList
            setSelected={(val) => setSelectedDigestive(val)}
            data={user.digestive}
            save="value"
            label="소화기질환"
            placeholder="소화기질환"
            searchPlaceholder="소화기질환"
          ></MultipleSelectList>
        </MultipleSelectListContainer>

        <MultipleSelectListContainer>
          <MultipleSelectList
            setSelected={(val) => setSelectedKidney_disease(val)}
            data={user.kidney_disease}
            save="value"
            label="신장질환"
            placeholder="신장질환"
            searchPlaceholder="신장질환"
          ></MultipleSelectList>
        </MultipleSelectListContainer>

        <MultipleSelectListContainer>
          <MultipleSelectList
            setSelected={(val) => setSelectedNervous_system(val)}
            data={user.nervous_system}
            save="value"
            label="신경질환"
            placeholder="신경질환"
            searchPlaceholder="신경질환"
          ></MultipleSelectList>
        </MultipleSelectListContainer>

        <MultipleSelectListContainer>
          <MultipleSelectList
            setSelected={(val) => setSelectedCancer(val)}
            data={user.cancer}
            save="value"
            label="암"
            placeholder="암"
            searchPlaceholder="암"
          ></MultipleSelectList>
        </MultipleSelectListContainer>

        <MultipleSelectListContainer>
          <MultipleSelectList
            setSelected={(val) => setSelectedAllergy(val)}
            data={user.allergy}
            save="value"
            label="알레르기"
            placeholder="알레르기"
            searchPlaceholder="알레르기"
          ></MultipleSelectList>
        </MultipleSelectListContainer>

        <Button title="저장" onPress={_handleSignupBtnPress}></Button>
      </Container>
    </KeyboardAwareScrollView>
  );
};

export default Signupdiseases;
