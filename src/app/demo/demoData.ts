import { iconMap } from "@/lib/icon-map";
import { Webinar } from "@/serverActions/crudWebinars";

export type TypeCoursesData = {
  id: string;
  name: string;
  author: string;
  author_image: string;
  experience: string;
  icon: keyof typeof iconMap;
  lessons_count: string;
  total_time: string;
  status: string;
};

export const coursesData: TypeCoursesData[] = [
  {
    id: "7WkBEQxkp8",
    name: "Good to Great in Private Practice",
    author: "Jade Scott",
    author_image: "",
    experience: "5 years",
    icon: "IconBookMarkOrange",
    lessons_count: "15",
    total_time: "40 Hours",
    status: "complete",
  },
  {
    id: "7WkBEQxkp7",
    name: "Common Conditions",
    author: "Jade Scott",
    author_image: "",
    experience: "5 years",
    icon: "IconRulerPencil",
    lessons_count: "15",
    total_time: "40 Hours",
    status: "complete",
  },
  {
    id: "7WkBEQxkp9",
    name: "Practice GrowthRx",
    author: "Jade Scott",
    author_image: "",
    experience: "5 years",
    icon: "IconPouringCup",
    lessons_count: "15",
    total_time: "40 Hours",
    status: "complete",
  },
  {
    id: "7WkBEQxkp1",
    name: "Mental Health 101",
    author: "Jade Scott",
    author_image: "",
    experience: "5 years",
    icon: "IconIdeaHead",
    lessons_count: "15",
    total_time: "40 Hours",
    status: "complete",
  },
  {
    id: "7WkBEQxka8",
    name: "Good to Great in Private Practice",
    author: "Jade Scott",
    author_image: "",
    experience: "5 years",
    icon: "IconBookMarkOrange",
    lessons_count: "15",
    total_time: "40 Hours",
    status: "complete",
  },
  {
    id: "7WkBEQxkb7",
    name: "Common Conditions",
    author: "Jade Scott",
    author_image: "",
    experience: "5 years",
    icon: "IconRulerPencil",
    lessons_count: "15",
    total_time: "40 Hours",
    status: "complete",
  },
  {
    id: "7WkBEQxkc9",
    name: "Practice GrowthRx",
    author: "Jade Scott",
    author_image: "",
    experience: "5 years",
    icon: "IconPouringCup",
    lessons_count: "15",
    total_time: "40 Hours",
    status: "complete",
  },
  {
    id: "7WkBEQxkd1",
    name: "Mental Health 101",
    author: "Jade Scott",
    author_image: "",
    experience: "5 years",
    icon: "IconIdeaHead",
    lessons_count: "15",
    total_time: "40 Hours",
    status: "complete",
  },
];


