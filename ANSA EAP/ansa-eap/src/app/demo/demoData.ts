import { iconMap } from "@/lib/icon-map";

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

export type TypeWebinarsData = {
    id: string;
    name: string;
    position: string;
    experience: string;
    image: string;
    description: string;
    booking_link: string;
    video: string;
  }
  
  export const webinarsData:TypeWebinarsData[] = [
    {
        "id": "7WkBEQxkp8",
        "name": "Mind Matters: A Conversation on Mental Health & Wellbeing",
        "position": "Junior Therapist",
        "experience": "5 years",
        "image": "/assets/images/webinar.jpg",
        "video": "/assets/images/webinar.jpg",
        "description": "Focused on holistic and evidence-based treatments.",
        "booking_link": ""
    },
    {
        "id": "5f12muiL8h",
        "name": "Mind Matters: A Conversation on Mental Health & Wellbeing",
        "position": "Junior Counselor",
        "experience": "8 years",
        "image": "/assets/images/webinar.jpg",
        "video": "/assets/images/webinar.jpg",
        "description": "Focused on holistic and evidence-based treatments.",
        "booking_link": ""
    },
    {
        "id": "wCiLvHDjmY",
        "name": "Mind Matters: A Conversation on Mental Health & Wellbeing",
        "position": "Junior Therapist",
        "experience": "13 years",
        "image": "/assets/images/webinar.jpg",
        "video": "/assets/images/webinar.jpg",
        "description": "Experienced with adolescents and family therapy.",
        "booking_link": ""
    },
    {
        "id": "LsUN7u1c0j",
        "name": "Mind Matters: A Conversation on Mental Health & Wellbeing",
        "position": "Junior Psychologist",
        "experience": "5 years",
        "image": "/assets/images/webinar.jpg",
        "video": "/assets/images/webinar.jpg",
        "description": "Passionate about mental wellness and helping others thrive.",
        "booking_link": ""
    },
    {
        "id": "pQl97z4Kf9",
        "name": "Mind Matters: A Conversation on Mental Health & Wellbeing",
        "position": "Junior Psychologist",
        "experience": "15 years",
        "image": "/assets/images/webinar.jpg",
        "video": "/assets/images/webinar.jpg",
        "description": "Passionate about mental wellness and helping others thrive.",
        "booking_link": ""
    },
    {
        "id": "jIqBUQHlp5",
        "name": "Mind Matters: A Conversation on Mental Health & Wellbeing",
        "position": "Senior Psychologist",
        "experience": "5 years",
        "image": "/assets/images/webinar.jpg",
        "video": "/assets/images/webinar.jpg",
        "description": "Specializes in anxiety and mood disorders.",
        "booking_link": ""
    },
    {
        "id": "D3l69bD53s",
        "name": "Mind Matters: A Conversation on Mental Health & Wellbeing",
        "position": "Junior Psychologist",
        "experience": "13 years",
        "image": "/assets/images/webinar.jpg",
        "video": "/assets/images/webinar.jpg",
        "description": "Focused on holistic and evidence-based treatments.",
        "booking_link": ""
    },
    {
        "id": "gqAq30XhpA",
        "name": "Mind Matters: A Conversation on Mental Health & Wellbeing",
        "position": "Senior Psychologist",
        "experience": "5 years",
        "image": "/assets/images/webinar.jpg",
        "video": "/assets/images/webinar.jpg",
        "description": "Specializes in anxiety and mood disorders.",
        "booking_link": ""
    },
    {
        "id": "7p2v1Ur_OE",
        "name": "Mind Matters: A Conversation on Mental Health & Wellbeing",
        "position": "Senior Counselor",
        "experience": "15 years",
        "image": "/assets/images/webinar.jpg",
        "video": "/assets/images/webinar.jpg",
        "description": "Focused on holistic and evidence-based treatments.",
        "booking_link": ""
    }
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