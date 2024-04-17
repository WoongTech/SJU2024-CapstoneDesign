import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components/native';
import { Button, Customtext } from '../components';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { UserContext } from '../contexts';
import { MultipleSelectList } from 'react-native-dropdown-select-list';
import { diseasesData, diseaseTranslation } from '../data/diseasesData';

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

  const compileDiseaseInfo = (selectedDiseases) => {
    return selectedDiseases
      .map((disease) => diseaseTranslation[disease] || '')
      .filter((title) => title !== '')
      .join(', ');
  };

  const toggleUserState = (category, diseases) => {
    const updatedCategoryItems = diseasesData[category].map((item) => {
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

  const _handleSignupBtnPress = async () => {
    toggleUserState('cardio', selectedCardio);
    toggleUserState('digestive', selectedDigestive);
    toggleUserState('kidney_disease', selectedKidney_disease);
    toggleUserState('nervous_system', selectedNervous_system);
    toggleUserState('cancer', selectedCancer);
    toggleUserState('allergy', selectedAllergy);

    const formattedUser = {
      name: user.name ? user.name[0] : '', // 배열 첫 요소 접근 또는 빈 문자열
      email: user.email ? user.email[0] : '',
      password: user.password ? user.password[0] : '',
      birth: user.birth
        ? `${user.birth[0].slice(0, 4)}-${user.birth[0].slice(
            4,
            6
          )}-${user.birth[0].slice(6, 8)}`
        : '',
      gender: user.gender ? user.gender[0] : '',
      pregnant: !!user.pregnant,
      breastfeeding: !!user.breastfeeding,
      height: parseFloat(user.height ? user.height[0] : 0),
      weight: parseFloat(user.weight ? user.weight[0] : 0),
      diabetes: !!user.diabetes,
      cardio: compileDiseaseInfo(selectedCardio),
      digestive: compileDiseaseInfo(selectedDigestive),
      kidney_disease: compileDiseaseInfo(selectedKidney_disease),
      nervous_system: compileDiseaseInfo(selectedNervous_system),
      osteoporosis: !!user.osteoporosis,
      constipation: !!user.constipation,
      anaemia: !!user.anaemia,
      stone: !!user.urinarystone,
      gout: !!user.gout,
      vegan: !!user.vegan,
      cancer: compileDiseaseInfo(selectedCancer),
      allergy: compileDiseaseInfo(selectedAllergy),
    };

    const payload = formattedUser;
    console.log('Payload to be sent:', payload);

    try {
      const response = await fetch('http://localhost:8080/api/member/join', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      console.log('response data:', response);

      const statusRes = await response.status;

      if (response.ok) {
        console.log('Signup successful', statusRes);
        navigation.popToTop();
      } else {
        console.error('Signup failed:', statusRes);
      }
    } catch (error) {
      console.error('Network or other error:', error);
    }
  };

  return (
    <KeyboardAwareScrollView extraScrollHeight={20} enableOnAndroid={true}>
      <Container>
        <Customtext text={GUIDE_TEXT}></Customtext>
        <MultipleSelectListContainer>
          <MultipleSelectList
            setSelected={(val) => setSelectedCardio(val)}
            data={diseasesData.cardio}
            save="value"
            label="심혈관질환"
            placeholder="심혈관질환"
            searchPlaceholder="심혈관질환"
            boxStyles={{ width: 300 }}
            maxHeight={200}
          ></MultipleSelectList>
        </MultipleSelectListContainer>

        <MultipleSelectListContainer>
          <MultipleSelectList
            setSelected={(val) => setSelectedDigestive(val)}
            data={diseasesData.digestive}
            save="value"
            label="소화기질환"
            placeholder="소화기질환"
            searchPlaceholder="소화기질환"
            boxStyles={{ width: 300 }}
            maxHeight={200}
          ></MultipleSelectList>
        </MultipleSelectListContainer>

        <MultipleSelectListContainer>
          <MultipleSelectList
            setSelected={(val) => setSelectedKidney_disease(val)}
            data={diseasesData.kidney_disease}
            save="value"
            label="신장질환"
            placeholder="신장질환"
            searchPlaceholder="신장질환"
            boxStyles={{ width: 300 }}
            maxHeight={200}
          ></MultipleSelectList>
        </MultipleSelectListContainer>

        <MultipleSelectListContainer>
          <MultipleSelectList
            setSelected={(val) => setSelectedNervous_system(val)}
            data={diseasesData.nervous_system}
            save="value"
            label="신경질환"
            placeholder="신경질환"
            searchPlaceholder="신경질환"
            boxStyles={{ width: 300 }}
            maxHeight={160}
          ></MultipleSelectList>
        </MultipleSelectListContainer>

        <MultipleSelectListContainer>
          <MultipleSelectList
            setSelected={(val) => setSelectedCancer(val)}
            data={diseasesData.cancer}
            save="value"
            label="암"
            placeholder="암"
            searchPlaceholder="암"
            boxStyles={{ width: 300 }}
            maxHeight={200}
          ></MultipleSelectList>
        </MultipleSelectListContainer>

        <MultipleSelectListContainer>
          <MultipleSelectList
            setSelected={(val) => setSelectedAllergy(val)}
            data={diseasesData.allergy}
            save="value"
            label="알레르기"
            placeholder="알레르기"
            searchPlaceholder="알레르기"
            boxStyles={{ width: 300 }}
            maxHeight={200}
          ></MultipleSelectList>
        </MultipleSelectListContainer>

        <Button title="저장" onPress={_handleSignupBtnPress}></Button>
      </Container>
    </KeyboardAwareScrollView>
  );
};

export default Signupdiseases;