export const webinarsData: Webinar[] = [
  {
    id: "7WkBEQxkp8",
    title: "Breaking the Stigma: Understanding Mental Health",
    slug: "",
    author: "Dr. Sarah Johnson",
    tags: "Mental Health",
    video: "/assets/videos/webinar1.mp4",
    thumbnail: "/assets/images/webinar.jpg",
    description:
      "An engaging talk focused on reducing stigma around mental health and promoting open conversations.",
      updated_at: "",
      created_at: "",
  },
  {
    id: "5f12muiL8h",
    title: "Cognitive Behavioral Therapy Explained",
    slug: "",
    author: "Prof. James Lee",
    tags: "Therapy",
    video: "/assets/videos/webinar2.mp4",
    thumbnail: "/assets/images/webinar.jpg",
    description:
      "Learn the basics of CBT and how it can be applied to treat common psychological issues.",
    updated_at: "",
      created_at: "",
    },
  {
    id: "wCiLvHDjmY",
    title: "Workplace Wellness Strategies",
    slug: "",
    author: "Emily Carter",
    tags: "Workplace",
    video: "/assets/videos/webinar3.mp4",
    thumbnail: "/assets/images/webinar.jpg",
    description:
      "Practical approaches for fostering well-being and productivity in professional environments.",
    updated_at: "",
      created_at: "",
    },
  {
    id: "LsUN7u1c0j",
    title: "Parenting in the Digital Age",
    slug: "",
    author: "Michael Thompson",
    tags: "Family",
    video: "/assets/videos/webinar4.mp4",
    thumbnail: "/assets/images/webinar.jpg",
    description:
      "A guide for parents to support their children in balancing technology use and healthy habits.",
    updated_at: "",
      created_at: "",
    },
  {
    id: "pQl97z4Kf9",
    title: "Mindfulness for Stress Reduction",
    slug: "",
    author: "Dr. Anna Patel",
    tags: "Mindfulness",
    video: "/assets/videos/webinar5.mp4",
    thumbnail: "/assets/images/webinar.jpg",
    description:
      "Discover practical mindfulness techniques to reduce stress and improve emotional well-being.",
    updated_at: "",
      created_at: "",
    },
  {
    id: "jIqBUQHlp5",
    title: "Nutrition and Mental Health",
    slug: "",
    author: "David Kim, RDN",
    tags: "Health",
    video: "/assets/videos/webinar6.mp4",
    thumbnail: "/assets/images/webinar.jpg",
    description:
      "Explore the connection between diet and mental wellness, with evidence-based nutrition tips.",
    updated_at: "",
      created_at: "",
    },
  {
    id: "D3l69bD53s",
    title: "Supporting Adolescents Through Change",
    slug: "",
    author: "Laura Garcia",
    tags: "Adolescents",
    video: "/assets/videos/webinar7.mp4",
    thumbnail: "/assets/images/webinar.jpg",
    description:
      "Insights into adolescent psychology and strategies for guiding teens through transitions.",
    updated_at: "",
      created_at: "",
    },
  {
    id: "gqAq30XhpA",
    title: "The Future of Teletherapy",
    slug: "",
    author: "Dr. Robert Wilson",
    tags: "Technology",
    video: "/assets/videos/webinar8.mp4",
    thumbnail: "/assets/images/webinar.jpg",
    description:
      "An overview of how teletherapy is shaping the future of mental health services.",
    updated_at: "",
      created_at: "",
    },
  {
    id: "7p2v1Ur_OE",
    title: "Building Resilience in Challenging Times",
    slug: "",
    author: "Sophia Martinez",
    tags: "Resilience",
    video: "/assets/videos/webinar9.mp4",
    thumbnail: "/assets/images/webinar.jpg",
    description:
      "Tools and strategies to develop resilience and adaptability in uncertain situations.",
    updated_at: "",
      created_at: "",
    },
]

  

  export const mentalHealthData = [
    {
      title: "Counseling & Therapy Services",
      image: "/assets/images/img2.jpg",
      duration: "1-2 Hours",
      list: [
        "One-on-one counseling (in-person or virtual)",
        "Teletherapy platforms (e.g., BetterHelp, Headspace Care, MindNation)",
        "Specialist referrals (psychiatrists, psychologists)",
      ],
    },
    {
      title: "Crisis Support",
      image: "/assets/images/img1.jpg",
      duration: "1-2 Hours",
      list: [
          "42/7 confidential helpline",
          "On-demand mental health first aid",
          "Emergency mental health intervention"
        ]
        ,
    },
    {
      title: "Crisis Support",
      image: "/assets/images/img1.jpg",
      duration: "1-2 Hours",
      list: [
          "42/7 confidential helpline",
          "On-demand mental health first aid",
          "Emergency mental health intervention"
        ]
        ,
    },
    {
      title: "Crisis Support",
      image: "/assets/images/img1.jpg",
      duration: "1-2 Hours",
      list: [
          "42/7 confidential helpline",
          "On-demand mental health first aid",
          "Emergency mental health intervention"
        ]
        ,
    },
    {
      title: "Crisis Support",
      image: "/assets/images/img1.jpg",
      duration: "1-2 Hours",
      list: [
          "42/7 confidential helpline",
          "On-demand mental health first aid",
          "Emergency mental health intervention"
        ]
        ,
    },
  ];
  export const alliedHealthData = [
    {
      title: "Counseling & Therapy Services",
      image: "/assets/images/img2.jpg",
      duration: "1-2 Hours",
      list: [
        "One-on-one counseling (in-person or virtual)",
        "Teletherapy platforms (e.g., BetterHelp, Headspace Care, MindNation)",
        "Specialist referrals (psychiatrists, psychologists)",
      ],
    },
    {
      title: "Crisis Support",
      image: "/assets/images/img1.jpg",
      duration: "1-2 Hours",
      list: [
          "42/7 confidential helpline",
          "On-demand mental health first aid",
          "Emergency mental health intervention"
        ]
        ,
    },
    {
      title: "Crisis Support",
      image: "/assets/images/img1.jpg",
      duration: "1-2 Hours",
      list: [
          "42/7 confidential helpline",
          "On-demand mental health first aid",
          "Emergency mental health intervention"
        ]
        ,
    },
    {
      title: "Crisis Support",
      image: "/assets/images/img1.jpg",
      duration: "1-2 Hours",
      list: [
          "42/7 confidential helpline",
          "On-demand mental health first aid",
          "Emergency mental health intervention"
        ]
        ,
    },
    {
      title: "Crisis Support",
      image: "/assets/images/img1.jpg",
      duration: "1-2 Hours",
      list: [
          "42/7 confidential helpline",
          "On-demand mental health first aid",
          "Emergency mental health intervention"
        ]
        ,
    },
  ];
  

  export const practionersData = [
    {
        "id": "7WkBEQxkp8",
        "name": "Liam",
        "position": "Junior Therapist",
        "experience": "5 years",
        "image": "/assets/images/img3.png",
        "description": "Focused on holistic and evidence-based treatments.",
        "booking_link": ""
    },
    {
        "id": "5f12muiL8h",
        "name": "Jane",
        "position": "Junior Counselor",
        "experience": "8 years",
        "image": "/assets/images/img3.png",
        "description": "Focused on holistic and evidence-based treatments.",
        "booking_link": ""
    },
    {
        "id": "wCiLvHDjmY",
        "name": "Isabella",
        "position": "Junior Therapist",
        "experience": "13 years",
        "image": "/assets/images/img3.png",
        "description": "Experienced with adolescents and family therapy.",
        "booking_link": ""
    },
    {
        "id": "LsUN7u1c0j",
        "name": "Ava",
        "position": "Junior Psychologist",
        "experience": "5 years",
        "image": "/assets/images/img3.png",
        "description": "Passionate about mental wellness and helping others thrive.",
        "booking_link": ""
    },
    {
        "id": "pQl97z4Kf9",
        "name": "Lucas",
        "position": "Junior Psychologist",
        "experience": "15 years",
        "image": "/assets/images/img3.png",
        "description": "Passionate about mental wellness and helping others thrive.",
        "booking_link": ""
    },
    {
        "id": "jIqBUQHlp5",
        "name": "Lucas",
        "position": "Senior Psychologist",
        "experience": "5 years",
        "image": "/assets/images/img3.png",
        "description": "Specializes in anxiety and mood disorders.",
        "booking_link": ""
    },
    {
        "id": "D3l69bD53s",
        "name": "Mason",
        "position": "Junior Psychologist",
        "experience": "13 years",
        "image": "/assets/images/img3.png",
        "description": "Focused on holistic and evidence-based treatments.",
        "booking_link": ""
    },
    {
        "id": "gqAq30XhpA",
        "name": "Lucas",
        "position": "Senior Psychologist",
        "experience": "5 years",
        "image": "/assets/images/img3.png",
        "description": "Specializes in anxiety and mood disorders.",
        "booking_link": ""
    },
    {
        "id": "7p2v1Ur_OE",
        "name": "Olivia",
        "position": "Senior Counselor",
        "experience": "15 years",
        "image": "/assets/images/img3.png",
        "description": "Focused on holistic and evidence-based treatments.",
        "booking_link": ""
    }
  ]