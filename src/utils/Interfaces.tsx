interface User {
  id: number;
  username: string;
  permission: number;
  email: string;
  created_at: string;
  update_at: string;
  password: string;
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

interface Shorts {
  id: number;
  title: string;
  content: string;
  author: User;
  created_at: string;
  updated_at: string;
  has_permission: boolean;
}
