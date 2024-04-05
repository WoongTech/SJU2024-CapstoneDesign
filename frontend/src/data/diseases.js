const diseases = {
  //심혈관 질환
  cardio: [
    { key: '1', value: 'highblp', disabled: true },
    { key: '2', value: 'hyperlipidemia', disabled: true },
    { key: '3', value: 'angina', disabled: true },
    { key: '4', value: 'heartfailure', disabled: true },
    { key: '5', value: 'arrhythmia', disabled: true },
    { key: '6', value: 'heartsurgery', disabled: true },
    { key: '7', value: 'hearttransplant', disabled: true },
  ],

  //소화기 질환
  digestive: [
    { key: '1', value: 'liver_disease', disabled: true },
    { key: '2', value: 'liver_irrhosis', disabled: true },
    { key: '3', value: 'hepatic_encephalopathy', disabled: true },
    { key: '4', value: 'before_liver_transplantation', disabled: true },
    { key: '5', value: 'after_liver_transplant', disabled: true },
    { key: '6', value: 'wilsondisease', disabled: true },
    { key: '7', value: 'ancreatic_inflammation', disabled: true },
    { key: '8', value: 'inflammatory_bowel', disabled: true },
  ],

  //신장 질환
  kidney_disease: [
    { key: '1', value: 'nephroticsyndrome', disabled: true },
    { key: '2', value: 'chronicrenalfailure', disabled: true },
    { key: '3', value: 'hemodialysis', disabled: true },
    { key: '4', value: 'peritonealdialysis', disabled: true },
    { key: '5', value: 'kidneytransplant', disabled: true },
    { key: '6', value: 'Lupus', disabled: true },
  ],

  //신경 질환
  nervous_system: [
    { key: '1', value: 'stroke', disabled: true },
    { key: '2', value: 'difficultyswallowing', disabled: true },
    { key: '3', value: 'other', disabled: true },
    { key: '4', value: 'braintumor', disabled: true },
  ],

  //암
  cancer: [],

  //알레르기
  allergy: [],
};

export default diseases;
