export interface Neo4jNode {
  identity: string;
  labels: string[];
  properties: Record<string, any>;
}

export interface Neo4jRelationship {
  identity: string;
  type: string;
  start: string;
  end: string;
  properties: Record<string, any>;
}

export interface UserNode extends Neo4jNode {
  properties: {
    id: string;
    username: string;
    email: string;
    avatar: string;
    bio: string;
    joinedAt: string;
  };
}

export interface PostNode extends Neo4jNode {
  properties: {
    id: string;
    content: string;
    createdAt: string;
    hashtags: string[];
  };
}

export interface CommentNode extends Neo4jNode {
  properties: {
    id: string;
    content: string;
    createdAt: string;
  };
} 