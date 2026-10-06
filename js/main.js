const getRandomInteger = (min, max) => {
  const lower = Math.ceil(Math.min(min, max));
  const upper = Math.floor(Math.max(min, max));

  return Math.floor(Math.random() * (upper - lower + 1)) + lower;
};

const COMMENT_MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const NAMES = [
  'Алексей',
  'Мария',
  'Иван',
  'Анна',
  'Дмитрий',
  'Елена',
  'Максим',
  'Ольга',
  'Артём',
  'София'
];

const DESCRIPTIONS = [
  'Закат над морем',
  'Прогулка по лесу',
  'Отличный день с друзьями',
  'Красивый вид на город',
  'Летний вечер',
  'Незабываемое путешествие'
];

const createMessage = () => {
  const firstMessage = COMMENT_MESSAGES[
    getRandomInteger(0, COMMENT_MESSAGES.length - 1)
  ];

  if (getRandomInteger(1, 2) === 1) {
    return firstMessage;
  }

  let secondMessage = COMMENT_MESSAGES[
    getRandomInteger(0, COMMENT_MESSAGES.length - 1)
  ];

  while (secondMessage === firstMessage) {
    secondMessage = COMMENT_MESSAGES[
      getRandomInteger(0, COMMENT_MESSAGES.length - 1)
    ];
  }

  return `${firstMessage} ${secondMessage}`;
};

let commentId = 1;

const createComment = () => ({
  id: commentId++,
  avatar: `img/avatar-${getRandomInteger(1, 6)}.svg`,
  message: createMessage(),
  name: NAMES[getRandomInteger(0, NAMES.length - 1)]
});

const createPhoto = (id) => ({
  id,
  url: `photos/${id}.jpg`,
  description: DESCRIPTIONS[
    getRandomInteger(0, DESCRIPTIONS.length - 1)
  ],
  likes: getRandomInteger(15, 200),
  comments: Array.from(
    { length: getRandomInteger(0, 30) },
    () => createComment()
  )
});

const photos = Array.from(
  { length: 25 },
  (_, index) => createPhoto(index + 1)
);
