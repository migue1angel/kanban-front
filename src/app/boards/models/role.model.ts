export interface Role {
  id: string;
  name: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  code: number;
}

export interface CreateRoleDto
  extends Omit<Role, 'id' | 'createdAt' | 'updatedAt'> {}
