import { IsString } from 'class-validator';
import { Group } from '../entities/group.entity';

export class CreateGroupDto extends Group {
  @IsString()
  name: string;
}
