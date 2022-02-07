import { Prisma } from '@prisma/client';

export class Group implements Prisma.GroupUncheckedCreateInput {
  id?: number;
  name: string;
  User_Group?: Prisma.User_GroupUncheckedCreateNestedManyWithoutGroupInput;
}
