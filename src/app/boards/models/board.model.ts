export interface Board {
    id: string;
    name: string;
    description: string;
    owner: string;
    memberTeam: string[];
}

export interface CrateBoardDto extends Omit<Board, 'id'> {}