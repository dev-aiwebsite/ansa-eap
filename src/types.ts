export type NavItemsType = {
    title: string;
    link: string;
    icon?: React.ReactNode;
    subitems?: NavItemsType[];
  };

  export type User = {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    created_at: string;
    updated_at?: string;
  }

  export type DailyActivity = {
    id: string;
    user_id: string;
    reading_minutes: number;
    video_minutes: number;
    writing_minutes: number;
    task_minutes: number;
    created_at: string;
    updated_at: string;
  }

  export type DailyCheckIn = {
    id: string;
    user_id: string;
    responses: {
      question: string;
      answer: number;
    }[];
    created_at: string;
    updated_at: string;
  };