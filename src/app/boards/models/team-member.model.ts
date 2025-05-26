import { User } from '../../auth/models/user.model';
import { Board } from './board.model';

export interface TeamMember {
  id: string;
  createdAt: Date;
  deletedAt: Date;
  updatedAt: Date;
  user: User;
  board: Board;
  roles: string[];
}

export interface CreateTeamMemberDto
  extends Omit<TeamMember, 'id' | 'createdAt' | 'deletedAt' | 'updatedAt'> {}
