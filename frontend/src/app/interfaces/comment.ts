
export interface Comment {
    created_by_user_id: string;
    post_id: string;
    comment: string;
  }
  
  export interface editComment {
    comment_id: string;
    updated_comment:string
  }
  
  export interface subComment {
    created_by_user_id: string;
    post_id: string;
    comment: string;
    comment_replied_to_id: string | null;
  }