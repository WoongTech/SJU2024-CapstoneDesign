//프로젝트에서 사용되는 색상 정리

const Colors = {
  white: '#ffffff',
  black: '#111111',
  main: '#5DB075',
  darkgreen: '#129575',
  grey_0: '#d5d5d5',
  grey_1: '#E0E0E0',
  grey_2: '#F3F3F3',
  grey_3: '#a6a6a6',
  grey_4: '#474747',
  yellow: '#F1C21B',
  blue: '#0043CE',
  red_0: '#F85B64',
  red_1: '#DA1E28',
  purple: '#735BF2',
};

export const theme = {
  background: Colors.white,
  text: Colors.black,
  errorText: Colors.red_0,
  main: Colors.main,
  detail: Colors.grey_3,

  //Loading
  loadingPageBackground: Colors.main,

  // Button
  btnBackground: Colors.main,
  btnTitle: Colors.white,
  btnTextLink: Colors.main,

  // Input
  inputBackground: Colors.white,
  inputLabel: Colors.grey_1,
  inputPlaceholder: Colors.grey_1,
  inputBorder: Colors.grey_1,

  // Customcard
  cardBackground: Colors.grey_2,
  cardfocusedBackGround: Colors.grey_3,
  cardTitle: Colors.black,

  //list
  listcolor: Colors.main,

  //HealthScore
  scoreTitle: Colors.main,
  HealthScoreTotalvalue: Colors.grey_3,
  HealthScoreValue: Colors.red_1,

  //LineChart
  chartcolor1: Colors.red_1,
  chartcolor2: Colors.yellow,
  chartcolor3: Colors.blue,
  chartBackground: Colors.grey_2,
  chartValueDetail: Colors.grey_3,
  exceedValueDetail: Colors.red_0,

  //Feedback
  bubbleBackground: Colors.grey_2,
  bubbleText: Colors.grey_4,

  //calender
  breakfast: Colors.red_0,
  lunch: Colors.blue,
  dinner: Colors.darkgreen,
  snack: Colors.purple,
  selectedColor: Colors.main,
};
