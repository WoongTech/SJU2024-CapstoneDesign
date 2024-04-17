const diseasesData = {
  cardio: [
    { key: '1', value: '고혈압', check: false },
    { key: '2', value: '고지혈증', check: false },
    { key: '3', value: '협심증과 심근경색', check: false },
    { key: '4', value: '심부전', check: false },
    { key: '5', value: '부정맥', check: false },
    { key: '6', value: '심장수술', check: false },
    { key: '7', value: '심장이식', check: false },
  ],
  digestive: [
    { key: '1', value: '간질환', check: false },
    { key: '2', value: '간경변', check: false },
    { key: '3', value: '간성뇌증', check: false },
    { key: '4', value: '간이식전', check: false },
    { key: '5', value: '간이식후', check: false },
    { key: '6', value: '윌슨병', check: false },
    { key: '7', value: '췌장염', check: false },
    { key: '8', value: '염증성 장질환', check: false },
  ],
  kidney_disease: [
    { key: '1', value: '신증후군', check: false },
    { key: '2', value: '만성신부전', check: false },
    { key: '3', value: '혈액투석', check: false },
    { key: '4', value: '복막투석', check: false },
    { key: '5', value: '신장이식', check: false },
    { key: '6', value: '루푸스', check: false },
  ],
  nervous_system: [
    { key: '1', value: '뇌졸증', check: false },
    { key: '2', value: '연하곤란', check: false },
    { key: '3', value: '기타 신경계 질환', check: false },
    { key: '4', value: '뇌종양', check: false },
  ],
  cancer: [
    { key: '1', value: '약물 치료', check: false },
    { key: '2', value: '방사선 치료', check: false },
    { key: '3', value: '위암', check: false },
    { key: '4', value: '대장암', check: false },
    { key: '5', value: '간암', check: false },
    { key: '6', value: '유방암', check: false },
    { key: '7', value: '폐암', check: false },
    { key: '8', value: '식도암', check: false },
    { key: '9', value: '췌장암', check: false },
    { key: '10', value: '전립선암', check: false },
    { key: '11', value: '갑상선암', check: false },
    { key: '12', value: '혈액암', check: false },
    { key: '13', value: '두경부암', check: false },
  ],
  allergy: [
    { key: '1', value: '약물 치료', check: false },
    { key: '2', value: '방사선 치료', check: false },
    { key: '3', value: '위암', check: false },
    { key: '4', value: '대장암', check: false },
    { key: '5', value: '간암', check: false },
    { key: '6', value: '유방암', check: false },
  ],
};

const diseaseTranslation = {};
Object.keys(diseasesData).forEach((category) => {
  diseasesData[category].forEach((disease) => {
    diseaseTranslation[disease.value] = disease.title;
  });
});

export { diseasesData, diseaseTranslation };
