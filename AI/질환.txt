const diseasesData = {
  /// 심장 질환
  cardio: [
    { key: '1', value: '고혈압', title: 'highblp', check: false },
    { key: '2', value: '고지혈증', title: 'hyperlipidemia', check: false },
    { key: '3', value: '협심증과 심근경색', title: 'angina', check: false },
    { key: '4', value: '심부전', title: 'heartfailure', check: false },
    { key: '5', value: '부정맥', title: 'arrhythmia', check: false },
    { key: '6', value: '심장수술', title: 'heartsurgery', check: false },
    { key: '7', value: '심장이식', title: 'hearttransplant', check: false },
  ],

  // 소화기 질환
  digestive: [
    { key: '1', value: '간질환', title: 'liver_disease', check: false },
    { key: '2', value: '간경변', title: 'liver_irrhosis', check: false },
    {
      key: '3',
      value: '간성뇌증',
      title: 'hepatic_encephalopathy',
      check: false,
    },
    {
      key: '4',
      value: '간이식전',
      title: 'before_liver_transplantation',
      check: false,
    },
    {
      key: '5',
      value: '간이식후',
      title: 'after_liver_transplant',
      check: false,
    },
    { key: '6', value: '윌슨병', title: 'wilsondisease', check: false },
    {
      key: '7',
      value: '췌장염',
      title: 'ancreatic_inflammation',
      check: false,
    },
    {
      key: '8',
      value: '염증성 장질환',
      title: 'inflammatory_bowel',
      check: false,
    },
  ],

  // 신장 질환
  kidney_disease: [
    { key: '1', value: '신증후군', title: 'nephroticsyndrome', check: false },
    {
      key: '2',
      value: '만성신부전',
      title: 'chronicrenalfailure',
      check: false,
    },
    { key: '3', value: '혈액투석', title: 'hemodialysis', check: false },
    { key: '4', value: '복막투석', title: 'peritonealdialysis', check: false },
    { key: '5', value: '신장이식', title: 'kidneytransplant', check: false },
    { key: '6', value: '루푸스', title: 'Lupus', check: false },
  ],

  // 신경 질환
  nervous_system: [
    { key: '1', value: '뇌졸증', title: 'stroke', check: false },
    {
      key: '2',
      value: '연하곤란',
      title: 'difficultyswallowing',
      check: false,
    },
    { key: '3', value: '기타 신경계 질환', title: 'other', check: false },
    { key: '4', value: '뇌종양', title: 'braintumor', check: false },
  ],

  //암
  cancer: [
    { key: '1', value: '약물 치료', title: 'drug_therapy', check: false },
    {
      key: '2',
      value: '방사선 치료',
      title: 'radiation_therapy',
      check: false,
    },
    { key: '3', value: '위암', title: 'stomach', check: false },
    { key: '4', value: '대장암', title: 'colon', check: false },
    { key: '5', value: '간암', title: 'liver', check: false },
    { key: '6', value: '유방암', title: 'breast', check: false },
    { key: '7', value: '폐암', title: 'lung', check: false },
    { key: '8', value: '식도암', title: 'oesophagus', check: false },
    { key: '9', value: '췌장암', title: 'pancreas', check: false },
    { key: '10', value: '전립선암', title: 'prostate', check: false },
    { key: '11', value: '갑상선암', title: 'thyroid', check: false },
    { key: '12', value: '혈액암', title: 'hematologic', check: false },
    { key: '13', value: '두경부암', title: 'headneck', check: false },
  ],

  //알레르기
  allergy: [
    { key: '1', value: '약물 치료', title: 'drug_therapy', check: false },
    {
      key: '2',
      value: '방사선 치료',
      title: 'radiation_therapy',
      check: false,
    },
    { key: '3', value: '위암', title: 'stomach', check: false },
    { key: '4', value: '대장암', title: 'colon', check: false },
    { key: '5', value: '간암', title: 'liver', check: false },
    { key: '6', value: '유방암', title: 'breast', check: false },
  ],
};

const diseaseTranslation = {};
Object.keys(diseasesData).forEach((category) => {
  diseasesData[category].forEach((disease) => {
    diseaseTranslation[disease.value] = disease.title;
  });
});

export { diseasesData, diseaseTranslation };
