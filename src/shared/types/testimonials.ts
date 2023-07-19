import { Timestamp } from 'firebase/firestore';

export interface TestimonialProps {
  id?: string;
  content: string;
  name: string;
  job: string;
  votes: string[];
  voteCount?: number;
  downvotes?: string[];
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
}
