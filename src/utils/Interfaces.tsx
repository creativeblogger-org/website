interface User {
  id: number;
  username: string;
  permission: number;
}

interface Comment {
  id: number;
  author: User;
  content: string;
  created_at: string;
  updated_at: string;
}

interface RudimentaryComment {
  id: number,
  content: string
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
  comments: Comment[]
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
