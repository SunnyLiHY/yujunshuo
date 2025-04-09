import { Question } from "./QuestionList";

export const sampleQuestions: Question[] = [
  {
    id: '1',
    title: '大学期间如何规划自己的职业发展方向？',
    content: '我是一名大二学生，专业是计算机科学。我对未来的职业方向感到迷茫，不知道是应该往前端开发、后端开发、人工智能还是其他方向发展。希望有经验的前辈能给我一些建议。',
    category: '职业发展',
    ageRange: '20-25',
    author: '匿名用户',
    isAnonymous: true,
    createdAt: '2小时前',
    answersCount: 5
  },
  {
    id: '2',
    title: '如何平衡工作与个人生活？',
    content: '最近工作压力很大，经常加班到很晚，几乎没有个人时间。我想知道有什么方法可以更好地平衡工作和生活，避免职业倦怠？',
    category: '生活方式',
    ageRange: '25-30',
    author: '李明',
    isAnonymous: false,
    createdAt: '1天前',
    answersCount: 8
  },
  {
    id: '3',
    title: '30岁转行还来得及吗？',
    content: '我已经在金融行业工作了8年，但最近对编程产生了浓厚的兴趣。我想知道30岁转行到IT行业是否还来得及？需要做哪些准备？',
    category: '职业发展',
    ageRange: '30-35',
    author: '张伟',
    isAnonymous: false,
    createdAt: '3天前',
    answersCount: 12
  },
  {
    id: '4',
    title: '如何开始理财投资？',
    content: '刚参加工作不久，想开始学习理财和投资。作为初学者，应该从哪些方面入手？有什么适合新手的投资方式推荐？',
    category: '财务规划',
    ageRange: '20-25',
    author: '王芳',
    isAnonymous: false,
    createdAt: '5天前',
    answersCount: 7
  },
  {
    id: '5',
    title: '研究生读什么专业比较有前景？',
    content: '今年大四，准备考研。对金融科技和人工智能都比较感兴趣，但不知道选择哪个方向比较好。希望有经验的学长学姐给些建议。',
    category: '教育学习',
    ageRange: '20-25',
    author: '刘洋',
    isAnonymous: false,
    createdAt: '1周前',
    answersCount: 15
  },
  {
    id: '6',
    title: '如何处理与同事的关系？',
    content: '最近和部门一个同事有些摩擦，主要是工作分工和沟通方面的问题。想知道如何既能维护好关系又能把工作做好？',
    category: '人际关系',
    ageRange: '25-30',
    author: '匿名用户',
    isAnonymous: true,
    createdAt: '1周前',
    answersCount: 10
  }
];