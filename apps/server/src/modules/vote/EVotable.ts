import { registerEnumType } from '@nestjs/graphql';

export enum EVotable {}
registerEnumType(EVotable, { name: 'EVotable' });
