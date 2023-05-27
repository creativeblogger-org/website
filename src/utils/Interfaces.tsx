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
  
interface Post {
  id: number;
  title: string;
  slug: string;
  content: string;
  created_at: string;
  updated_at: string;
  author: User;
  has_permission: boolean
}

interface ServerError {
    errors: {
        message: string
    }[];
}

interface AuthSuccess {
    token: string
}