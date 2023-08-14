interface User {
  id: number;
  username: string;
  permission: number;
  email: string;
  created_at: string;
  update_at: string;
  password: string;
  pp: string;
  birthdate: string;
}

interface Comment {
  id: number;
  author: User;
  content: string;
  created_at: string;
  updated_at: string;
  has_permission: boolean;
}

interface RudimentaryComment {
  id: number;
  content: string;
}

interface Post {
  id: number;
  title: string;
  slug: string;
  content: string;
  created_at: string;
  updated_at: string;
  author: User;
  has_permission: boolean;
  comments: Comment[];
  description: string;
  tags: string;
  image: string;
  commentCount: number;
  required_age: number;
}

interface PostWithoutComments {
  id: number;
  title: string;
  slug: string;
  content: string;
  created_at: string;
  updated_at: string;
  author: User;
  has_permission: boolean;
  description: string;
  tags: string;
  image: string;
  commentCount: number;
  required_age: number;
}

interface RudimentaryPost {
  title: string;
  slug: string;
  content: string;
}

interface ServerError {
  errors: {
    message: string;
  }[];
}

interface AuthSuccess {
  token: string;
}

interface ServerToClientEvents {
  connected: (msg: string) => void;
}

interface ClientToServerEvents {
  ok: (msg: string) => void;
}
interface Short {
  id: number;
  title: string;
  content: string;
  author: User;
  created_at: string;
  updated_at: string;
  has_permission: boolean;
}

interface ServerToClientEvents {
  connected: (msg: string) => void;
}

interface ClientToServerEvents {
  ok: (msg: string) => void;
}
