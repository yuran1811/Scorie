import { Timestamp } from 'firebase/firestore';

export interface TestimonialProps {
  id?: string;
  content: string;
  name: string;
  job: string;
  votes: string[];
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
}
